function b1nTPortal_ccard_page_template(b1nTPortal_arg_config) {
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
			b1nTPortal_wrapper_div.setAttribute("id", "b1nTPortal_ccard_page_template");
			b1nTPortal_wrapper_div.setAttribute("class", "b1nTPortal_backend_template");

			{
				//limiter div
				var b1nTPortal_limiter_div = document.createElement("div");
				b1nTPortal_data.fields = {}; //place holder for the fields

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
							b1nTPortal_config.customerName = '<strong style="font-size: x-large;"">CREDIT CARD</strong>';
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
						//save button
						b1nTPortal_div_row = document.createElement("div");
						b1nTPortal_div_row.style.justifyContent = "end";
						b1nTPortal_div_row.style.marginTop = "20px";
						b1nTPortal_div_row.style.display = "flex";

						b1nTPortal_button = document.createElement("input");
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

							if(typeof(b1nTPortal_data.config.saveCCardNextF) === "function") {
								var object = new Object();
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
								object.required_fields = b1nTPortal_data.required_fields;

								b1nTPortal_data.config.saveCCardNextF(object);
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