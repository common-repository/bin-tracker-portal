<?php
/**
 * This class will manage the home page
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_ajax;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Ajax_Utility;

class B1nTPortal_Home_Page extends B1nTPortal_Ajax_Utility {
    function b1nTPortal_home_page() {
        //security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);

        if($b1nTPortal_username == "" || $b1nTPortal_session_key_customer == "") {
            wp_send_json($this->b1nTPortal_response('error', "Error (600) System: Contact administration.", ''));
        } 

        [$b1nTPortal_handshake, $b1nTPortal_customer_handshake, $b1nTPortal_error] = $this->b1nTPortal_evaluate_handshakes($b1nTPortal_username, "", $b1nTPortal_session_key_customer); //b1nTPortal_evaluate_handshakes() sanitizes values

        if($b1nTPortal_handshake && $b1nTPortal_customer_handshake && !$b1nTPortal_error) {
            $b1nTPortal_session_key_api = $b1nTPortal_handshake->key;
            $b1nTPortal_customer_id     = $b1nTPortal_customer_handshake->customerID;

            $b1nTPortal_args = array(
                "command"              => "cmdBinTPortalCustomerData",
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer,
                "customer_id"          => $b1nTPortal_customer_id
            );

            //customer data
            $b1nTPortal_customer_data = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_customer_data && $b1nTPortal_customer_data->status == '200') {
                $b1nTPortal_customer_name    = $b1nTPortal_customer_data->customerObj->Name;
                $b1nTPortal_customer_balance = $b1nTPortal_customer_data->customerObj->Balance;

                $b1nTPortal_customer_data_array = array(
                    "b1nTPortal_customer_name"    => $b1nTPortal_customer_name,
                    "b1nTPortal_customer_balance" => $b1nTPortal_customer_balance
                );

                wp_send_json($this->b1nTPortal_response('success', "Succesful home page load.", $b1nTPortal_customer_data_array));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_customer_data);
            wp_send_json($this->b1nTPortal_response('error', "Failed home page load, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response('error', "Failed home page load, ".$b1nTPortal_error, ''));        
    }
}