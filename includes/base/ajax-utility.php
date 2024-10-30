<?php
/**
 * This class will manage ajax utilities
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_base;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Server_Calls;

class B1nTPortal_Ajax_Utility {
    public $b1nTPortal_server_calls;
    public $b1nTPortal_login_fields_map;
    public $b1nTPortal_customer_fields_map;
    public $b1nTPortal_jobsite_fields_map;
    public $b1nTPortal_workorder_fields_map;
    public $b1nTPortal_ccard_fields_map;

    function __construct() {
        $this->b1nTPortal_server_calls = new B1nTPortal_Server_Calls();
        $this->b1nTPortal_map_fields();
    }

    /**
     * Map fields
     * 
     */
    function b1nTPortal_map_fields() {
        $this->b1nTPortal_login_fields_map = array(
            "username" => "b1nTPortal_username",
            "password" => "b1nTPortal_password"
        );

        $this->b1nTPortal_customer_fields_map = array(
            "txtName"         => "b1nTPortal_customer_name",
            "txtAddress1"     => "b1nTPortal_customer_address",
            "txtAddress2"     => "b1nTPortal_customer_address2",
            "txtCity"         => "b1nTPortal_customer_city",
            "selState"        => "b1nTPortal_customer_state",
            "txtZip"          => "b1nTPortal_customer_zip",
            "txtContactCell"  => "b1nTPortal_customer_contact_cell",
            "txtContactEmail" => "b1nTPortal_customer_contact_email",
            "txtContactFax"   => "b1nTPortal_customer_contact_fax",
            "txtContactName"  => "b1nTPortal_customer_contact_name",
            "txtContactPhone" => "b1nTPortal_customer_contact_phone"
        );

        $this->b1nTPortal_jobsite_fields_map = array(
            "selJSState" => "b1nTPortal_jobsite_state",
            "txtJSAddress" => "b1nTPortal_jobsite_address",
            "txtJSCity" => "b1nTPortal_jobsite_city",
            "selJSContact" => "b1nTPortal_jobsite_contacts",
            "txtJSCounty" => "b1nTPortal_jobsite_county",
            "txtJSCrossStreet" => "b1nTPortal_jobsite_cross_street",
            "txtJSMuni" => "b1nTPortal_jobsite_muni",
            "txtJSZip" => "b1nTPortal_jobsite_zip"
        );

        $this->b1nTPortal_workorder_fields_map = array(
            "addWOQty" => "b1nTPortal_workorder_contqty",
            "addWOType" => "b1nTPortal_workorder_wotype"
        );

        $this->b1nTPortal_ccard_fields_map = array(
            "selCardCountry" => "b1nTPortal_ccard_country",
            "selCardState" => "b1nTPortal_ccard_state",
            "selExpMonth" => "b1nTPortal_ccard_exp_month",
            "selExpYear" => "b1nTPortal_ccard_exp_year",
            "txtCardAdd1" => "b1nTPortal_ccard_address",
            "txtCardCity" => "b1nTPortal_ccard_city",
            "txtCardEmail" => "b1nTPortal_ccard_email",
            "txtCardPhone" => "b1nTPortal_ccard_phone",
            "txtCCardCVV" => "b1nTPortal_ccard_cvv",
            "txtCCardFName" => "b1nTPortal_ccard_first_name",
            "txtCCardLName" => "b1nTPortal_ccard_last_name",
            "txtCCardNo" => "b1nTPortal_ccard_number",
            "txtCCZip" => "b1nTPortal_ccard_zip"
        );
    }

    /**
     * Get required fields
     * Params come in sanitized
     * 
     * @param array $b1nTPortal_fields_map
     * @param array $b1nTPortal_required_fields
     * @return array $b1nTPortal_required_fields_mapped
     */
    function b1nTPortal_get_required_fields($b1nTPortal_fields_map, $b1nTPortal_required_fields) {
        $b1nTPortal_required_fields_mapped = array();
        if(is_array($b1nTPortal_required_fields) && is_array($b1nTPortal_fields_map)) {
            $b1nTPortal_required_fields = $this->b1nTPortal_sanitize_array_values($b1nTPortal_required_fields);
            $b1nTPortal_fields_map      = $this->b1nTPortal_sanitize_array_values($b1nTPortal_fields_map);
                
            foreach ($b1nTPortal_required_fields as $b1nTPortal_field_value) {
                if($b1nTPortal_fields_map[$b1nTPortal_field_value]) {
                    array_push($b1nTPortal_required_fields_mapped, $b1nTPortal_fields_map[$b1nTPortal_field_value]);    
                }    
            }
        }

        return $b1nTPortal_required_fields_mapped;
    }

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
     * Security checks
     * 
     * @return 1 or 0
     */
    function b1nTPortal_security_checks() {
        if(!DOING_AJAX) { return 0; } 
        if(!check_ajax_referer('_check__ajax_101', 'b1nTPortal_nonce')) { return 0; }
        return 1;
    }

    /**
     * clean up session
     * 
     */
    function b1nTPortal_clean_session() {
        if(isset($_SESSION['b1nTPortal_session'])) {
            //unset children just in case
            if(isset($_SESSION['b1nTPortal_session']['username'])) {
                unset($_SESSION['b1nTPortal_session']['username']); 
            }
            if(isset($_SESSION['b1nTPortal_session']['session_key'])) {
                unset($_SESSION['b1nTPortal_session']['session_key']); 
            }

            //unset parent
            unset($_SESSION['b1nTPortal_session']);
        }
    }

    /**
     * Error string from server calls
     * 
     * 
     * @param object $b1nTPortal_object
     * @return string $b1nTPortal_error
     */
    function b1nTPortal_generate_error_string($b1nTPortal_object) {
        #default error
        $b1nTPortal_error_code = "510";
        $b1nTPortal_error_string = "API: Contact administration.";

        if($b1nTPortal_object && is_object($b1nTPortal_object)) {
            $b1nTPortal_object_status = sanitize_text_field($b1nTPortal_object->status);
            $b1nTPortal_object_error  = sanitize_text_field($b1nTPortal_object->errorString);

            //make sure we have valid status
            if($b1nTPortal_object_status) {
                $b1nTPortal_error_code = $b1nTPortal_object_status;
            } else {
                $b1nTPortal_error_code = "0";
            }

            //make sure we have valid error string
            if($b1nTPortal_object_error) {
                $b1nTPortal_error_string = $b1nTPortal_object_error;
            } else {
                $b1nTPortal_error_string = "No data.";
            }
        }

        //generate the error and return it.
        $b1nTPortal_error = "Error (".$b1nTPortal_error_code.") ".$b1nTPortal_error_string;
        return $b1nTPortal_error;
    }

    /**
     * Evaluate handshakes
     * 
     * @param string $b1nTPortal_username
     * @param string $b1nTPortal_password
     * @param string $b1nTPortal_session_key_customer
     * 
     * @return object $b1nTPortal_handshake
     * @return object $b1nTPortal_customer_handshake
     * @return string $b1nTPortal_error
     */
    function b1nTPortal_evaluate_handshakes($b1nTPortal_username, $b1nTPortal_password, $b1nTPortal_session_key_customer) {
        $b1nTPortal_username             = sanitize_text_field($b1nTPortal_username);
        $b1nTPortal_password             = sanitize_text_field($b1nTPortal_password);
        $b1nTPortal_session_key_customer = sanitize_text_field($b1nTPortal_session_key_customer);

        //api handshake to get key
        $b1nTPortal_handshake = $this->b1nTPortal_server_calls->b1nTPortal_handshake(); //b1nTPortal_handshake() sanitizes values
        if($b1nTPortal_handshake && $b1nTPortal_handshake->status == '200') {

            //customer handshake
            $b1nTPortal_session_key_api    = sanitize_text_field($b1nTPortal_handshake->key);
            $b1nTPortal_customer_handshake = $this->b1nTPortal_server_calls->b1nTPortal_customer_handshake($b1nTPortal_username, $b1nTPortal_password, $b1nTPortal_session_key_customer, $b1nTPortal_session_key_api); //b1nTPortal_customer_handshake() sanitizes values

            if($b1nTPortal_customer_handshake && $b1nTPortal_customer_handshake->status == '200') {
                return [$b1nTPortal_handshake, $b1nTPortal_customer_handshake, null];
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_customer_handshake);
            return [$b1nTPortal_handshake, $b1nTPortal_customer_handshake, $b1nTPortal_error];
        }

        $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_handshake);
        return [$b1nTPortal_handshake, null, $b1nTPortal_error];
    }

    /**
     * Evaluate for session expired
     * 
     * @param array $b0xPortal_handshake
     * @return string error/expired
     */
    function b1nTPortal_session_expired($b0xPortal_handshakes) {
        if(!is_array($b0xPortal_handshakes)) {
            return "error";
        }

        $b0xPortal_error = "error";
        foreach($b0xPortal_handshakes as $b0xPortal_handshake) {
            if($b0xPortal_handshake && sanitize_text_field($b0xPortal_handshake->status) == "507") {
                $b0xPortal_error = "expired";
                break; //end loop
            }
        }

        return $b0xPortal_error;
    }

    /**
     * Evaluate required fields 
     * 
     * @param array $b1nTPortal_required_fields
     * @return array $$b1nTPortal_required_fields_safe or null
     */
     function b1nTPortal_evaluate_required_fields($b1nTPortal_required_fields, $b1nTPortal_fields_map) {
        if(!$b1nTPortal_required_fields || !$b1nTPortal_fields_map) { return null; }
        if(!is_array($b1nTPortal_required_fields) || !is_array($b1nTPortal_fields_map)) { return null; }

        $b1nTPortal_required_fields        = $this->b1nTPortal_sanitize_array_values($b1nTPortal_required_fields);
        $b1nTPortal_fields_map             = $this->b1nTPortal_sanitize_array_values($b1nTPortal_fields_map);
        $b1nTPortal_required_fields_mapped = $this->b1nTPortal_get_required_fields($b1nTPortal_fields_map, $b1nTPortal_required_fields);

        //lets escape the values
        $b1nTPortal_required_fields_safe = array();
        foreach ($b1nTPortal_required_fields_mapped as $b1nTPortal_required_fields_value) {
            array_push($b1nTPortal_required_fields_safe, $b1nTPortal_required_fields_value);
        }

        return $b1nTPortal_required_fields_safe;
     }

    /**
     * Validate the credit card number
     * 
     * @param string $b1nTPortal_number
     * @return true or false
     */
    function b1nTPortal_credit_card_number_valid($b1nTPortal_number) {
        $b1nTPortal_number = sanitize_text_field($b1nTPortal_number);

        //Remove non-digits from the number
        $b1nTPortal_number = preg_replace('/[^0-9]/', '', $b1nTPortal_number);
 
        //Get the string length and parity
        $b1nTPortal_number_length = strlen($b1nTPortal_number);
        if($b1nTPortal_number_length == 0){
            return false;
        }

        $b1nTPortal_parity = $b1nTPortal_number_length % 2;
        
        //Split up the number into sin-
        //gle digits and get the total
        $b1nTPortal_total = 0;
        for ($i = 0; $i < $b1nTPortal_number_length; $i++) { 
            $b1nTPortal_digit = $b1nTPortal_number[$i];

            //Multiply alterna-
            //te digits by two
            if ($i % 2 == $b1nTPortal_parity) {
                $b1nTPortal_digit *= 2;

                //If the sum is two dig- 
                //its,  add them together
                if ($b1nTPortal_digit > 9) {
                    $b1nTPortal_digit -= 9;
                }       
            }       
            //Sum up the digits
            $b1nTPortal_total += $b1nTPortal_digit;
        }

        //If the total mod 10 equ-
        //als 0, the number is valid
        return ($b1nTPortal_total % 10 == 0) ? TRUE : FALSE;
    }

    /**
     * generate a json encoded array
     * 
     * @param string $b1nTPortal_status
     * @param string $b1nTPortal_message
     * @param string/array $b1nTPortal_data
     * @return json
     */
    function b1nTPortal_response($b1nTPortal_status, $b1nTPortal_message, $b1nTPortal_data) {
        $b1nTPortal_status  = sanitize_text_field($b1nTPortal_status);
        $b1nTPortal_message = sanitize_text_field($b1nTPortal_message);

        if(is_object($b1nTPortal_data)) {
            $b1nTPortal_data = "Invalid data format";
        }

        if(is_array($b1nTPortal_data)) {
            $b1nTPortal_data = $this->b1nTPortal_sanitize_array_values($b1nTPortal_data);
        } else {
            $b1nTPortal_data = sanitize_text_field($b1nTPortal_data);
        }

        $b1nTPortal_json = wp_json_encode(array(
            'status'  => $b1nTPortal_status,
            'message' => $b1nTPortal_message,
            'data'    => $b1nTPortal_data
        ));
        return $b1nTPortal_json;
    }
}