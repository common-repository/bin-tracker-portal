jQuery(document).ready(function($){
    //navigation 
    var b1nTPortal_header;
    if(typeof(b1nTPortal_header_builder === "function")) {
        b1nTPortal_header = new b1nTPortal_header_builder({
            "image_url" : b1nTPortal_config.image_url,
            "homeNextF" : b1nTPortal_load_home_page,
            "profileNextF" : b1nTPortal_load_profile_page,
            "jobsiteNextF": b1nTPortal_load_jobsite_page,
            "workOrderNextF" : b1nTPortal_load_workorder_page,
            "transactionsNextF": b1nTPortal_load_transactions_page,
            "reportsNextF": b1nTPortal_load_reports_page,
            "logOutNextF" : b1nTPortal_log_out
        });
    }

    //load login template script
    var b1nTPortal_login_page;
    if(typeof(b1nTPortal_login_template) === "function") {
        b1nTPortal_login_page = new b1nTPortal_login_template({
            "hostDiv" : "b1nTPortal_template",
            'nextF' : b1nTPortal_login
        });
    }

    //load home page
    var b1nTPortal_home_page;
    if(typeof(b1nTPortal_home_page_template) === "function") {
        b1nTPortal_home_page = new b1nTPortal_home_page_template({
            "image_url" : b1nTPortal_config.image_url,
            "hostDiv" : "b1nTPortal_template",
            "profileNextF" : b1nTPortal_load_profile_page,
            "jobsiteNextF" : b1nTPortal_load_jobsite_page,
            "workOrderNextF" : b1nTPortal_load_workorder_page,
            "transactionsNextF": b1nTPortal_load_transactions_page,
            "reportsNextF": b1nTPortal_load_reports_page,
            "header" : b1nTPortal_header
        });
    }

    //load profile page
    var b1nTPortal_profile_page;
    if(typeof(b1nTPortal_profile_page_template) === "function") {
        b1nTPortal_profile_page = new b1nTPortal_profile_page_template({
            "image_url" : b1nTPortal_config.image_url,
            "hostDiv" : "b1nTPortal_template",
            "header" : b1nTPortal_header,
            "saveCustomerNextF" : b1nTPortal_save_customer_file,
            "loadCcardNextF": b1nTPortal_load_ccard_page,
            "ccardMakePrimaryNextF": b1nTPortal_ccard_make_primary
        });
    }

    //load job site page
    var b1nTPortal_jobsite_page;
    if(typeof(b1nTPortal_jobsite_page_template) === "function") {
        b1nTPortal_jobsite_page = new b1nTPortal_jobsite_page_template({
            "image_url" : b1nTPortal_config.image_url,
            "hostDiv" : "b1nTPortal_template",
            "loadListNextF": b1nTPortal_load_jobsite_list,
            "loadAddEditNextF": b1nTPortal_load_add_edit_jobsite,
            "loadAddEditWONextF": b1nTPortal_load_add_edit_workorder,
            "header" : b1nTPortal_header
        });
    }

    //add edit job site page
    var b1nTPortal_add_edit_jobsite_page;
    if(typeof(b1nTPortal_add_edit_jobsite_page_template) === "function") {
        b1nTPortal_add_edit_jobsite_page = new b1nTPortal_add_edit_jobsite_page_template({
            "image_url" : b1nTPortal_config.image_url,
            "hostDiv" : "b1nTPortal_template",
            "header" : b1nTPortal_header,
            "saveJobSiteNextF": b1nTPortal_save_jobsite
        });
    }

    //load work order page
    var b1nTPortal_workorder_page;
    if(typeof(b1nTPortal_workorder_page_template) === "function") {
        b1nTPortal_workorder_page = new b1nTPortal_workorder_page_template({
            "image_url" : b1nTPortal_config.image_url,
            "hostDiv" : "b1nTPortal_template",
            "loadListNextF": b1nTPortal_load_workorder_list,
            "loadAddEditNextF": b1nTPortal_load_add_edit_workorder,
            "removeNextF": b0xPortal_remove_workorder,
            "header" : b1nTPortal_header
        });
    }

    //add edit work order page
    var b1nTPortal_add_edit_workorder_page;
    if(typeof(b1nTPortal_add_edit_workorder_page_template) === "function") {
        b1nTPortal_add_edit_workorder_page = new b1nTPortal_add_edit_workorder_page_template({
            "image_url" : b1nTPortal_config.image_url,
            "hostDiv" : "b1nTPortal_template",
            "saveWorkOrderNextF" : b1nTPortal_save_workorder,
            "datePicker": b1nTPortal_set_datepicker,
            "setPosition": b1nTPortal_set_position,
            "header" : b1nTPortal_header
        });
    }

    //credit card page
    var b1nTPortal_ccard_page;
    if(typeof(b1nTPortal_ccard_page_template) === "function") {
        b1nTPortal_ccard_page = new b1nTPortal_ccard_page_template({
            "image_url" : b1nTPortal_config.image_url,
            "hostDiv" : "b1nTPortal_template",
            "header" : b1nTPortal_header,
            "saveCCardNextF" : b1nTPortal_save_ccard
        });
    }

    //transactions page
    var b1nTPortal_transactions_page;
    if(typeof(b1nTPortal_transactions_page_template) === "function") {
        b1nTPortal_transactions_page = new b1nTPortal_transactions_page_template({
            "image_url" : b1nTPortal_config.image_url,
            "loadListNextF": b1nTPortal_load_transactions_list,
            "paymentNextF": b1nTPortal_load_payment_page,
            "emailNextF": b1nTPortal_email_txn,
            "hostDiv" : "b1nTPortal_template",
            "header" : b1nTPortal_header
        });
    }

    //transactions page
    var b1nTPortal_payment_page;
    if(typeof(b1nTPortal_payment_page_template) === "function") {
        b1nTPortal_payment_page = new b1nTPortal_payment_page_template({
            "image_url" : b1nTPortal_config.image_url,
            "processPaymentNextF" : b1nTPortal_process_payment,
            "hostDiv" : "b1nTPortal_template",
            "header" : b1nTPortal_header
        });
    }

    //reports page
    var b1nTPortal_reports_page;
    if(typeof(b1nTPortal_reports_page_template) === "function") {
        b1nTPortal_reports_page = new b1nTPortal_reports_page_template({
            "image_url" : b1nTPortal_config.image_url,
            "reportsNextF": b1nTPortal_load_reports_output_page,
            "hostDiv" : "b1nTPortal_template",
            "header" : b1nTPortal_header
        });
    }

    //reports output page
    var b1nTPortal_reports_output_page;
    if(typeof(b1nTPortal_reports_output_page_template) === "function") {
        b1nTPortal_reports_output_page = new b1nTPortal_reports_output_page_template({
            "image_url" : b1nTPortal_config.image_url,
            "hostDiv" : "b1nTPortal_template",
            "datePicker": b1nTPortal_set_datepicker,
            "setPosition": b1nTPortal_set_position,
            "getReportNextF": b1nTPortal_report_details,
            "header" : b1nTPortal_header
        });
    }

    if( //sanity checks, dont continue unless they pass
        b1nTPortal_login_page && b1nTPortal_home_page && 
        b1nTPortal_profile_page && b1nTPortal_jobsite_page && 
        b1nTPortal_add_edit_jobsite_page && b1nTPortal_workorder_page &&
        b1nTPortal_add_edit_workorder_page && b1nTPortal_ccard_page && 
        b1nTPortal_transactions_page && b1nTPortal_payment_page &&
        b1nTPortal_reports_page && b1nTPortal_reports_output_page
    ) {
        //DO NOTHING.
    } else {
        $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Something went wrong, contact administration.</p>');
        return false;
    }

    //clear error messages
    function b1nTPortal_clear_flags() {
        $('.b1nTPortal-error-msg').remove();
        $('.b1nTPortal-success-msg').remove();
    }

    //create loader
    function b1nTPortal_loader(b1nTPortal_action) {
        if(b1nTPortal_action == 'remove') {
            $('.b1nTPortal_ajax_shield').remove();
        } else {
            //make sure we are not re appending the loader
            if($('#b1nTPortal_ajax_shield').children().length == 0) {
                $('#b1nTPortal_ajax_shield').append('<div class="b1nTPortal_ajax_shield"><div></div></div>');
            }
        }
    }

	$(function() { //on load.
  		var b1nTPortal_form_data = {
            'action': 'b1nTPortal_plugin_load',
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    if(b1nTPortal_response.data.b1nTPortal_login_prompt == "manual") {
                        b1nTPortal_login_page.b1nTPortal_init(b1nTPortal_response.data.b1nTPortal_required_fields);
                        b1nTPortal_loader('remove');
                    } else {
                        b1nTPortal_auto_login(b1nTPortal_response.data.b1nTPortal_required_fields);
                    }
                } else {
                	$('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                }
            }, error: function (error) {
           		$('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        });	
	});

    //will receive an object b1nTPortal_args
    function b1nTPortal_login(b1nTPortal_args) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_login',
            'b1nTPortal_username': b1nTPortal_args.username,
            'b1nTPortal_password': b1nTPortal_args.password,
            'b1nTPortal_required_fields': b1nTPortal_args.required_fields,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'validation_error'){
                    $.each(b1nTPortal_response.data.b1nTPortal_field_errors, function(b1nTPortal_field_key, b1nTPortal_field_value){
                        b1nTPortal_login_page.b1nTPortal_validate_field(b1nTPortal_field_value, 1);
                    });

                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                } else if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_home_page.b1nTPortal_init(b1nTPortal_response.data);
                } else {
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                }
                b1nTPortal_loader('remove');
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        }); 
    }

    //receive required fields, and attempt to retrive session
    function b1nTPortal_auto_login(b1nTPortal_required_fields) {
       var b1nTPortal_form_data = {
            'action': 'b1nTPortal_auto_login',
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        }; 

        b1nTPortal_clear_flags();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_home_page.b1nTPortal_init(b1nTPortal_response.data);
                } else {
                    b1nTPortal_login_page.b1nTPortal_init(b1nTPortal_required_fields);      
                }
                b1nTPortal_loader('remove');  
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        }); 
    }

    function b1nTPortal_load_home_page(nextF) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_home_page',
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        //if nextF is not passed in...
        if(typeof(nextF) === "function") {} else {
            b1nTPortal_clear_flags();
            b1nTPortal_loader();
        }

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_home_page.b1nTPortal_init(b1nTPortal_response.data);
                    //prioritize the nextF
                    if(typeof(nextF) === "function") { 
                        nextF(); 
                    } else {
                        b1nTPortal_loader('remove'); 
                    }
                } else {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        });        
    }

    function b1nTPortal_load_profile_page(nextF) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_profile_page',
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        //if nextF is not passed in...
        if(typeof(nextF) === "function") {} else {
            b1nTPortal_clear_flags();
            b1nTPortal_loader();
        }

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_profile_page.b1nTPortal_init(b1nTPortal_response.data);
                    //prioritize the nextF
                    if(typeof(nextF) === "function") { 
                        nextF(); 
                    } else {
                        b1nTPortal_loader('remove'); 
                    }
                } else {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        });   
    }

    function b1nTPortal_save_customer_file(b1nTPortal_args) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_save_customer',
            'b1nTPortal_customer_name': b1nTPortal_args.customer_name,
            'b1nTPortal_customer_address': b1nTPortal_args.customer_address,
            'b1nTPortal_customer_address2': b1nTPortal_args.customer_address2,
            'b1nTPortal_customer_city': b1nTPortal_args.customer_city,
            'b1nTPortal_customer_state': b1nTPortal_args.customer_state,
            'b1nTPortal_customer_zip': b1nTPortal_args.customer_zip,
            'b1nTPortal_customer_contact_id': b1nTPortal_args.customer_contact_id,
            'b1nTPortal_customer_contact_name': b1nTPortal_args.customer_contact_name,
            'b1nTPortal_customer_contact_phone': b1nTPortal_args.customer_contact_phone,
            'b1nTPortal_customer_contact_cell': b1nTPortal_args.customer_contact_cell,
            'b1nTPortal_customer_contact_fax': b1nTPortal_args.customer_contact_fax,
            'b1nTPortal_customer_contact_email': b1nTPortal_args.customer_contact_email,
            'b1nTPortal_customer_contact_primary': b1nTPortal_args.customer_contact_primary,
            'b1nTPortal_customer_email_confirm': b1nTPortal_args.customer_email_confirm,
            'b1nTPortal_customer_email_reminders': b1nTPortal_args.customer_email_reminders,
            'b1nTPortal_customer_email_thankyou': b1nTPortal_args.customer_email_thankyou,
            'b1nTPortal_customer_sms': b1nTPortal_args.customer_sms,
            'b1nTPortal_required_fields': b1nTPortal_args.required_fields,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'validation_error'){
                    $.each(b1nTPortal_response.data.b1nTPortal_field_errors, function(b1nTPortal_field_key, b1nTPortal_field_value){
                        b1nTPortal_profile_page.b1nTPortal_validate_field(b1nTPortal_field_value, 1);
                    });
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                } else if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_load_home_page(function() {
                        $('#b1nTPortal_success_flag').append('<p class="b1nTPortal-success-msg">'+b1nTPortal_response.message+'</p>');
                        b1nTPortal_loader('remove');
                    });
                } else if(b1nTPortal_response.status == 'expired') {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b1nTPortal_refresh_page();
            }
        }); 
    }

    function b1nTPortal_load_jobsite_page(nextF) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_jobsite_page',
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        //if nextF is not passed in...
        if(typeof(nextF) === "function") {} else {
            b1nTPortal_clear_flags();
            b1nTPortal_loader();
        }

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_jobsite_page.b1nTPortal_init(b1nTPortal_response.data);
                    
                    //prioritize the nextF
                    if(typeof(nextF) === "function") { 
                        nextF(); 
                    } else {
                        b1nTPortal_loader('remove'); 
                    }
                } else {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        });      
    }

    function b1nTPortal_load_jobsite_list(b1nTPortal_data_object) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_load_jobsite_list',
            'b1nTPortal_offset': b1nTPortal_data_object.offset,
            'b1nTPortal_search': b1nTPortal_data_object.search,
            'b1nTPortal_sort': b1nTPortal_data_object.sort,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_jobsite_page.b1nTPortal_reload_jobsite_list(b1nTPortal_response.data, b1nTPortal_data_object.control);
                    b1nTPortal_loader('remove');

                    if(typeof(b1nTPortal_data_object.call_back) === "function") {
                        b1nTPortal_data_object.call_back();
                    }
                } else if(b1nTPortal_response.status == 'expired') {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        });  
    }

    function b1nTPortal_load_add_edit_jobsite(b1nTPortal_id) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_add_edit_jobsite',
            'b1nTPortal_jobsite_id': b1nTPortal_id,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_add_edit_jobsite_page.b1nTPortal_init(b1nTPortal_response.data);
                    b1nTPortal_loader('remove');
                } else {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        }); 
    }

    function b1nTPortal_save_jobsite(b1nTPortal_args) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_save_jobsite',
            'b1nTPortal_jobsite_id': b1nTPortal_args.jobsite_id,
            'b1nTPortal_jobsite_name': b1nTPortal_args.jobsite_name,
            'b1nTPortal_jobsite_address': b1nTPortal_args.jobsite_address,
            'b1nTPortal_jobsite_city': b1nTPortal_args.jobsite_city,
            'b1nTPortal_jobsite_state': b1nTPortal_args.jobsite_state,
            'b1nTPortal_jobsite_zip': b1nTPortal_args.jobsite_zip,
            'b1nTPortal_jobsite_county': b1nTPortal_args.jobsite_county,
            'b1nTPortal_jobsite_muni': b1nTPortal_args.jobsite_muni,
            'b1nTPortal_jobsite_cross_street': b1nTPortal_args.jobsite_cross_street,
            'b1nTPortal_jobsite_contact_id': b1nTPortal_args.jobsite_contact_id,
            'b1nTPortal_jobsite_hazzards': b1nTPortal_args.jobsite_hazzards,
            'b1nTPortal_jobsite_billing_note': b1nTPortal_args.jobsite_billing_note,
            'b1nTPortal_jobsite_validated': b1nTPortal_args.jobsite_validated,
            'b1nTPortal_required_fields': b1nTPortal_args.required_fields,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'validation_error'){
                    $.each(b1nTPortal_response.data.b1nTPortal_field_errors, function(b1nTPortal_field_key, b1nTPortal_field_value){
                        b1nTPortal_add_edit_jobsite_page.b1nTPortal_validate_field(b1nTPortal_field_value, 1);
                    });
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                } else if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_load_jobsite_page(function() {
                        $('#b1nTPortal_success_flag').append('<p class="b1nTPortal-success-msg">'+b1nTPortal_response.message+'</p>');
                        b1nTPortal_loader('remove');
                    });
                } else if(b1nTPortal_response.status == 'expired') {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b1nTPortal_refresh_page();
            }
        }); 
    }

    function b1nTPortal_load_workorder_page(nextF) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_workorder_page',
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        //if nextF is not passed in...
        if(typeof(nextF) === "function") {} else {
            b1nTPortal_clear_flags();
            b1nTPortal_loader();
        }

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_workorder_page.b1nTPortal_init(b1nTPortal_response.data);
                    
                    //prioritize the nextF
                    if(typeof(nextF) === "function") { 
                        nextF(); 
                    } else {
                        b1nTPortal_loader('remove'); 
                    }
                } else {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        });  
    }

    function b1nTPortal_load_workorder_list(b1nTPortal_data_object) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_load_workorder_list',
            'b1nTPortal_offset': b1nTPortal_data_object.offset,
            'b1nTPortal_search': b1nTPortal_data_object.search,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_workorder_page.b1nTPortal_reload_workorder_list(b1nTPortal_response.data, b1nTPortal_data_object.control);
                    b1nTPortal_loader('remove');

                    //extra functionality posibilities
                    if(typeof(b1nTPortal_data_object.call_back) === "function") {
                        b1nTPortal_data_object.call_back();
                    }
                } else if(b1nTPortal_response.status == 'expired') {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        });  
    }

    function b1nTPortal_load_add_edit_workorder(b1nTPortal_workorder_id, b1nTPortal_jobsite_id) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_add_edit_workorder',
            'b1nTPortal_workorder_id': b1nTPortal_workorder_id,
            'b1nTPortal_jobsite_id': b1nTPortal_jobsite_id,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_add_edit_workorder_page.b1nTPortal_init(b1nTPortal_response.data);
                    b1nTPortal_loader('remove');
                } else {
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        }); 
    }

    function b1nTPortal_save_workorder(b1nTPortal_args) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_save_workorder',
            'b1nTPortal_workorder_id': b1nTPortal_args.workorder_id,
            'b1nTPortal_workorder_jsid': b1nTPortal_args.workorder_jsid,
            'b1nTPortal_workorder_user_bypass': b1nTPortal_args.workorder_user_bypass,
            'b1nTPortal_workorder_asset': b1nTPortal_args.workorder_asset,
            'b1nTPortal_workorder_asset2': b1nTPortal_args.workorder_asset2,
            'b1nTPortal_workorder_contqty': b1nTPortal_args.workorder_contqty,
            'b1nTPortal_workorder_targetcont': b1nTPortal_args.workorder_targetcont,
            'b1nTPortal_workorder_wodate': b1nTPortal_args.workorder_wodate,
            'b1nTPortal_workorder_wotype': b1nTPortal_args.workorder_wotype,
            'b1nTPortal_workorder_remarks': b1nTPortal_args.workorder_remarks,
            'b1nTPortal_workorder_material': b1nTPortal_args.workorder_material,
            'b1nTPortal_required_fields': b1nTPortal_args.required_fields,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'validation_error'){
                    $.each(b1nTPortal_response.data.b1nTPortal_field_errors, function(b1nTPortal_field_key, b1nTPortal_field_value){
                        b1nTPortal_add_edit_workorder_page.b1nTPortal_validate_field(b1nTPortal_field_value, 1);
                    });
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                } else if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_load_workorder_page(function() {
                        $('#b1nTPortal_success_flag').append('<p class="b1nTPortal-success-msg">'+b1nTPortal_response.message+'</p>');
                        b1nTPortal_loader('remove');
                    });
                } else if(b1nTPortal_response.status == 'expired') {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                } else if(b1nTPortal_response.status == 'userConfirm') {
                    b1nTPortal_add_edit_workorder_page.b1nTPortal_user_confirmation(b1nTPortal_response.data);
                    b1nTPortal_loader('remove');
                } else {
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b1nTPortal_refresh_page();
            }
        });         
    }

    function _b1nTPortal_refresh_page() {
        location.reload(true);
    }

    function b0xPortal_remove_workorder(b1nTPortal_id) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_remove_workorder',
            'b1nTPortal_workorder_id': b1nTPortal_id,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_load_workorder_page(function() {
                        $('#b1nTPortal_success_flag').append('<p class="b1nTPortal-success-msg">'+b1nTPortal_response.message+'</p>');
                        b1nTPortal_loader('remove');
                    });
                } else if(b1nTPortal_response.status == 'expired') {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b1nTPortal_refresh_page();
            }
        });    
    }

    function b1nTPortal_ccard_make_primary(b1nTPortal_id, b1nTPortal_old_id) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_ccard_make_primary',
            'b1nTPortal_ccard_id': b1nTPortal_id,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') { 
                    $('#b1nTPortal_success_flag').append('<p class="b1nTPortal-success-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                } else if(b1nTPortal_response.status == 'expired') {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                } else {
                    b1nTPortal_profile_page.b1nTPortal_update_mask_value(b1nTPortal_old_id);
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b1nTPortal_refresh_page();
            }
        });  
    }

    function b1nTPortal_load_ccard_page() {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_ccard_page',
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_ccard_page.b1nTPortal_init(b1nTPortal_response.data);
                    b1nTPortal_loader('remove');
                } else {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        });   
    }

    function b1nTPortal_save_ccard(b1nTPortal_args) {      
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_save_ccard',
            'b1nTPortal_ccard_address': b1nTPortal_args.ccard_address,
            'b1nTPortal_ccard_address2': b1nTPortal_args.ccard_address2,
            'b1nTPortal_ccard_city': b1nTPortal_args.ccard_city,
            'b1nTPortal_ccard_country': b1nTPortal_args.ccard_country,
            'b1nTPortal_ccard_cvv': b1nTPortal_args.ccard_cvv,
            'b1nTPortal_ccard_email': b1nTPortal_args.ccard_email,
            'b1nTPortal_ccard_exp_month': b1nTPortal_args.ccard_exp_month,
            'b1nTPortal_ccard_exp_year': b1nTPortal_args.ccard_exp_year,
            'b1nTPortal_ccard_first_name': b1nTPortal_args.ccard_first_name,
            'b1nTPortal_ccard_last_name': b1nTPortal_args.ccard_last_name,
            'b1nTPortal_ccard_number': b1nTPortal_args.ccard_number,
            'b1nTPortal_ccard_phone': b1nTPortal_args.ccard_phone,
            'b1nTPortal_ccard_state': b1nTPortal_args.ccard_state,
            'b1nTPortal_ccard_zip': b1nTPortal_args.ccard_zip,
            'b1nTPortal_required_fields': b1nTPortal_args.required_fields,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'validation_error'){
                    $.each(b1nTPortal_response.data.b1nTPortal_field_errors, function(b1nTPortal_field_key, b1nTPortal_field_value){
                        b1nTPortal_ccard_page.b1nTPortal_validate_field(b1nTPortal_field_value, 1);
                    });
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                } else if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_load_profile_page(function() {
                        $('#b1nTPortal_success_flag').append('<p class="b1nTPortal-success-msg">'+b1nTPortal_response.message+'</p>');
                        b1nTPortal_loader('remove');
                    });
                } else if(b1nTPortal_response.status == 'expired') {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b1nTPortal_refresh_page();
            }
        });   
    }

    function b1nTPortal_load_transactions_page(nextF) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_transactions_page',
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        //if nextF is not passed in...
        if(typeof(nextF) === "function") {} else {
            b1nTPortal_clear_flags();
            b1nTPortal_loader();
        }

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_transactions_page.b1nTPortal_init(b1nTPortal_response.data);

                    //prioritize the nextF
                    if(typeof(nextF) === "function") { 
                        nextF(); 
                    } else {
                        b1nTPortal_loader('remove'); 
                    }
                } else {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        });  
    }

    function b1nTPortal_load_transactions_list(b1nTPortal_data_object, nextF) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_load_transactions_list',
            'b1nTPortal_offset': b1nTPortal_data_object.offset,
            'b1nTPortal_search': b1nTPortal_data_object.search,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        //if nextF is not passed in...
        if(typeof(nextF) === "function") {} else {
            b1nTPortal_clear_flags();
            b1nTPortal_loader();
        }

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_transactions_page.b1nTPortal_reload_transactions_list(b1nTPortal_response.data, b1nTPortal_data_object.control);

                    //prioritize the nextF
                    if(typeof(nextF) === "function") { 
                        nextF(); 
                    } else {
                        b1nTPortal_loader('remove'); 
                    }

                    //extra functionality posibilities
                    if(typeof(b1nTPortal_data_object.call_back) === "function") {
                        b1nTPortal_data_object.call_back();
                    }
                } else if(b1nTPortal_response.status == 'expired') {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        });  
    }

    function b1nTPortal_email_txn(b1nTPortal_data_object) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_email_txn',
            'b1nTPortal_txn_id': b1nTPortal_data_object.txn_id,
            'b1nTPortal_txn_email': b1nTPortal_data_object.txn_email,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_load_transactions_list(b1nTPortal_data_object, function() {
                        b1nTPortal_loader('remove');
                    });
                } else {
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b1nTPortal_refresh_page();
            }
        }); 
    }

    function b1nTPortal_load_payment_page() {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_payment_page',
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_payment_page.b1nTPortal_init(b1nTPortal_response.data);
                    b1nTPortal_loader('remove');
                } else {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        });  
    }

    function b1nTPortal_process_payment(b1nTPortal_args) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_process_payment',
            "b1nTPortal_payment_mode": b1nTPortal_args.payment_mode,
            "b1nTPortal_ccard_id": b1nTPortal_args.ccard_id,
            "b1nTPortal_transaction_id":b1nTPortal_args.transaction_id,
            'b1nTPortal_required_fields': b1nTPortal_args.required_fields,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        if(b1nTPortal_args.ccard_id * 1) {} else {
            b1nTPortal_form_data["b1nTPortal_ccard_first_name"] = b1nTPortal_args.ccard_first_name;
            b1nTPortal_form_data["b1nTPortal_ccard_last_name"] = b1nTPortal_args.ccard_last_name;
            b1nTPortal_form_data["b1nTPortal_ccard_address"] = b1nTPortal_args.ccard_address;
            b1nTPortal_form_data["b1nTPortal_ccard_address2"] = b1nTPortal_args.ccard_address2;
            b1nTPortal_form_data["b1nTPortal_ccard_city"] = b1nTPortal_args.ccard_city;
            b1nTPortal_form_data["b1nTPortal_ccard_state"] = b1nTPortal_args.ccard_state;
            b1nTPortal_form_data["b1nTPortal_ccard_zip"] = b1nTPortal_args.ccard_zip;
            b1nTPortal_form_data["b1nTPortal_ccard_country"] = b1nTPortal_args.ccard_country;
            b1nTPortal_form_data["b1nTPortal_ccard_phone"] = b1nTPortal_args.ccard_phone;
            b1nTPortal_form_data["b1nTPortal_ccard_email"] = b1nTPortal_args.ccard_email;
            b1nTPortal_form_data["b1nTPortal_ccard_number"] = b1nTPortal_args.ccard_number;
            b1nTPortal_form_data["b1nTPortal_ccard_exp_month"] = b1nTPortal_args.ccard_exp_month;
            b1nTPortal_form_data["b1nTPortal_ccard_exp_year"] = b1nTPortal_args.ccard_exp_year;
            b1nTPortal_form_data["b1nTPortal_ccard_cvv"] = b1nTPortal_args.ccard_cvv;
            b1nTPortal_form_data["b1nTPortal_ccard_store"] = b1nTPortal_args.ccard_store;
            b1nTPortal_form_data["b1nTPortal_ccard_make_primary"] = b1nTPortal_args.ccard_primary;
        }

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'validation_error'){
                    $.each(b1nTPortal_response.data.b1nTPortal_field_errors, function(b1nTPortal_field_key, b1nTPortal_field_value){
                        b1nTPortal_payment_page.b1nTPortal_validate_field(b1nTPortal_field_value, 1);
                    });
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                } else if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_load_transactions_page(function() {
                        $('#b1nTPortal_success_flag').append('<p class="b1nTPortal-success-msg">'+b1nTPortal_response.message+'</p>');
                        b1nTPortal_loader('remove');
                    });
                } else if(b1nTPortal_response.status == 'expired') {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                _b1nTPortal_refresh_page();
            }
        }); 
    }

    function b1nTPortal_load_reports_page() {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_reports_page',
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_reports_page.b1nTPortal_init(b1nTPortal_response.data);
                    b1nTPortal_loader('remove');
                } else {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        });   
    }

    function b1nTPortal_load_reports_output_page(b1nTPortal_id) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_reports_output_page',
            'b1nTPortal_report_id': b1nTPortal_id,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_reports_output_page.b1nTPortal_init(b1nTPortal_response.data);
                    b1nTPortal_loader('remove');
                } else {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        });  
    }

    function b1nTPortal_report_details(b1nTPortal_args) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_report_details',
            'b1nTPortal_report_id': b1nTPortal_args.report_id,
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        if(b1nTPortal_args.report_start_date) {
            b1nTPortal_form_data["b1nTPortal_report_start_date"] = $("#"+b1nTPortal_args.report_start_date).val();
        }

        if(b1nTPortal_args.report_end_date) {
            b1nTPortal_form_data["b1nTPortal_report_end_date"] = $("#"+b1nTPortal_args.report_end_date).val();
        }

        if(b1nTPortal_args.report_delivery_date) {
            b1nTPortal_form_data["b1nTPortal_report_delivery_date"] = $("#"+b1nTPortal_args.report_delivery_date).val();
        }

        if(b1nTPortal_args.report_month) {
            b1nTPortal_form_data["b1nTPortal_report_month"] = b1nTPortal_args.report_month;
        }

        if(b1nTPortal_args.report_year) {
            b1nTPortal_form_data["b1nTPortal_report_year"] = b1nTPortal_args.report_year;
        }

        if(b1nTPortal_args.report_jobsite_id) {
            b1nTPortal_form_data["b1nTPortal_report_jobsite_id"] = b1nTPortal_args.report_jobsite_id;
        }

        if(b1nTPortal_args.report_wo_type) {
            b1nTPortal_form_data["b1nTPortal_report_wo_type"] = b1nTPortal_args.report_wo_type;
        }

        if(b1nTPortal_args.check_boxes) {
            b1nTPortal_form_data["b1nTPortal_report_check_boxes"] = b1nTPortal_args.check_boxes;
        }

        if(b1nTPortal_args.report_sort_by) {
            b1nTPortal_form_data["b1nTPortal_report_sort_by"] = b1nTPortal_args.report_sort_by;
        }

        if(b1nTPortal_args.report_filter_by) {
            b1nTPortal_form_data["b1nTPortal_report_filter_by"] = b1nTPortal_args.report_filter_by;
        }

        if(b1nTPortal_args.report_list_by) {
            b1nTPortal_form_data["b1nTPortal_report_list_by"] = b1nTPortal_args.report_list_by;
        }

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    b1nTPortal_reports_output_page.b1nTPortal_build_report_details(b1nTPortal_response.data);
                    b1nTPortal_loader('remove');
                } else if(b1nTPortal_response.status == 'expired') {
                    b1nTPortal_log_out(function() {
                         $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    });
                } else {
                    $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    b1nTPortal_loader('remove');
                }
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        }); 
    }

    function b1nTPortal_set_datepicker(b1nTPortal_element, b1nTPortal_order_date, b1nTPortal_min_date, b1nTPortal_max_date) {
        $("#"+b1nTPortal_element).datepicker({
            dateFormat: "M dd, yy",
            minDate: b1nTPortal_min_date,
            maxDate: b1nTPortal_max_date,
            beforeShow: function(){
               $("#ui-datepicker-div").css("min-width", $(this).outerWidth()+"px");
               $("#ui-datepicker-div").attr("b1nTPortal_clicked_element", b1nTPortal_element);
            },
            onClose: function() {
                $("#ui-datepicker-div").removeAttr("b1nTPortal_clicked_element");
            }
        })

        $("#"+b1nTPortal_element).val(b1nTPortal_order_date);

        //attach a class to the ui date picker
        $("#ui-datepicker-div").addClass("b1nTPortal_all_page_datepicker");
    }

    function b1nTPortal_set_position(b1nTPortal_element, b1nTPortal_target_element) {
        $("#"+b1nTPortal_target_element).css("left", $("#"+b1nTPortal_element).offset().left);
        $("#"+b1nTPortal_target_element).css("top", ($("#"+b1nTPortal_element).offset().top+$("#"+b1nTPortal_element).outerHeight()));
    }

    function b1nTPortal_log_out(nextF) {
        var b1nTPortal_form_data = {
            'action': 'b1nTPortal_logout',
            'b1nTPortal_nonce': b1nTPortal_config.ajax_nonce
        };

        b1nTPortal_clear_flags();
        b1nTPortal_loader();

        $.ajax({
            url : b1nTPortal_config.ajax_url,
            type : 'post',
            data : b1nTPortal_form_data,
            success : function(b1nTPortal_data) {
                var b1nTPortal_response = JSON.parse(b1nTPortal_data);
                if(b1nTPortal_response.status == 'success') {
                    if(typeof(nextF) === "function") {} else {
                        $('#b1nTPortal_success_flag').append('<p class="b1nTPortal-success-msg">'+b1nTPortal_response.message+'</p>');
                    }
                } else {
                    if(typeof(nextF) === "function") {} else {
                        $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">'+b1nTPortal_response.message+'</p>');
                    }
                }

                //success or not we forcing a log out and loading the login page
                b1nTPortal_login_page.b1nTPortal_init(b1nTPortal_response.data.b1nTPortal_required_fields);

                //for aditional functionalities
                if(typeof(nextF) === "function") { nextF(); }

                b1nTPortal_loader('remove');
            }, error: function (error) {
                $('#b1nTPortal_failure_flag').append('<p class="b1nTPortal-error-msg">Oops, poor connection. Please reload page and try again.</p>');
                b1nTPortal_loader('remove');
            }
        }); 
    }
});