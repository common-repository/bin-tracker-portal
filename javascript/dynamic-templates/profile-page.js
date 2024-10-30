function b1nTPortal_profile_page_template(b1nTPortal_arg_config) {
	var b1nTPortal_data = this;
	b1nTPortal_data.config = b1nTPortal_arg_config;

	//Choose to pass in the required fields here in case we want
	//to add special styling when creating and appending children
	this.b1nTPortal_init = function(b1nTPortal_extra_config) {
		var b1nTPortal_host_div = document.getElementById(b1nTPortal_data.config.hostDiv);
		var b1nTPortal_parent_div = document.getElementById(b1nTPortal_data.config.parentDiv);

		if(b1nTPortal_parent_div) {
			b1nTPortal_parent_div.style.maxWidth = "490px";
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
			b1nTPortal_wrapper_div.setAttribute("id", "b1nTPortal_profile_page_template");
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
							b1nTPortal_config.selected = "PROFILE";
							b1nTPortal_config.customerName = '<strong style="font-size: x-large;"">PROFILE</strong>';
							b1nTPortal_data.config.header.b1nTPortal_build_header(b1nTPortal_config);
						} 
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_header_div);
				}

				{
					b1nTPortal_div_table = document.createElement("div");
					b1nTPortal_div_table.style.display = "flex";
					b1nTPortal_div_table.style.flexDirection = "column";
					b1nTPortal_div_table.style.gap = "2px";

					{
						//customer name
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_customer_name : "";
						var b1nTPortal_div_row = _b1nTPortal_create_rows("Name", b1nTPortal_value, "b1nTPortal_customer_name", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//customer adress
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_customer_address : "";
						var b1nTPortal_div_row = _b1nTPortal_create_rows("Address", b1nTPortal_value, "b1nTPortal_customer_address", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//customer adress2
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_customer_address2 : "";
						var b1nTPortal_div_row = _b1nTPortal_create_rows("Address2", b1nTPortal_value, "b1nTPortal_customer_address2", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//customer city
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_customer_city : "";
						var b1nTPortal_div_row = _b1nTPortal_create_rows("City", b1nTPortal_value, "b1nTPortal_customer_city", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//customer state
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_customer_state : "";
						var b1nTPortal_list  = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_list_of_state : new Array();
						var b1nTPortal_div_row = _b1nTPortal_create_state_rows("State", b1nTPortal_value, "b1nTPortal_customer_state", b1nTPortal_list);
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//customer zip
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_customer_zip : "";
						var b1nTPortal_div_row = _b1nTPortal_create_rows("Zip", b1nTPortal_value, "b1nTPortal_customer_zip", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//customer contact list
						var b1nTPortal_select  = document.createElement("select");

						if(Array.isArray(b1nTPortal_extra_config.b1nTPortal_customer_contact_list)) {
							b1nTPortal_data.contacts_list = new Array();
							b1nTPortal_extra_config.b1nTPortal_customer_contact_list.forEach(function(b1nTPortal_object) {
								var b1nTPortal_options = document.createElement("option");
								b1nTPortal_options.value = b1nTPortal_object.ID;
								b1nTPortal_options.innerHTML = b1nTPortal_object.Name;

								if(b1nTPortal_object.PrimaryContact * 1) {
									b1nTPortal_options.selected = true;	
								}

								b1nTPortal_data.contacts_list[b1nTPortal_object.ID] = b1nTPortal_object;

								b1nTPortal_select.appendChild(b1nTPortal_options);
							});
						}

						var b1nTPortal_options = document.createElement("option");
						b1nTPortal_options.value = "0";
						b1nTPortal_options.innerHTML = "+ New contact";
						b1nTPortal_select.appendChild(b1nTPortal_options);

						b1nTPortal_select.onchange = function() {
							b1nTPortal_data.b1nTPortal_fill_contact_fields(this.value);
						}

						var b1nTPortal_div_row = _b1nTPortal_create_rows("Contact", "", "b1nTPortal_customer_contacts", "textbox");
						b1nTPortal_div_row.lastChild.firstChild.remove();
						b1nTPortal_div_row.lastChild.appendChild(b1nTPortal_select);
						b1nTPortal_data.fields["b1nTPortal_customer_contacts"] = b1nTPortal_select;
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{

						var b1nTPortal_contact_fieldset = document.createElement("fieldset");
						var b1nTPortal_contact_fieldset_legend = document.createElement("legend");
						b1nTPortal_contact_fieldset_legend.innerHTML = "<strong>Contact details</strong>";
						b1nTPortal_contact_fieldset.appendChild(b1nTPortal_contact_fieldset_legend);

						b1nTPortal_contact_fieldset.style.padding = "15px";
						b1nTPortal_contact_fieldset.style.borderRadius = "5px";

						{
							//customer contact name
							var b1nTPortal_div_row = _b1nTPortal_create_rows("Name", "", "b1nTPortal_customer_contact_name", "textbox");
							b1nTPortal_contact_fieldset.appendChild(b1nTPortal_div_row);
						}
						
						{
							//customer phone
							var b1nTPortal_div_row = _b1nTPortal_create_rows("Phone", "", "b1nTPortal_customer_contact_phone", "textbox");
							b1nTPortal_contact_fieldset.appendChild(b1nTPortal_div_row);
						}
						
						{
							//customer cell
							var b1nTPortal_div_row = _b1nTPortal_create_rows("Cell", "", "b1nTPortal_customer_contact_cell", "textbox");
							b1nTPortal_contact_fieldset.appendChild(b1nTPortal_div_row);
						}
						
						{
							//customer fax
							var b1nTPortal_div_row = _b1nTPortal_create_rows("Fax", "", "b1nTPortal_customer_contact_fax", "textbox");
							b1nTPortal_contact_fieldset.appendChild(b1nTPortal_div_row);
						}
						
						{
							//customer email
							var b1nTPortal_div_row = _b1nTPortal_create_rows("Email", "", "b1nTPortal_customer_contact_email", "textbox");
							b1nTPortal_contact_fieldset.appendChild(b1nTPortal_div_row);
						}

						{
							//customer contact primary bit
							var b1nTPortal_div_row = _b1nTPortal_create_rows("Primary", "", "b1nTPortal_customer_contact_primary", "checkbox");
							b1nTPortal_data.fields["b1nTPortal_customer_contact_primary"].parentElement.style.marginRight = "0px";
							b1nTPortal_data.fields["b1nTPortal_customer_contact_primary"].parentElement.parentElement.style.flexDirection = "row";
							b1nTPortal_data.fields["b1nTPortal_customer_contact_primary"].parentElement.parentElement.style.textAlign = "right";
							b1nTPortal_contact_fieldset.appendChild(b1nTPortal_div_row);
						}

						b1nTPortal_div_table.appendChild(b1nTPortal_contact_fieldset);
					}

					{
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
							b1nTPortal_ccard_mask_option.innerHTML = "Add New Card";
							b1nTPortal_ccard_mask.appendChild(b1nTPortal_ccard_mask_option);

							//store the mask for later use
							b1nTPortal_data.fields["b1nTPortal_ccard_mask"] = b1nTPortal_ccard_mask;

							var b1nTPortal_no_card = function() {
								b1nTPortal_ccard_mask_option = document.createElement("option");
								b1nTPortal_ccard_mask_option.value = "0";
								b1nTPortal_ccard_mask_option.innerHTML = "No Card Information";
								b1nTPortal_ccard_mask.appendChild(b1nTPortal_ccard_mask_option);

								//update mask
								b1nTPortal_data.b1nTPortal_update_mask_value(0);
							}

							if(typeof(b1nTPortal_extra_config) === "object" && Array.isArray(b1nTPortal_extra_config.b1nTPortal_customer_ccard_mask)) {
								var b1nTPortal_primary_ccard;
								b1nTPortal_extra_config.b1nTPortal_customer_ccard_mask.forEach(function(value, index) {
									var b1nTPortal_ccard_mask_string = value.TypeAbrv+": "+value.Mask;
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
									b1nTPortal_data.b1nTPortal_update_mask_value(b1nTPortal_primary_ccard.ID);
								} else {
									b1nTPortal_no_card();
								}
							} else {
								b1nTPortal_no_card();
							}

							b1nTPortal_ccard_field_set.appendChild(b1nTPortal_ccard_mask);

							b1nTPortal_ccard_mask.onchange = function() {
								//extract the manually updated value
								var b1nTPortal_old_value = this.getAttribute("manuallyUpdatedValue");

								//updates that should happen on change
								_b1nTPortal_update_old_value(this.value);
								_b1nTPortal_update_mask_visuals(this.value);

								//do some work
								if(this.value * 1 == -1) {
									if(typeof(b1nTPortal_data.config.loadCcardNextF) === "function") {
										b1nTPortal_data.config.loadCcardNextF();
									}
								} else {
									if(typeof(b1nTPortal_data.config.ccardMakePrimaryNextF) === "function") {
										b1nTPortal_data.config.ccardMakePrimaryNextF(this.value, b1nTPortal_old_value);
									}
								}
							}
						}

						b1nTPortal_value_ccard_wrapper.appendChild(b1nTPortal_ccard_field_set);
						b1nTPortal_div_table.appendChild(b1nTPortal_value_ccard_wrapper);
					}

					{
						//communications
						var b1nTPortal_value_field_set_wrapper = document.createElement("div");
						b1nTPortal_value_field_set_wrapper.style.display = "flex";
						b1nTPortal_value_field_set_wrapper.style.marginTop = "10px";

						var b1nTPortal_field_set = document.createElement("fieldset");

						b1nTPortal_field_set.style.padding = "15px";
						b1nTPortal_field_set.style.borderRadius = "5px";
						b1nTPortal_field_set.style.width = "100%";

						var b1nTPortal_field_set_legend = document.createElement("legend");
						b1nTPortal_field_set_legend.innerHTML = "<strong>Communication subscriptions</strong>";
						b1nTPortal_field_set.appendChild(b1nTPortal_field_set_legend);

						{
							//confirmation
							var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_customer_email_confirm : "";
							b1nTPortal_div_row = _b1nTPortal_create_rows("Work Order Confirmation", b1nTPortal_value, "b1nTPortal_customer_email_confirm", "checkbox");
							b1nTPortal_field_set.appendChild(b1nTPortal_div_row);
						}

						{
							//thank you notes
							var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_customer_email_thankyou : "";
							b1nTPortal_div_row = _b1nTPortal_create_rows("Thank You Notes", b1nTPortal_value, "b1nTPortal_customer_email_thankyou", "checkbox");
							b1nTPortal_field_set.appendChild(b1nTPortal_div_row);
						}

						{
							//reminder
							var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_customer_email_reminders : "";
							b1nTPortal_div_row = _b1nTPortal_create_rows("Reminder", b1nTPortal_value, "b1nTPortal_customer_email_reminders", "checkbox");
							b1nTPortal_field_set.appendChild(b1nTPortal_div_row);
						}

						{
							//sms
							var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_customer_sms : "";
							b1nTPortal_div_row = _b1nTPortal_create_rows("SMS Notifications", b1nTPortal_value, "b1nTPortal_customer_sms", "checkbox");
							b1nTPortal_field_set.appendChild(b1nTPortal_div_row);
						}

						b1nTPortal_value_field_set_wrapper.appendChild(b1nTPortal_field_set);
						b1nTPortal_div_table.appendChild(b1nTPortal_value_field_set_wrapper);
					}

					{
						//save button
						var b1nTPortal_div_row = document.createElement("div");
						b1nTPortal_div_row.style.justifyContent = "end";
						b1nTPortal_div_row.style.marginTop = "20px";
						b1nTPortal_div_row.style.display = "flex";

						var b1nTPortal_button = document.createElement("input");
						b1nTPortal_button.setAttribute("type", "button");

						b1nTPortal_button.style.width = "125px";

						b1nTPortal_button.value = "Save";

						b1nTPortal_button.onclick = function() {
							//clear the failure if posible.
							var b1nTPortal_failure_flag = document.getElementById(b1nTPortal_data.config.failFlag);
							if(b1nTPortal_failure_flag) { b1nTPortal_failure_flag.innerHTML = ""; }						

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

							if(typeof(b1nTPortal_data.config.saveCustomerNextF) === "function") {
								var object = new Object();
								object.customer_name = b1nTPortal_data.fields["b1nTPortal_customer_name"].value;	
								object.customer_address = b1nTPortal_data.fields["b1nTPortal_customer_address"].value;
								object.customer_address2 = b1nTPortal_data.fields["b1nTPortal_customer_address2"].value;
								object.customer_city = b1nTPortal_data.fields["b1nTPortal_customer_city"].value;
								object.customer_state = b1nTPortal_data.fields["b1nTPortal_customer_state"].value;
								object.customer_zip = b1nTPortal_data.fields["b1nTPortal_customer_zip"].value;

								object.customer_contact_id = b1nTPortal_data.fields["b1nTPortal_customer_contacts"].value;
								object.customer_contact_name = b1nTPortal_data.fields["b1nTPortal_customer_contact_name"].value;
								object.customer_contact_phone = b1nTPortal_data.fields["b1nTPortal_customer_contact_phone"].value;
								object.customer_contact_cell = b1nTPortal_data.fields["b1nTPortal_customer_contact_cell"].value;
								object.customer_contact_fax = b1nTPortal_data.fields["b1nTPortal_customer_contact_fax"].value;
								object.customer_contact_email = b1nTPortal_data.fields["b1nTPortal_customer_contact_email"].value;
								object.customer_contact_primary = b1nTPortal_data.fields["b1nTPortal_customer_contact_primary"].checked ? 1 : 0;

								object.customer_email_confirm = b1nTPortal_data.fields["b1nTPortal_customer_email_confirm"].checked ? 1 : 0;
								object.customer_email_reminders = b1nTPortal_data.fields["b1nTPortal_customer_email_reminders"].checked ? 1 : 0;
								object.customer_email_thankyou = b1nTPortal_data.fields["b1nTPortal_customer_email_thankyou"].checked ? 1 : 0;
								object.customer_sms = b1nTPortal_data.fields["b1nTPortal_customer_sms"].checked ? 1 : 0;
								object.required_fields = b1nTPortal_data.required_fields;
								b1nTPortal_data.config.saveCustomerNextF(object);
							}
						}

						b1nTPortal_div_row.appendChild(b1nTPortal_button);
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_div_table);	
				}

				//finalize structure
				b1nTPortal_wrapper_div.appendChild(b1nTPortal_limiter_div);
			}

			b1nTPortal_host_div.appendChild(b1nTPortal_wrapper_div);
			b1nTPortal_data.b1nTPortal_fill_contact_fields(b1nTPortal_data.fields["b1nTPortal_customer_contacts"].value);
		}
	}

	//fill contact fields
	this.b1nTPortal_fill_contact_fields = function(b1nTPortal_id) {
		var setField = function(b1nTPortal_read_only, b1nTPortal_field_id, b1nTPortal_name) {
			var b1nTPortal_object = b1nTPortal_data.contacts_list[b1nTPortal_id];
			if(b1nTPortal_data.fields[b1nTPortal_field_id].type && b1nTPortal_data.fields[b1nTPortal_field_id].type === "checkbox") {
				b1nTPortal_data.fields[b1nTPortal_field_id].checked = (b1nTPortal_name * 1 ? true : false);
				return;
			}
			
			b1nTPortal_data.fields[b1nTPortal_field_id].value = b1nTPortal_name; 
			b1nTPortal_data.fields[b1nTPortal_field_id].readOnly = b1nTPortal_read_only;
		}

		if(b1nTPortal_id * 1) {
			var b1nTPortal_object = b1nTPortal_data.contacts_list[b1nTPortal_id];
			setField(true, "b1nTPortal_customer_contact_name", b1nTPortal_object.Name);
			setField(true, "b1nTPortal_customer_contact_phone", b1nTPortal_object.Phone);
			setField(true, "b1nTPortal_customer_contact_cell", b1nTPortal_object.Cell);
			setField(true, "b1nTPortal_customer_contact_fax", b1nTPortal_object.Fax);
			setField(true, "b1nTPortal_customer_contact_email", b1nTPortal_object.Email);
			setField(false, "b1nTPortal_customer_contact_primary", b1nTPortal_object.PrimaryContact);
		} else {
			setField(false, "b1nTPortal_customer_contact_name", "");
			setField(false, "b1nTPortal_customer_contact_phone", "");
			setField(false, "b1nTPortal_customer_contact_cell", "");
			setField(false, "b1nTPortal_customer_contact_fax", "");
			setField(false, "b1nTPortal_customer_contact_email", "");
			setField(false, "b1nTPortal_customer_contact_primary", 0);
		}	
	}

	//select using id
	this.b1nTPortal_update_mask_value = function(b1nTPortal_value) {
		var b1nTPortal_ccard_mask = b1nTPortal_data.fields["b1nTPortal_ccard_mask"];
		if(b1nTPortal_ccard_mask) {} else { return; }

		b1nTPortal_ccard_mask.value = b1nTPortal_value;
		_b1nTPortal_update_old_value(b1nTPortal_value);
		_b1nTPortal_update_mask_visuals(b1nTPortal_value);
	}

	//update old value
	function _b1nTPortal_update_old_value(b1nTPortal_value) {
		var b1nTPortal_ccard_mask = b1nTPortal_data.fields["b1nTPortal_ccard_mask"];
		b1nTPortal_ccard_mask.setAttribute("manuallyUpdatedValue", b1nTPortal_value);
	}

	//update visuals only
	function _b1nTPortal_update_mask_visuals(b1nTPortal_value) {
		var b1nTPortal_ccard_mask = b1nTPortal_data.fields["b1nTPortal_ccard_mask"];
		var b1nTPortal_ccard_object = b1nTPortal_data.ccard_mask_objects[b1nTPortal_value];
		if(b1nTPortal_ccard_mask) {} else { return; }

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

	//create rows
	function _b1nTPortal_create_rows(b1nTPortal_label, b1nTPortal_value, b1nTPortal_key, b1nTPortal_type) {
		var b1nTPortal_div_row = document.createElement("div");
		b1nTPortal_div_row.style.display = "flex";

		//check boxes work a bit diffrent
		if(b1nTPortal_type == "checkbox") {
			b1nTPortal_div_row.style.flexDirection = "row-reverse";
		}

		{
			var b1nTPortal_label_wrapper = document.createElement("div");
			b1nTPortal_label_wrapper.style.width = "70px";
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

			//check boxes work a bit diffrent
			if(b1nTPortal_type == "checkbox") {
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
	function _b1nTPortal_create_state_rows(b1nTPortal_label, b1nTPortal_value, b1nTPortal_key, b1nTPortal_list) {
		var b1nTPortal_div_row = document.createElement("div");
		b1nTPortal_div_row.style.display = "flex";

		{
			var b1nTPortal_label_wrapper = document.createElement("div");
			b1nTPortal_label_wrapper.style.width = "70px";
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

			if(Array.isArray(b1nTPortal_list)) {
				var foundValue = 0; //make sure the value exist
				b1nTPortal_list.forEach(function(value, index) {
					var option = document.createElement("option");
					option.value = value.state_short;
					option.innerHTML = value.state_name;
					b1nTPortal_select.appendChild(option);

					if(value.state_short == b1nTPortal_value) {
						foundValue++;
					}
				});

				if(foundValue) {
					b1nTPortal_select.value = b1nTPortal_value;
				}

				b1nTPortal_select_wrapper.appendChild(b1nTPortal_select);
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