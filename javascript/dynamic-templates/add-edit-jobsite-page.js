function b1nTPortal_add_edit_jobsite_page_template(b1nTPortal_arg_config) {
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

				if(b1nTPortal_extra_config) {
					b1nTPortal_data.jobsite_id = b1nTPortal_extra_config.b1nTPortal_jobsite_id;
				} else {
					b1nTPortal_data.jobsite_id = "0";
				}

				//make sure the element passed in is an array
				if(Array.isArray(b1nTPortal_extra_config.b1nTPortal_required_fields)) {
					b1nTPortal_data.required_fields = b1nTPortal_extra_config.b1nTPortal_required_fields;
				}
			}

			//wrapper div
			var b1nTPortal_wrapper_div = document.createElement("div");
			b1nTPortal_wrapper_div.setAttribute("id", "b1nTPortal_add_edit_jobsite_page_template");
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
							b1nTPortal_config.selected = "JOB SITES";
							var b1nTPortal_title = b1nTPortal_extra_config.b1nTPortal_jobsite_id == 0 ? "ADD JOB SITE" : "EDIT JOB SITE";
							b1nTPortal_config.customerName = '<strong style="font-size: x-large;">'+b1nTPortal_title+'</strong>';
							b1nTPortal_data.config.header.b1nTPortal_build_header(b1nTPortal_config);
						} 
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_header_div);
				}

				{
					var b1nTPortal_div_table = document.createElement("div");
					b1nTPortal_div_table.style.display = "flex";
					b1nTPortal_div_table.style.flexDirection = "column";
					b1nTPortal_div_table.style.gap = "2px";

					{
						//job site name
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_jobsite_name : "";
						var b1nTPortal_div_row = _b1nTPortal_create_rows("Job Name", b1nTPortal_value, "b1nTPortal_jobsite_name", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//job site address
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_jobsite_address : "";
						var b1nTPortal_div_row = _b1nTPortal_create_rows("Address", b1nTPortal_value, "b1nTPortal_jobsite_address", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						var b1nTPortal_div_row = document.createElement("div");
						b1nTPortal_div_row.style.display = "flex";

						{
							var b1nTPortal_google_div_wrapper = document.createElement("div");
							
							b1nTPortal_google_div_wrapper.style.width = "100px";
							b1nTPortal_google_div_wrapper.style.marginTop = "10px";
							b1nTPortal_google_div_wrapper.style.marginBottom = "10px";
							b1nTPortal_google_div_wrapper.style.marginRight = "10px";
							b1nTPortal_google_div_wrapper.style.flexShrink = "0";

							b1nTPortal_div_row.appendChild(b1nTPortal_google_div_wrapper);
						}

						{
							var b1nTPortal_google_div_wrapper = document.createElement("div");

							b1nTPortal_google_div_wrapper.style.display = "flex";
							b1nTPortal_google_div_wrapper.style.width = "100%";

							{
								var b1nTPortal_div_row_div = document.createElement("div");

								b1nTPortal_div_row_div.style.fontWeight = "600";
								b1nTPortal_div_row_div.style.fontStyle = "italic";
								b1nTPortal_div_row_div.style.fontSize = "small";

								b1nTPortal_div_row_div.innerHTML = "GOOGLE STATUS:&nbsp;";
								b1nTPortal_google_div_wrapper.appendChild(b1nTPortal_div_row_div);	
							}

							{
								var b1nTPortal_div_row_div = document.createElement("div");	

								b1nTPortal_div_row_div.style.fontWeight = "600";
								b1nTPortal_div_row_div.style.fontStyle = "italic";
								b1nTPortal_div_row_div.style.fontSize = "small";

								b1nTPortal_google_div_wrapper.appendChild(b1nTPortal_div_row_div);
								b1nTPortal_data.fields["b1nTPortal_google_validator"] = b1nTPortal_div_row_div;
							}

							b1nTPortal_div_row.appendChild(b1nTPortal_google_div_wrapper);
						}

						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//job site city
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_jobsite_city : "";
						b1nTPortal_div_row = _b1nTPortal_create_rows("City", b1nTPortal_value, "b1nTPortal_jobsite_city", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//jobsite state
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_jobsite_state : "";
						var b1nTPortal_list  = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_list_of_state : new Array();
						b1nTPortal_div_row = _b1nTPortal_create_state_rows("State", b1nTPortal_value, "b1nTPortal_jobsite_state", b1nTPortal_list);
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//job site zip
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_jobsite_zip : "";
						b1nTPortal_div_row = _b1nTPortal_create_rows("Zip", b1nTPortal_value, "b1nTPortal_jobsite_zip", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//job site county
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_jobsite_county : "";
						b1nTPortal_div_row = _b1nTPortal_create_rows("County", b1nTPortal_value, "b1nTPortal_jobsite_county", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//job site muni
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_jobsite_muni : "";
						b1nTPortal_div_row = _b1nTPortal_create_rows("Muni", b1nTPortal_value, "b1nTPortal_jobsite_muni", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//job site cross street
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_jobsite_cross_street : "";
						b1nTPortal_div_row = _b1nTPortal_create_rows("Cross Street", b1nTPortal_value, "b1nTPortal_jobsite_cross_street", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//customer contact list
						var b1nTPortal_select  = document.createElement("select");

						var b1nTPortal_options = document.createElement("option");
						b1nTPortal_options.value = "";
						b1nTPortal_options.innerHTML = "Please select";
						b1nTPortal_select.appendChild(b1nTPortal_options);

						if(Array.isArray(b1nTPortal_extra_config.b1nTPortal_jobsite_contact_list)) {
							b1nTPortal_data.contacts_list = new Array();
							b1nTPortal_extra_config.b1nTPortal_jobsite_contact_list.forEach(function(b1nTPortal_object) {
								b1nTPortal_options = document.createElement("option");
								b1nTPortal_options.value = b1nTPortal_object.ID;
								b1nTPortal_options.innerHTML = b1nTPortal_object.Name;

								if((b1nTPortal_object.ID*1) == (b1nTPortal_extra_config.b1nTPortal_jobsite_contact_id*1)) {
									b1nTPortal_options.selected = true;	
								}

								b1nTPortal_select.appendChild(b1nTPortal_options);
							});
						}

						var b1nTPortal_div_row = _b1nTPortal_create_rows("Contact", "", "b1nTPortal_jobsite_contacts", "textbox");
						b1nTPortal_div_row.lastChild.firstChild.remove();
						b1nTPortal_div_row.lastChild.appendChild(b1nTPortal_select);
						b1nTPortal_data.fields["b1nTPortal_jobsite_contacts"] = b1nTPortal_select;
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//job site hazzards
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_jobsite_hazzards : "";
						b1nTPortal_div_row = _b1nTPortal_create_rows("Hazards", b1nTPortal_value, "b1nTPortal_jobsite_hazzards", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//job site billing note
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_jobsite_billing_note : "";
						b1nTPortal_div_row = _b1nTPortal_create_rows("Billing Note", b1nTPortal_value, "b1nTPortal_jobsite_billing_note", "textbox");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
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
							var b1nTPortal_failure_flag = document.getElementById(b1nTPortal_data.config.failFlag);
							if(b1nTPortal_failure_flag) { b1nTPortal_failure_flag.innerHTML = ""; }

							if(b1nTPortal_data.b1nTPortal_validate_fields(b1nTPortal_data.required_fields)) {
								var b1nTPortal_message = document.createElement("p");
								b1nTPortal_message.setAttribute("class", "b1nTPortal-error-msg");
								b1nTPortal_message.innerHTML = "Please fill the highlighted fields.";
								b1nTPortal_failure_flag.appendChild(b1nTPortal_message);
								return; 
							}

							//save job site
							if(typeof(b1nTPortal_data.config.saveJobSiteNextF) === "function") {
								var object = new Object();
								object.jobsite_id = b1nTPortal_data.jobsite_id;
								object.jobsite_name = b1nTPortal_data.fields["b1nTPortal_jobsite_name"].value;
								object.jobsite_address = b1nTPortal_data.fields["b1nTPortal_jobsite_address"].value;
								object.jobsite_city = b1nTPortal_data.fields["b1nTPortal_jobsite_city"].value;
								object.jobsite_state = b1nTPortal_data.fields["b1nTPortal_jobsite_state"].value;
								object.jobsite_zip = b1nTPortal_data.fields["b1nTPortal_jobsite_zip"].value;
								object.jobsite_county = b1nTPortal_data.fields["b1nTPortal_jobsite_county"].value;
								object.jobsite_muni = b1nTPortal_data.fields["b1nTPortal_jobsite_muni"].value;
								object.jobsite_cross_street = b1nTPortal_data.fields["b1nTPortal_jobsite_cross_street"].value;
								object.jobsite_contact_id = b1nTPortal_data.fields["b1nTPortal_jobsite_contacts"].value ? b1nTPortal_data.fields["b1nTPortal_jobsite_contacts"].value : 0;
								object.jobsite_hazzards = b1nTPortal_data.fields["b1nTPortal_jobsite_hazzards"].value;
								object.jobsite_billing_note = b1nTPortal_data.fields["b1nTPortal_jobsite_billing_note"].value;
								object.jobsite_validated = b1nTPortal_data.b1nTPortal_job_address_vldtr.validated;
								object.required_fields = b1nTPortal_data.required_fields;
								b1nTPortal_data.config.saveJobSiteNextF(object);
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


			if(typeof(b1nTPortal_cls_address_vldtr) == 'function') {
				var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_jobsite_validated : "0";

	            b1nTPortal_data.b1nTPortal_job_address_vldtr = new b1nTPortal_cls_address_vldtr({
	            	"status": b1nTPortal_value,
	                "searchCtrl" : b1nTPortal_data.fields["b1nTPortal_jobsite_address"],
	                "addressCtrl" : b1nTPortal_data.fields["b1nTPortal_jobsite_address"],
	                "cityCtrl" : b1nTPortal_data.fields["b1nTPortal_jobsite_city"],
	                "stateCtrl" : b1nTPortal_data.fields["b1nTPortal_jobsite_state"],
	                "postalCtrl" : b1nTPortal_data.fields["b1nTPortal_jobsite_zip"],
	                "validateCtrl" : b1nTPortal_data.fields["b1nTPortal_google_validator"]
	            });
      		} 
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
	function _b1nTPortal_create_state_rows(b1nTPortal_label, b1nTPortal_value, b1nTPortal_key, b1nTPortal_list) {
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