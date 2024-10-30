<?php
/**
 * This class will manage the plugin load
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_ajax;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Ajax_Utility;

class B1nTPortal_Plugin_Load extends B1nTPortal_Ajax_Utility {
    function b1nTPortal_plugin_load() {
        //security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        //handshake
        $b1nTPortal_handshake = $this->b1nTPortal_server_calls->b1nTPortal_handshake(); //b1nTPortal_handshake() sanitizes values

        if($b1nTPortal_handshake && $b1nTPortal_handshake->status == '200') {
            $b1nTPortal_login_required_fields = $this->b1nTPortal_evaluate_required_fields(array('username', 'password'), $this->b1nTPortal_login_fields_map);
            
            //must have required fields    
            if(!$b1nTPortal_login_required_fields) {
                wp_send_json($this->b1nTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
            }

            //prompt auto login
            $b1nTPortal_login_prompt = "manual";
            if(isset($_SESSION['b1nTPortal_session'])) {
                $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
                $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']); 

                if($b1nTPortal_username && $b1nTPortal_session_key_customer) {
                    $b1nTPortal_login_prompt = "auto"; 
                }
            }

            //prepare data
            $b1nTPortal_plugin_load_data = array(
                "b1nTPortal_required_fields" => $b1nTPortal_login_required_fields,
                "b1nTPortal_login_prompt"    => $b1nTPortal_login_prompt
            );

            wp_send_json($this->b1nTPortal_response('success', "Succesful handshake.", $b1nTPortal_plugin_load_data));
        }

        $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_handshake);
        wp_send_json($this->b1nTPortal_response('error', "Failed to load plugin, ".$b1nTPortal_error, ''));
    }
}