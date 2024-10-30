<?php
/**
 * This class will manage the reports page
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_ajax;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Ajax_Utility;

class B1nTPortal_Reports_Page extends B1nTPortal_Ajax_Utility {
    function b1nTPortal_reports_page() {
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
                "command"              => "cmdBinTPortalReportList",
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer
            );

            //report list data
            $b1nTPortal_reports_data = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_reports_data && $b1nTPortal_reports_data->status == '200') {
                $b1nTPortal_reports_object_list = $b1nTPortal_reports_data->reportObjList;

                $b1nTPortal_data = array(
                    "b1nTPortal_reports_object_list" => $b1nTPortal_reports_object_list
                );

                wp_send_json($this->b1nTPortal_response('success', "Succesful reports page load.", $b1nTPortal_data));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_reports_data);
            wp_send_json($this->b1nTPortal_response('error', "Failed reports page load, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response('error', "Failed reports page load, ".$b1nTPortal_error, '')); 
    }

    function b1nTPortal_reports_output_page() {
        //security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);

        if($b1nTPortal_username == "" || $b1nTPortal_session_key_customer == "") {
            wp_send_json($this->b1nTPortal_response('error', "Error (600) System: Contact administration.", ''));
        } 

        $b1nTPortal_report_id = sanitize_text_field($_POST["b1nTPortal_report_id"]);

        //we need a numeric id
        if(is_numeric($b1nTPortal_report_id)) {} else {
             wp_send_json($this->b1nTPortal_response('error', "Error System: Something went wrong, missing id!!", ''));
        }

        [$b1nTPortal_handshake, $b1nTPortal_customer_handshake, $b1nTPortal_error] = $this->b1nTPortal_evaluate_handshakes($b1nTPortal_username, "", $b1nTPortal_session_key_customer); //b1nTPortal_evaluate_handshakes() sanitizes values

        if($b1nTPortal_handshake && $b1nTPortal_customer_handshake && !$b1nTPortal_error) {
            $b1nTPortal_session_key_api = $b1nTPortal_handshake->key;
            $b1nTPortal_customer_id     = $b1nTPortal_customer_handshake->customerID;

            $b1nTPortal_args = array(
                "command"              => "cmdBinTPortalReportParams",
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer,
                "report_id"            => $b1nTPortal_report_id,
                "customer_id"          => $b1nTPortal_customer_id
            );

            //report params data
            $b1nTPortal_report_data = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_report_data && $b1nTPortal_report_data->status == '200') {
                $b1nTPortal_report_params = $b1nTPortal_report_data->reportParamsObj;

                $b1nTPortal_data = array(
                    "b1nTPortal_report_params" => $b1nTPortal_report_params
                );

                wp_send_json($this->b1nTPortal_response('success', "Succesful reports output page load.", $b1nTPortal_data));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_report_data);
            wp_send_json($this->b1nTPortal_response('error', "Failed reports output page load, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response('error', "Failed reports output page load, ".$b1nTPortal_error, '')); 
    }

    function b1nTPortal_report_details() {
        //security checks
        if(!$this->b1nTPortal_security_checks()) {
            wp_send_json($this->b1nTPortal_response('error', "Failed security checks.", ''));
        }

        $b1nTPortal_username             = sanitize_text_field($_SESSION['b1nTPortal_session']['username']);
        $b1nTPortal_session_key_customer = sanitize_text_field($_SESSION['b1nTPortal_session']['session_key']);

        if($b1nTPortal_username == "" || $b1nTPortal_session_key_customer == "") {
            wp_send_json($this->b1nTPortal_response('error', "Error (600) System: Contact administration.", ''));
        } 

        $b1nTPortal_report_id = sanitize_text_field($_POST["b1nTPortal_report_id"]);

        //we need a numeric id
        if(is_numeric($b1nTPortal_report_id)) {} else {
             wp_send_json($this->b1nTPortal_response('error', "Error System: Something went wrong, missing id!!", ''));
        } 

        $b1nTPortal_report_params = array();
        if($_POST["b1nTPortal_report_start_date"]) {
            $b1nTPortal_report_params["startDate"] = sanitize_text_field($_POST["b1nTPortal_report_start_date"]);
        }

        if($_POST["b1nTPortal_report_end_date"]) {
            $b1nTPortal_report_params["endDate"] = sanitize_text_field($_POST["b1nTPortal_report_end_date"]);
        }

        if($_POST["b1nTPortal_report_delivery_date"]) {
            $b1nTPortal_report_params["deliveryDate"] = sanitize_text_field($_POST["b1nTPortal_report_delivery_date"]);
        }

        if($_POST["b1nTPortal_report_month"]) {
            $b1nTPortal_report_params["month"] = sanitize_text_field($_POST["b1nTPortal_report_month"]);
        }

        if($_POST["b1nTPortal_report_year"]) {
            $b1nTPortal_report_params["year"] = sanitize_text_field($_POST["b1nTPortal_report_year"]);
        }

        if($_POST["b1nTPortal_report_jobsite_id"]) {
            $b1nTPortal_report_params["jobSite"] = sanitize_text_field($_POST["b1nTPortal_report_jobsite_id"]);
        }

        if($_POST["b1nTPortal_report_wo_type"]) {
            $b1nTPortal_report_params["woType"] = sanitize_text_field($_POST["b1nTPortal_report_wo_type"]);
        }

        if($_POST["b1nTPortal_report_check_boxes"] && is_array($_POST["b1nTPortal_report_check_boxes"])) {
            $b1nTPortal_check_boxes = $this->b1nTPortal_sanitize_array_values($_POST["b1nTPortal_report_check_boxes"]);

            //iterate through the check boxes
            foreach($b1nTPortal_check_boxes as $b1nTPortal_check_box) {
                $b1nTPortal_split_string = explode("|", $b1nTPortal_check_box);
                $b1nTPortal_report_params[$b1nTPortal_split_string[0]] = $b1nTPortal_split_string[1];
            }
        }

        if($_POST["b1nTPortal_report_sort_by"]) {
            $b1nTPortal_report_params["sortBy"] = sanitize_text_field($_POST["b1nTPortal_report_sort_by"]);
        }

        if($_POST["b1nTPortal_report_filter_by"]) {
            $b1nTPortal_report_params["filterBy"] = sanitize_text_field($_POST["b1nTPortal_report_filter_by"]);
        }

        if($_POST["b1nTPortal_report_list_by"]) {
            $b1nTPortal_report_params["listBy"] = sanitize_text_field($_POST["b1nTPortal_report_list_by"]);
        }

        [$b1nTPortal_handshake, $b1nTPortal_customer_handshake, $b1nTPortal_error] = $this->b1nTPortal_evaluate_handshakes($b1nTPortal_username, "", $b1nTPortal_session_key_customer); //b1nTPortal_evaluate_handshakes() sanitizes values

        if($b1nTPortal_handshake && $b1nTPortal_customer_handshake && !$b1nTPortal_error) {
            $b1nTPortal_session_key_api = $b1nTPortal_handshake->key;
            $b1nTPortal_customer_id     = $b1nTPortal_customer_handshake->customerID;

            $b1nTPortal_args = array(
                "command"              => "cmdBinTPortalReportDetails",
                "session_key_api"      => $b1nTPortal_session_key_api,
                "username_customer"    => $b1nTPortal_username,
                "session_key_customer" => $b1nTPortal_session_key_customer,
                "report_id"            => $b1nTPortal_report_id
            );

            $b1nTPortal_args = array_merge($b1nTPortal_args, $b1nTPortal_report_params);

            $b1nTPortal_report_data = $this->b1nTPortal_server_calls->b1nTPortal_call_command($b1nTPortal_args); //b1nTPortal_call_command() sanitizes values

            if($b1nTPortal_report_data && $b1nTPortal_report_data->status == '200') {
                $b1nTPortal_report_lines = $b1nTPortal_report_data->reportObj;

                $b1nTPortal_data = array(
                    "b1nTPortal_report_lines" => $b1nTPortal_report_lines
                );
                
                wp_send_json($this->b1nTPortal_response('success', "Succesfully got report", $b1nTPortal_data));
            }

            $b1nTPortal_error = $this->b1nTPortal_generate_error_string($b1nTPortal_report_data);
            wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_report_data)), "Failed to get report, ".$b1nTPortal_error, ''));
        }

        wp_send_json($this->b1nTPortal_response($this->b1nTPortal_session_expired(array($b1nTPortal_handshake, $b1nTPortal_customer_handshake)), "Failed to get report, ".$b1nTPortal_error, ''));
    }
}