<?php
/**
 * This class will manage the jobsite page
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_ajax;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Ajax_Utility;

class B1nTPortal_Jobsite_Page extends B1nTPortal_Ajax_Utility {
    function b1nTPortal_jobsite_page() {
        $this->b1nTPortal_get_job_site_data(0, "", "Address|ASC");
    }

    function b1nTPortal_load_jobsite_list() {
        $b1nTPortal_offset = sanitize_text_field($_POST["b1nTPortal_offset"]);
        $b1nTPortal_search = sanitize_text_field($_POST["b1nTPortal_search"]);
        $b1nTPortal_sortBy = sanitize_text_field($_POST["b1nTPortal_sort"]);

        $this->b1nTPortal_get_job_site_data($b1nTPortal_offset, $b1nTPortal_search, $b1nTPortal_sortBy);
    }

    function b1nTPortal_get_job_site_data($b1nTPortal_offset, $b1nTPortal_search, $b1nTPortal_sortBy) {
        $b1nTPortal_offset = sanitize_text_field($b1nTPortal_offset);
        $b1nTPortal_search = sanitize_text_field($b1nTPortal_search);
        $b1nTPortal_sortBy = sanitize_text_field($b1nTPortal_sortBy);

        ///security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);

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
                "command"              => "cmdBinTPortalJobsiteList",
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer,
                "customer_id"          => $b1nTPortal_customer_id,
                "offset"               => $b1nTPortal_offset,
                "search"               => $b1nTPortal_search,
                "orderBy"              => $b1nTPortal_sortBy
            );

            //job site data
            $b1nTPortal_jobsite_data = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_args); //b1nTPortal_call_command() sanitizes values
            
            if($b1nTPortal_jobsite_data && $b1nTPortal_jobsite_data->status == '200') {
                $b1nTPortal_jobsite_object_list              = $b1nTPortal_jobsite_data->jobSiteObjList;
                $b1nTPortal_jobsite_object_list_record_count = $b1nTPortal_jobsite_data->recordCount;
                $b1nTPortal_jobsite_object_list_offset       = $b1nTPortal_jobsite_data->offset;

                //looking for a valid record count and a valid offset.
                if(is_numeric($b1nTPortal_jobsite_object_list_record_count) && is_numeric($b1nTPortal_jobsite_object_list_offset)) {} else {
                    wp_send_json($this->b1nTPortal_response('error', "Error User: Invalid record count and/or offset.", ''));
                }

                $b1nTPortal_data = array(
                    'b1nTPortal_jobsite_object_list'              => $b1nTPortal_jobsite_object_list,
                    'b1nTPortal_jobsite_object_list_record_count' => $b1nTPortal_jobsite_object_list_record_count,
                    'b1nTPortal_jobsite_object_list_offset'       => $b1nTPortal_jobsite_object_list_offset
                );

                wp_send_json($this->b1nTPortal_response('success', "Succesful job site load.", $b1nTPortal_data));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_jobsite_data);
            wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_jobsite_data)), "Failed jobsite load, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_handshake, $b1nTPortal_customer_handshake)), "Failed job site load, ".$b1nTPortal_error, ''));
    }

    function b1nTPortal_load_add_edit_jobsite() {
        ///security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);

        if($b1nTPortal_username == "" || $b1nTPortal_session_key_customer == "") {
            wp_send_json($this->b1nTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        $b1nTPortal_jobsite_id = sanitize_text_field($_POST["b1nTPortal_jobsite_id"]);

        //we need a valid offset 0+
        if(is_numeric($b1nTPortal_jobsite_id)) {} else {
             wp_send_json($this->b1nTPortal_response('error', "Error System: Something went wrong, missing id!!", ''));
        }

        [$b1nTPortal_handshake, $b1nTPortal_customer_handshake, $b1nTPortal_error] = $this->b1nTPortal_evaluate_handshakes($b1nTPortal_username, "", $b1nTPortal_session_key_customer); //b1nTPortal_evaluate_handshakes() sanitizes values

        if($b1nTPortal_handshake && $b1nTPortal_customer_handshake && !$b1nTPortal_error) {
            $b1nTPortal_session_key_api = $b1nTPortal_handshake->key;
            $b1nTPortal_customer_id     = $b1nTPortal_customer_handshake->customerID;

            $b1nTPortal_args = array(
                "command"              => "cmdBinTPortalJobsiteData",
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer,
                "jobsite_id"           => $b1nTPortal_jobsite_id,
                "customer_id"          => $b1nTPortal_customer_id
            );

            //job site data
            $b1nTPortal_jobsite_data = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_jobsite_data && $b1nTPortal_jobsite_data->status == '200') {
                $b1nTPortal_jobsite_id      = $b1nTPortal_jobsite_data->jobSiteObj->ID;
                $b1nTPortal_jobsite_address = $b1nTPortal_jobsite_data->jobSiteObj->Address;
                $b1nTPortal_jobsite_city    = $b1nTPortal_jobsite_data->jobSiteObj->City;
                $b1nTPortal_jobsite_state   = $b1nTPortal_jobsite_data->jobSiteObj->State;

                $b1nTPortal_country_id    = sanitize_text_field(get_option('b1nTPortal_admin_country'));
                $b1nTPortal_list_of_state = $this->b1nTPortal_server_calls->b1nTPortal_get_states($b1nTPortal_country_id); //b1nTPortal_get_states() sanitizes values

                if(!is_array($b1nTPortal_list_of_state)) {
                    wp_send_json($this->b1nTPortal_response('error', "Failed to get state list.", ''));
                }

                $b1nTPortal_jobsite_name         = $b1nTPortal_jobsite_data->jobSiteObj->JobName;
                $b1nTPortal_jobsite_zip          = $b1nTPortal_jobsite_data->jobSiteObj->Zip;
                $b1nTPortal_jobsite_county       = $b1nTPortal_jobsite_data->jobSiteObj->County;
                $b1nTPortal_jobsite_muni         = $b1nTPortal_jobsite_data->jobSiteObj->Muni;
                $b1nTPortal_jobsite_cross_street = $b1nTPortal_jobsite_data->jobSiteObj->CrossStreet;
                $b1nTPortal_jobsite_contact_id   = $b1nTPortal_jobsite_data->jobSiteObj->ContactID;

                $b1nTPortal_jobsite_contact_list = array();
                if(is_array($b1nTPortal_jobsite_data->jobSiteObj->ContactsObjList)) {
                    $b1nTPortal_jobsite_contact_list = $b1nTPortal_jobsite_data->jobSiteObj->ContactsObjList;
                }

                $b1nTPortal_jobsite_hazzards     = $b1nTPortal_jobsite_data->jobSiteObj->Hazzards;
                $b1nTPortal_jobsite_billing_note = $b1nTPortal_jobsite_data->jobSiteObj->BillingNote;
                $b1nTPortal_validated            = $b1nTPortal_jobsite_data->jobSiteObj->Validated;
                $b1nTPortal_jobsite_validated    = is_numeric($b1nTPortal_validated) ? $b1nTPortal_validated : "0";

                $b1nTPortal_jobsite_required_fields_for_eval = array();
                if(is_array($b1nTPortal_jobsite_data->jobSiteObj->requiredFields)) {
                    $b1nTPortal_jobsite_required_fields_for_eval = $b1nTPortal_jobsite_data->jobSiteObj->requiredFields;
                }

                $b1nTPortal_jobsite_required_fields = $this->b1nTPortal_evaluate_required_fields($b1nTPortal_jobsite_required_fields_for_eval, $this->b1nTPortal_jobsite_fields_map); //b1nTPortal_evaluate_required_fields() sanitizes values

                if(!(is_array($b1nTPortal_jobsite_required_fields) && !empty($b1nTPortal_jobsite_required_fields))) {
                    wp_send_json($this->b1nTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
                }

                $b1nTPortal_jobsite_data_array = array(
                    "b1nTPortal_jobsite_id"            => $b1nTPortal_jobsite_id,
                    "b1nTPortal_jobsite_name"          => $b1nTPortal_jobsite_name,
                    "b1nTPortal_jobsite_address"       => $b1nTPortal_jobsite_address,
                    "b1nTPortal_jobsite_city"          => $b1nTPortal_jobsite_city,
                    "b1nTPortal_jobsite_state"         => $b1nTPortal_jobsite_state,
                    "b1nTPortal_list_of_state"         => $b1nTPortal_list_of_state,
                    "b1nTPortal_jobsite_zip"           => $b1nTPortal_jobsite_zip,
                    "b1nTPortal_jobsite_county"        => $b1nTPortal_jobsite_county,
                    "b1nTPortal_jobsite_muni"          => $b1nTPortal_jobsite_muni,
                    "b1nTPortal_jobsite_cross_street"  => $b1nTPortal_jobsite_cross_street,
                    "b1nTPortal_jobsite_contact_id"    => $b1nTPortal_jobsite_contact_id,
                    "b1nTPortal_jobsite_contact_list"  => $b1nTPortal_jobsite_contact_list,
                    "b1nTPortal_jobsite_hazzards"      => $b1nTPortal_jobsite_hazzards,
                    "b1nTPortal_jobsite_billing_note"  => $b1nTPortal_jobsite_billing_note,
                    "b1nTPortal_jobsite_validated"     => $b1nTPortal_jobsite_validated,
                    "b1nTPortal_required_fields"       => $b1nTPortal_jobsite_required_fields
                );

                wp_send_json($this->b1nTPortal_response('success', "Succesful job site load.", $b1nTPortal_jobsite_data_array));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_jobsite_data);
            wp_send_json($this->b1nTPortal_response('error', "Failed jobsite load, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response('error', "Failed job site load, ".$b1nTPortal_error, ''));
    }

    function b1nTPortal_save_jobsite() {
        ///security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);

        if($b1nTPortal_username == "" || $b1nTPortal_session_key_customer == "") {
            wp_send_json($this->b1nTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        $b1nTPortal_jobsite_id           = sanitize_text_field($_POST["b1nTPortal_jobsite_id"]);
        $b1nTPortal_jobsite_name         = sanitize_text_field($_POST["b1nTPortal_jobsite_name"]);
        $b1nTPortal_jobsite_address      = sanitize_text_field($_POST["b1nTPortal_jobsite_address"]);
        $b1nTPortal_jobsite_city         = sanitize_text_field($_POST["b1nTPortal_jobsite_city"]);
        $b1nTPortal_jobsite_state        = sanitize_text_field($_POST["b1nTPortal_jobsite_state"]);
        $b1nTPortal_jobsite_zip          = sanitize_text_field($_POST["b1nTPortal_jobsite_zip"]);
        $b1nTPortal_jobsite_county       = sanitize_text_field($_POST["b1nTPortal_jobsite_county"]);
        $b1nTPortal_jobsite_muni         = sanitize_text_field($_POST["b1nTPortal_jobsite_muni"]);
        $b1nTPortal_jobsite_cross_street = sanitize_text_field($_POST["b1nTPortal_jobsite_cross_street"]);
        $b1nTPortal_jobsite_contact_id   = sanitize_text_field($_POST["b1nTPortal_jobsite_contact_id"]);
        $b1nTPortal_jobsite_hazzards     = sanitize_text_field($_POST["b1nTPortal_jobsite_hazzards"]);
        $b1nTPortal_jobsite_billing_note = sanitize_text_field($_POST["b1nTPortal_jobsite_billing_note"]);
        $b1nTPortal_jobsite_validated    = sanitize_text_field($_POST["b1nTPortal_jobsite_validated"]);

        //expecting an array from the gui, sanitizing it below.
        $b1nTPortal_jobsite_required_fields = array();
        if(is_array($_POST["b1nTPortal_required_fields"])) {
            $b1nTPortal_jobsite_required_fields = $this->b1nTPortal_sanitize_array_values($_POST["b1nTPortal_required_fields"]);
        }

        if(!(is_array($b1nTPortal_jobsite_required_fields) && !empty($b1nTPortal_jobsite_required_fields))) {
            wp_send_json($this->b1nTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
        }

        //validate some fields
        $b1nTPortal_field_errors = array();

        foreach($b1nTPortal_jobsite_required_fields as $b1nTPortal_jobsite_required_fields_value) {
            //job site state
            if($b1nTPortal_jobsite_required_fields_value == "b1nTPortal_jobsite_state") {
                if(!preg_match("/^[A-Z]{2}$/", $b1nTPortal_jobsite_state)) {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_jobsite_required_fields_value); 
                }
            }

            //job site address
            if($b1nTPortal_jobsite_required_fields_value == "b1nTPortal_jobsite_address") {
                if($b1nTPortal_jobsite_address == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_jobsite_required_fields_value); 
                }
            }

            //job site city
            if($b1nTPortal_jobsite_required_fields_value == "b1nTPortal_jobsite_city") {
                if($b1nTPortal_jobsite_city == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_jobsite_required_fields_value); 
                }
            }

            //job site contact
            if($b1nTPortal_jobsite_required_fields_value == "b1nTPortal_jobsite_contacts") {
                if(is_numeric($b1nTPortal_jobsite_contact_id)) {
                    if($b1nTPortal_jobsite_contact_id <= 0) {
                        array_push($b1nTPortal_field_errors, $b1nTPortal_jobsite_required_fields_value);
                    } 
                } else {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_jobsite_required_fields_value);
                }
            }

            //job site county
            if($b1nTPortal_jobsite_required_fields_value == "b1nTPortal_jobsite_county") {
                if($b1nTPortal_jobsite_county == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_jobsite_required_fields_value); 
                }
            }   

            //job site cross street
            if($b1nTPortal_jobsite_required_fields_value == "b1nTPortal_jobsite_cross_street") {
                if($b1nTPortal_jobsite_cross_street == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_jobsite_required_fields_value); 
                }
            }

            //job site muni
            if($b1nTPortal_jobsite_required_fields_value == "b1nTPortal_jobsite_muni") {
                if($b1nTPortal_jobsite_muni == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_jobsite_required_fields_value); 
                }
            }        

            //job site zip
            if($b1nTPortal_jobsite_required_fields_value == "b1nTPortal_jobsite_zip") {
                if($b1nTPortal_jobsite_zip == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_jobsite_required_fields_value); 
                }
            }   
        }

        //validated
        if(!is_numeric($b1nTPortal_jobsite_validated)) {
            wp_send_json($this->b1nTPortal_response('error', "Invalid google validation bit.", ""));
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

            //save job site
            $b1nTPortal_jobsite_args = array(
                "command"              => "cmdBinTPortalSaveJobSite",
                "jobsite_id"           => $b1nTPortal_jobsite_id,
                "jobsite_name"         => $b1nTPortal_jobsite_name,
                "jobsite_address"      => $b1nTPortal_jobsite_address,
                "jobsite_city"         => $b1nTPortal_jobsite_city,
                "jobsite_state"        => $b1nTPortal_jobsite_state,
                "jobsite_zip"          => $b1nTPortal_jobsite_zip,
                "jobsite_county"       => $b1nTPortal_jobsite_county,
                "jobsite_muni"         => $b1nTPortal_jobsite_muni,
                "jobsite_cross_street" => $b1nTPortal_jobsite_cross_street,
                "jobsite_contact_id"   => $b1nTPortal_jobsite_contact_id,
                "jobsite_hazzards"     => $b1nTPortal_jobsite_hazzards,
                "jobsite_billing_note" => $b1nTPortal_jobsite_billing_note,
                "jobsite_validated"    => $b1nTPortal_jobsite_validated,
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer,
                "customer_id"          => $b1nTPortal_customer_id
            );

            //save customer profile
            $b1nTPortal_jobsite_save = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_jobsite_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_jobsite_save && $b1nTPortal_jobsite_save->status == '200') {
                wp_send_json($this->b1nTPortal_response('success', "Successfull job site save", ''));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_jobsite_save);
            wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_jobsite_save)), "Failed to save job site, ".$b1nTPortal_error, ''));            
        }

        wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_handshake, $b1nTPortal_customer_handshake)), "Failed to save job site, ".$b1nTPortal_error, ''));
    }
}