function b1nTPortal_transactions_page_template(b1nTPortal_arg_config) {
	var b1nTPortal_data = this;
	b1nTPortal_data.config = b1nTPortal_arg_config;

	//Choose to pass in the required fields here in case we want
	//to add special styling when creating and appending children
	this.b1nTPortal_init = function(b1nTPortal_extra_config) {
		var b1nTPortal_host_div = document.getElementById(b1nTPortal_data.config.hostDiv);
		var b1nTPortal_parent_div = document.getElementById(b1nTPortal_data.config.parentDiv);

		if(b1nTPortal_parent_div) {
			b1nTPortal_parent_div.style.maxWidth = "1000px";
		}

		//make sure host exists
		if(b1nTPortal_host_div) {
			{
				//factory reset
				b1nTPortal_host_div.innerHTML = "";
			}

			//wrapper div
			var b1nTPortal_wrapper_div = document.createElement("div");
			b1nTPortal_wrapper_div.setAttribute("id", "b1nTPortal_transactions_page_template");
			b1nTPortal_wrapper_div.setAttribute("class", "b1nTPortal_backend_template");

			{
				//limiter div
				var b1nTPortal_limiter_div = document.createElement("div");
				b1nTPortal_data.fields = {};                     //place holder for the fields
				b1nTPortal_data.transactions_list_offset = 0;       //offset place holder
				b1nTPortal_data.transactions_list_record_count = 0; //record count place holder
				b1nTPortal_data.tbTxnList = undefined;            //table control place holder

				{
					//header div
					var b1nTPortal_header_div = document.createElement("div");

					b1nTPortal_header_div.style.width = "100%";
					b1nTPortal_header_div.style.marginBottom = "30px";

					//build header
					if(typeof(b1nTPortal_data.config.header === "object")) {
						if(typeof(b1nTPortal_data.config.header.b1nTPortal_build_header) == "function") {
							var b1nTPortal_config = new Object();
							b1nTPortal_config.hostDiv = b1nTPortal_header_div;
							b1nTPortal_config.selected = "FINANCIALS";
							b1nTPortal_config.customerName = '<strong style="font-size: x-large;"">FINANCIALS</strong>';
							b1nTPortal_data.config.header.b1nTPortal_build_header(b1nTPortal_config);
						} 
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_header_div);
				}

				{ 
					var b1nTPortal_add_edit_div = document.createElement("div");

					b1nTPortal_add_edit_div.style.width = "100%";
					b1nTPortal_add_edit_div.style.paddingBottom = "10px";
					b1nTPortal_add_edit_div.style.display = "inline-block";

					{
						var b1nTPortal_button = document.createElement("input");
						b1nTPortal_button.setAttribute("type", "button");

						b1nTPortal_button.style.width = "125px";
						b1nTPortal_button.style.marginRight = "20px";

						b1nTPortal_button.value = "Make Payment";

						b1nTPortal_button.onclick = function() {
							var b1nTPortal_failure_flag = document.getElementById(b1nTPortal_data.config.failFlag);
							if(b1nTPortal_failure_flag) { b1nTPortal_failure_flag.innerHTML = ""; }	

							if(typeof(b1nTPortal_data.config.paymentNextF) === "function") {
								_b1nTPortal_clear_js_search_timeout();
								b1nTPortal_data.config.paymentNextF();
							}
						}

						b1nTPortal_add_edit_div.appendChild(b1nTPortal_button);
					}

					{
						var b1nTPortal_button = document.createElement("input");
						b1nTPortal_button.setAttribute("type", "button");

						b1nTPortal_button.style.width = "100px";
						b1nTPortal_button.style.marginRight = "20px";

						b1nTPortal_button.value = "Email";

						//set up dialog box for email
						var config = new Object();
						config.container = document.getElementById("b1nTPortal_dialog_box");
						config.overlay   = document.getElementById("b1nTPortal_ajax_shield");

						config.behaviors = function(b1nTPortal_content) {
							var b1nTPortal_email = b1nTPortal_extra_config.b1nTPortal_transactions_object_list_cust_email;
							_b1nTPortal_email_txn(b1nTPortal_data.config.emailNextF, b1nTPortal_data.tbTxnList.value, b1nTPortal_email, b1nTPortal_content);
		
						}

						b1nTPortal_data.b1nTPortal_email_txn = new b1nTPortal_slide_up_dialog(config);

						b1nTPortal_button.onclick = function() {
							if(b1nTPortal_data.tbTxnList && b1nTPortal_data.tbTxnList.b1nTPortal_validate()) {
								if(typeof(b1nTPortal_data.config.emailNextF) === "function" && typeof(b1nTPortal_extra_config) === "object") {
									_b1nTPortal_clear_js_search_timeout();
									b1nTPortal_data.b1nTPortal_email_txn.b1nTPortal_open("Email transactions");
								}
							}
						}

						b1nTPortal_add_edit_div.appendChild(b1nTPortal_button);
					}

					{
						var b1nTPortal_button = document.createElement("input");
						b1nTPortal_button.setAttribute("type", "textbox");
						b1nTPortal_button.setAttribute("placeholder", "Search");

						b1nTPortal_button.style.width  = "150px";
						b1nTPortal_button.style.borderRadius = "10px";
						b1nTPortal_button.style.textAlign = "center";

						b1nTPortal_button.onkeyup = function() {
							_b1nTPortal_clear_js_search_timeout();

							b1nTPortal_data.searchTimer = setTimeout(function() {
								if(typeof(b1nTPortal_data.config.loadListNextF) === "function") {
									_b1nTPortal_clear_js_search_timeout();

									//blur the search button
									b1nTPortal_data.jsSearch.blur();

									var b1nTPortal_data_object       = new Object();
									b1nTPortal_data_object.offset    = 0;
									b1nTPortal_data_object.control   = "refresh";
									b1nTPortal_data_object.search    = b1nTPortal_data.jsSearch.value;
									b1nTPortal_data_object.call_back = function() { b1nTPortal_data.jsSearch.focus(); };
									b1nTPortal_data.config.loadListNextF(b1nTPortal_data_object);
								}
							}, 1000);
						}

						b1nTPortal_data.jsSearch = b1nTPortal_button;

						b1nTPortal_add_edit_div.appendChild(b1nTPortal_button);
					}

					{
						var b1nTPortal_button = document.createElement("input");
						b1nTPortal_button.setAttribute("type", "button");

						b1nTPortal_button.style.width = "75px";
						b1nTPortal_button.style.cssFloat = "right";
						b1nTPortal_button.style.background = "#179101";

						b1nTPortal_button.value = "Refresh";

						b1nTPortal_button.onclick = function() {
							if(typeof(b1nTPortal_data.config.loadListNextF) === "function") {
								_b1nTPortal_clear_js_search_timeout();

								b1nTPortal_data.jsSearch.value = ""; //clear search bar
								var b1nTPortal_data_object     = new Object();
								b1nTPortal_data_object.offset  = 0;
								b1nTPortal_data_object.control = "refresh";
								b1nTPortal_data_object.search  = b1nTPortal_data.jsSearch.value;
								b1nTPortal_data.config.loadListNextF(b1nTPortal_data_object);
							}
						}

						b1nTPortal_add_edit_div.appendChild(b1nTPortal_button);
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_add_edit_div);
				}

				{
					var b1nTPortal_content_div_scroll = document.createElement("div");

					b1nTPortal_content_div_scroll.style.overflowX = "auto";

					var b1nTPortal_content_div = document.createElement("div");

					b1nTPortal_content_div.setAttribute("id", "b1nTPortal_transactions_page_transactions_list");

					b1nTPortal_content_div.style.width = "100%";
					b1nTPortal_content_div.style.minWidth = "520px";

					{
						var b1nTPortal_table_div = document.createElement("div");

						b1nTPortal_table_div.style.borderBottom = "1px solid #c3c3c3";
						b1nTPortal_table_div.style.borderTop = "1px solid #c3c3c3";

						var b1nTPortal_table = document.createElement("table");

						b1nTPortal_table.style.margin = "0px";
						b1nTPortal_table.style.border = "0px";
						b1nTPortal_table.style.width  = "100%";

						var b1nTPortal_table_tr = document.createElement("tr");

						{
							var b1nTPortal_table_tr_th = document.createElement("th");
							b1nTPortal_table_tr_th.innerHTML = "ID";

							b1nTPortal_table_tr_th.style.width = "100px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						{
							var b1nTPortal_table_tr_th = document.createElement("th");
							b1nTPortal_table_tr_th.innerHTML = "Type";

							b1nTPortal_table_tr_th.style.width = "100px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						{
							var b1nTPortal_table_tr_th = document.createElement("th");
							b1nTPortal_table_tr_th.innerHTML = "Date";

							b1nTPortal_table_tr_th.style.width = "100px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

												{
							var b1nTPortal_table_tr_th = document.createElement("th");
							b1nTPortal_table_tr_th.innerHTML = "Job Name";

							b1nTPortal_table_tr_th.style.width = "100px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						{
							var b1nTPortal_table_tr_th = document.createElement("th");
							b1nTPortal_table_tr_th.innerHTML = "Job Address";

							b1nTPortal_table_tr_th.style.width = "150px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						{
							var b1nTPortal_table_tr_th = document.createElement("th");
							b1nTPortal_table_tr_th.innerHTML = "Total";

							b1nTPortal_table_tr_th.style.width = "100px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "right";

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						{
							var b1nTPortal_table_tr_th = document.createElement("th");
							b1nTPortal_table_tr_th.innerHTML = "Balance";

							b1nTPortal_table_tr_th.style.width = "100px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "right";

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						b1nTPortal_table.appendChild(b1nTPortal_table_tr);
						b1nTPortal_table_div.appendChild(b1nTPortal_table);
						b1nTPortal_content_div.appendChild(b1nTPortal_table_div);
					}

					{
						var b1nTPortal_table_div = document.createElement("div");

						b1nTPortal_table_div.style.height = "500px";
						b1nTPortal_table_div.style.overflowY = "auto";

						//we need to store table wrapper div to use later
						b1nTPortal_data.fields["b1nTPortal_table_list_content_wrapper"] = b1nTPortal_table_div;

						b1nTPortal_table_div.onscroll = function() {
							if(!b1nTPortal_data.transactions_list_offset) { return; }
							if(b1nTPortal_data.transactions_list_offset == b1nTPortal_data.transactions_list_record_count) { return; }
						
							if(!b1nTPortal_data.fields) { return; }

							b1nTPortal_target_div = b1nTPortal_data.fields["b1nTPortal_table_list_content_wrapper"];

							if(!b1nTPortal_target_div) { return; }

							//make sure we only proceed when scrolling reaches the bottom
							if(Math.ceil(b1nTPortal_target_div.scrollTop) >= Math.floor(b1nTPortal_target_div.scrollHeight - b1nTPortal_target_div.offsetHeight)) {
								if(typeof(b1nTPortal_data.config.loadListNextF) === "function") {
									b1nTPortal_offset = b1nTPortal_data.transactions_list_offset;

									if(b1nTPortal_data.searchTimer) {
										_b1nTPortal_clear_js_search_timeout();
										b1nTPortal_offset = 0;
									}

									var b1nTPortal_data_object     = new Object();
									b1nTPortal_data_object.offset  = b1nTPortal_offset;
									b1nTPortal_data_object.control = "scroll_load";
									b1nTPortal_data_object.search  = b1nTPortal_data.jsSearch.value;
									b1nTPortal_data.config.loadListNextF(b1nTPortal_data_object);
								}
							}
						}

						//we need to store table wrapper div to use later
						b1nTPortal_data.fields["b1nTPortal_table_list_content_wrapper"] = b1nTPortal_table_div;

						var b1nTPortal_table  = document.createElement("table");

						b1nTPortal_table.style.margin = "0px";
						b1nTPortal_table.style.border = "0px";
						b1nTPortal_table.style.width  = "100%";

						var b1nTPortal_table_body = document.createElement("tbody");

						b1nTPortal_table.appendChild(b1nTPortal_table_body);
						b1nTPortal_table_div.appendChild(b1nTPortal_table);
						b1nTPortal_content_div.appendChild(b1nTPortal_table_div);

						//save the body to use later
						b1nTPortal_data.fields["b1nTPortal_table_list_content"] = b1nTPortal_table_body;
					}

					b1nTPortal_content_div_scroll.appendChild(b1nTPortal_content_div);
					b1nTPortal_limiter_div.appendChild(b1nTPortal_content_div_scroll);

					{
						var b1nTPortal_count_div_wrapper = document.createElement("div");

						b1nTPortal_count_div_wrapper.style.display = "flex";
						b1nTPortal_count_div_wrapper.style.justifyContent = "center";
						b1nTPortal_count_div_wrapper.style.borderTop = "1px solid #c3c3c3";
						b1nTPortal_count_div_wrapper.fontSize = "medium";

						var b1nTPortal_count_div = document.createElement("div");

						b1nTPortal_count_div.style.display = "inline-block";
						b1nTPortal_count_div.style.padding = "4px";
						b1nTPortal_count_div.style.marginTop = "5px";
						b1nTPortal_count_div.style.borderRadius = "10px";
						b1nTPortal_count_div.style.backgroundColor = "#d3d3d3";

						{
							var b1nTPortal_span = document.createElement("span");
							b1nTPortal_count_div.appendChild(b1nTPortal_span);

							//store span for later use
							b1nTPortal_data.fields["b1nTPortal_table_list_content_offset"] = b1nTPortal_span;
						}

						{
							var b1nTPortal_span = document.createElement("span");
							b1nTPortal_span.innerHTML = "<strong>/</strong>";
							b1nTPortal_count_div.appendChild(b1nTPortal_span);
						}					

						{
							var b1nTPortal_span = document.createElement("span");
							b1nTPortal_count_div.appendChild(b1nTPortal_span);	

							//store span for later use
							b1nTPortal_data.fields["b1nTPortal_table_list_content_record_count"] = b1nTPortal_span;
						}

						b1nTPortal_count_div_wrapper.appendChild(b1nTPortal_count_div);
						b1nTPortal_limiter_div.appendChild(b1nTPortal_count_div_wrapper);
					}

					if(typeof(b1nTPortal_extra_config) === "object") {
						var b1nTPortal_list = b1nTPortal_extra_config.b1nTPortal_transactions_object_list;
						var b1nTPortal_record_count = b1nTPortal_extra_config.b1nTPortal_transactions_object_list_record_count;
						var b1nTPortal_offset = b1nTPortal_extra_config.b1nTPortal_transactions_object_list_offset;
						_b1nTPortal_load_transactions_list(b1nTPortal_list, b1nTPortal_record_count, b1nTPortal_offset);
					}
				}

				{
					var b1nTPortal_div_pop_up_shield = document.createElement("div");

					b1nTPortal_div_pop_up_shield.style.display = "none";
					b1nTPortal_div_pop_up_shield.style.position = "absolute";
					b1nTPortal_div_pop_up_shield.style.bottom = "0px";
					b1nTPortal_div_pop_up_shield.style.left = "0px";
					b1nTPortal_div_pop_up_shield.style.width = "100%";
					b1nTPortal_div_pop_up_shield.style.height = "100%";
					b1nTPortal_div_pop_up_shield.style.opacity = "0.5";
					b1nTPortal_div_pop_up_shield.style.zIndex = "997";
					b1nTPortal_div_pop_up_shield.style.backgroundColor = "#efeeee";

					b1nTPortal_limiter_div.appendChild(b1nTPortal_div_pop_up_shield);

					//store for later use
					b1nTPortal_data.fields["b1nTPortal_div_pop_up_shield"] = b1nTPortal_div_pop_up_shield;
				}

				{
					b1nTPortal_div_pop_up_dialog = document.createElement("div");

					b1nTPortal_div_pop_up_dialog.style.display = "none";
					b1nTPortal_div_pop_up_dialog.style.position = "absolute";
					b1nTPortal_div_pop_up_dialog.style.bottom = "0px";
					b1nTPortal_div_pop_up_dialog.style.left = "0px";
					b1nTPortal_div_pop_up_dialog.style.width = "100%";
					b1nTPortal_div_pop_up_dialog.style.zIndex = "998";
					b1nTPortal_div_pop_up_dialog.style.backgroundColor = "#f3f3f3";

					b1nTPortal_limiter_div.appendChild(b1nTPortal_div_pop_up_dialog);

					//store for later use
					b1nTPortal_data.fields["b1nTPortal_div_pop_up_dialog"] = b1nTPortal_div_pop_up_dialog;
				}	

				//finalize structure
				b1nTPortal_wrapper_div.appendChild(b1nTPortal_limiter_div);
			}

			b1nTPortal_host_div.appendChild(b1nTPortal_wrapper_div);

			_b1nTPortal_observer();
		}
	}

	function _b1nTPortal_format_for_currency(b1nTPortal_number, b1nTPortal_rms) {
		var b1nTPortal_value = (b1nTPortal_number*1).toLocaleString("en-US", {style:"currency", currency:"USD"});
		var b1nTPortal_value_formatted = b1nTPortal_rms ? String(b1nTPortal_value).replace("$", '') : String(b1nTPortal_value).replace("$", '$ ');
		return b1nTPortal_value_formatted;
	}

	function _b1nTPortal_clear_js_search_timeout() {
		clearTimeout(b1nTPortal_data.searchTimer);
		b1nTPortal_data.searchTimer = null;	
	}
	
	//dynamic blend
	function _b1nTPortal_observer() {
		var b1nTPortal_resize_observer = new ResizeObserver(function() {
			var b1nTPortal_div = document.getElementById("b1nTPortal_transactions_page_template");

			if(b1nTPortal_div) {} else {
				b1nTPortal_resize_observer.disconnect();
				return; //skip evaluations
			}

			//get offset
			var b1nTPortal_div_width = b1nTPortal_div.offsetWidth;

			var b1nTPortal_class_array = new Array();

			if(b1nTPortal_div_width <= 550) {
				b1nTPortal_class_array.push("b1nTPortal_transactions_page_template_mw550");
			}

			if(b1nTPortal_div_width <= 727) {
				b1nTPortal_class_array.push("b1nTPortal_transactions_page_template_mw727");
			}

			if(b1nTPortal_div_width <= 839) {
				b1nTPortal_class_array.push("b1nTPortal_transactions_page_template_mw839");
			}

			var b1nTPortal_class_array_string = b1nTPortal_class_array.join(" ");
			b1nTPortal_div.className = b1nTPortal_class_array_string;
		});

		var b1nTPortal_div = document.getElementById("b1nTPortal_transactions_page_template");
		b1nTPortal_resize_observer.observe(b1nTPortal_div);
	}

	function _b1nTPortal_email_txn(b1nTPortal_nextF, b1nTPortal_value, b1nTPortal_cust_email, b1nTPortal_content) {
		//content
		var b1nTPortal_email_input = document.createElement("input");

		b1nTPortal_email_input.setAttribute("type", "textbox");
		b1nTPortal_email_input.setAttribute("placeholder", "abcdefg@hotmail.com");
		b1nTPortal_email_input.value = b1nTPortal_cust_email;

		{

			var b1nTPortal_div_pop_up_content_row = document.createElement("div");
			b1nTPortal_div_pop_up_content_row.appendChild(b1nTPortal_email_input);
			b1nTPortal_content.appendChild(b1nTPortal_div_pop_up_content_row);
		}

		{
			var b1nTPortal_div_pop_up_buttons = document.createElement("div");

			b1nTPortal_div_pop_up_buttons.style.display = "flex";
			b1nTPortal_div_pop_up_buttons.style.gap = "5px";
			b1nTPortal_div_pop_up_buttons.style.padding = "10px 1px 10px 10px";
			b1nTPortal_div_pop_up_buttons.style.justifyContent = "flex-end";

			{
				var b1nTPortal_div_pop_up_button_wrapper = document.createElement("div");
				var b1nTPortal_div_pop_up_ok_button = document.createElement("input");

				b1nTPortal_div_pop_up_ok_button.setAttribute("type", "button");

				b1nTPortal_div_pop_up_ok_button.style.width = "100px";
				b1nTPortal_div_pop_up_ok_button.value = "Send";

				b1nTPortal_div_pop_up_ok_button.onclick = function() {
					if(!_b1nTPortal_validate_field(b1nTPortal_email_input)) {
						var b1nTPortal_data_object       = new Object();
						b1nTPortal_data_object.offset    = 0;
						b1nTPortal_data_object.control   = "refresh";
						b1nTPortal_data_object.search    = b1nTPortal_data.jsSearch.value;
						b1nTPortal_data_object.txn_id    = b1nTPortal_value;
						b1nTPortal_data_object.txn_email = b1nTPortal_email_input.value;
						b1nTPortal_nextF(b1nTPortal_data_object);
						b1nTPortal_data.b1nTPortal_email_txn.b1nTPortal_close();
					}
				}

				b1nTPortal_div_pop_up_button_wrapper.appendChild(b1nTPortal_div_pop_up_ok_button);
				b1nTPortal_div_pop_up_buttons.appendChild(b1nTPortal_div_pop_up_button_wrapper);
			}

			b1nTPortal_content.appendChild(b1nTPortal_div_pop_up_buttons);
		}
	}

	//validate a field.
	function _b1nTPortal_validate_field(b1nTPortal_field_element) {
		if(b1nTPortal_field_element) {
			b1nTPortal_field_element.style.border = "solid 1px #ddd";

			if(!b1nTPortal_field_element.value) {
				b1nTPortal_field_element.style.border = "solid 1px #ff0000";
				return 1;
			}
		}
		return 0;
	}

	//load jobsite list
	function _b1nTPortal_load_transactions_list(b1nTPortal_list, b1nTPortal_record_count, b1nTPortal_offset) {	
		if(b1nTPortal_data.fields) {
			var b1nTPortal_table_wrapper = b1nTPortal_data.fields["b1nTPortal_table_list_content_wrapper"];
			var b1nTPortal_table_tbody = b1nTPortal_data.fields["b1nTPortal_table_list_content"];
			var b1nTPortal_record_count_span = b1nTPortal_data.fields["b1nTPortal_table_list_content_record_count"];
			var b1nTPortal_offset_span = b1nTPortal_data.fields["b1nTPortal_table_list_content_offset"];

			//make a table control
			if(!b1nTPortal_data.tbTxnList) {
				var b1nTPortal_tbTxnListObj = new Object();
				b1nTPortal_tbTxnListObj.table_wrapper = b1nTPortal_table_wrapper;
				b1nTPortal_data.tbTxnList = new b1nTPortal_table_control(b1nTPortal_tbTxnListObj);
			} 

			if(b1nTPortal_table_tbody && b1nTPortal_record_count_span && b1nTPortal_offset_span) {
				//build table trs
				b1nTPortal_list.forEach(function(b1nTPortal_value, b1nTPortal_index) {
					var b1nTPortal_table_tr = document.createElement("tr");

					b1nTPortal_table_tr.setAttribute("id", "paymentList_"+b1nTPortal_value.ID);
					b1nTPortal_table_tr.setAttribute("txntype", b1nTPortal_value.Type);

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "100px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.ID;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "100px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.Type;

						if(b1nTPortal_value.DateEmailed * 1) {
							var b1nTPortal_img = document.createElement("img");

							b1nTPortal_img.style.height = "0.9em";
							b1nTPortal_img.style.display = "inline-block";
							b1nTPortal_img.style.verticalAlign = "middle";
							b1nTPortal_img.style.marginLeft = "5px";

							b1nTPortal_img.setAttribute("src", b1nTPortal_data.config.image_url+"email.png");

							b1nTPortal_table_tr_td.appendChild(b1nTPortal_img);
						}

						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "100px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.TxnDateString;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "100px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.Type == "Payment" ? "---" : b1nTPortal_value.JobName;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "150px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.Type == "Payment" ? "---" : b1nTPortal_value.Address;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "100px";
						b1nTPortal_table_tr_td.style.border = "0px";
						b1nTPortal_table_tr_td.style.textAlign = "right";

						b1nTPortal_table_tr_td.innerHTML = _b1nTPortal_format_for_currency((b1nTPortal_value.Total*1).toFixed(2), 1);
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "100px";
						b1nTPortal_table_tr_td.style.border = "0px";
						b1nTPortal_table_tr_td.style.textAlign = "right";

						b1nTPortal_table_tr_td.innerHTML = _b1nTPortal_format_for_currency((b1nTPortal_value.OpenBal*1).toFixed(2), 1);
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					b1nTPortal_data.tbTxnList.b1nTPortal_attach_handlers(b1nTPortal_table_tr);

					b1nTPortal_table_tbody.appendChild(b1nTPortal_table_tr);
				});

				b1nTPortal_offset_span.innerHTML = "<strong>"+b1nTPortal_offset+"</strong>";
				b1nTPortal_record_count_span.innerHTML = "<strong>"+b1nTPortal_record_count+"</strong>";

				//store the offset/record count for later use
				b1nTPortal_data.transactions_list_offset = b1nTPortal_offset;
				b1nTPortal_data.transactions_list_record_count = b1nTPortal_record_count;
			}
		}
	}

	//reload jobsite list
	this.b1nTPortal_reload_transactions_list = function(b1nTPortal_extra_config, b1nTPortal_control) {
		if(!b1nTPortal_data.fields) { return; }

		var b1nTPortal_table_wrapper = b1nTPortal_data.fields["b1nTPortal_table_list_content_wrapper"];
		var b1nTPortal_table_tbody = b1nTPortal_data.fields["b1nTPortal_table_list_content"];
		var b1nTPortal_record_count_span = b1nTPortal_data.fields["b1nTPortal_table_list_content_record_count"];
		var b1nTPortal_offset_span = b1nTPortal_data.fields["b1nTPortal_table_list_content_offset"];

		if(!b1nTPortal_table_tbody || !b1nTPortal_record_count_span || !b1nTPortal_offset_span || !b1nTPortal_table_wrapper) { return; }

		//clear divs if refreshing
		if(b1nTPortal_control == "refresh") {
			b1nTPortal_table_tbody.innerHTML = "";
			b1nTPortal_record_count_span.innerHTML = "0";
			b1nTPortal_offset_span.innerHTML = "0";
			b1nTPortal_data.tbTxnList = undefined;

			//scroll to top if its a refresh
			b1nTPortal_table_wrapper.scrollTop = 0;
		}

		//re populate
		if(typeof(b1nTPortal_extra_config) === "object") {
			var b1nTPortal_list = b1nTPortal_extra_config.b1nTPortal_transactions_object_list;
			var b1nTPortal_record_count = b1nTPortal_extra_config.b1nTPortal_transactions_object_list_record_count;
			var b1nTPortal_offset = b1nTPortal_extra_config.b1nTPortal_transactions_object_list_offset;
			_b1nTPortal_load_transactions_list(b1nTPortal_list, b1nTPortal_record_count, b1nTPortal_offset);
		}
	}

	//set some defaults
	var _b1nTPortal_defaults = function() {
		if(b1nTPortal_data.config.parentDiv == undefined) { b1nTPortal_data.config.parentDiv = "b1nTPortal_template_wrapper" }
		if(b1nTPortal_data.config.hostDiv == undefined) { b1nTPortal_data.config.hostDiv = "b1nTPortal_template"; }
		if(b1nTPortal_data.config.failFlag == undefined) { b1nTPortal_data.config.failFlag = "b1nTPortal_failure_flag"; }
	} 

	_b1nTPortal_defaults();
	return this;
}