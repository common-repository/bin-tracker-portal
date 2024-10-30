function b1nTPortal_payment_page_template(b1nTPortal_arg_config) {
	var b1nTPortal_data = this;
	b1nTPortal_data.config = b1nTPortal_arg_config;

	//Choose to pass in the required fields here in case we want
	//to add special styling when creating and appending children
	this.b1nTPortal_init = function(b1nTPortal_extra_config) {
		var b1nTPortal_host_div = document.getElementById(b1nTPortal_data.config.hostDiv);
		var b1nTPortal_parent_div = document.getElementById(b1nTPortal_data.config.parentDiv);

		if(b1nTPortal_parent_div) {
			b1nTPortal_parent_div.style.maxWidth = "550px";
		}

		//make sure host exists
		if(b1nTPortal_host_div) {
			{
				//factory reset
				b1nTPortal_host_div.innerHTML = "";
				if(b1nTPortal_data.fields) { b1nTPortal_data.fields = undefined; };
				if(b1nTPortal_data.required_fields) { b1nTPortal_data.required_fields = undefined; };

				//make sure the element passed in is an array
				if(Array.isArray(b1nTPortal_extra_config.b1nTPortal_required_fields)) {
					b1nTPortal_data.required_fields = b1nTPortal_extra_config.b1nTPortal_required_fields;
				}
			}

			//wrapper div
			var b1nTPortal_wrapper_div = document.createElement("div");
			b1nTPortal_wrapper_div.setAttribute("id", "b1nTPortal_payment_page_template");
			b1nTPortal_wrapper_div.setAttribute("class", "b1nTPortal_backend_template");

			{
				//limiter div
				var b1nTPortal_limiter_div = document.createElement("div");
				b1nTPortal_data.fields = {}; //place holder for the fields
				b1nTPortal_data.ccard_mask_objects = {}; //place holder for ccards masks

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
							b1nTPortal_config.customerName = '<strong style="font-size: x-large;"">MAKE PAYMENT</strong>';
							b1nTPortal_data.config.header.b1nTPortal_build_header(b1nTPortal_config);
						} 
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_header_div);
				}

				{
					var b1nTPortal_radio_update_visuals = function(b1nTPortal_radio_choice) {
						var b1nTPortal_radio_choice_one = b1nTPortal_data.fields["b1nTPortal_div_radio_wrapper_invoice_balance"];
						var b1nTPortal_radio_choice_two = b1nTPortal_data.fields["b1nTPortal_div_radio_wrapper_customer_balance"];

						switch(b1nTPortal_radio_choice) {
							case 1:
								b1nTPortal_radio_choice_one.style.backgroundColor = "#f5f5f5";
								b1nTPortal_radio_choice_two.style.backgroundColor = "transparent";
								break;
							case 2:
								b1nTPortal_radio_choice_one.style.backgroundColor = "transparent";
								b1nTPortal_radio_choice_two.style.backgroundColor = "#f5f5f5";
								break;
						}
					}

					var b1nTPortal_div_table = document.createElement("div");
					b1nTPortal_div_table.style.display = "flex";
					b1nTPortal_div_table.style.flexDirection = "column";
					b1nTPortal_div_table.style.gap = "2px";
					b1nTPortal_div_table.style.marginBottom = "10px";
					b1nTPortal_div_table.style.border = "1px solid #d5d5d5";
					b1nTPortal_div_table.style.boxShadow = "rgb(207 207 207) 3px 3px 9px";

					{
						var b1nTPortal_div_radio_wrapper = document.createElement("div");

						b1nTPortal_div_radio_wrapper.style.display = "flex";
						b1nTPortal_div_radio_wrapper.style.borderBottom = "1px dotted #b8b8b8";

						{
							var b1nTPortal_div_radio_one = document.createElement("div");

							b1nTPortal_div_radio_one.style.margin = "auto";
							b1nTPortal_div_radio_one.style.paddingRight = "5px";

							var b1nTPortal_pay_option_radio_one = document.createElement("input");
							b1nTPortal_pay_option_radio_one.setAttribute("type", "radio");
							b1nTPortal_pay_option_radio_one.setAttribute("name", "b1nTPortal_payment_options");

							b1nTPortal_pay_option_radio_one.checked = true;

							b1nTPortal_pay_option_radio_one.onclick = function() {
								b1nTPortal_radio_update_visuals(1);
							}

							//put it together
							b1nTPortal_div_radio_one.appendChild(b1nTPortal_pay_option_radio_one);
							b1nTPortal_div_radio_wrapper.appendChild(b1nTPortal_div_radio_one);

							//store the radio for later use
							b1nTPortal_data.fields["b1nTPortal_pay_option_radio_one"] = b1nTPortal_pay_option_radio_one;
						}

						{
							var b1nTPortal_div_radio_content = document.createElement("div");

							b1nTPortal_div_radio_content.style.flexGrow = "1";
							b1nTPortal_div_radio_content.style.display = "flex";
							b1nTPortal_div_radio_content.style.gap = "10px";

							{
								//invoice
								b1nTPortal_div_row = _b1nTPortal_create_rows("INVOICE(S)", "", "b1nTPortal_transaction_list", "textbox", 1);

								b1nTPortal_div_row.firstChild.style.width = "auto";

								b1nTPortal_data.fields["b1nTPortal_transaction_list"].style.backgroundColor = "transparent";
								b1nTPortal_data.fields["b1nTPortal_transaction_list"].style.border = "0px";

								b1nTPortal_div_radio_content.appendChild(b1nTPortal_div_row);
							}

							{
								//total
								b1nTPortal_div_row = _b1nTPortal_create_rows("TOTAL", _b1nTPortal_format_for_currency((0).toFixed(2), 0), "b1nTPortal_transaction_total", "textbox", 2);

								b1nTPortal_div_row.firstChild.style.width = "auto";

								b1nTPortal_data.fields["b1nTPortal_transaction_total"].style.backgroundColor = "transparent";
								b1nTPortal_data.fields["b1nTPortal_transaction_total"].style.border = "0px";

								b1nTPortal_div_radio_content.appendChild(b1nTPortal_div_row);
							}

							b1nTPortal_div_radio_wrapper.appendChild(b1nTPortal_div_radio_content);
						}

						b1nTPortal_div_table.appendChild(b1nTPortal_div_radio_wrapper);

						//store for later use
						b1nTPortal_data.fields["b1nTPortal_div_radio_wrapper_invoice_balance"] = b1nTPortal_div_radio_wrapper;
					}

					{
						var b1nTPortal_div_radio_wrapper = document.createElement("div");

						b1nTPortal_div_radio_wrapper.style.display = "flex";

						{
							var b1nTPortal_div_radio_two = document.createElement("div");

							b1nTPortal_div_radio_two.style.margin = "auto";
							b1nTPortal_div_radio_two.style.paddingRight = "5px";

							var b1nTPortal_pay_option_radio_two = document.createElement("input");
							b1nTPortal_pay_option_radio_two.setAttribute("type", "radio");
							b1nTPortal_pay_option_radio_two.setAttribute("name", "b1nTPortal_payment_options");

							b1nTPortal_pay_option_radio_two.onclick = function() {
								b1nTPortal_radio_update_visuals(2);
							}

							//put it together
							b1nTPortal_div_radio_two.appendChild(b1nTPortal_pay_option_radio_two);
							b1nTPortal_div_radio_wrapper.appendChild(b1nTPortal_div_radio_two);

							//store the radio for later use
							b1nTPortal_data.fields["b1nTPortal_pay_option_radio_two"] = b1nTPortal_pay_option_radio_two;
						}

						{
							var b1nTPortal_div_radio_content = document.createElement("div");

							b1nTPortal_div_radio_content.style.flexGrow = "1";
							b1nTPortal_div_radio_content.style.display = "flex";
							b1nTPortal_div_radio_content.style.gap = "10px";

							//customer balance
							var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_customer_balance : 0;
							b1nTPortal_div_row = _b1nTPortal_create_rows("CUST. BALANCE", _b1nTPortal_format_for_currency((b1nTPortal_value*1).toFixed(2), 0), "b1nTPortal_customer_balance", "textbox", 1);

							b1nTPortal_div_row.style.width = "100%";

							b1nTPortal_div_row.firstChild.style.width = "auto";

							b1nTPortal_data.fields["b1nTPortal_customer_balance"].style.backgroundColor = "transparent";
							b1nTPortal_data.fields["b1nTPortal_customer_balance"].style.border = "0px";

							b1nTPortal_div_radio_content.appendChild(b1nTPortal_div_row);

							b1nTPortal_div_radio_wrapper.appendChild(b1nTPortal_div_radio_content);
						}

						b1nTPortal_div_table.appendChild(b1nTPortal_div_radio_wrapper);

						//store for later use
						b1nTPortal_data.fields["b1nTPortal_div_radio_wrapper_customer_balance"] = b1nTPortal_div_radio_wrapper;
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_div_table);

					//set a radio by default
					b1nTPortal_radio_update_visuals(1);
				}

				{

					var b1nTPortal_content_div = document.createElement("div");

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

							b1nTPortal_table_tr_th.style.width = "50px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";
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

						b1nTPortal_table_div.style.borderBottom = "1px solid #c3c3c3";
						b1nTPortal_table_div.style.height = "200px";
						b1nTPortal_table_div.style.overflowY = "auto";

						var b1nTPortal_table = document.createElement("table");

						b1nTPortal_table.style.margin = "0px";
						b1nTPortal_table.style.border = "0px";
						b1nTPortal_table.style.width  = "100%";

						var b1nTPortal_table_body = document.createElement("tbody");

						//save the body to use later
						b1nTPortal_data.fields["b1nTPortal_txn_list_content"] = b1nTPortal_table_body;

						b1nTPortal_table.appendChild(b1nTPortal_table_body);
						b1nTPortal_table_div.appendChild(b1nTPortal_table);
						b1nTPortal_content_div.appendChild(b1nTPortal_table_div);
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_content_div);

					if(typeof(b1nTPortal_extra_config) === "object") {
						var b1nTPortal_list = b1nTPortal_extra_config.b1nTPortal_transaction_list;
						_b1nTPortal_load_transactions_list(b1nTPortal_list);
					}
				}

				{
					var b1nTPortal_div_table = document.createElement("div");
					b1nTPortal_div_table.style.display = "flex";
					b1nTPortal_div_table.style.flexDirection = "column";
					b1nTPortal_div_table.style.gap = "2px";
					b1nTPortal_div_table.style.marginBottom = "20px";

					//credit card
					var b1nTPortal_value_ccard_wrapper = document.createElement("div");
					b1nTPortal_value_ccard_wrapper.style.display = "flex";
					b1nTPortal_value_ccard_wrapper.style.marginTop = "10px";

					var b1nTPortal_ccard_field_set = document.createElement("fieldset");

					b1nTPortal_ccard_field_set.style.padding = "15px";
					b1nTPortal_ccard_field_set.style.borderRadius = "5px";
					b1nTPortal_ccard_field_set.style.width = "100%";

					var b1nTPortal_ccard_field_set_legend = document.createElement("legend");
					b1nTPortal_ccard_field_set_legend.innerHTML = "<strong>Credit Card</strong>";
					b1nTPortal_ccard_field_set.appendChild(b1nTPortal_ccard_field_set_legend);

					{
						var b1nTPortal_ccard_mask = document.createElement("select");

						b1nTPortal_ccard_mask.style.border = "2px solid";
						b1nTPortal_ccard_mask.style.borderRadius = "20px";
						b1nTPortal_ccard_mask.style.padding = "1px 10px";
						b1nTPortal_ccard_mask.style.cursor = "pointer";
						b1nTPortal_ccard_mask.style.fontWeight = "bold";
						b1nTPortal_ccard_mask.style.textAlign = "center";
						b1nTPortal_ccard_mask.style.boxShadow = "3px 3px 10px #808080";
						b1nTPortal_ccard_mask.style.lineHeight = "25px";

						b1nTPortal_ccard_mask.setAttribute("class", "b1nTPortal_no_appearance_all_browsers");

						//add new card option
						var b1nTPortal_ccard_mask_option = document.createElement("option");
						b1nTPortal_ccard_mask_option.value = "-1";
						b1nTPortal_ccard_mask_option.innerHTML = "One Time Payment";
						b1nTPortal_ccard_mask.appendChild(b1nTPortal_ccard_mask_option);

						//store the mask for later use
						b1nTPortal_data.fields["b1nTPortal_ccard_mask"] = b1nTPortal_ccard_mask;

						var b1nTPortal_clear_ccard_fields = function() {
							//clear the failure if posible.
							var b1nTPortal_failure_flag = document.getElementById(b1nTPortal_data.config.failFlag);
							if(b1nTPortal_failure_flag) { b1nTPortal_failure_flag.innerHTML = ""; }	

							b1nTPortal_data.fields["b1nTPortal_ccard_first_name"].value = "";
							b1nTPortal_data.fields["b1nTPortal_ccard_last_name"].value = "";
							b1nTPortal_data.fields["b1nTPortal_ccard_address"].value = "";
							b1nTPortal_data.fields["b1nTPortal_ccard_address2"].value = "";
							b1nTPortal_data.fields["b1nTPortal_ccard_city"].value = "";
							b1nTPortal_data.fields["b1nTPortal_ccard_state"].value = "";
							b1nTPortal_data.fields["b1nTPortal_ccard_zip"].value = "";
							b1nTPortal_data.fields["b1nTPortal_ccard_country"].value = "";
							b1nTPortal_data.fields["b1nTPortal_ccard_phone"].value = "";
							b1nTPortal_data.fields["b1nTPortal_ccard_email"].value = "";
							b1nTPortal_data.fields["b1nTPortal_ccard_number"].value = "";
							b1nTPortal_data.fields["b1nTPortal_ccard_exp_month"].value = "";
							b1nTPortal_data.fields["b1nTPortal_ccard_exp_year"].value = "";
							b1nTPortal_data.fields["b1nTPortal_ccard_cvv"].value = "";	

							//revert back to default states
							b1nTPortal_data.fields["b1nTPortal_ccard_store"].checked = false;
							b1nTPortal_data.fields["b1nTPortal_ccard_make_primary_wrapper"].style.display = "none";
							b1nTPortal_data.fields["b1nTPortal_ccard_make_primary"].checked = false;
						}

						var b1nTPortal_update_mask_visuals = function(b1nTPortal_value) {
							var b1nTPortal_ccard_object = b1nTPortal_data.ccard_mask_objects[b1nTPortal_value];

							var b1nTPortal_ccard_valid = 0;
							if(b1nTPortal_ccard_object) {
								b1nTPortal_ccard_valid = b1nTPortal_ccard_object.Valid;
							} 

							if(b1nTPortal_ccard_valid * 1) {
								b1nTPortal_ccard_mask.style.borderColor = "#64A233";
								b1nTPortal_ccard_mask.style.backgroundColor = "#E1FFC8";
							} else {
								b1nTPortal_ccard_mask.style.borderColor = "#FF0000";
								b1nTPortal_ccard_mask.style.backgroundColor = "#FFE1E1";
							}
						}

						var b1nTPortal_update_mask_value = function(b1nTPortal_value) {
							b1nTPortal_ccard_mask.value = b1nTPortal_value;
							b1nTPortal_update_mask_visuals(b1nTPortal_value);
						}

						if(typeof(b1nTPortal_extra_config) === "object" && Array.isArray(b1nTPortal_extra_config.b1nTPortal_transaction_ccard_mask)) {
							var b1nTPortal_primary_ccard;
							b1nTPortal_extra_config.b1nTPortal_transaction_ccard_mask.forEach(function(value, index) {
								var b1nTPortal_ccard_mask_string = value.TypeAbrv+": "+value.Mask;
								if(value.PrimaryCard * 1) { b1nTPortal_ccard_mask_string += " (P)"; }

								b1nTPortal_ccard_mask_option = document.createElement("option");
								b1nTPortal_ccard_mask_option.value = value.ID;
								b1nTPortal_ccard_mask_option.innerHTML = b1nTPortal_ccard_mask_string;
								b1nTPortal_ccard_mask.appendChild(b1nTPortal_ccard_mask_option);

								//map the ccards for later use
								b1nTPortal_data.ccard_mask_objects[value.ID] = value;

								if(value.PrimaryCard * 1) {
									b1nTPortal_primary_ccard = value; 	
								} else if(index == 0) {
									b1nTPortal_primary_ccard = value;
								}
							});

							//update
							if(b1nTPortal_primary_ccard) {
								b1nTPortal_update_mask_value(b1nTPortal_primary_ccard.ID);
							} 
						} 

						b1nTPortal_ccard_field_set.appendChild(b1nTPortal_ccard_mask);

						b1nTPortal_ccard_mask.onchange = function() {
							//updates that should happen on change
							b1nTPortal_update_mask_visuals(this.value);

							//get the ccard information div and lets do some work
							var b1nTPortal_ccard_information_div = b1nTPortal_data.fields["b1nTPortal_ccard_information_div"];

							if(this.value * 1 == -1) {
								b1nTPortal_ccard_information_div.style.display = "flex";
							} else {
								b1nTPortal_ccard_information_div.style.display = "none";
							}

							b1nTPortal_clear_ccard_fields();
						}
					}

					b1nTPortal_value_ccard_wrapper.appendChild(b1nTPortal_ccard_field_set);
					b1nTPortal_div_table.appendChild(b1nTPortal_value_ccard_wrapper);
					b1nTPortal_limiter_div.appendChild(b1nTPortal_div_table);
				}

				{
					var b1nTPortal_div_table = document.createElement("div");

					//on load display
					if(b1nTPortal_data.fields["b1nTPortal_ccard_mask"].value >= 0) {
						b1nTPortal_div_table.style.display = "none";
					} else {
						b1nTPortal_div_table.style.display = "flex";
					}

					b1nTPortal_div_table.style.flexDirection = "column";
					b1nTPortal_div_table.style.gap = "2px";

					{
						//first name
						b1nTPortal_div_row = _b1nTPortal_create_rows("First Name", "", "b1nTPortal_ccard_first_name", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//last name
						b1nTPortal_div_row = _b1nTPortal_create_rows("Last Name", "", "b1nTPortal_ccard_last_name", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//address
						b1nTPortal_div_row = _b1nTPortal_create_rows("Address", "", "b1nTPortal_ccard_address", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//address2
						b1nTPortal_div_row = _b1nTPortal_create_rows("Address2", "", "b1nTPortal_ccard_address2", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//city
						b1nTPortal_div_row = _b1nTPortal_create_rows("City", "", "b1nTPortal_ccard_city", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//state
						var b1nTPortal_list  = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_list_of_state : new Array();
						b1nTPortal_div_row = _b1nTPortal_create_select_rows("State", "", "b1nTPortal_ccard_state", b1nTPortal_list, 0, "state");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//zip
						b1nTPortal_div_row = _b1nTPortal_create_rows("Zip", "", "b1nTPortal_ccard_zip", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//state
						var b1nTPortal_list  = new Array({ "short": "US", "long": "United States" }, { "short": "CA", "long": "Canada" });
						b1nTPortal_div_row = _b1nTPortal_create_select_rows("Country", "", "b1nTPortal_ccard_country", b1nTPortal_list, 0, "country");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//phone
						b1nTPortal_div_row = _b1nTPortal_create_rows("Phone", "", "b1nTPortal_ccard_phone", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}


					{
						//email
						b1nTPortal_div_row = _b1nTPortal_create_rows("Email", "", "b1nTPortal_ccard_email", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}


					{
						//card number
						b1nTPortal_div_row = _b1nTPortal_create_rows("Card Number", "", "b1nTPortal_ccard_number", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{

						//exp moth
						var b1nTPortal_list  = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
						b1nTPortal_div_row = _b1nTPortal_create_select_rows("Exp. Month", "", "b1nTPortal_ccard_exp_month", b1nTPortal_list, 0, "months");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//exp year
						var b1nTPortal_list  = new Array();
						b1nTPortal_div_row = _b1nTPortal_create_select_rows("Exp. Year", "", "b1nTPortal_ccard_exp_year", b1nTPortal_list, 0, "year");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//cvv
						b1nTPortal_div_row = _b1nTPortal_create_rows("CVV", "", "b1nTPortal_ccard_cvv", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//store cc if checked
						b1nTPortal_div_row = _b1nTPortal_create_rows("Store Credit Card", 0, "b1nTPortal_ccard_store", "checkbox");

						b1nTPortal_div_row.firstChild.style.width = "120px";
						b1nTPortal_div_row.firstChild.style.flexGrow = "0";
						b1nTPortal_div_row.firstChild.style.marginRight = "2px";

						//control when to show the primary bit
						b1nTPortal_data.fields["b1nTPortal_ccard_store"].onclick = function() {
							//make them choose everytime
							b1nTPortal_data.fields["b1nTPortal_ccard_make_primary"].checked = false;
							b1nTPortal_ccard_make_primary_wrapper = b1nTPortal_data.fields["b1nTPortal_ccard_make_primary_wrapper"];

							//do some work
							if(this.checked == true) {
								b1nTPortal_ccard_make_primary_wrapper.style.display = "flex";
							} else {
								b1nTPortal_ccard_make_primary_wrapper.style.display = "none";
							}
						}

						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//make primary
						b1nTPortal_div_row = _b1nTPortal_create_rows("Make Primary", 0, "b1nTPortal_ccard_make_primary", "checkbox");

						b1nTPortal_div_row.style.display = "none";

						//store for later use
						b1nTPortal_data.fields["b1nTPortal_ccard_make_primary_wrapper"] = b1nTPortal_div_row;

						b1nTPortal_div_row.firstChild.style.width = "120px";
						b1nTPortal_div_row.firstChild.style.flexGrow = "0";
						b1nTPortal_div_row.firstChild.style.marginRight = "2px";

						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					//will use later
					b1nTPortal_data.fields["b1nTPortal_ccard_information_div"] = b1nTPortal_div_table;

					b1nTPortal_limiter_div.appendChild(b1nTPortal_div_table);	
				}

				{
					var b1nTPortal_div_table = document.createElement("div");
					b1nTPortal_div_table.style.display = "flex";
					b1nTPortal_div_table.style.flexDirection = "column";
					b1nTPortal_div_table.style.gap = "2px";

					{
						//process
						b1nTPortal_div_row = document.createElement("div");
						b1nTPortal_div_row.style.justifyContent = "end";
						b1nTPortal_div_row.style.marginTop = "45px";
						b1nTPortal_div_row.style.display = "flex";

						b1nTPortal_button = document.createElement("input");
						b1nTPortal_button.setAttribute("type", "button");

						b1nTPortal_button.style.width = "125px";

						b1nTPortal_button.value = "Proccess";

						b1nTPortal_button.onclick = function() {
							//clear the failure if posible.
							var b1nTPortal_failure_flag = document.getElementById(b1nTPortal_data.config.failFlag);
							if(b1nTPortal_failure_flag) { b1nTPortal_failure_flag.innerHTML = ""; }						

							//get the credit card information div
							var b1nTPortal_ccard_id = b1nTPortal_data.fields["b1nTPortal_ccard_mask"].value;

							if(b1nTPortal_ccard_id * 1 == -1) {
								//make sure that we dont have any flags
								if(b1nTPortal_data.b1nTPortal_validate_fields(b1nTPortal_data.required_fields)) { 
									if(b1nTPortal_failure_flag) {
										var b1nTPortal_message = document.createElement("p");
										b1nTPortal_message.setAttribute("class", "b1nTPortal-error-msg");
										b1nTPortal_message.innerHTML = "Please fill the highlighted fields.";
										b1nTPortal_failure_flag.appendChild(b1nTPortal_message);
									}
									return; 
								}
							}

							if(typeof(b1nTPortal_data.config.processPaymentNextF) === "function") {
								var object = new Object();
								object.ccard_id = ( b1nTPortal_ccard_id * 1 ) == -1 ? "0" : b1nTPortal_ccard_id;

								//the radio input must exist
								if(b1nTPortal_data.fields["b1nTPortal_pay_option_radio_one"] && 
									b1nTPortal_data.fields["b1nTPortal_pay_option_radio_two"]) {
									//DO NOTHING.. this is what should happen
								} else {
									if(b1nTPortal_failure_flag) {
										var b1nTPortal_message = document.createElement("p");
										b1nTPortal_message.setAttribute("class", "b1nTPortal-error-msg");
										b1nTPortal_message.innerHTML = "Error choosing a payment option.";
										b1nTPortal_failure_flag.appendChild(b1nTPortal_message);
									}
									return;
								}

								//one or the other both cant be checked, if both we have an error
								if(b1nTPortal_data.fields["b1nTPortal_pay_option_radio_one"].checked && 
									b1nTPortal_data.fields["b1nTPortal_pay_option_radio_two"].checked) {
									if(b1nTPortal_failure_flag) {
										var b1nTPortal_message = document.createElement("p");
										b1nTPortal_message.setAttribute("class", "b1nTPortal-error-msg");
										b1nTPortal_message.innerHTML = "Error choosing a payment option.";
										b1nTPortal_failure_flag.appendChild(b1nTPortal_message);
									}
									return;
								}

								//atleast one has to be checked
								if(b1nTPortal_data.fields["b1nTPortal_pay_option_radio_one"].checked || 
									b1nTPortal_data.fields["b1nTPortal_pay_option_radio_two"].checked) {
									//DO NOTHING.. this is what should happen
								} else {
									if(b1nTPortal_failure_flag) {
										var b1nTPortal_message = document.createElement("p");
										b1nTPortal_message.setAttribute("class", "b1nTPortal-error-msg");
										b1nTPortal_message.innerHTML = "Error choosing a payment option.";
										b1nTPortal_failure_flag.appendChild(b1nTPortal_message);
									}
									return;
								}

								var b1nTPortal_payment_mode   = 2;
								var b1nTPortal_transaction_id = "0";
								var b1nTPortal_grand_total    = "0";
								var b1nTPortal_txn_data       = _b1nTPortal_get_selected_txns();
								if(b1nTPortal_data.fields["b1nTPortal_pay_option_radio_one"].checked) {
									if(b1nTPortal_txn_data && Array.isArray(b1nTPortal_txn_data.selected_txns) && b1nTPortal_txn_data.selected_txns.length*1) {
										b1nTPortal_transaction_id = b1nTPortal_txn_data.selected_txns.join("|");
										b1nTPortal_grand_total    = b1nTPortal_txn_data.total;
										b1nTPortal_payment_mode   = 1;
									} else {
										if(b1nTPortal_failure_flag) {
											var b1nTPortal_message = document.createElement("p");
											b1nTPortal_message.setAttribute("class", "b1nTPortal-error-msg");
											b1nTPortal_message.innerHTML = "Please select an invoice(s).";
											b1nTPortal_failure_flag.appendChild(b1nTPortal_message);
										}
										return;
									}
								}

								object.transaction_id  = b1nTPortal_transaction_id;
								object.required_fields = b1nTPortal_data.required_fields;
								object.total_charges   = b1nTPortal_grand_total;
								object.payment_mode    = b1nTPortal_payment_mode;

								//new card information
								if(object.ccard_id == "0") {
									object.ccard_first_name = b1nTPortal_data.fields["b1nTPortal_ccard_first_name"].value;
									object.ccard_last_name = b1nTPortal_data.fields["b1nTPortal_ccard_last_name"].value;
									object.ccard_address = b1nTPortal_data.fields["b1nTPortal_ccard_address"].value;
									object.ccard_address2 = b1nTPortal_data.fields["b1nTPortal_ccard_address2"].value;
									object.ccard_city = b1nTPortal_data.fields["b1nTPortal_ccard_city"].value;
									object.ccard_state = b1nTPortal_data.fields["b1nTPortal_ccard_state"].value;
									object.ccard_zip = b1nTPortal_data.fields["b1nTPortal_ccard_zip"].value;
									object.ccard_country = b1nTPortal_data.fields["b1nTPortal_ccard_country"].value;
									object.ccard_phone = b1nTPortal_data.fields["b1nTPortal_ccard_phone"].value;
									object.ccard_email = b1nTPortal_data.fields["b1nTPortal_ccard_email"].value;
									object.ccard_number = b1nTPortal_data.fields["b1nTPortal_ccard_number"].value;
									object.ccard_exp_month = b1nTPortal_data.fields["b1nTPortal_ccard_exp_month"].value;
									object.ccard_exp_year = b1nTPortal_data.fields["b1nTPortal_ccard_exp_year"].value;
									object.ccard_cvv = b1nTPortal_data.fields["b1nTPortal_ccard_cvv"].value;

									//check if they choose to store it and make it primary card
									object.ccard_store = b1nTPortal_data.fields["b1nTPortal_ccard_store"].checked ? "1" : "0";
									object.ccard_primary = object.ccard_store == "1" ? ( b1nTPortal_data.fields["b1nTPortal_ccard_make_primary"].checked ? "1" : "0" ) : "0";
								} 

								_b1nTPortal_validate_process_payment(object, b1nTPortal_data.config.processPaymentNextF);
							}
						}

						b1nTPortal_div_row.appendChild(b1nTPortal_button);
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_div_table);
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
		}
	}

	function _b1nTPortal_close_pop_up_dialog() {
		var b1nTPortal_div_pop_up_dialog = b1nTPortal_data.fields["b1nTPortal_div_pop_up_dialog"];
		var b1nTPortal_div_pop_up_shield = b1nTPortal_data.fields["b1nTPortal_div_pop_up_shield"];

		if(b1nTPortal_div_pop_up_dialog && b1nTPortal_div_pop_up_shield) {} else { return; }

		//hide dialog and then clean it out
		b1nTPortal_div_pop_up_dialog.style.display = "none";
		b1nTPortal_div_pop_up_dialog.innerHTML = "";

		//hide shield
		b1nTPortal_div_pop_up_shield.style.display = "none";
	}

	//validate process payment, they must agree
	function _b1nTPortal_validate_process_payment(b1nTPortal_object, nextF) {
		var b1nTPortal_div_pop_up_dialog = b1nTPortal_data.fields["b1nTPortal_div_pop_up_dialog"];
		var b1nTPortal_div_pop_up_shield = b1nTPortal_data.fields["b1nTPortal_div_pop_up_shield"];

		if(b1nTPortal_div_pop_up_dialog && b1nTPortal_div_pop_up_shield) {} else { return; }

		//first thing we want to do is display the shield
		b1nTPortal_div_pop_up_shield.style.display = "block";

		{ //build some content
			{
				b1nTPortal_div_pop_up_header = document.createElement("div");

				b1nTPortal_div_pop_up_header.style.backgroundColor = "#1782b5";
				b1nTPortal_div_pop_up_header.style.display = "inline-block";
				b1nTPortal_div_pop_up_header.style.width = "100%";

				{
					b1nTPortal_div_pop_up_header_title = document.createElement("div");

					b1nTPortal_div_pop_up_header_title.style.display = "inline-block";
					b1nTPortal_div_pop_up_header_title.style.fontWeight = "900";
					b1nTPortal_div_pop_up_header_title.style.fontSize = "larger";
					b1nTPortal_div_pop_up_header_title.style.padding = "5px";
					b1nTPortal_div_pop_up_header_title.style.color = "#ffffff";

					b1nTPortal_div_pop_up_header_title.innerHTML = "Please Review";

					b1nTPortal_div_pop_up_header.appendChild(b1nTPortal_div_pop_up_header_title);
				}

				{
					b1nTPortal_div_pop_up_header_exit = document.createElement("div");

					b1nTPortal_div_pop_up_header_exit.style.display = "inline-block";
					b1nTPortal_div_pop_up_header_exit.style.fontWeight = "900";
					b1nTPortal_div_pop_up_header_exit.style.fontSize = "larger";
					b1nTPortal_div_pop_up_header_exit.style.padding = "5px";
					b1nTPortal_div_pop_up_header_exit.style.marginRight = "5px";
					b1nTPortal_div_pop_up_header_exit.style.color = "#ffffff";
					b1nTPortal_div_pop_up_header_exit.style.cursor = "pointer";
					b1nTPortal_div_pop_up_header_exit.style.cssFloat = "right";

					b1nTPortal_div_pop_up_header_exit.innerHTML = "X";

					b1nTPortal_div_pop_up_header_exit.onclick = function() {
						_b1nTPortal_close_pop_up_dialog();
					}

					b1nTPortal_div_pop_up_header.appendChild(b1nTPortal_div_pop_up_header_exit);
				}

				b1nTPortal_div_pop_up_dialog.appendChild(b1nTPortal_div_pop_up_header);
			}

			{
				b1nTPortal_div_pop_up_content = document.createElement("div");

				b1nTPortal_div_pop_up_content.style.padding = "10px";
				b1nTPortal_div_pop_up_content.style.fontSize = "larger";

				{
					b1nTPortal_div_pop_up_content_row = document.createElement("div");

					if(b1nTPortal_object.payment_mode*1 == 2) {
						b1nTPortal_div_pop_up_content_row.innerHTML = "You have chosen to fully pay your <strong>Customer Balance</strong>.";
					} else {
						b1nTPortal_div_pop_up_content_row.innerHTML = "You have chosen to fully pay the selected invoices for total of "+b1nTPortal_object.total_charges;
					}

					b1nTPortal_div_pop_up_content.appendChild(b1nTPortal_div_pop_up_content_row);
				}

				{
					b1nTPortal_div_pop_up_content_row = document.createElement("div");
					b1nTPortal_div_pop_up_content_row.innerHTML = "Click <strong>OK</strong> to continue, or <strong>CANCEL</strong> to go back and make changes.";
					b1nTPortal_div_pop_up_content.appendChild(b1nTPortal_div_pop_up_content_row);
				}

				b1nTPortal_div_pop_up_dialog.appendChild(b1nTPortal_div_pop_up_content);	
			}

			{
				b1nTPortal_div_pop_up_buttons = document.createElement("div");

				b1nTPortal_div_pop_up_buttons.style.display = "flex";
				b1nTPortal_div_pop_up_buttons.style.gap = "5px";
				b1nTPortal_div_pop_up_buttons.style.padding = "10px";
				b1nTPortal_div_pop_up_buttons.style.justifyContent = "flex-end";

				{
					b1nTPortal_div_pop_up_button_wrapper = document.createElement("div");
					b1nTPortal_div_pop_up_ok_button = document.createElement("input");

					b1nTPortal_div_pop_up_ok_button.setAttribute("type", "button");

					b1nTPortal_div_pop_up_ok_button.style.width = "100px";

					b1nTPortal_div_pop_up_ok_button.value = "OK";

					b1nTPortal_div_pop_up_ok_button.onclick = function() {
						_b1nTPortal_close_pop_up_dialog();
						nextF(b1nTPortal_object);
					}

					b1nTPortal_div_pop_up_button_wrapper.appendChild(b1nTPortal_div_pop_up_ok_button);
					b1nTPortal_div_pop_up_buttons.appendChild(b1nTPortal_div_pop_up_button_wrapper);
				}

				{
					b1nTPortal_div_pop_up_button_wrapper = document.createElement("div");
					b1nTPortal_div_pop_up_cancel_button = document.createElement("input");

					b1nTPortal_div_pop_up_cancel_button.setAttribute("type", "button");

					b1nTPortal_div_pop_up_cancel_button.style.width = "100px";

					b1nTPortal_div_pop_up_cancel_button.value = "CANCEL";

					b1nTPortal_div_pop_up_cancel_button.onclick = function() {
						_b1nTPortal_close_pop_up_dialog();
					}

					b1nTPortal_div_pop_up_button_wrapper.appendChild(b1nTPortal_div_pop_up_cancel_button);
					b1nTPortal_div_pop_up_buttons.appendChild(b1nTPortal_div_pop_up_button_wrapper);
				}

				b1nTPortal_div_pop_up_dialog.appendChild(b1nTPortal_div_pop_up_buttons);
			}
		}

		//display dialog box
		b1nTPortal_div_pop_up_dialog.style.display = "block";
	}

	//load transaction list
	function _b1nTPortal_load_transactions_list(b1nTPortal_list) {
		if(!Array.isArray(b1nTPortal_list)) { return; } 
		var b1nTPortal_table_tbody = b1nTPortal_data.fields["b1nTPortal_txn_list_content"];

		b1nTPortal_list.forEach(function(b1nTPortal_object, b1nTPortal_index){
			var b1nTPortal_class    = b1nTPortal_index % 2 ? "b1nTPortal_odd" : "b1nTPortal_even";
			var b1nTPortal_table_tr = document.createElement("tr");
			b1nTPortal_table_tr.setAttribute("class", b1nTPortal_class);

			{
				var b1nTPortal_table_tr_td = document.createElement("td");

				b1nTPortal_table_tr_td.style.width = "100px";
				b1nTPortal_table_tr_td.style.border = "0px";

				b1nTPortal_table_tr_td_check_box = document.createElement("input");
				b1nTPortal_table_tr_td_check_box.setAttribute("type", "checkbox");
				b1nTPortal_table_tr_td_check_box.setAttribute("class", "b1nTPortal_txn_row_checkbox");
				b1nTPortal_table_tr_td_check_box.rowObject = b1nTPortal_object;
				b1nTPortal_table_tr_td.appendChild(b1nTPortal_table_tr_td_check_box);

				b1nTPortal_table_tr_td_check_box.onclick = function() {
					var b1nTPortal_total_input   = b1nTPortal_data.fields["b1nTPortal_transaction_total"];
					var b1nTPortal_value         = b1nTPortal_total_input.value.replace("$", '').trim();
					b1nTPortal_value             = b1nTPortal_value.replace(",", '')*1;
					var b1nTPortal_open_bal      = this.rowObject.OpenBal*1;
					var b1nTPortal_new_total     = this.checked ? (b1nTPortal_value+b1nTPortal_open_bal) : (b1nTPortal_value-b1nTPortal_open_bal);
					b1nTPortal_total_input.value = _b1nTPortal_format_for_currency(b1nTPortal_new_total.toFixed(2), 0);
				}

				b1nTPortal_table_tr_td_span = document.createElement("span");
				b1nTPortal_table_tr_td_span.innerHTML = b1nTPortal_object.ID;
				b1nTPortal_table_tr_td.appendChild(b1nTPortal_table_tr_td_span);
				b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
			}

			{
				var b1nTPortal_table_tr_td = document.createElement("td");

				b1nTPortal_table_tr_td.style.width = "100px";
				b1nTPortal_table_tr_td.style.border = "0px";
				b1nTPortal_table_tr_td.style.textAlign = "right";

				b1nTPortal_table_tr_td.innerHTML = _b1nTPortal_format_for_currency((b1nTPortal_object.OpenBal*1).toFixed(2), 1);
				b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
			}

			b1nTPortal_table_tbody.appendChild(b1nTPortal_table_tr);
		});
	}

	//get selected transactions and total
	function _b1nTPortal_get_selected_txns() {
		var b1nTPortal_total_input = b1nTPortal_data.fields["b1nTPortal_transaction_total"];
		var b1nTPortal_table_tbody = b1nTPortal_data.fields["b1nTPortal_txn_list_content"];
		var b1nTPortal_list_of_checkbox = Array.from(b1nTPortal_table_tbody.getElementsByClassName("b1nTPortal_txn_row_checkbox"));
		var b1nTPortal_list_of_selected_txns = new Array();

		b1nTPortal_list_of_checkbox.forEach(function(b1nTPortal_element) {
			if(b1nTPortal_element.checked == false) { return; }
			b1nTPortal_list_of_selected_txns.push(b1nTPortal_element.rowObject.ID);
		});

		var b1nTPortal_return_obj = new Object();
		b1nTPortal_return_obj.total = b1nTPortal_total_input.value;
		b1nTPortal_return_obj.selected_txns = b1nTPortal_list_of_selected_txns;

		return b1nTPortal_return_obj;
	}

	function _b1nTPortal_format_for_currency(b1nTPortal_number, b1nTPortal_rms) {
		var b1nTPortal_value = (b1nTPortal_number*1).toLocaleString("en-US", {style:"currency", currency:"USD"});
		var b1nTPortal_value_formatted = b1nTPortal_rms ? String(b1nTPortal_value).replace("$", '') : String(b1nTPortal_value).replace("$", '$ ');
		return b1nTPortal_value_formatted;
	}

	//create rows
	function _b1nTPortal_create_rows(b1nTPortal_label, b1nTPortal_value, b1nTPortal_key, b1nTPortal_type, b1nTPortal_disabled) {
		var b1nTPortal_div_row = document.createElement("div");
		b1nTPortal_div_row.style.display = "flex";

		//check boxes work a bit diffrent
		if(b1nTPortal_type == "checkbox") {
			b1nTPortal_div_row.style.flexDirection = "row-reverse";
		}

		{
			var b1nTPortal_label_wrapper = document.createElement("div");
			b1nTPortal_label_wrapper.style.width = "100px";
			b1nTPortal_label_wrapper.style.marginTop = "auto";
			b1nTPortal_label_wrapper.style.marginBottom = "auto";
			b1nTPortal_label_wrapper.style.marginRight = "10px";
			b1nTPortal_label_wrapper.style.flexShrink = "0";

			//check boxes work a bit diffrent
			if(b1nTPortal_type == "checkbox") {
				b1nTPortal_label_wrapper.style.flexGrow = "1";
			}

			var b1nTPortal_label_span = document.createElement("span");
			b1nTPortal_label_span.innerHTML = "<strong>"+b1nTPortal_label+"</strong>";

			b1nTPortal_label_wrapper.appendChild(b1nTPortal_label_span);
			b1nTPortal_div_row.appendChild(b1nTPortal_label_wrapper);
		}

		{
			var b1nTPortal_input_wrapper = document.createElement("div");
			b1nTPortal_input_wrapper.style.flexGrow = "1";

			var b1nTPortal_input = document.createElement("input");
			b1nTPortal_input.setAttribute("type", b1nTPortal_type);

			if(b1nTPortal_disabled) {
				if(b1nTPortal_disabled == 2) {
					b1nTPortal_input.readOnly = true;
				} else {
					b1nTPortal_input.disabled = true;
				}

				b1nTPortal_input.style.background = "#f5f5f5";
			}

			if(b1nTPortal_type == "date") {
				b1nTPortal_input.setAttribute("type", "text");
				b1nTPortal_input.setAttribute("id", b1nTPortal_key);
			} else if(b1nTPortal_type == "checkbox") {
				b1nTPortal_input_wrapper.style.flexGrow = "0";
				b1nTPortal_input_wrapper.style.marginRight = "10px";

				//expecting value to be 1 or "1" other wise ill set to 0. No exceptions
				b1nTPortal_value = (b1nTPortal_value == 1 || b1nTPortal_value == "1") ? 1 : 0;
				b1nTPortal_input.checked = b1nTPortal_value ? true : false;
			} else {
				b1nTPortal_input.value = b1nTPortal_value;	
			}		

			b1nTPortal_input_wrapper.appendChild(b1nTPortal_input);
			b1nTPortal_div_row.appendChild(b1nTPortal_input_wrapper);

			//store the input.
			b1nTPortal_data.fields[b1nTPortal_key] = b1nTPortal_input;
		}

		//return the row.
		return b1nTPortal_div_row;
	}

	//create select row
	function _b1nTPortal_create_select_rows(b1nTPortal_label, b1nTPortal_value, b1nTPortal_key, b1nTPortal_list, b1nTPortal_disabled, b1nTPortal_control) {
		var b1nTPortal_div_row = document.createElement("div");
		b1nTPortal_div_row.style.display = "flex";

		{
			var b1nTPortal_label_wrapper = document.createElement("div");
			b1nTPortal_label_wrapper.style.width = "100px";
			b1nTPortal_label_wrapper.style.marginTop = "auto";
			b1nTPortal_label_wrapper.style.marginBottom = "auto";
			b1nTPortal_label_wrapper.style.marginRight = "10px";
			b1nTPortal_label_wrapper.style.flexShrink = "0";

			var b1nTPortal_label_span = document.createElement("span");
			b1nTPortal_label_span.innerHTML = "<strong>"+b1nTPortal_label+"</strong>";

			b1nTPortal_label_wrapper.appendChild(b1nTPortal_label_span);
			b1nTPortal_div_row.appendChild(b1nTPortal_label_wrapper);
		}

		{
			var b1nTPortal_select_wrapper = document.createElement("div");
			b1nTPortal_select_wrapper.style.flexGrow = "1";

			var b1nTPortal_select = document.createElement("select");

			{
				var option = document.createElement("option");
				option.value = "";
				option.innerHTML = "Please select";
				b1nTPortal_select.appendChild(option);
			}

			if(Array.isArray(b1nTPortal_list) || typeof(b1nTPortal_list) === "object") {
				var foundValue = 0; //make sure the value exist
				switch(b1nTPortal_control) {
					case "state":
						b1nTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							option.value = value.state_short;
							option.innerHTML = value.state_name;
							b1nTPortal_select.appendChild(option);

							if(value.state_short == b1nTPortal_value) {
								foundValue++;
							}
						});
						break;
					case "country":
						b1nTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							option.value = value.short;
							option.innerHTML = value.long;
							b1nTPortal_select.appendChild(option);

							if(value.short == b1nTPortal_value) {
								foundValue++;
							}
						});
						break;
					case "months":
						for(var b1nTPortal_index = 0; b1nTPortal_index < 12; b1nTPortal_index++) {
							var option = document.createElement("option");
							var b1nTPortal_month_value = b1nTPortal_index+1;
							option.value = b1nTPortal_month_value;
							option.innerHTML = b1nTPortal_list[b1nTPortal_index]+"("+(b1nTPortal_month_value)+")";
							b1nTPortal_select.appendChild(option);

							if(b1nTPortal_month_value == b1nTPortal_value) {
								foundValue++;
							}
						}
						break;
					case "year":
						var b1nTPortal_date = new Date();
						var b1nTPortal_full_year = b1nTPortal_date.getFullYear();
						var b1nTPortal_yeah_abrv = parseInt(b1nTPortal_full_year.toString().substr(2));

						for(var b1nTPortal_index = 0; b1nTPortal_index < 12; b1nTPortal_index++) {
							var option = document.createElement("option");
							option.value = b1nTPortal_yeah_abrv+b1nTPortal_index;
							option.innerHTML = b1nTPortal_full_year+b1nTPortal_index;
							b1nTPortal_select.appendChild(option);

							if((b1nTPortal_yeah_abrv+b1nTPortal_index) == (b1nTPortal_value * 1)) {
								foundValue++;
							}
						}
						break;
					default:
						//Should never happen
				}

				if(foundValue) {
					b1nTPortal_select.value = b1nTPortal_value;
				}

				b1nTPortal_select_wrapper.appendChild(b1nTPortal_select);
			}

			if(b1nTPortal_disabled) { 
				b1nTPortal_select.disabled = true;
				b1nTPortal_select.style.background = "#f5f5f5";
			}

			b1nTPortal_div_row.appendChild(b1nTPortal_select_wrapper);

			//store the input.
			b1nTPortal_data.fields[b1nTPortal_key] = b1nTPortal_select;
		}

		//return the row.
		return b1nTPortal_div_row;
	}

	//add or update required fields
	this.b1nTPortal_update_required_fields = function(b1nTPortal_fields) {
		if(!Array.isArray(b1nTPortal_fields)) { return; }
		b1nTPortal_data.required_fields = b1nTPortal_fields;
	}

	//validate array of fields will attempt to filter
	//using the map we defined when setting the defaults.
	this.b1nTPortal_validate_fields = function(b1nTPortal_fields) {
		if(!Array.isArray(b1nTPortal_fields)) { return 0; }

		var b1nTPortal_flags = 0;
		for(var b1nTPortal_index = 0; b1nTPortal_index < b1nTPortal_fields.length; b1nTPortal_index++) {
			var b1nTPortal_key = b1nTPortal_fields[b1nTPortal_index];
			
			//check to see if we find the field and if so validate it.
			if(b1nTPortal_data.b1nTPortal_validate_field(b1nTPortal_key, 0)) {
				b1nTPortal_flags++;	
			}			
		}

		return b1nTPortal_flags;
	}

	//validate a field.
	this.b1nTPortal_validate_field = function(b1nTPortal_field, b1nTPortal_force_error) {
		var b1nTPortal_field_element = b1nTPortal_data.fields[b1nTPortal_field];

		if(b1nTPortal_field_element) {
			//all check boxes must be evaluated diffrently
			if(b1nTPortal_field_element.tagName.toLowerCase() == "input") {
				if(b1nTPortal_field_element.type == "checkbox") {
					b1nTPortal_field_element.style.boxShadow = "0px 0px 0px 0px transparent";
					b1nTPortal_field_element.style.background = "transparent";

					if(!b1nTPortal_field_element.checked || b1nTPortal_force_error) {
						b1nTPortal_field_element.style.boxShadow = "0px 0px 0px 1px #ff0000";
						b1nTPortal_field_element.style.background = "#ff0000";
						return 1;
					}
					return 0;
				}
			}

			//all other elements
			b1nTPortal_field_element.style.border = "solid 1px #ddd";

			if(!b1nTPortal_field_element.value || b1nTPortal_force_error) {
				b1nTPortal_field_element.style.border = "solid 1px #ff0000";
				return 1;
			}
		}
		return 0;
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