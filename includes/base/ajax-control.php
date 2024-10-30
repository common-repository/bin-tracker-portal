<?php
/**
 * This class will manage the ajax calls
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_base;

use b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Plugin_Load;
use b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Login;
use b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Logout;
use b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Home_Page;
use b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Profile_Page;
use b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Jobsite_Page;
use b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Workorder_Page;
use b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_CCard_Page;
use b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Transactions_Page;
use b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Payment_Page;
use b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Reports_Page;
use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Ajax_Utility;

class B1nTPortal_Ajax_Control extends B1nTPortal_Ajax_Utility {
    //set up some hooks
    function b1nTPortal_init() {
        $b1nTPortal_array_of_actions  = array(
            'b1nTPortal_plugin_load', 'b1nTPortal_login', 'b1nTPortal_auto_login',
            'b1nTPortal_logout', 'b1nTPortal_home_page', 'b1nTPortal_profile_page',
            'b1nTPortal_save_customer', 'b1nTPortal_jobsite_page', 'b1nTPortal_load_jobsite_list',
            'b1nTPortal_add_edit_jobsite', 'b1nTPortal_save_jobsite', 'b1nTPortal_workorder_page',
            'b1nTPortal_load_workorder_list', 'b1nTPortal_add_edit_workorder', 'b1nTPortal_save_workorder',
            'b1nTPortal_remove_workorder', 'b1nTPortal_ccard_page', 'b1nTPortal_save_ccard',
            'b1nTPortal_ccard_make_primary', 'b1nTPortal_transactions_page', 'b1nTPortal_load_transactions_list',
            'b1nTPortal_payment_page', 'b1nTPortal_process_payment', 'b1nTPortal_reports_page', 
            'b1nTPortal_reports_output_page', 'b1nTPortal_report_details', 'b1nTPortal_email_txn'
        );
        
        foreach($b1nTPortal_array_of_actions as $b0xPortal_action) {
            $this->b1nTPortal_attach_action($b0xPortal_action);
        }
    }

    //add action
    function b1nTPortal_attach_action($b1nTPortal_action) {
        $b1nTPortal_action = sanitize_text_field($b1nTPortal_action);
        add_action('wp_ajax_nopriv_'.$b1nTPortal_action, array($this, $b1nTPortal_action));
        add_action('wp_ajax_'.$b1nTPortal_action, array($this, $b1nTPortal_action));
    }

    //throw error
    function b1nTPortal_throw_error() {
        #should never reach here, but if it does throw an error.
        $b1nTPortal_error = "Something went wrong, contact administration.";
        wp_send_json($this->b1nTPortal_response('error', $b1nTPortal_error, ''));
    }

    //call when page gets refreshed
    function b1nTPortal_plugin_load() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Plugin_Load")) {
            $b1nTPortal_plugin_load = new B1nTPortal_Plugin_Load();
            $b1nTPortal_plugin_load->b1nTPortal_plugin_load();
        }

        $this->b1nTPortal_throw_error();
    }

    //login user
    function b1nTPortal_login() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Login")) {
            $b1nTPortal_login = new B1nTPortal_Login();
            $b1nTPortal_login->b1nTPortal_login();
        }   

        $this->b1nTPortal_throw_error();
    }

    //auto login user
    function b1nTPortal_auto_login() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Login")) {
            $b1nTPortal_auto_login = new B1nTPortal_Login();
            $b1nTPortal_auto_login->b1nTPortal_auto_login();
        }

        $this->b1nTPortal_throw_error();
    }

    //logout user
    function b1nTPortal_logout() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Logout")) {
            $b1nTPortal_logout = new B1nTPortal_Logout();
            $b1nTPortal_logout->b1nTPortal_logout();
        }

        $this->b1nTPortal_throw_error();
    }

    //home page
    function b1nTPortal_home_page() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Home_Page")) {
            $b1nTPortal_home_page = new B1nTPortal_Home_Page();
            $b1nTPortal_home_page->b1nTPortal_home_page(); 
        }
     

        $this->b1nTPortal_throw_error();   
    }

    //profile
    function b1nTPortal_profile_page() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Profile_Page")) {
            $b1nTPortal_profile_page = new B1nTPortal_Profile_Page();
            $b1nTPortal_profile_page->b1nTPortal_profile_page(); 
        }
     
        $this->b1nTPortal_throw_error(); 
    }

    //profile save customer
    function b1nTPortal_save_customer() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Profile_Page")) {
            $b1nTPortal_save_customer = new B1nTPortal_Profile_Page();
            $b1nTPortal_save_customer->b1nTPortal_save_customer();
        }
     
        $this->b1nTPortal_throw_error();
    }

    //jobsite
    function b1nTPortal_jobsite_page() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Jobsite_Page")) {
            $b1nTPortal_jobsite_page = new B1nTPortal_Jobsite_Page();
            $b1nTPortal_jobsite_page->b1nTPortal_jobsite_page(); 
        }
     
        $this->b1nTPortal_throw_error();
    }

    //jobsite refresh
    function b1nTPortal_load_jobsite_list() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Jobsite_Page")) {
            $b1nTPortal_load_jobsite_list = new B1nTPortal_Jobsite_Page();
            $b1nTPortal_load_jobsite_list->b1nTPortal_load_jobsite_list(); 
        }
     
        $this->b1nTPortal_throw_error();
    }

    //add edit job site
    function b1nTPortal_add_edit_jobsite() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Jobsite_Page")) {
            $b1nTPortal_add_edit_jobsite = new B1nTPortal_Jobsite_Page();
            $b1nTPortal_add_edit_jobsite->b1nTPortal_load_add_edit_jobsite(); 
        }
     
        $this->b1nTPortal_throw_error();
    }

    //add edit job site save
    function b1nTPortal_save_jobsite() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Jobsite_Page")) {
            $b1nTPortal_save_jobsite = new B1nTPortal_Jobsite_Page();
            $b1nTPortal_save_jobsite->b1nTPortal_save_jobsite();
        }
     
        $this->b1nTPortal_throw_error();
    }

    //work order
    function b1nTPortal_workorder_page() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Workorder_Page")) {
            $b1nTPortal_workorder_page = new B1nTPortal_Workorder_Page();
            $b1nTPortal_workorder_page->b1nTPortal_workorder_page();
        }
     
        $this->b1nTPortal_throw_error();
    }

    //work order refresh
    function b1nTPortal_load_workorder_list() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Workorder_Page")) {
            $b1nTPortal_workorder_list = new B1nTPortal_Workorder_Page();
            $b1nTPortal_workorder_list->b1nTPortal_workorder_list();
        }
     
        $this->b1nTPortal_throw_error();
    }

    //work order add edit page
    function b1nTPortal_add_edit_workorder() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Workorder_Page")) {
            $b1nTPortal_add_edit_workorder = new B1nTPortal_Workorder_Page();
            $b1nTPortal_add_edit_workorder->b1nTPortal_add_edit_workorder();
        }
     
        $this->b1nTPortal_throw_error();
    }

    //work order save
    function b1nTPortal_save_workorder() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Workorder_Page")) {
            $b1nTPortal_save_workorder = new B1nTPortal_Workorder_Page();
            $b1nTPortal_save_workorder->b1nTPortal_save_workorder();
        }
     
        $this->b1nTPortal_throw_error();
    }

    //remove work order
    function b1nTPortal_remove_workorder() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Workorder_Page")) {
            $b1nTPortal_remove_workorder = new B1nTPortal_Workorder_Page();
            $b1nTPortal_remove_workorder->b1nTPortal_remove_workorder();
        }

        $this->b1nTPortal_throw_error();
    }

    //load ccard page
    function b1nTPortal_ccard_page() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_CCard_Page")) {
            $b1nTPortal_ccard_page = new B1nTPortal_CCard_Page();
            $b1nTPortal_ccard_page->b1nTPortal_ccard_page();
        }

        $this->b1nTPortal_throw_error();
    }

    //save ccard
    function b1nTPortal_save_ccard() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_CCard_Page")) {
            $b1nTPortal_save_ccard = new B1nTPortal_CCard_Page();
            $b1nTPortal_save_ccard->b1nTPortal_save_ccard();
        }

        $this->b1nTPortal_throw_error();
    }

    //ccard make primary
    function b1nTPortal_ccard_make_primary() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_CCard_Page")) {
            $b1nTPortal_ccard_make_primary = new B1nTPortal_CCard_Page();
            $b1nTPortal_ccard_make_primary->b1nTPortal_ccard_make_primary();
        }

        $this->b1nTPortal_throw_error();
    }

    //load transactions page
    function b1nTPortal_transactions_page() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Transactions_Page")) {
            $b1nTPortal_transactions_page = new B1nTPortal_Transactions_Page();
            $b1nTPortal_transactions_page->b1nTPortal_transactions_page();
        }

        $this->b1nTPortal_throw_error();
    }

    //transactions refresh
    function b1nTPortal_load_transactions_list() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Transactions_Page")) {
            $b1nTPortal_transactions_list = new B1nTPortal_Transactions_Page();
            $b1nTPortal_transactions_list->b1nTPortal_transactions_list();
        }
     
        $this->b1nTPortal_throw_error();
    }

    //transaction email
    function b1nTPortal_email_txn() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Transactions_Page")) {
            $b1nTPortal_transactions_list = new B1nTPortal_Transactions_Page();
            $b1nTPortal_transactions_list->b1nTPortal_email_txn();
        }
     
        $this->b1nTPortal_throw_error();
    }

    //payment page
    function b1nTPortal_payment_page() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Payment_Page")) {
            $b1nTPortal_payment_page = new B1nTPortal_Payment_Page();
            $b1nTPortal_payment_page->b1nTPortal_payment_page();
        }
     
        $this->b1nTPortal_throw_error();
    }

    //process payment
    function b1nTPortal_process_payment() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Payment_Page")) {
            $b1nTPortal_process_payment = new B1nTPortal_Payment_Page();
            $b1nTPortal_process_payment->b1nTPortal_process_payment();
        }
     
        $this->b1nTPortal_throw_error();
    }

    //reports page
    function b1nTPortal_reports_page() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Reports_Page")) {
            $b1nTPortal_reports_page = new B1nTPortal_Reports_Page();
            $b1nTPortal_reports_page->b1nTPortal_reports_page();
        }
     
        $this->b1nTPortal_throw_error();
    }

    function b1nTPortal_reports_output_page() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Reports_Page")) {
            $b1nTPortal_reports_output_page = new B1nTPortal_Reports_Page();
            $b1nTPortal_reports_output_page->b1nTPortal_reports_output_page();
        }
     
        $this->b1nTPortal_throw_error();
    }

    function b1nTPortal_report_details() {
        if(class_exists("b1nTPortal_includes\b1nTPortal_ajax\B1nTPortal_Reports_Page")) {
            $b1nTPortal_report_details = new B1nTPortal_Reports_Page();
            $b1nTPortal_report_details->b1nTPortal_report_details();
        }
     
        $this->b1nTPortal_throw_error();  
    }
}