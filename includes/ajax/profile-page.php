<?php
/**
 * This class will manage the home page
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_ajax;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Ajax_Utility;

class B1nTPortal_Profile_Page extends B1nTPortal_Ajax_Utility {
    function b1nTPortal_profile_page() {
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
                $b1nTPortal_customer_name     = $b1nTPortal_customer_data->customerObj->Name;
                $b1nTPortal_customer_address  = $b1nTPortal_customer_data->customerObj->Address1;
                $b1nTPortal_customer_address2 = $b1nTPortal_customer_data->customerObj->Address2;
                $b1nTPortal_customer_city     = $b1nTPortal_customer_data->customerObj->City;
                $b1nTPortal_customer_state    = $b1nTPortal_customer_data->customerObj->State;

                //we need a list of states
                $b1nTPortal_country_id    = sanitize_text_field(get_option('b1nTPortal_admin_country'));
                $b1nTPortal_list_of_state = $this->b1nTPortal_server_calls->b1nTPortal_get_states($b1nTPortal_country_id); //b1nTPortal_get_states() sanitizes values

                if(!is_array($b1nTPortal_list_of_state)) {
                    wp_send_json($this->b1nTPortal_response('error', "Failed to get state list.", ''));
                }

                $b1nTPortal_customer_zip = $b1nTPortal_customer_data->customerObj->Zip;

                $b1nTPortal_customer_contact_list = array();
                if(is_array($b1nTPortal_customer_data->customerObj->ContactsObjList)) {
                    $b1nTPortal_customer_contact_list = $b1nTPortal_customer_data->customerObj->ContactsObjList;
                }

                $b1nTPortal_customer_email_confirm   = $b1nTPortal_customer_data->customerObj->EmailConfirm;
                $b1nTPortal_customer_email_reminders = $b1nTPortal_customer_data->customerObj->EmailReminders;
                $b1nTPortal_customer_email_thankyou  = $b1nTPortal_customer_data->customerObj->EmailThankYou;
                $b1nTPortal_customer_sms             = $b1nTPortal_customer_data->customerObj->SMSNotifications;

                $b1nTPortal_customer_required_fields_for_eval = array();
                if(is_array($b1nTPortal_customer_data->customerObj->requiredFields)) {
                    $b1nTPortal_customer_required_fields_for_eval = $b1nTPortal_customer_data->customerObj->requiredFields;   
                }

                $b1nTPortal_customer_required_fields = $this->b1nTPortal_evaluate_required_fields($b1nTPortal_customer_required_fields_for_eval, $this->b1nTPortal_customer_fields_map);
                
                if(!(is_array($b1nTPortal_customer_required_fields) && !empty($b1nTPortal_customer_required_fields))) {
                    wp_send_json($this->b1nTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
                }

                $b1nTPortal_customer_data_array = array(
                    "b1nTPortal_customer_name"            => $b1nTPortal_customer_name,
                    "b1nTPortal_customer_address"         => $b1nTPortal_customer_address,
                    "b1nTPortal_customer_address2"        => $b1nTPortal_customer_address2,
                    "b1nTPortal_customer_city"            => $b1nTPortal_customer_city,
                    "b1nTPortal_customer_state"           => $b1nTPortal_customer_state,
                    "b1nTPortal_customer_zip"             => $b1nTPortal_customer_zip,
                    "b1nTPortal_customer_contact_list"    => $b1nTPortal_customer_contact_list,
                    "b1nTPortal_customer_email_confirm"   => $b1nTPortal_customer_email_confirm,
                    "b1nTPortal_customer_email_thankyou"  => $b1nTPortal_customer_email_thankyou,
                    "b1nTPortal_customer_email_reminders" => $b1nTPortal_customer_email_reminders,
                    "b1nTPortal_customer_sms"             => $b1nTPortal_customer_sms,
                    "b1nTPortal_required_fields"          => $b1nTPortal_customer_required_fields,
                    "b1nTPortal_list_of_state"            => $b1nTPortal_list_of_state
                );

                //attach credit card mask if any on file
                if(is_array($b1nTPortal_customer_data->customerObj->CCardObjList)) {
                    $b1nTPortal_customer_ccard_mask =  $b1nTPortal_customer_data->customerObj->CCardObjList;
                    $b1nTPortal_customer_data_array["b1nTPortal_customer_ccard_mask"] = $b1nTPortal_customer_ccard_mask;
                }

                wp_send_json($this->b1nTPortal_response('success', "Succesful profile page load.", $b1nTPortal_customer_data_array));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_customer_data);
            wp_send_json($this->b1nTPortal_response('error', "Failed profile page load, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response('error', "Failed profile page load, ".$b1nTPortal_error, ''));        
    }

    //save customer
    function b1nTPortal_save_customer() {
        //security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);

        if($b1nTPortal_username == "" || $b1nTPortal_session_key_customer == "") {
            wp_send_json($this->b1nTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        $b1nTPortal_customer_name            = sanitize_text_field($_POST["b1nTPortal_customer_name"]);
        $b1nTPortal_customer_address         = sanitize_text_field($_POST["b1nTPortal_customer_address"]);
        $b1nTPortal_customer_address2        = sanitize_text_field($_POST["b1nTPortal_customer_address2"]);
        $b1nTPortal_customer_city            = sanitize_text_field($_POST["b1nTPortal_customer_city"]);
        $b1nTPortal_customer_state           = sanitize_text_field($_POST["b1nTPortal_customer_state"]);
        $b1nTPortal_customer_zip             = sanitize_text_field($_POST["b1nTPortal_customer_zip"]);

        $b1nTPortal_customer_contact_id      = sanitize_text_field($_POST["b1nTPortal_customer_contact_id"]);
        $b1nTPortal_customer_contact_name    = sanitize_text_field($_POST["b1nTPortal_customer_contact_name"]);
        $b1nTPortal_customer_contact_phone   = sanitize_text_field($_POST["b1nTPortal_customer_contact_phone"]);
        $b1nTPortal_customer_contact_cell    = sanitize_text_field($_POST["b1nTPortal_customer_contact_cell"]);
        $b1nTPortal_customer_contact_fax     = sanitize_text_field($_POST["b1nTPortal_customer_contact_fax"]);
        $b1nTPortal_customer_contact_email   = sanitize_text_field($_POST["b1nTPortal_customer_contact_email"]);
        $b1nTPortal_customer_contact_primary = sanitize_text_field($_POST["b1nTPortal_customer_contact_primary"]);

        $b1nTPortal_customer_email_confirm   = sanitize_text_field($_POST["b1nTPortal_customer_email_confirm"]);
        $b1nTPortal_customer_email_thankyou  = sanitize_text_field($_POST["b1nTPortal_customer_email_thankyou"]);
        $b1nTPortal_customer_email_reminders = sanitize_text_field($_POST["b1nTPortal_customer_email_reminders"]);
        $b1nTPortal_customer_sms             = sanitize_text_field($_POST["b1nTPortal_customer_sms"]);

        //expecting an array from the gui, sanitizing it below.
        $b1nTPortal_profile_required_fields = array();
        if(is_array($_POST["b1nTPortal_required_fields"])) {
            $b1nTPortal_profile_required_fields = $this->b1nTPortal_sanitize_array_values($_POST["b1nTPortal_required_fields"]);
        }

        if(!(is_array($b1nTPortal_profile_required_fields) && !empty($b1nTPortal_profile_required_fields))) {
            wp_send_json($this->b1nTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
        }

        //validate some fields
        $b1nTPortal_field_errors = array();

        foreach($b1nTPortal_profile_required_fields as $b1nTPortal_profile_required_fields_value) {
            //customer name
            if($b1nTPortal_profile_required_fields_value == "b1nTPortal_customer_name") {
                if($b1nTPortal_customer_name == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_profile_required_fields_value); 
                }
            }

            //customer address
            if($b1nTPortal_profile_required_fields_value == "b1nTPortal_customer_address") {
                if($b1nTPortal_customer_address == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_profile_required_fields_value); 
                }
            }

            //customer address2
            if($b1nTPortal_profile_required_fields_value == "b1nTPortal_customer_address2") {
                if($b1nTPortal_customer_address2 == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_profile_required_fields_value); 
                }
            }

            //customer city
            if($b1nTPortal_profile_required_fields_value == "b1nTPortal_customer_city") {
                if($b1nTPortal_customer_city == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_profile_required_fields_value); 
                }
            }

            //customer state, expecting a certain format
            if($b1nTPortal_profile_required_fields_value == "b1nTPortal_customer_state") {
                if(!preg_match("/^[A-Z]{2}$/", $b1nTPortal_customer_state)) {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_profile_required_fields_value); 
                }
            }

            //customer zip
            if($b1nTPortal_profile_required_fields_value == "b1nTPortal_customer_zip") {
                if($b1nTPortal_customer_zip == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_profile_required_fields_value); 
                }
            }

            if($b1nTPortal_profile_required_fields_value == "b1nTPortal_customer_contact_name") {
                if($b1nTPortal_customer_contact_name == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_profile_required_fields_value); 
                }
            }

            //customer phone, expexting a certain format
            if($b1nTPortal_profile_required_fields_value == "b1nTPortal_customer_contact_phone") {
                if(!preg_match("/^([0-9]{3})([-|\s])?([0-9]{3})([-|\s])?([0-9]{4})$/", $b1nTPortal_customer_contact_phone)) {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_profile_required_fields_value); 
                }
            }

            //customer cell, expexting a certain format
            if($b1nTPortal_profile_required_fields_value == "b1nTPortal_customer_contact_cell") {
                if(!preg_match("/^([0-9]{3})([-|\s])?([0-9]{3})([-|\s])?([0-9]{4})$/", $b1nTPortal_customer_contact_cell)) {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_profile_required_fields_value); 
                }
            }

            //customer fax, expexting a certain format
            if($b1nTPortal_profile_required_fields_value == "b1nTPortal_customer_contact_fax") {
                if(!preg_match("/^([0-9]{3})([-|\s])?([0-9]{3})([-|\s])?([0-9]{4})$/", $b1nTPortal_customer_contact_fax)) {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_profile_required_fields_value); 
                }
            }

            //customer email
            if($b1nTPortal_profile_required_fields_value == "b1nTPortal_customer_contact_email") {
                if($b1nTPortal_customer_contact_email == "" || !filter_var($b1nTPortal_customer_contact_email, FILTER_VALIDATE_EMAIL)) {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_profile_required_fields_value); 
                }
            }
        }

        //confirmations
        if(!($b1nTPortal_customer_email_confirm == 1 || $b1nTPortal_customer_email_confirm == 0)) {
            array_push($b1nTPortal_field_errors, "b1nTPortal_customer_email_confirm");  
        }

        //thank yous
        if(!($b1nTPortal_customer_email_thankyou == 1 || $b1nTPortal_customer_email_thankyou == 0)) {
            array_push($b1nTPortal_field_errors, "b1nTPortal_customer_email_thankyou");  
        }

        //reminders
        if(!($b1nTPortal_customer_email_reminders == 1 || $b1nTPortal_customer_email_reminders == 0)) {
            array_push($b1nTPortal_field_errors, "b1nTPortal_customer_email_reminders");  
        }

        //sms
        if(!($b1nTPortal_customer_sms == 1 || $b1nTPortal_customer_sms == 0)) {
            array_push($b1nTPortal_field_errors, "b1nTPortal_customer_sms");  
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

            $b1nTPortal_customer_args = array(
                "command"                  => "cmdBinTPortalSaveCustomerProfile",
                "customer_name"            => $b1nTPortal_customer_name,
                "customer_address"         => $b1nTPortal_customer_address,
                "customer_address2"        => $b1nTPortal_customer_address2,
                "customer_city"            => $b1nTPortal_customer_city,
                "customer_state"           => $b1nTPortal_customer_state,
                "customer_zip"             => $b1nTPortal_customer_zip,
                "customer_contact_id"      => $b1nTPortal_customer_contact_id,
                "customer_contact_name"    => $b1nTPortal_customer_contact_name,
                "customer_contact_phone"   => $b1nTPortal_customer_contact_phone,
                "customer_contact_cell"    => $b1nTPortal_customer_contact_cell,
                "customer_contact_fax"     => $b1nTPortal_customer_contact_fax,
                "customer_contact_email"   => $b1nTPortal_customer_contact_email,
                "customer_contact_primary" => $b1nTPortal_customer_contact_primary,
                "customer_email_confirm"   => $b1nTPortal_customer_email_confirm,
                "customer_email_thankyou"  => $b1nTPortal_customer_email_thankyou,
                "customer_email_reminders" => $b1nTPortal_customer_email_reminders,
                "customer_sms"             => $b1nTPortal_customer_sms,
                "session_key_api"          => $b1nTPortal_session_key_api,
                "username_customer"        => $b1nTPortal_username,
                "session_key_customer"     => $b1nTPortal_session_key_customer,
                "customer_id"              => $b1nTPortal_customer_id
            );

            //save customer profile
            $b1nTPortal_customer_save = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_customer_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_customer_save && $b1nTPortal_customer_save->status == '200') {
                wp_send_json($this->b1nTPortal_response('success', "Successfull profile save", ''));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_customer_save);
            wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_customer_save)), "Failed to save profile, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_handshake, $b1nTPortal_customer_handshake)), "Failed to save profile, ".$b1nTPortal_error, ''));
    }
}