function b1nTPortal_login_template(b1nTPortal_arg_config) {
	var b1nTPortal_data = this;
	b1nTPortal_data.config = b1nTPortal_arg_config;

	//Choose to pass in the required fields here in case we want
	//to add special styling when creating and appending children
	this.b1nTPortal_init = function(b1nTPortal_required_fields) {
		var b1nTPortal_host_div = document.getElementById(b1nTPortal_data.config.hostDiv);
		var b1nTPortal_parent_div = document.getElementById(b1nTPortal_data.config.parentDiv);

		if(b1nTPortal_parent_div) {
			b1nTPortal_parent_div.style.maxWidth = "486px";
		}

		//make sure host exists
		if(b1nTPortal_host_div) {
			{
				//factory reset
				b1nTPortal_host_div.innerHTML = "";
				if(b1nTPortal_data.fields) { b1nTPortal_data.fields = undefined; };
				if(b1nTPortal_data.required_fields) { b1nTPortal_data.required_fields = undefined; };

				//make sure the element passed in is an array
				if(Array.isArray(b1nTPortal_required_fields)) {
					b1nTPortal_data.required_fields = b1nTPortal_required_fields;
				}
			}

			//wrapper div
			var b1nTPortal_wrapper_div = document.createElement("div");
			b1nTPortal_wrapper_div.setAttribute("id", "b1nTPortal_login_template");

			{
				//limiter div
				var b1nTPortal_limiter_div = document.createElement("div");
				b1nTPortal_data.fields = {}; //place holder for the fields

				{
					//username
					var b1nTPortal_username_div = document.createElement("div");
					var b1nTPortal_username_input = document.createElement("input");

					b1nTPortal_username_input.setAttribute("placeholder", "Username");
					b1nTPortal_username_input.setAttribute("type", "textbox");

					b1nTPortal_username_input.style.textAlign = "center";

					b1nTPortal_username_div.appendChild(b1nTPortal_username_input);
					b1nTPortal_limiter_div.appendChild(b1nTPortal_username_div);

					//store input
					b1nTPortal_data.fields["b1nTPortal_username"] = b1nTPortal_username_input;
				}

				{
					//password
					var b1nTPortal_password_div = document.createElement("div");
					var b1nTPortal_password_input = document.createElement("input");

					b1nTPortal_password_input.setAttribute("placeholder", "Password");
					b1nTPortal_password_input.setAttribute("type", "password");

					b1nTPortal_password_input.style.textAlign = "center";

					b1nTPortal_password_div.appendChild(b1nTPortal_password_input);
					b1nTPortal_limiter_div.appendChild(b1nTPortal_password_div);

					//store input
					b1nTPortal_data.fields["b1nTPortal_password"] = b1nTPortal_password_input;		
				}

				{
					//submit button
					var b1nTPortal_submit_div = document.createElement("div");
					var b1nTPortal_submit_button = document.createElement("input");

					b1nTPortal_submit_button.setAttribute("type", "button");
				
					b1nTPortal_submit_button.value = "Log in";		

					b1nTPortal_submit_button.onclick = function() {
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

						if(typeof(b1nTPortal_data.config.nextF) === "function") {
							var object = new Object();
							object.username = b1nTPortal_data.fields["b1nTPortal_username"].value;	
							object.password = b1nTPortal_data.fields["b1nTPortal_password"].value;	
							object.required_fields = b1nTPortal_data.required_fields;
							b1nTPortal_data.config.nextF(object);
						}
					}

					b1nTPortal_submit_div.appendChild(b1nTPortal_submit_button);
					b1nTPortal_limiter_div.appendChild(b1nTPortal_submit_div);
				}

				//finalize structure
				b1nTPortal_wrapper_div.appendChild(b1nTPortal_limiter_div);
			}

			b1nTPortal_host_div.appendChild(b1nTPortal_wrapper_div);

			//apply css and set an observer
			_b1nTPortal_observer();
		}
	}

	//dynamic blend
	function _b1nTPortal_observer() {
		var b1nTPortal_resize_observer = new ResizeObserver(function() {
			var b1nTPortal_div = document.getElementById("b1nTPortal_login_template");

			if(b1nTPortal_div) {} else {
				b1nTPortal_resize_observer.disconnect();
				return; //skip evaluations
			}

			var b1nTPortal_div_width = b1nTPortal_div.offsetWidth;

			if(b1nTPortal_div_width > 375) {
				b1nTPortal_div.className = "b1nTPortal_login_template_mw375";
			} else {
				b1nTPortal_div.className = "";
			}
		});

		var b1nTPortal_div = document.getElementById("b1nTPortal_login_template");
		b1nTPortal_resize_observer.observe(b1nTPortal_div);
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