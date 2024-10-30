<?php
/**
 * This class will manage the login
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_ajax;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Ajax_Utility;

class B1nTPortal_Login extends B1nTPortal_Ajax_Utility {
    function b1nTPortal_login() {
        //security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username = sanitize_text_field($_POST["b1nTPortal_username"]);
        $b1nTPortal_password = sanitize_text_field($_POST["b1nTPortal_password"]);

        $b1nTPortal_login_required_fields = array();
        if(is_array($_POST["b1nTPortal_required_fields"])) {
            $b1nTPortal_login_required_fields = $this->b1nTPortal_sanitize_array_values($_POST["b1nTPortal_required_fields"]);
        }

        //making sure that we still have an array that is not empty
        if(!(is_array($b1nTPortal_login_required_fields) && !empty($b1nTPortal_login_required_fields))) {
            wp_send_json($this->b1nTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
        }

        //validate some fields
        $b1nTPortal_field_errors = array();
        
        foreach($b1nTPortal_login_required_fields as $b1nTPortal_login_required_fields_value) {
            //username
            if($b1nTPortal_login_required_fields_value == "b1nTPortal_username") {
                if($b1nTPortal_username == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_login_required_fields_value); 
                }
            }

            //password
            if($b1nTPortal_login_required_fields_value == "b1nTPortal_password") {
                if($b1nTPortal_password == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_login_required_fields_value); 
                }
            }
        }

        //if any required field fails
        if(!empty($b1nTPortal_field_errors)) {
            $b1nTPortal_validation_data = array(
                "b1nTPortal_field_errors" => $b1nTPortal_field_errors
            );
            wp_send_json($this->b1nTPortal_response('validation_error', "Please correct the highlighted fields.", $b1nTPortal_validation_data));
        }

        [$b1nTPortal_handshake, $b1nTPortal_customer_handshake, $b1nTPortal_error] = $this->b1nTPortal_evaluate_handshakes($b1nTPortal_username,  $b1nTPortal_password, ""); //b1nTPortal_evaluate_handshakes() sanitizes values

        if($b1nTPortal_handshake && $b1nTPortal_customer_handshake && !$b1nTPortal_error) {
            $b1nTPortal_session_key_api      = $b1nTPortal_handshake->key;
            $b1nTPortal_session_key_customer = $b1nTPortal_customer_handshake->key;
            $b1nTPortal_customer_id          = $b1nTPortal_customer_handshake->customerID;

            //storing username and session key in session, all sanitized
            $_SESSION['b1nTPortal_session']['username']    = $b1nTPortal_username;
            $_SESSION['b1nTPortal_session']['session_key'] = $b1nTPortal_session_key_customer;

            [$b1nTPortal_customer_data, $b1nTPortal_error] = $this->b1nTPortal_customer_data($b1nTPortal_username, $b1nTPortal_session_key_customer, $b1nTPortal_session_key_api, $b1nTPortal_customer_id); //b1nTPortal_customer_data() sanitizes values

            if($b1nTPortal_customer_data && is_array($b1nTPortal_customer_data) && !$b1nTPortal_error) {
                wp_send_json($this->b1nTPortal_response('success', "Succesful login.", $b1nTPortal_customer_data));
            }
       
            $this->b1nTPortal_clean_session();
            wp_send_json($this->b1nTPortal_response('error', "Failed to login, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response('error', "Failed to login, ".$b1nTPortal_error, ''));
    }

    function b1nTPortal_auto_login() {
        //security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);

        if($b1nTPortal_username == "" || $b1nTPortal_session_key_customer == "") {
            wp_send_json($this->b1nTPortal_response('error', "Failed to auto login.", ''));
        }

        [$b1nTPortal_handshake, $b1nTPortal_customer_handshake, $b1nTPortal_error] = $this->b1nTPortal_evaluate_handshakes($b1nTPortal_username, "", $b1nTPortal_session_key_customer); //b1nTPortal_evaluate_handshakes() sanitizes values

        if($b1nTPortal_handshake && $b1nTPortal_customer_handshake && !$b1nTPortal_error) {
            $b1nTPortal_session_key_api = $b1nTPortal_handshake->key;
            $b1nTPortal_customer_id     = $b1nTPortal_customer_handshake->customerID;

            [$b1nTPortal_customer_data, $b1nTPortal_error] = $this->b1nTPortal_customer_data($b1nTPortal_username, $b1nTPortal_session_key_customer, $b1nTPortal_session_key_api, $b1nTPortal_customer_id); //b1nTPortal_customer_data() sanitizes values

            if($b1nTPortal_customer_data && is_array($b1nTPortal_customer_data) && !$b1nTPortal_error) {
                wp_send_json($this->b1nTPortal_response('success', "Succesful auto login.", $b1nTPortal_customer_data));
            }
       
            $this->b1nTPortal_clean_session();
            wp_send_json($this->b1nTPortal_response('error', "Failed to auto login, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response('error', "Failed to auto login, ".$b1nTPortal_error, ''));
    }

    /**
     * get customer data
     * 
     * @param string $b1nTPortal_username
     * @param string $b1nTPortal_session_key_customer
     * @param string $b1nTPortal_session_key_api
     * @param int $b1nTPortal_customer_id
     * 
     * @return array $b1nTPortal_customer_data
     * @return string $b1nTPortal_error
     */
    function b1nTPortal_customer_data($b1nTPortal_username, $b1nTPortal_session_key_customer, $b1nTPortal_session_key_api, $b1nTPortal_customer_id) {
        $b1nTPortal_username             = sanitize_text_field($b1nTPortal_username);
        $b1nTPortal_session_key_customer = sanitize_text_field($b1nTPortal_session_key_customer);
        $b1nTPortal_session_key_api      = sanitize_text_field($b1nTPortal_session_key_api);
        $b1nTPortal_customer_id          = sanitize_text_field($b1nTPortal_customer_id);

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

            return [$b1nTPortal_customer_data_array, null];
        }

        $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_customer_data);
        return [null, $b1nTPortal_error];
    }
}