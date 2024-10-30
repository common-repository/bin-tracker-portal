<?php
/**
 * This class will manage the logout
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_ajax;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Ajax_Utility;

class B1nTPortal_Logout extends B1nTPortal_Ajax_Utility {
    function b1nTPortal_logout() {
        //security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);

        if($b1nTPortal_username == "" || $b1nTPortal_session_key_customer == "") {
            //clean up session for security
            $this->b1nTPortal_clean_session();
            wp_send_json($this->b1nTPortal_response('error', "Logged out, Error (600) System: Contact administration.", ''));
        }

        $b1nTPortal_login_required_fields = $this->b1nTPortal_evaluate_required_fields(array('username', 'password'), $this->b1nTPortal_login_fields_map);
         
        //if for whatever reason the eval fails       
        if(!$b1nTPortal_login_required_fields) {
            $b1nTPortal_login_required_fields = array("b1nTPortal_username", "b1nTPortal_password");
        }

        //we need to pass back the required
        //fields even when we do a log out.
        $b1nTPortal_logout_data = array(
            "b1nTPortal_required_fields" => $b1nTPortal_login_required_fields
        );

        [$b1nTPortal_handshake, $b1nTPortal_customer_handshake, $b1nTPortal_error] = $this->b1nTPortal_evaluate_handshakes($b1nTPortal_username, "", $b1nTPortal_session_key_customer); //b1nTPortal_evaluate_handshakes() sanitizes values

        if($b1nTPortal_handshake && $b1nTPortal_customer_handshake && !$b1nTPortal_error) {
            $b1nTPortal_session_key_api = $b1nTPortal_handshake->key;
            $b1nTPortal_customer_id     = $b1nTPortal_customer_handshake->customerID;

            $b1nTPortal_args = array(
                "command"              => "cmdBinTPortalCustomerLogOut",
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer
            );

            $b1nTPortal_customer_logout = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_customer_logout && $b1nTPortal_customer_logout->status == '200') {
                //clean up session for security
                //fully logout on server/local
                $this->b1nTPortal_clean_session();
                wp_send_json($this->b1nTPortal_response('success', "Logged out", $b1nTPortal_logout_data));
            }

            $this->b1nTPortal_clean_session();
            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_customer_logout);
            wp_send_json($this->b1nTPortal_response('error', "Logged out, ".$b1nTPortal_error, $b1nTPortal_logout_data));
        }

        $this->b1nTPortal_clean_session();
        wp_send_json($this->b1nTPortal_response('error', "Logged out, ".$b1nTPortal_error, $b1nTPortal_logout_data));
    }
}











