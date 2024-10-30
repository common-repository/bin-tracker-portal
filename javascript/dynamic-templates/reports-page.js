function b1nTPortal_reports_page_template(b1nTPortal_arg_config) {
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
			b1nTPortal_wrapper_div.setAttribute("id", "b1nTPortal_reports_page_template");
			b1nTPortal_wrapper_div.setAttribute("class", "b1nTPortal_backend_template");

			{
				//limiter div
				var b1nTPortal_limiter_div = document.createElement("div");
				b1nTPortal_data.fields = {}; //place holder for the fields
				b1nTPortal_data.reports = {}; //place holder for reports

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
							b1nTPortal_config.selected = "REPORTS";
							b1nTPortal_config.customerName = '<strong style="font-size: x-large;"">REPORTS</strong>';
							b1nTPortal_data.config.header.b1nTPortal_build_header(b1nTPortal_config);
						} 
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_header_div);
				}

				//lets group reports in to category
				b1nTPortal_data.reports["CategoryList"] = [];
				b1nTPortal_extra_config.b1nTPortal_reports_object_list.forEach(function(value, index){
					var b1nTPortal_category = value.Category;

					if(b1nTPortal_data.reports[b1nTPortal_category]) {} else {
						b1nTPortal_data.reports[b1nTPortal_category] = [];
						b1nTPortal_data.reports["CategoryList"].push(b1nTPortal_category);
					}

					b1nTPortal_data.reports[b1nTPortal_category].push(value);
				});

				{
					var b1nTPortal_div_table = document.createElement("div");
					b1nTPortal_div_table.style.display = "flex";
					b1nTPortal_div_table.style.flexDirection = "column";
					b1nTPortal_div_table.style.gap = "10px";
					b1nTPortal_div_table.style.height = "500px";
					b1nTPortal_div_table.style.overflowY = "auto";

					b1nTPortal_data.reports["CategoryList"].forEach(function(value, index) {
						var b1nTPortal_title_div = document.createElement("div");

						b1nTPortal_title_div.style.fontSize = "larger";
						b1nTPortal_title_div.style.fontWeight = "bold";
						b1nTPortal_title_div.style.color = "#ffffff";
						b1nTPortal_title_div.style.backgroundColor = "#1782b5";
						b1nTPortal_title_div.style.padding = "5px";

						b1nTPortal_title_div.innerHTML = value;
						b1nTPortal_div_table.appendChild(b1nTPortal_title_div);

						//content
						var b1nTPortal_category_ol = document.createElement("ol");

						b1nTPortal_category_ol.style.listStyle = "none";
						b1nTPortal_category_ol.style.margin = "0px";
						b1nTPortal_category_ol.style.columnCount = "2";
						b1nTPortal_category_ol.style.color = "#1782b5";

						b1nTPortal_data.reports[value].forEach(function(sub_value, sub_index) {
							b1nTPortal_category_li = document.createElement("li");

							b1nTPortal_category_li.setAttribute("id", "b1nTPortal_reports_id_"+sub_value.ID);

							b1nTPortal_category_li.style.margin = "0px";
							b1nTPortal_category_li.style.cursor = "pointer";

							b1nTPortal_category_li.innerHTML = sub_value.Name;

							b1nTPortal_category_li.onmouseover = function() {
								this.style.color = "#115d81";
							}

							b1nTPortal_category_li.onmouseout = function() {
								this.style.color = "#1782b5";
							}

							b1nTPortal_category_li.onclick = function() {
								var b1nTPortal_report_id = this.id.split("_")[3];
								if(typeof(b1nTPortal_data.config.reportsNextF) === "function") {
									b1nTPortal_data.config.reportsNextF(b1nTPortal_report_id);
								}
							}

							b1nTPortal_category_ol.appendChild(b1nTPortal_category_li);
						});

						b1nTPortal_div_table.appendChild(b1nTPortal_category_ol);
						
					});

					b1nTPortal_limiter_div.appendChild(b1nTPortal_div_table);
				}

				//finalize structure
				b1nTPortal_wrapper_div.appendChild(b1nTPortal_limiter_div);
			}

			b1nTPortal_host_div.appendChild(b1nTPortal_wrapper_div);
		}
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