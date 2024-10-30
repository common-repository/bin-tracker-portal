<?php
/**
 * This class will manage the payment page
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_ajax;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Ajax_Utility;

class B1nTPortal_Payment_Page extends B1nTPortal_Ajax_Utility {
    function b1nTPortal_payment_page() {
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
                "command"              => "cmdBinTPortalTransactionData",
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer,
                "customer_id"          => $b1nTPortal_customer_id,
                "version"              => 2
            );

            //transactions data
            $b1nTPortal_transaction_data = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_transaction_data && $b1nTPortal_transaction_data->status == '200') {
                $b1nTPortal_transaction_list  = $b1nTPortal_transaction_data->transactionObj->TxnList;
                $b1nTPortal_customer_balance  = $b1nTPortal_transaction_data->transactionObj->CustBalance;

                $b1nTPortal_ccard_required_fields = array(
                    "b1nTPortal_ccard_country", "b1nTPortal_ccard_state", "b1nTPortal_ccard_exp_month", "b1nTPortal_ccard_exp_year",
                    "b1nTPortal_ccard_address", "b1nTPortal_ccard_city", "b1nTPortal_ccard_email", "b1nTPortal_ccard_phone",
                    "b1nTPortal_ccard_cvv", "b1nTPortal_ccard_first_name", "b1nTPortal_ccard_last_name", "b1nTPortal_ccard_number",
                    "b1nTPortal_ccard_zip"
                );

                //we need a list of states
                $b1nTPortal_list_of_state = $this->b1nTPortal_server_calls->b1nTPortal_get_all_states(); //b1nTPortal_get_all_states() sanitizes values

                if(!is_array($b1nTPortal_list_of_state)) {
                    wp_send_json($this->b1nTPortal_response('error', "Failed to get state list.", ''));
                }

                $b1nTPortal_transaction_data_array = array(
                    "b1nTPortal_list_of_state"     => $b1nTPortal_list_of_state,
                    "b1nTPortal_required_fields"   => $b1nTPortal_ccard_required_fields,
                    "b1nTPortal_transaction_list"  => $b1nTPortal_transaction_list,
                    "b1nTPortal_customer_balance"  => $b1nTPortal_customer_balance
                );

                //attach credit card mask if any on file
                if(is_array($b1nTPortal_transaction_data->transactionObj->CCardObjList)) {
                    $b1nTPortal_transaction_ccard_mask = $b1nTPortal_transaction_data->transactionObj->CCardObjList;
                    $b1nTPortal_transaction_data_array["b1nTPortal_transaction_ccard_mask"] = $b1nTPortal_transaction_ccard_mask;
                }

                wp_send_json($this->b1nTPortal_response('success', "Succesful payment page load.", $b1nTPortal_transaction_data_array));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_transactions_data);
            wp_send_json($this->b1nTPortal_response('error', "Failed payment page load, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response('error', "Failed payment page load, ".$b1nTPortal_error, '')); 
    }

    function b1nTPortal_process_payment() {
        //security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);

        if($b1nTPortal_username == "" || $b1nTPortal_session_key_customer == "") {
            wp_send_json($this->b1nTPortal_response('error', "Error (600) System: Contact administration.", ''));
        } 

        //transaction id
        $b1nTPortal_payment_mode   = sanitize_text_field($_POST["b1nTPortal_payment_mode"]);
        $b1nTPortal_transaction_id = sanitize_text_field($_POST["b1nTPortal_transaction_id"]);
        $b1nTPortal_ccard_id       = sanitize_text_field($_POST["b1nTPortal_ccard_id"]);

        //we need a numeric ids and with valid logic
        if(is_numeric($b1nTPortal_payment_mode) && ($b1nTPortal_payment_mode == 1 || $b1nTPortal_payment_mode == 2) && is_numeric($b1nTPortal_ccard_id)) {} else {
             wp_send_json($this->b1nTPortal_response('error', "Error System: Something went wrong, missing id!!", ''));
        }

        $b1nTPortal_field_errors = array();
        $b1nTPortal_extra_fields = array();

        if($b1nTPortal_ccard_id == "0") { //field validation
            $b1nTPortal_ccard_address      = sanitize_text_field($_POST["b1nTPortal_ccard_address"]);
            $b1nTPortal_ccard_address2     = sanitize_text_field($_POST["b1nTPortal_ccard_address2"]);
            $b1nTPortal_ccard_city         = sanitize_text_field($_POST["b1nTPortal_ccard_city"]);
            $b1nTPortal_ccard_country      = sanitize_text_field($_POST["b1nTPortal_ccard_country"]);
            $b1nTPortal_ccard_cvv          = sanitize_text_field($_POST["b1nTPortal_ccard_cvv"]);
            $b1nTPortal_ccard_email        = sanitize_text_field($_POST["b1nTPortal_ccard_email"]);
            $b1nTPortal_ccard_exp_month    = sanitize_text_field($_POST["b1nTPortal_ccard_exp_month"]);
            $b1nTPortal_ccard_exp_year     = sanitize_text_field($_POST["b1nTPortal_ccard_exp_year"]);
            $b1nTPortal_ccard_first_name   = sanitize_text_field($_POST["b1nTPortal_ccard_first_name"]);
            $b1nTPortal_ccard_last_name    = sanitize_text_field($_POST["b1nTPortal_ccard_last_name"]);
            $b1nTPortal_ccard_number       = sanitize_text_field($_POST["b1nTPortal_ccard_number"]);
            $b1nTPortal_ccard_phone        = sanitize_text_field($_POST["b1nTPortal_ccard_phone"]);
            $b1nTPortal_ccard_state        = sanitize_text_field($_POST["b1nTPortal_ccard_state"]);
            $b1nTPortal_ccard_zip          = sanitize_text_field($_POST["b1nTPortal_ccard_zip"]);
            $b1nTPortal_ccard_store        = sanitize_text_field($_POST["b1nTPortal_ccard_store"]);
            $b1nTPortal_ccard_make_primary = sanitize_text_field($_POST["b1nTPortal_ccard_make_primary"]);

            //store fields on the extra array
            $b1nTPortal_extra_fields["ccard_address"]      = $b1nTPortal_ccard_address;
            $b1nTPortal_extra_fields["ccard_address2"]     = $b1nTPortal_ccard_address2;
            $b1nTPortal_extra_fields["ccard_city"]         = $b1nTPortal_ccard_city;
            $b1nTPortal_extra_fields["ccard_country"]      = $b1nTPortal_ccard_country;
            $b1nTPortal_extra_fields["ccard_cvv"]          = $b1nTPortal_ccard_cvv;
            $b1nTPortal_extra_fields["ccard_email"]        = $b1nTPortal_ccard_email;
            $b1nTPortal_extra_fields["ccard_exp_month"]    = $b1nTPortal_ccard_exp_month;
            $b1nTPortal_extra_fields["ccard_exp_year"]     = $b1nTPortal_ccard_exp_year;
            $b1nTPortal_extra_fields["ccard_first_name"]   = $b1nTPortal_ccard_first_name;
            $b1nTPortal_extra_fields["ccard_last_name"]    = $b1nTPortal_ccard_last_name;
            $b1nTPortal_extra_fields["ccard_number"]       = $b1nTPortal_ccard_number;
            $b1nTPortal_extra_fields["ccard_phone"]        = $b1nTPortal_ccard_phone;
            $b1nTPortal_extra_fields["ccard_state"]        = $b1nTPortal_ccard_state;
            $b1nTPortal_extra_fields["ccard_zip"]          = $b1nTPortal_ccard_zip;
            $b1nTPortal_extra_fields["ccard_store"]        = $b1nTPortal_ccard_store;
            $b1nTPortal_extra_fields["ccard_make_primary"] = $b1nTPortal_ccard_make_primary;

            $b1nTPortal_ccard_required_fields = array();
            if(is_array($_POST["b1nTPortal_required_fields"])) {
                $b1nTPortal_ccard_required_fields = $this->b1nTPortal_sanitize_array_values($_POST["b1nTPortal_required_fields"]);
            }

            if(!(is_array($b1nTPortal_ccard_required_fields) && !empty($b1nTPortal_ccard_required_fields))) {
                wp_send_json($this->b1nTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
            }

            foreach($b1nTPortal_ccard_required_fields as $b1nTPortal_ccard_required_fields_value) {
                //address
                if($b1nTPortal_ccard_required_fields_value == "b1nTPortal_ccard_address") {
                    if($b1nTPortal_ccard_address == "") {
                        array_push($b1nTPortal_field_errors, $b1nTPortal_ccard_required_fields_value); 
                    }
                }

                //address2
                if($b1nTPortal_ccard_required_fields_value == "b1nTPortal_ccard_address2") {
                    if($b1nTPortal_ccard_address2 == "") {
                        array_push($b1nTPortal_field_errors, $b1nTPortal_ccard_required_fields_value); 
                    }
                }

                //city
                if($b1nTPortal_ccard_required_fields_value == "b1nTPortal_ccard_city") {
                    if($b1nTPortal_ccard_city == "") {
                        array_push($b1nTPortal_field_errors, $b1nTPortal_ccard_required_fields_value); 
                    }
                }

                //cvv
                if($b1nTPortal_ccard_required_fields_value == "b1nTPortal_ccard_cvv") {
                    if(!preg_match('/^[0-9]{3,4}$/', $b1nTPortal_ccard_cvv)) {
                        array_push($b1nTPortal_field_errors, $b1nTPortal_ccard_required_fields_value); 
                    }
                }

                //email
                if($b1nTPortal_ccard_required_fields_value == "b1nTPortal_ccard_email") {
                    if($b1nTPortal_ccard_email == "" || !filter_var($b1nTPortal_ccard_email, FILTER_VALIDATE_EMAIL)) {
                        array_push($b1nTPortal_field_errors, $b1nTPortal_ccard_required_fields_value); 
                    }
                }

                //month
                if($b1nTPortal_ccard_required_fields_value == "b1nTPortal_ccard_exp_month") {
                    if(!preg_match('/^[0-9]{1,2}$/', $b1nTPortal_ccard_exp_month)) {
                        array_push($b1nTPortal_field_errors, $b1nTPortal_ccard_required_fields_value); 
                    }
                }

                //year
                if($b1nTPortal_ccard_required_fields_value == "b1nTPortal_ccard_exp_year") {
                    if(!preg_match('/^[0-9]{2}$/', $b1nTPortal_ccard_exp_year)) {
                        array_push($b1nTPortal_field_errors, $b1nTPortal_ccard_required_fields_value); 
                    }
                }

                //first name
                if($b1nTPortal_ccard_required_fields_value == "b1nTPortal_ccard_first_name") {
                    if($b1nTPortal_ccard_first_name == "") {
                        array_push($b1nTPortal_field_errors, $b1nTPortal_ccard_required_fields_value); 
                    }
                }

                //last name
                if($b1nTPortal_ccard_required_fields_value == "b1nTPortal_ccard_last_name") {
                    if($b1nTPortal_ccard_last_name == "") {
                        array_push($b1nTPortal_field_errors, $b1nTPortal_ccard_required_fields_value); 
                    }
                }

                //ccard number
                if($b1nTPortal_ccard_required_fields_value == "b1nTPortal_ccard_number") {
                    if($this->b1nTPortal_credit_card_number_valid($b1nTPortal_ccard_number) == false) {
                        array_push($b1nTPortal_field_errors, $b1nTPortal_ccard_required_fields_value); 
                    }
                }

                //phone
                if($b1nTPortal_ccard_required_fields_value == "b1nTPortal_ccard_phone") {
                    if(!preg_match("/^([0-9]{3})([-|\s])?([0-9]{3})([-|\s])?([0-9]{4})$/", $b1nTPortal_ccard_phone)) {
                        array_push($b1nTPortal_field_errors, $b1nTPortal_ccard_required_fields_value); 
                    }
                }

                //state
                if($b1nTPortal_ccard_required_fields_value == "b1nTPortal_ccard_state") {
                    if(!preg_match("/^[A-Z]{2}$/", $b1nTPortal_ccard_state)) {
                        array_push($b1nTPortal_field_errors, $b1nTPortal_ccard_required_fields_value); 
                    }
                }

                //zip
                if($b1nTPortal_ccard_required_fields_value == "b1nTPortal_ccard_zip") {
                    if($b1nTPortal_ccard_zip == "") {
                        array_push($b1nTPortal_field_errors, $b1nTPortal_ccard_required_fields_value); 
                    }
                }
            }

            //store bit
            if(!($b1nTPortal_ccard_store == 1 || $b1nTPortal_ccard_store == 0)) {
                array_push($b1nTPortal_field_errors, "b1nTPortal_ccard_store");  
            }

            //primary bit
            if(!($b1nTPortal_ccard_make_primary == 1 || $b1nTPortal_ccard_make_primary == 0)) {
                array_push($b1nTPortal_field_errors, "b1nTPortal_ccard_make_primary");  
            }
        }

        //if any required field fails
        if(!empty($b1nTPortal_field_errors)) {
            $b1nTPortal_validation_data = array(
                "b1nTPortal_field_errors" => $b1nTPortal_field_errors
            );
            wp_send_json($this->b1nTPortal_response('validation_error', "Please correct the highlighted fields.", $b1nTPortal_validation_data));
        }

        [$b1nTPortal_handshake, $b1nTPortal_customer_handshake, $b1nTPortal_error] = $this->b1nTPortal_evaluate_handshakes($b1nTPortal_username, "", $b1nTPortal_session_key_customer); //b1nTPortal_evaluate_handshakes() sanitizes values

        if($b1nTPortal_handshake && $b1nTPortal_customer_handshake && !$b1nTPortal_error) {
            $b1nTPortal_session_key_api = $b1nTPortal_handshake->key;
            $b1nTPortal_customer_id     = $b1nTPortal_customer_handshake->customerID;

            $b1nTPortal_ccard_args = array(
                "command"              => "cmdBinTPortalProcessPayment",
                "version"              => 2,
                "payment_mode"         => $b1nTPortal_payment_mode,
                "ccard_id"             => $b1nTPortal_ccard_id,
                "transaction_id"       => $b1nTPortal_transaction_id,
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer,
                "customer_id"          => $b1nTPortal_customer_id
            );

            $b1nTPortal_ccard_args = array_merge($b1nTPortal_ccard_args, $b1nTPortal_extra_fields);
            $b1nTPortal_process_payment = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_ccard_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_process_payment && $b1nTPortal_process_payment->status == '200') {
                wp_send_json($this->b1nTPortal_response('success', "Successfull process payment", ''));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_process_payment);
            wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_process_payment)), "Failed to process payment, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_handshake, $b1nTPortal_customer_handshake)), "Failed to process payment, ".$b1nTPortal_error, ''));
    }
}