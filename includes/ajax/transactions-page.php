<?php
/**
 * This class will manage the transactions page
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_ajax;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Ajax_Utility;

class B1nTPortal_Transactions_Page extends B1nTPortal_Ajax_Utility {
    function b1nTPortal_transactions_page() {
        $this->b1nTPortal_get_transactions_data(0);
    }

    function b1nTPortal_transactions_list() {
        $b1nTPortal_offset = sanitize_text_field($_POST["b1nTPortal_offset"]);
        $this->b1nTPortal_get_transactions_data($b1nTPortal_offset);
    }

    function b1nTPortal_get_transactions_data($b1nTPortal_offset) {
        $b1nTPortal_offset = sanitize_text_field($b1nTPortal_offset);

        ///security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);
        $b1nTPortal_search_field         = sanitize_text_field($_POST["b1nTPortal_search"]);

        if($b1nTPortal_username == "" || $b1nTPortal_session_key_customer == "") {
            wp_send_json($this->b1nTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        //we need a valid offset 0+
        if(is_numeric($b1nTPortal_offset)) {} else {
             wp_send_json($this->b1nTPortal_response('error', "Error System: Something went wrong, missing offset!!", ''));
        }

        [$b1nTPortal_handshake, $b1nTPortal_customer_handshake, $b1nTPortal_error] = $this->b1nTPortal_evaluate_handshakes($b1nTPortal_username, "", $b1nTPortal_session_key_customer); //b1nTPortal_evaluate_handshakes() sanitizes values

        if($b1nTPortal_handshake && $b1nTPortal_customer_handshake && !$b1nTPortal_error) {
            $b1nTPortal_session_key_api = $b1nTPortal_handshake->key;
            $b1nTPortal_customer_id     = $b1nTPortal_customer_handshake->customerID;

            $b1nTPortal_args = array(
                "command"              => "cmdBinTPortalTransactionsList",
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer,
                "customer_id"          => $b1nTPortal_customer_id,
                "offset"               => $b1nTPortal_offset,
                "search"               => $b1nTPortal_search_field
            );

            $b1nTPortal_transactions_data = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_transactions_data && $b1nTPortal_transactions_data->status == '200') {
                $b1nTPortal_transactions_object_list              = $b1nTPortal_transactions_data->transactionsObjList;
                $b1nTPortal_transactions_object_list_record_count = $b1nTPortal_transactions_data->recordCount;
                $b1nTPortal_transactions_object_list_offset       = $b1nTPortal_transactions_data->offset;
                $b1nTPortal_transactions_object_list_cust_email   = $b1nTPortal_transactions_data->custEmail;

                //looking for a valid record count and a valid offset.
                if(is_numeric($b1nTPortal_transactions_object_list_record_count) && is_numeric($b1nTPortal_transactions_object_list_offset)) {} else {
                    wp_send_json($this->b1nTPortal_response('error', "Error User: Invalid record count and/or offset.", ''));
                }

                $b1nTPortal_data = array(
                    'b1nTPortal_transactions_object_list'              => $b1nTPortal_transactions_object_list,
                    'b1nTPortal_transactions_object_list_record_count' => $b1nTPortal_transactions_object_list_record_count,
                    'b1nTPortal_transactions_object_list_offset'       => $b1nTPortal_transactions_object_list_offset,
                    'b1nTPortal_transactions_object_list_cust_email'   => $b1nTPortal_transactions_object_list_cust_email
                );

                wp_send_json($this->b1nTPortal_response('success', "Succesful transactions load.", $b1nTPortal_data));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_transactions_data);
            wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_transactions_data)), "Failed transactions load, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_handshake, $b1nTPortal_customer_handshake)), "Failed transactions load, ".$b1nTPortal_error, ''));
    }

    function b1nTPortal_email_txn() {
        ///security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);

        if($b1nTPortal_username == "" || $b1nTPortal_session_key_customer == "") {
            wp_send_json($this->b1nTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        //validate the post fields
        $b1nTPortal_txn_email = sanitize_text_field($_POST["b1nTPortal_txn_email"]);
        $b1nTPortal_txn_id    = sanitize_text_field($_POST["b1nTPortal_txn_id"]);

        if(is_numeric($b1nTPortal_txn_id)) {} else {
            wp_send_json($this->b1nTPortal_response('error', "Error System: Something went wrong, invalid transaction id!!", ''));
        }

        $b1nTPortal_email_error = 0;
        $b1nTPortal_email_array = explode('|', $b1nTPortal_txn_email);

        foreach($b1nTPortal_email_array as $b1nTPortal_value) {
            if($b1nTPortal_value == "" || !filter_var($b1nTPortal_value, FILTER_VALIDATE_EMAIL)) {
                $b1nTPortal_email_error++;
            }
        }

        if($b1nTPortal_email_error) {
            wp_send_json($this->b1nTPortal_response('error', "Error System: Something went wrong, invalid email!!", ''));
        }

        [$b1nTPortal_handshake, $b1nTPortal_customer_handshake, $b1nTPortal_error] = $this->b1nTPortal_evaluate_handshakes($b1nTPortal_username, "", $b1nTPortal_session_key_customer); //b1nTPortal_evaluate_handshakes() sanitizes values

        if($b1nTPortal_handshake && $b1nTPortal_customer_handshake && !$b1nTPortal_error) {
            $b1nTPortal_session_key_api = $b1nTPortal_handshake->key;

            $b1nTPortal_args = array(
                "command"              => "cmdBinTPortalEmailTransaction",
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer,
                "transaction_id"       => $b1nTPortal_txn_id,
                "transaction_email"    => $b1nTPortal_txn_email
            );

            $b1nTPortal_transaction_email_data = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_transaction_email_data && $b1nTPortal_transaction_email_data->status == '200') {
                $b1nTPortal_data = array();
                wp_send_json($this->b1nTPortal_response('success', "Succesful transactions load.", $b1nTPortal_data));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_transaction_email_data);
            wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_transaction_email_data)), "Failed to email transaction, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_handshake, $b1nTPortal_customer_handshake)), "Failed to email transaction, ".$b1nTPortal_error, ''));
    }
}