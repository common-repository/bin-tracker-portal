function b1nTPortal_home_page_template(b1nTPortal_arg_config) {
	var b1nTPortal_data = this;
	b1nTPortal_data.config = b1nTPortal_arg_config;

	//Choose to pass in the required fields here in case we want
	//to add special styling when creating and appending children
	this.b1nTPortal_init = function(b1nTPortal_extra_config) {
		var b1nTPortal_host_div = document.getElementById(b1nTPortal_data.config.hostDiv);
		var b1nTPortal_parent_div = document.getElementById(b1nTPortal_data.config.parentDiv);

		if(b1nTPortal_parent_div) {
			b1nTPortal_parent_div.style.maxWidth = "641px";
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
			b1nTPortal_wrapper_div.setAttribute("id", "b1nTPortal_home_page_template");
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
							b1nTPortal_config.selected = "HOME";

							var b1nTPortal_name = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_customer_name : "";
							b1nTPortal_config.customerName = "<strong>WELCOME:</strong> <br> "+b1nTPortal_name;
							b1nTPortal_data.config.header.b1nTPortal_build_header(b1nTPortal_config);
						} 
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_header_div);
				}

				{
					//balance display
					var b1nTPortal_balance_wrapper = document.createElement("div");

					b1nTPortal_balance_wrapper.style.display = "flex";
					b1nTPortal_balance_wrapper.style.marginTop = "5px";
					b1nTPortal_balance_wrapper.style.marginBottom = "40px";

					var b1nTPortal_balance = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_customer_balance : "0";
					b1nTPortal_balance_wrapper.innerHTML = "<strong>BALANCE:</strong>&nbsp;&nbsp;"+_b1nTPortal_format_for_currency((b1nTPortal_balance*1).toFixed(2), 0);

					b1nTPortal_limiter_div.appendChild(b1nTPortal_balance_wrapper);
				}

				{
					//home page tiles
					var b1nTPortal_tile_wrapper = document.createElement("div");

					b1nTPortal_tile_wrapper.style.display = "flex";
					b1nTPortal_tile_wrapper.style.gap = "10px";
					b1nTPortal_tile_wrapper.style.flexWrap = "wrap";

					{
						//tile
						var b1nTPortal_tile = document.createElement("div");

						b1nTPortal_tile.style.cursor = "pointer";

						var b1nTPortal_tile_div = _b1nTPortal_create_tile("PROFILE", "profile.png");

						if(typeof(b1nTPortal_data.config.profileNextF) === "function") {
							b1nTPortal_tile.onclick = function() {
								b1nTPortal_data.config.profileNextF();
							}
						}

						b1nTPortal_tile.appendChild(b1nTPortal_tile_div);
						b1nTPortal_tile_wrapper.appendChild(b1nTPortal_tile);
					}


					{
						//tile
						var b1nTPortal_tile = document.createElement("div");

						b1nTPortal_tile.style.cursor = "pointer";

						var b1nTPortal_tile_div = _b1nTPortal_create_tile("JOB SITES", "jobsite.png");

						if(typeof(b1nTPortal_data.config.jobsiteNextF) === "function") {
							b1nTPortal_tile.onclick = function() {
								b1nTPortal_data.config.jobsiteNextF();
							}
						}

						b1nTPortal_tile.appendChild(b1nTPortal_tile_div);
						b1nTPortal_tile_wrapper.appendChild(b1nTPortal_tile);
					}

					{
						//tile
						var b1nTPortal_tile = document.createElement("div");

						b1nTPortal_tile.style.cursor = "pointer";

						var b1nTPortal_tile_div = _b1nTPortal_create_tile("WORK ORDERS", "workOrders.png");

						if(typeof(b1nTPortal_data.config.workOrderNextF) === "function") {
							b1nTPortal_tile.onclick = function() {
								b1nTPortal_data.config.workOrderNextF();
							}
						}

						b1nTPortal_tile.appendChild(b1nTPortal_tile_div);
						b1nTPortal_tile_wrapper.appendChild(b1nTPortal_tile);
					}

					{
						//tile
						var b1nTPortal_tile = document.createElement("div");

						b1nTPortal_tile.style.cursor = "pointer";

						var b1nTPortal_tile_div = _b1nTPortal_create_tile("FINANCIALS", "transactions.jpg");

						if(typeof(b1nTPortal_data.config.transactionsNextF) === "function") {
							b1nTPortal_tile.onclick = function() {
								b1nTPortal_data.config.transactionsNextF();
							}
						}

						b1nTPortal_tile.appendChild(b1nTPortal_tile_div);
						b1nTPortal_tile_wrapper.appendChild(b1nTPortal_tile);
					}

					{
						//tile
						var b1nTPortal_tile = document.createElement("div");

						b1nTPortal_tile.style.cursor = "pointer";

						var b1nTPortal_tile_div = _b1nTPortal_create_tile("REPORTS", "reports.png");

						if(typeof(b1nTPortal_data.config.reportsNextF) === "function") {
							b1nTPortal_tile.onclick = function() {
								b1nTPortal_data.config.reportsNextF();
							}
						}

						b1nTPortal_tile.appendChild(b1nTPortal_tile_div);
						b1nTPortal_tile_wrapper.appendChild(b1nTPortal_tile);
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_tile_wrapper);
				}

				//finalize structure
				b1nTPortal_wrapper_div.appendChild(b1nTPortal_limiter_div);
			}

			b1nTPortal_host_div.appendChild(b1nTPortal_wrapper_div);
		}
	}

	function _b1nTPortal_format_for_currency(b1nTPortal_number, b1nTPortal_rms) {
		var b1nTPortal_value = (b1nTPortal_number*1).toLocaleString("en-US", {style:"currency", currency:"USD"});
		var b1nTPortal_value_formatted = b1nTPortal_rms ? String(b1nTPortal_value).replace("$", '') : String(b1nTPortal_value).replace("$", '$ ');
		return b1nTPortal_value_formatted;
	}

	//create tiles
	function _b1nTPortal_create_tile(b1nTPortal_name, b1nTPortal_icon) {
		var b1nTPortal_tile_parent = document.createElement("div");

		b1nTPortal_tile_parent.style.width = "140px";
		b1nTPortal_tile_parent.style.padding = "5px";
		b1nTPortal_tile_parent.style.boxShadow = "0 0 5px 0 rgb(8 8 8 / 50%)";
		b1nTPortal_tile_parent.style.borderRadius = "5px";

		{
			//image
			var b1nTPortal_tile_Image = document.createElement("img");

			b1nTPortal_tile_Image.style.display = "block";
			b1nTPortal_tile_Image.style.margin = "auto";
			b1nTPortal_tile_Image.style.width = "auto";
			b1nTPortal_tile_Image.style.height = "80px";

			b1nTPortal_tile_Image.setAttribute("src", b1nTPortal_data.config.image_url+b1nTPortal_icon);
			b1nTPortal_tile_parent.appendChild(b1nTPortal_tile_Image);
		}
		
		{
			//text
			var b1nTPortal_tile_div = document.createElement("div");

			b1nTPortal_tile_div.setAttribute("class", "b1nTPortal_no_user_select");

			b1nTPortal_tile_div.style.paddingTop = "5px";
			b1nTPortal_tile_div.style.borderTop = "1px solid #000000";
			b1nTPortal_tile_div.style.textAlign = "center";

			b1nTPortal_tile_div.innerHTML = "<strong>"+b1nTPortal_name+"</strong>";
			b1nTPortal_tile_parent.appendChild(b1nTPortal_tile_div);
		}

		return b1nTPortal_tile_parent;
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