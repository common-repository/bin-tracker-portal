<?php
/**
 * This class will manage the work order page
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_ajax;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Ajax_Utility;

class B1nTPortal_Workorder_Page extends B1nTPortal_Ajax_Utility {
    function b1nTPortal_workorder_page() {
        $this->b1nTPortal_get_workorder_data(0);
    }

    function b1nTPortal_workorder_list() {
        $b1nTPortal_offset = sanitize_text_field($_POST["b1nTPortal_offset"]);
        $this->b1nTPortal_get_workorder_data($b1nTPortal_offset);
    }

    function b1nTPortal_get_workorder_data($b1nTPortal_offset) {
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
                "command"              => "cmdBinTPortalWorkOrderList",
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer,
                "customer_id"          => $b1nTPortal_customer_id,
                "offset"               => $b1nTPortal_offset,
                "search"               => $b1nTPortal_search_field
            );

            //work order data
            $b1nTPortal_workorder_data = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_workorder_data && $b1nTPortal_workorder_data->status == '200') {
                $b1nTPortal_workorder_object_list              = $b1nTPortal_workorder_data->workOrderObjList;
                $b1nTPortal_workorder_object_list_record_count = $b1nTPortal_workorder_data->recordCount;
                $b1nTPortal_workorder_object_list_offset       = $b1nTPortal_workorder_data->offset;

                //looking for a valid record count and a valid offset.
                if(is_numeric($b1nTPortal_workorder_object_list_record_count) && is_numeric($b1nTPortal_workorder_object_list_offset)) {} else {
                    wp_send_json($this->b1nTPortal_response('error', "Error User: Invalid record count and/or offset.", ''));
                }

                $b1nTPortal_data = array(
                    'b1nTPortal_workorder_object_list'              => $b1nTPortal_workorder_object_list,
                    'b1nTPortal_workorder_object_list_record_count' => $b1nTPortal_workorder_object_list_record_count,
                    'b1nTPortal_workorder_object_list_offset'       => $b1nTPortal_workorder_object_list_offset
                );

                wp_send_json($this->b1nTPortal_response('success', "Succesful work order load.", $b1nTPortal_data));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_workorder_data);
            wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_workorder_data)), "Failed work order load, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_handshake, $b1nTPortal_customer_handshake)), "Failed work order load, ".$b1nTPortal_error, ''));
    }

    function b1nTPortal_add_edit_workorder() {
        ///security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);

        if($b1nTPortal_username == "" || $b1nTPortal_session_key_customer == "") {
            wp_send_json($this->b1nTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        $b1nTPortal_workorder_id = sanitize_text_field($_POST["b1nTPortal_workorder_id"]);
        $b1nTPortal_jobsite_id   = sanitize_text_field($_POST["b1nTPortal_jobsite_id"]);

        //we need a numeric ids and with valid logic
        if(is_numeric($b1nTPortal_workorder_id) && is_numeric($b1nTPortal_jobsite_id)) {} else {
             wp_send_json($this->b1nTPortal_response('error', "Error System: Something went wrong, missing id!!", ''));
        }

        [$b1nTPortal_handshake, $b1nTPortal_customer_handshake, $b1nTPortal_error] = $this->b1nTPortal_evaluate_handshakes($b1nTPortal_username, "", $b1nTPortal_session_key_customer); //b1nTPortal_evaluate_handshakes() sanitizes values

        if($b1nTPortal_handshake && $b1nTPortal_customer_handshake && !$b1nTPortal_error) {
            $b1nTPortal_session_key_api = $b1nTPortal_handshake->key;
            $b1nTPortal_customer_id     = $b1nTPortal_customer_handshake->customerID;

            $b1nTPortal_args = array(
                "command"              => "cmdBinTPortalWorkOrderData",
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer,
                "workorder_id"         => $b1nTPortal_workorder_id,
                "jobsite_id"           => $b1nTPortal_jobsite_id
            );

            //work order data
            $b1nTPortal_workorder_data = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_workorder_data && $b1nTPortal_workorder_data->status == '200') {
                $b1nTPortal_workorder_jsid            = $b1nTPortal_workorder_data->workOrderObj->jobSiteObj->ID;
                $b1nTPortal_workorder_jsname          = $b1nTPortal_workorder_data->workOrderObj->jobSiteObj->JobName;
                $b1nTPortal_workorder_jsaddress       = $b1nTPortal_workorder_data->workOrderObj->jobSiteObj->Address;               
                $b1nTPortal_workorder_jscity          = $b1nTPortal_workorder_data->workOrderObj->jobSiteObj->City;
                $b1nTPortal_workorder_jsstate         = $b1nTPortal_workorder_data->workOrderObj->jobSiteObj->State;
                $b1nTPortal_workorder_jszip           = $b1nTPortal_workorder_data->workOrderObj->jobSiteObj->Zip;
                $b1nTPortal_workorder_jsonsite        = $b1nTPortal_workorder_data->workOrderObj->jobSiteObj->ContainersOnSite;

                $b1nTPortal_workorder_targetcont      = $b1nTPortal_workorder_data->workOrderObj->TargetCont;
                $b1nTPortal_workorder_wotype          = $b1nTPortal_workorder_data->workOrderObj->OrderType;
                $b1nTPortal_workorder_wotypes         = $b1nTPortal_workorder_data->workOrderObj->woTypes;

                $b1nTPortal_workorder_contqty         = $b1nTPortal_workorder_data->workOrderObj->ContQty;
                $b1nTPortal_workorder_contsize        = $b1nTPortal_workorder_data->workOrderObj->ContSize;
                $b1nTPortal_workorder_conttype        = $b1nTPortal_workorder_data->workOrderObj->ContType;
                $b1nTPortal_workorder_contsize2       = $b1nTPortal_workorder_data->workOrderObj->ContSize2;
                $b1nTPortal_workorder_conttype2       = $b1nTPortal_workorder_data->workOrderObj->ContType2;
                $b1nTPortal_workorder_remarks         = $b1nTPortal_workorder_data->workOrderObj->Remarks;
                $b1nTPortal_workorder_material        = $b1nTPortal_workorder_data->workOrderObj->Material;
                $b1nTPortal_workorder_assets          = $b1nTPortal_workorder_data->workOrderObj->assets;
                $b1nTPortal_workorder_materials       = $b1nTPortal_workorder_data->workOrderObj->materials;

                $b1nTPortal_workorder_wodate          = $b1nTPortal_workorder_data->workOrderObj->OrderDateStr;
                $b1nTPortal_workorder_early_book_date = $b1nTPortal_workorder_data->workOrderObj->earlyBookDate;
                $b1nTPortal_workorder_late_book_date  = $b1nTPortal_workorder_data->workOrderObj->availability->MaxDate;        

                $b1nTPortal_country_id                = sanitize_text_field(get_option('b1nTPortal_admin_country'));
                $b1nTPortal_list_of_state             = $this->b1nTPortal_server_calls->b1nTPortal_get_states($b1nTPortal_country_id); //b1nTPortal_get_states() sanitizes values

                if(!is_array($b1nTPortal_list_of_state)) {
                    wp_send_json($this->b1nTPortal_response('error', "Failed to get state list.", ''));
                }

                //required fields merge
                $b1nTPortal_required_fields_for_eval = array();
                if(is_array($b1nTPortal_workorder_data->workOrderObj->requiredFields)) {
                    $b1nTPortal_required_fields_for_eval = $b1nTPortal_workorder_data->workOrderObj->requiredFields;
                }

                $b1nTPortal_required_fields = $this->b1nTPortal_evaluate_required_fields($b1nTPortal_required_fields_for_eval, $this->b1nTPortal_workorder_fields_map);

                if(!$b1nTPortal_required_fields) {
                    wp_send_json($this->b1nTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
                }

                //availability headers and rows
                $b1nTPortal_availability_buffer  = $b1nTPortal_workorder_data->workOrderObj->assetBuffer;
                $b1nTPortal_availability_headers = $b1nTPortal_workorder_data->workOrderObj->availability->ColHeaders;
                $b1nTPortal_availability_rows    = $b1nTPortal_workorder_data->workOrderObj->availability->RowContent;

                $b1nTPortal_availability_array = array(
                    "b1nTPortal_availability_headers" => $b1nTPortal_availability_headers,
                    "b1nTPortal_availability_rows"    => $b1nTPortal_availability_rows
                );

                $b1nTPortal_data  = array(
                    "b1nTPortal_workorder_id"              => $b1nTPortal_workorder_id,
                    "b1nTPortal_workorder_jsid"            => $b1nTPortal_workorder_jsid,
                    "b1nTPortal_workorder_jsname"          => $b1nTPortal_workorder_jsname,
                    "b1nTPortal_workorder_jsaddress"       => $b1nTPortal_workorder_jsaddress,
                    "b1nTPortal_workorder_jscity"          => $b1nTPortal_workorder_jscity,
                    "b1nTPortal_workorder_jsstate"         => $b1nTPortal_workorder_jsstate,
                    "b1nTPortal_list_of_state"             => $b1nTPortal_list_of_state,
                    "b1nTPortal_workorder_jszip"           => $b1nTPortal_workorder_jszip,
                    "b1nTPortal_workorder_jsonsite"        => $b1nTPortal_workorder_jsonsite,
                    "b1nTPortal_workorder_targetcont"      => $b1nTPortal_workorder_targetcont,
                    "b1nTPortal_workorder_wotype"          => $b1nTPortal_workorder_wotype,
                    "b1nTPortal_workorder_wotypes"         => $b1nTPortal_workorder_wotypes,
                    "b1nTPortal_workorder_contqty"         => $b1nTPortal_workorder_contqty,
                    "b1nTPortal_workorder_contsize"        => $b1nTPortal_workorder_contsize,
                    "b1nTPortal_workorder_conttype"        => $b1nTPortal_workorder_conttype,
                    "b1nTPortal_workorder_contsize2"       => $b1nTPortal_workorder_contsize2,
                    "b1nTPortal_workorder_conttype2"       => $b1nTPortal_workorder_conttype2,
                    "b1nTPortal_workorder_remarks"         => $b1nTPortal_workorder_remarks,
                    "b1nTPortal_workorder_material"        => $b1nTPortal_workorder_material,
                    "b1nTPortal_workorder_wodate"          => $b1nTPortal_workorder_wodate,
                    "b1nTPortal_workorder_assets"          => $b1nTPortal_workorder_assets,
                    "b1nTPortal_workorder_materials"       => $b1nTPortal_workorder_materials,
                    "b1nTPortal_availability_buffer"       => $b1nTPortal_availability_buffer,
                    "b1nTPortal_availability"              => $b1nTPortal_availability_array,
                    "b1nTPortal_workorder_early_book_date" => $b1nTPortal_workorder_early_book_date,
                    "b1nTPortal_workorder_late_book_date"  => $b1nTPortal_workorder_late_book_date,
                    "b1nTPortal_required_fields"           => $b1nTPortal_required_fields
                );

                wp_send_json($this->b1nTPortal_response('success', "Succesful work order load.", $b1nTPortal_data));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_workorder_data);
            wp_send_json($this->b1nTPortal_response('error', "Failed work order load, ".$b1nTPortal_error, ''));         
        }

        wp_send_json($this->b1nTPortal_response('error', "Failed work order load, ".$b1nTPortal_error, ''));
    }

    function b1nTPortal_save_workorder() {
        //security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);

        if($b1nTPortal_username == "" || $b1nTPortal_session_key_customer == "") {
            wp_send_json($this->b1nTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        $b1nTPortal_workorder_id          = sanitize_text_field($_POST["b1nTPortal_workorder_id"]);
        $b1nTPortal_workorder_jsid        = sanitize_text_field($_POST["b1nTPortal_workorder_jsid"]);
        $b1nTPortal_workorder_asset       = sanitize_text_field($_POST["b1nTPortal_workorder_asset"]);
        $b1nTPortal_workorder_asset2      = sanitize_text_field($_POST["b1nTPortal_workorder_asset2"]);
        $b1nTPortal_workorder_contqty     = sanitize_text_field($_POST["b1nTPortal_workorder_contqty"]);
        $b1nTPortal_workorder_targetcont  = sanitize_text_field($_POST["b1nTPortal_workorder_targetcont"]);
        $b1nTPortal_workorder_wodate      = sanitize_text_field($_POST["b1nTPortal_workorder_wodate"]);
        $b1nTPortal_workorder_wotype      = sanitize_text_field($_POST["b1nTPortal_workorder_wotype"]);
        $b1nTPortal_workorder_remarks     = sanitize_text_field($_POST["b1nTPortal_workorder_remarks"]);
        $b1nTPortal_workorder_material    = sanitize_text_field($_POST["b1nTPortal_workorder_material"]);
        $b1nTPortal_workorder_user_bypass = sanitize_text_field($_POST["b1nTPortal_workorder_user_bypass"]);

        //jobsite id must be valid
        if(!(is_numeric($b1nTPortal_workorder_jsid) && $b1nTPortal_workorder_jsid > 0)) {
            wp_send_json($this->b1nTPortal_response('error', "No job site id, System: Contact administration.", ''));
        }

        //expecting an array from the gui, sanitizing it below.
        $b1nTPortal_workorder_required_fields = array();
        if(is_array($_POST["b1nTPortal_required_fields"])) {
            $b1nTPortal_workorder_required_fields = $this->b1nTPortal_sanitize_array_values($_POST["b1nTPortal_required_fields"]);
        }

        if(!(is_array($b1nTPortal_workorder_required_fields) && !empty($b1nTPortal_workorder_required_fields))) {
            wp_send_json($this->b1nTPortal_response('error', "No required fields, Error (602) System: Contact administration.", ''));
        }

        //validate some fields
        $b1nTPortal_field_errors = array();

        foreach($b1nTPortal_workorder_required_fields as $b1nTPortal_workorder_required_fields_value) {
            //workoder qty
            if($b1nTPortal_workorder_required_fields_value == "b1nTPortal_workorder_contqty") {
                if($b1nTPortal_workorder_contqty == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_workorder_required_fields_value);
                }
            }

            //workorder type
            if($b1nTPortal_workorder_required_fields_value == "b1nTPortal_workorder_wotype") {
                if($b1nTPortal_workorder_wotype == "") {
                    array_push($b1nTPortal_field_errors, $b1nTPortal_workorder_required_fields_value);
                }
            }
        }

        //check assets
        if($b1nTPortal_workorder_wotype == "Out") {
            if($b1nTPortal_workorder_asset2 == "") {
                array_push($b1nTPortal_field_errors, "b1nTPortal_workorder_asset2");
            }
            if($b1nTPortal_workorder_asset) {
                array_push($b1nTPortal_field_errors, "b1nTPortal_workorder_asset");
            }
        }
        if($b1nTPortal_workorder_wotype == "Delivery") {
            if($b1nTPortal_workorder_asset == "") {
                array_push($b1nTPortal_field_errors, "b1nTPortal_workorder_asset");
            }
            if($b1nTPortal_workorder_asset2) {
                array_push($b1nTPortal_field_errors, "b1nTPortal_workorder_asset2");
            }
        }
        
        //normalize the target container
        if($b1nTPortal_workorder_targetcont == "") {
            $b1nTPortal_workorder_targetcont = 0;  
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

            //save work order
            $b1nTPortal_workorder_args = array(
                "command"               => "cmdBinTPortalSaveWorkOrder",
                "workorder_id"          => $b1nTPortal_workorder_id,
                "workorder_jsid"        => $b1nTPortal_workorder_jsid,
                "workorder_asset"       => $b1nTPortal_workorder_asset,
                "workorder_asset2"      => $b1nTPortal_workorder_asset2,
                "workorder_contqty"     => $b1nTPortal_workorder_contqty,
                "workorder_targetcont"  => $b1nTPortal_workorder_targetcont,
                "workorder_wodate"      => $b1nTPortal_workorder_wodate,
                "workorder_wotype"      => $b1nTPortal_workorder_wotype,
                "workorder_remarks"     => $b1nTPortal_workorder_remarks,
                "workorder_material"    => $b1nTPortal_workorder_material,
                "session_key_api"       => $b1nTPortal_session_key_api,
                "username_customer"     => $b1nTPortal_username,
                "session_key_customer"  => $b1nTPortal_session_key_customer,
                "customer_id"           => $b1nTPortal_customer_id,
                "workorder_user_bypass" => $b1nTPortal_workorder_user_bypass
            );

            //save work order
            $b1nTPortal_workorder_save = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_workorder_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_workorder_save && $b1nTPortal_workorder_save->status == '200') {
                wp_send_json($this->b1nTPortal_response('success', "Successfull work order save", ''));
            }

            //check for user confirm data
            $b1nTPortal_user_confirm = array();

            if($b1nTPortal_workorder_save->similarWOs && is_array($b1nTPortal_workorder_save->similarWOs)) {
                $b1nTPortal_user_confirm['similarWOs'] = $b1nTPortal_workorder_save->similarWOs;
            }

            if(!empty($b1nTPortal_user_confirm)) { //end here if not empty
                wp_send_json($this->b1nTPortal_response('userConfirm', "Needs user confirmation", $b1nTPortal_user_confirm));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_workorder_save);
            wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_workorder_save)), "Failed to save work order, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_handshake, $b1nTPortal_customer_handshake)), "Failed to save work order, ".$b1nTPortal_error, ''));
    }

    function b1nTPortal_remove_workorder() {
        ///security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);

        if($b1nTPortal_username == "" || $b1nTPortal_session_key_customer == "") {
            wp_send_json($this->b1nTPortal_response('error', "Error (600) System: Contact administration.", ''));
        }

        $b1nTPortal_workorder_id = sanitize_text_field($_POST["b1nTPortal_workorder_id"]);

        if(!(is_numeric($b1nTPortal_workorder_id))) {
            wp_send_json($this->b1nTPortal_response('error', "No work order id, System: Contact administration.", ''));
        }

        [$b1nTPortal_handshake, $b1nTPortal_customer_handshake, $b1nTPortal_error] = $this->b1nTPortal_evaluate_handshakes($b1nTPortal_username, "", $b1nTPortal_session_key_customer); //b1nTPortal_evaluate_handshakes() sanitizes values

        if($b1nTPortal_handshake && $b1nTPortal_customer_handshake && !$b1nTPortal_error) {
            $b1nTPortal_session_key_api = $b1nTPortal_handshake->key;
            $b1nTPortal_customer_id     = $b1nTPortal_customer_handshake->customerID;

            //remove work order
            $b1nTPortal_workorder_args = array(
                "command"              => "cmdBinTPortalRemoveWorkOrder",
                "workorder_id"         => $b1nTPortal_workorder_id,
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer,
                "customer_id"          => $b1nTPortal_customer_id
            );

            //remove
            $b1nTPortal_workorder_remove = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_workorder_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_workorder_remove && $b1nTPortal_workorder_remove->status == '200') {
                wp_send_json($this->b1nTPortal_response('success', "Successfull work order remove", ''));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_workorder_remove);
            wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_workorder_remove)), "Failed to remove work order, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_handshake, $b1nTPortal_customer_handshake)), "Failed to remove work order, ".$b1nTPortal_error, ''));
    }
}