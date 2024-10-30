<?php
/**
 * This class will handle server calls
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_base;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Global_Variables;

class B1nTPortal_Server_Calls extends B1nTPortal_Global_Variables {

    /**
     * Validate company information
     * 
     * @return array
     */
    function b1nTPortal_handshake(){
        $b1nTPortal_username = sanitize_text_field(get_option('b1nTPortal_username'));
        $b1nTPortal_password = sanitize_text_field(get_option('b1nTPortal_password'));
        
        $b1nTPortal_user_credentials = array( 
            'command'   => 'cmdBinTPortalHandShake',
            'username'  => $b1nTPortal_username,
            'password'  => $b1nTPortal_password
        );

        $b1nTPortal_user_credentials_query_string = http_build_query($b1nTPortal_user_credentials);
        $b1nTPortal_response                      = wp_remote_post($this->b1nTPortal_binT_url, array('body' => $b1nTPortal_user_credentials_query_string));
        $b1nTPortal_handshake_response_array      = json_decode($b1nTPortal_response['body']);
        return $this->b1nTPortal_sanitize_reponse($b1nTPortal_handshake_response_array); //b1nTPortal_sanitize_reponse() sanitizes values
    }

    /**
     * Validate customer information
     * Params come in sanitized/validated
     * 
     * @param string $b1nTPortal_username_customer
     * @param string $b1nTPortal_password_customer
     * @param string $b1nTPortal_session_key_customer
     * @param string $b1nTPortal_session_key_api
     * @return array
     */
    function b1nTPortal_customer_handshake($b1nTPortal_username_customer, $b1nTPortal_password_customer, $b1nTPortal_session_key_customer, $b1nTPortal_session_key_api){
        $b1nTPortal_username_customer    = sanitize_text_field($b1nTPortal_username_customer);
        $b1nTPortal_password_customer    = sanitize_text_field($b1nTPortal_password_customer);
        $b1nTPortal_session_key_customer = sanitize_text_field($b1nTPortal_session_key_customer);
        $b1nTPortal_session_key_api      = sanitize_text_field($b1nTPortal_session_key_api);
        $b1nTPortal_username_api         = sanitize_text_field(get_option('b1nTPortal_username'));
        $b1nTPortal_password_api         = sanitize_text_field(get_option('b1nTPortal_password'));       

        $b1nTPortal_user_credentials = array( 
            'command'              => 'cmdBinTPortalCustomerHandShake',
            'username_api'         => $b1nTPortal_username_api,
            'password_api'         => $b1nTPortal_password_api,
            'session_key_api'      => $b1nTPortal_session_key_api,
            'username_customer'    => $b1nTPortal_username_customer,
            'password_customer'    => $b1nTPortal_password_customer,
            'session_key_customer' => $b1nTPortal_session_key_customer
        );

        $b1nTPortal_user_credentials_query_string     = http_build_query($b1nTPortal_user_credentials);
        $b1nTPortal_response                          = wp_remote_post($this->b1nTPortal_binT_url, array('body' => $b1nTPortal_user_credentials_query_string));
        $b1nTPortal_customer_handshake_response_array = json_decode($b1nTPortal_response['body']);
        return $this->b1nTPortal_sanitize_reponse($b1nTPortal_customer_handshake_response_array); //b1nTPortal_sanitize_reponse() sanitizes values
    }

    /**
     * Call Bin Tracker Command
     * 
     * @param array $b1nTPortal_args
     */
     function b1nTPortal_call_command($b1nTPortal_args) {
        if(!is_array($b1nTPortal_args)) {
            return null; 
        }

        $b1nTPortal_args         = $this->b1nTPortal_sanitize_array_values($b1nTPortal_args);
        $b1nTPortal_username_api = sanitize_text_field(get_option('b1nTPortal_username'));   

        $b1nTPortal_credentials = array(
            'username_api' => $b1nTPortal_username_api
        );

        $b1nTPortal_credentials              = array_merge($b1nTPortal_credentials, $b1nTPortal_args);
        $b1nTPortal_credentials_query_string = http_build_query($b1nTPortal_credentials);
        $b1nTPortal_response                 = wp_remote_post($this->b1nTPortal_binT_url, array('body' => $b1nTPortal_credentials_query_string));
        $b1nTPortal_response_array           = json_decode($b1nTPortal_response['body']);
        return $this->b1nTPortal_sanitize_reponse($b1nTPortal_response_array); //b1nTPortal_sanitize_reponse() sanitizes values
     }

    /**
     * Get a list of states
     * 
     * @param string $b1nTPortal_country_id
     * @return string
     */
    function b1nTPortal_get_states($b1nTPortal_country_id) {
        $b1nTPortal_country_id = sanitize_text_field($b1nTPortal_country_id);

        global $wpdb;
        if($b1nTPortal_country_id == "Canada"){
             $b1nTPortal_country_id = 'CAN';
        } else {
             $b1nTPortal_country_id = 'USA';
        }
        
        $b1nTPortal_table_name = $wpdb->prefix."b1nTPortal_states";
        $b1nTPortal_output = $wpdb->get_results($wpdb->prepare("SELECT * FROM %i WHERE country_id = %s", $b1nTPortal_table_name, $b1nTPortal_country_id));

        if(!is_array($b1nTPortal_output)) { return null; }
        return $this->b1nTPortal_sanitize_array_values($b1nTPortal_output); //b1nTPortal_sanitize_array_values() sanitizes values
    }

    /**
     * Get a list of states
     * 
     * @return string
     */
    function b1nTPortal_get_all_states() {
        global $wpdb;
        $b1nTPortal_table_name = $wpdb->prefix."b1nTPortal_states";
        $b1nTPortal_output = $wpdb->get_results($wpdb->prepare("SELECT * FROM %i", $b1nTPortal_table_name));
        if(!is_array($b1nTPortal_output)) { return null; }
        return $this->b1nTPortal_sanitize_array_values($b1nTPortal_output); //b1nTPortal_sanitize_array_values() sanitizes values
    }

    /*
     * redefining these helper functions here, so that i dont
     * have to extend utility in the global variables class.
    */

    /**
     * Sanitize array
     * 
     * @param  array $b1nTPortal_array
     * @return sanitized array
     */
    function b1nTPortal_sanitize_array_values($b1nTPortal_array) { 
        //if not an array dont proceed.
        if(!is_array($b1nTPortal_array)) { return $b1nTPortal_array; }

        foreach ($b1nTPortal_array as $b1nTPortal_key => &$b1nTPortal_value) {
            if(is_array($b1nTPortal_value)) {
                $b1nTPortal_value = $this->b1nTPortal_sanitize_array_values($b1nTPortal_value);
            } else {
                if(is_object($b1nTPortal_value)) {
                    $b1nTPortal_value = $this->b1nTPortal_sanitize_object_values($b1nTPortal_value);  
                } else {
                    $b1nTPortal_value = sanitize_text_field($b1nTPortal_value);
                }
            }
        }

        return $b1nTPortal_array;
    }

    /**
     * Sanitize objects
     * 
     * @param  object $b1nTPortal_object
     * @return sanitized object
     */
    function b1nTPortal_sanitize_object_values($b1nTPortal_object) {
        //if not an object dont proceed.
        if(!is_object($b1nTPortal_object)) { return $b1nTPortal_object; }

        foreach ($b1nTPortal_object as $b1nTPortal_key => &$b1nTPortal_value) {
            if(is_object($b1nTPortal_value)) {
                $b1nTPortal_value = $this->b1nTPortal_sanitize_object_values($b1nTPortal_value);
            } else {
                if(is_array($b1nTPortal_value)) {
                    $b1nTPortal_value = $this->b1nTPortal_sanitize_array_values($b1nTPortal_value);
                } else {
                    $b1nTPortal_value = sanitize_text_field($b1nTPortal_value);
                }
            }
        }

        return $b1nTPortal_object;
    }

    /**
     * Server calls sanitize
     * 
     * @param array/object $b1nTPortal_data
     * @return array/object $b1nTPortal_data
     */
    function b1nTPortal_sanitize_reponse($b1nTPortal_data) {
        if(is_array($b1nTPortal_data)) {
            return $this->b1nTPortal_sanitize_array_values($b1nTPortal_data); 
        }

        if(is_object($b1nTPortal_data)) {
            return $this->b1nTPortal_sanitize_object_values($b1nTPortal_data);
        }

        return (object) array(
            'status'      => '511',
            'errorString' => 'Failed to sanitize data'
        );
    }
}