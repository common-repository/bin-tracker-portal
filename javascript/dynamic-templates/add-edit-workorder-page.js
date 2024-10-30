function b1nTPortal_add_edit_workorder_page_template(b1nTPortal_arg_config) {
	var b1nTPortal_data = this;
	b1nTPortal_data.config = b1nTPortal_arg_config;

	//Choose to pass in the required fields here in case we want
	//to add special styling when creating and appending children
	this.b1nTPortal_init = function(b1nTPortal_extra_config) {
		var b1nTPortal_host_div = document.getElementById(b1nTPortal_data.config.hostDiv);
		var b1nTPortal_parent_div = document.getElementById(b1nTPortal_data.config.parentDiv);

		if(b1nTPortal_parent_div) {
			b1nTPortal_parent_div.style.maxWidth = "700px";
		}

		//make sure host exists
		if(b1nTPortal_host_div) {
			{
				//factory reset
				b1nTPortal_host_div.innerHTML = "";
				if(b1nTPortal_data.fields) { b1nTPortal_data.fields = undefined; };
				if(b1nTPortal_data.required_fields) { b1nTPortal_data.required_fields = undefined; };

				if(b1nTPortal_extra_config) {
					b1nTPortal_data.workorder_id = b1nTPortal_extra_config.b1nTPortal_workorder_id;
					b1nTPortal_data.workorder_jsid = b1nTPortal_extra_config.b1nTPortal_workorder_jsid;
				} else {
					b1nTPortal_data.workorder_id = "0";
					b1nTPortal_data.workorder_jsid = "0";
				}

				//make sure the element passed in is an array
				if(Array.isArray(b1nTPortal_extra_config.b1nTPortal_required_fields)) {
					b1nTPortal_data.required_fields = b1nTPortal_extra_config.b1nTPortal_required_fields;
				}
			}

			//wrapper div
			var b1nTPortal_wrapper_div = document.createElement("div");
			b1nTPortal_wrapper_div.setAttribute("id", "b1nTPortal_add_edit_workorder_page_template");
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
							b1nTPortal_config.selected = "WORK ORDERS";
							var b1nTPortal_title = b1nTPortal_extra_config.b1nTPortal_workorder_id == "0" ? "ADD WORK ORDER" : "EDIT WORK ORDER";
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
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_jsname : "";
						var b1nTPortal_div_row = _b1nTPortal_create_rows("Job Name", b1nTPortal_value, "b1nTPortal_jobsite_name", "textbox", 1);
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//job site address
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_jsaddress : "";
						var b1nTPortal_div_row = _b1nTPortal_create_rows("Address", b1nTPortal_value, "b1nTPortal_jobsite_address", "textbox", 1);
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//job site city
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_jscity : "";
						var b1nTPortal_div_row = _b1nTPortal_create_rows("City", b1nTPortal_value, "b1nTPortal_jobsite_city", "textbox", 1);
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//jobsite state
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_jsstate : "";
						var b1nTPortal_list  = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_list_of_state : new Array();
						b1nTPortal_div_row = _b1nTPortal_create_select_rows("State", b1nTPortal_value, "b1nTPortal_jobsite_state", b1nTPortal_list, 1, "state");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//job site zip
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_jszip : "";
						var b1nTPortal_div_row = _b1nTPortal_create_rows("Zip", b1nTPortal_value, "b1nTPortal_jobsite_city", "textbox", 1);
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//job site containers on site
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_targetcont : "";
						var b1nTPortal_list  = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_jsonsite : new Array();
						var b1nTPortal_div_row = _b1nTPortal_create_select_rows("Boxes on Site", b1nTPortal_value, "b1nTPortal_workorder_targetcont", b1nTPortal_list, 0, "onsite");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}				

					{
						//work order types
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_wotype : "";
						var b1nTPortal_list  = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_wotypes : new Object();
						var b1nTPortal_div_row = _b1nTPortal_create_select_rows("Type", b1nTPortal_value, "b1nTPortal_workorder_wotype", b1nTPortal_list, 0, "wotype");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);

						//we want to keep a copy of the original wo type
						//we will use it to determine if we are going to
						//perform an availability check when saving work.
						b1nTPortal_data.original_wo_type = b1nTPortal_value;
					}

					{
						//work order container qty
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_contqty : "";
						var b1nTPortal_div_row = _b1nTPortal_create_select_rows("Asset Qty", b1nTPortal_value, "b1nTPortal_workorder_contqty", new Array(), 0, "contqty");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);

						//we want to keep a copy of the original asset qty
						//we will use it to determine if we are going to per-
						//form an availability when saving saving work orders.
						b1nTPortal_data.original_asset_qty = b1nTPortal_value;
					}

					{
						//work order assets
						var b1nTPortal_value1 = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_contsize : "";
						var b1nTPortal_value2 = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_conttype : "";
						var b1nTPortal_value3 = b1nTPortal_value1+"-"+b1nTPortal_value2;

						var b1nTPortal_list  = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_assets : new Array();
						var b1nTPortal_div_row = _b1nTPortal_create_select_rows("Asset In", b1nTPortal_value3, "b1nTPortal_workorder_asset", b1nTPortal_list, 0, "asset");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);

						//we want to keep a copy of the original asset class
						//we will use it to determine if we are going to per-
						//form an availability when saving saving work orders.
						b1nTPortal_data.original_asset_class = b1nTPortal_value3;
					}

					{
						//work order assets
						var b1nTPortal_value1 = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_contsize2 : "";
						var b1nTPortal_value2 = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_conttype2 : "";
						var b1nTPortal_value3 = b1nTPortal_value1+"-"+b1nTPortal_value2;

						var b1nTPortal_list  = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_assets : new Array();
						var b1nTPortal_div_row = _b1nTPortal_create_select_rows("Asset Out", b1nTPortal_value3, "b1nTPortal_workorder_asset2", b1nTPortal_list, 0, "asset");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					{
						//work order date template
						var b1nTPortal_div_row = _b1nTPortal_create_rows("Date", "", "b1nTPortal_workorder_wodate", "date", 0);
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);

						//going to make the date read only.
						b1nTPortal_data.fields["b1nTPortal_workorder_wodate"].readOnly = true;
					}

					{
						//work order material
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_material : "";
						var b1nTPortal_list  = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_materials : new Array();
						var b1nTPortal_div_row = _b1nTPortal_create_select_rows("Material", b1nTPortal_value, "b1nTPortal_workorder_material", b1nTPortal_list, 0, "material");
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}	

					{
						//work order remarks
						var b1nTPortal_value = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_remarks : "";
						var b1nTPortal_div_row = _b1nTPortal_create_rows("Remarks", b1nTPortal_value, "b1nTPortal_workorder_remarks", "textarea", 0);
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
							var b1nTPortal_user_bypass = (b1nTPortal_data.workorder_id * 1) ? 1 : 0;
							_b1nTPortal_save_wo(b1nTPortal_user_bypass, b1nTPortal_extra_config);
						}

						if(b1nTPortal_data.workorder_id == "0" && b1nTPortal_data.workorder_jsid == "0") {
							b1nTPortal_button.disabled = true;
							b1nTPortal_button.style.width = "auto";
							b1nTPortal_button.style.backgroundColor = "#fd3d00";
							b1nTPortal_button.value = "Error: can't save.. Please try again."
						}

						b1nTPortal_div_row.appendChild(b1nTPortal_button);
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);

						b1nTPortal_data.fields["b1nTPortal_workorder_save_button"] = b1nTPortal_button;
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_div_table);	
				}

				{
					//build availability
					var b1nTPortal_buffer = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_availability_buffer : 0;
					var b1nTPortal_list   = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_availability : new Array();
					var b1nTPortal_div_availability = _b1nTPortal_build_availability(b1nTPortal_buffer, b1nTPortal_list);
					b1nTPortal_limiter_div.appendChild(b1nTPortal_div_availability);
				}

				//finalize structure
				b1nTPortal_wrapper_div.appendChild(b1nTPortal_limiter_div);
			}

			b1nTPortal_host_div.appendChild(b1nTPortal_wrapper_div);

			//set up the date picker
			if(typeof(b1nTPortal_data.config.datePicker) === "function") {
				var b1nTPortal_date = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_wodate : "";
				var b1nTPortal_min_date = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_early_book_date : "";
				var b1nTPortal_max_date = typeof(b1nTPortal_extra_config) === "object" ? b1nTPortal_extra_config.b1nTPortal_workorder_late_book_date : "";
				b1nTPortal_data.config.datePicker("b1nTPortal_workorder_wodate", b1nTPortal_date, b1nTPortal_min_date, b1nTPortal_max_date);
				_b1nTPortal_observer("b1nTPortal_workorder_wodate");
			}

			//set up the user confirm dialog
			var config = new Object();
			config.container = document.getElementById("b1nTPortal_dialog_box");
			config.overlay   = document.getElementById("b1nTPortal_ajax_shield2");

			config.behaviors = function(b1nTPortal_content, b1nTPortal_nextF) {
				var b1nTPortal_user_confirm_div = document.createElement("div");

				b1nTPortal_data.b1nTPortal_wo_flags = document.createElement("div");

				b1nTPortal_user_confirm_div.appendChild(b1nTPortal_data.b1nTPortal_wo_flags);

				var b1nTPortal_div = document.createElement("div");
				b1nTPortal_div.style.display = "inline-block";
				b1nTPortal_div.style.width = "100%";
				b1nTPortal_div.style.marginTop = "5px";
				b1nTPortal_div.style.marginBottom = "5px";

				var b1nTPortal_div_button = document.createElement("input");
				b1nTPortal_div_button.setAttribute("type", "button");
				b1nTPortal_div_button.style.cssFloat = "right";
				b1nTPortal_div_button.style.width = "100px";

				b1nTPortal_div_button.value = "Ok";

				b1nTPortal_div_button.onclick = function() {
					var b1nTPortal_user_bypass = 1;
					_b1nTPortal_save_wo(b1nTPortal_user_bypass, b1nTPortal_extra_config);
					b1nTPortal_data.b1nTPortal_user_confirm.b1nTPortal_close();
				}

				b1nTPortal_div.appendChild(b1nTPortal_div_button);
				b1nTPortal_user_confirm_div.appendChild(b1nTPortal_div);
				b1nTPortal_content.appendChild(b1nTPortal_user_confirm_div);

				b1nTPortal_nextF();
			}

			b1nTPortal_data.b1nTPortal_user_confirm = new b1nTPortal_slide_up_dialog(config);
		}
	}

	function _b1nTPortal_save_wo(b1nTPortal_user_bypass, b1nTPortal_extra_config) {
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

		//check availability
		if(typeof(b1nTPortal_extra_config) === "object" && _b1nTPortal_availability_check(
				b1nTPortal_extra_config.b1nTPortal_availability_buffer,
				b1nTPortal_extra_config.b1nTPortal_availability,
				b1nTPortal_data.fields["b1nTPortal_workorder_contqty"].value,
				b1nTPortal_data.fields["b1nTPortal_workorder_asset"].value,
				b1nTPortal_data.fields["b1nTPortal_workorder_asset2"].value,
				b1nTPortal_data.fields["b1nTPortal_workorder_wodate"].value,
				b1nTPortal_data.fields["b1nTPortal_workorder_wotype"].value
		)) {
			if(b1nTPortal_failure_flag) {
				var b1nTPortal_message = document.createElement("p");
				b1nTPortal_message.setAttribute("class", "b1nTPortal-error-msg");
				b1nTPortal_message.innerHTML = "Not enough assets available, please check availability table for reference.";
				b1nTPortal_failure_flag.appendChild(b1nTPortal_message);
			}
			return;
		}

		if(typeof(b1nTPortal_data.config.saveWorkOrderNextF) === "function") {
			var object = new Object();
			object.workorder_id = b1nTPortal_data.workorder_id;
			object.workorder_jsid = b1nTPortal_data.workorder_jsid;
			object.workorder_targetcont = b1nTPortal_data.fields["b1nTPortal_workorder_targetcont"].value;
			object.workorder_wotype = b1nTPortal_data.fields["b1nTPortal_workorder_wotype"].value;
			object.workorder_contqty = b1nTPortal_data.fields["b1nTPortal_workorder_contqty"].value;
			object.workorder_asset = b1nTPortal_data.fields["b1nTPortal_workorder_asset"].value;
			object.workorder_asset2 = b1nTPortal_data.fields["b1nTPortal_workorder_asset2"].value;
			object.workorder_wodate = b1nTPortal_data.fields["b1nTPortal_workorder_wodate"].value;
			object.workorder_remarks = b1nTPortal_data.fields["b1nTPortal_workorder_remarks"].value;
			object.workorder_material = b1nTPortal_data.fields["b1nTPortal_workorder_material"].value;
			object.workorder_user_bypass = b1nTPortal_user_bypass;
			object.required_fields = b1nTPortal_data.required_fields;
			b1nTPortal_data.config.saveWorkOrderNextF(object);
		}
	}

	function _b1nTPortal_observer(b1nTPortal_element) {
		var b1nTPortal_resize_observer = new ResizeObserver(() => {
			var b1nTPortal_dom_element = document.getElementById(b1nTPortal_element);
			var b1nTPortal_date_picker = document.getElementById("ui-datepicker-div");
	
			if(b1nTPortal_dom_element && b1nTPortal_date_picker) {} else { 
				b1nTPortal_resize_observer.disconnect();
				return; //skip evaluations 
			}

			if(b1nTPortal_date_picker.getAttribute("b1nTPortal_clicked_element") == b1nTPortal_element) {
				b1nTPortal_date_picker.style.minWidth = b1nTPortal_dom_element.offsetWidth+"px";

				if(typeof(b1nTPortal_data.config.setPosition) === "function") {
					b1nTPortal_data.config.setPosition(b1nTPortal_element, "ui-datepicker-div");
				}
			}
		});

		var b1nTPortal_dom_element = document.getElementById(b1nTPortal_element);
		b1nTPortal_resize_observer.observe(b1nTPortal_dom_element);
	}

	function _b1nTPortal_availability_check(b1nTPortal_availability_buffer, b1nTPortal_availability, b1nTPortal_asset_qty, b1nTPortal_asset, b1nTPortal_asset2, b1nTPortal_date, b1nTPortal_wotype) {
		var b1nTPortal_array_headers = b1nTPortal_availability.b1nTPortal_availability_headers;
		var b1nTPortal_array_content = b1nTPortal_availability.b1nTPortal_availability_rows;		

		var skipWoTypeCheck = function() {
			if(b1nTPortal_wotype == "Delivery" || b1nTPortal_wotype == "Switch") {
				if(b1nTPortal_wotype == "Switch") {
					if(b1nTPortal_asset.toUpperCase() == b1nTPortal_asset2.toUpperCase()) {
							return 1;
					}
				}
				if(b1nTPortal_data.original_wo_type == b1nTPortal_wotype) {
					if(b1nTPortal_data.original_asset_class.toUpperCase() != b1nTPortal_asset.toUpperCase()) {
						return 0;
					}
					if(b1nTPortal_data.original_asset_qty != b1nTPortal_asset_qty) {
						return 0;
					}
					return 1;
				}
				return 0; //do wo type check
			}
			return 1; //skip wo type check
		}

		if(skipWoTypeCheck()) { return 0; }

		var b1nTPortal_asset_index = undefined;
		b1nTPortal_array_headers.forEach(function(value, index) {
			if(value.toUpperCase() == b1nTPortal_asset.toUpperCase()) { 
				b1nTPortal_asset_index = index;
			}
		});

		if(b1nTPortal_asset_index == undefined) { return 1; }

		var b1nTPortal_available_assets = 0;
		b1nTPortal_array_content.forEach(function(value, index) {
			if((b1nTPortal_date == value[0])) {
				b1nTPortal_available_assets = value[b1nTPortal_asset_index];
			}		
		});

		//make some calculations
		var b1nTPortal_temp_orginal_asset_qty = b1nTPortal_data.original_asset_qty ? b1nTPortal_data.original_asset_qty : 0;
		var b1nTPortal_temp_available_assets  = (b1nTPortal_available_assets * 1) + (b1nTPortal_temp_orginal_asset_qty * 1); 		
		var b1nTPortal_assets_after_delivery  = b1nTPortal_temp_available_assets - (b1nTPortal_asset_qty * 1);

		if(b1nTPortal_assets_after_delivery < b1nTPortal_availability_buffer * 1) { return 1; }
		return 0;
	}

	//availability
	function _b1nTPortal_build_availability(b1nTPortal_buffer, b1nTPortal_list) {
		var b1nTPortal_div_row = document.createElement("div");

		b1nTPortal_div_row.style.marginTop = "35px";
		b1nTPortal_div_row.style.overflowX = "auto";
		b1nTPortal_div_row.style.width = "100%";

		var b1nTPortal_tb = document.createElement("table");

		b1nTPortal_tb.style.margin = "0px";
		b1nTPortal_tb.style.width = "100%";

		{
			var b1nTPortal_tr = document.createElement("tr");

			b1nTPortal_tr.style.border = "0px";
			b1nTPortal_tr.style.borderBottom = "1px solid #c2c2c2";

			var b1nTPortal_header_list = b1nTPortal_list.b1nTPortal_availability_headers;
			b1nTPortal_header_list.forEach(function(value, index) {
				var b1nTPortal_th = document.createElement("th");

				b1nTPortal_th.style.border = "0px";
				b1nTPortal_th.style.backgroundColor = "#767676";
				b1nTPortal_th.style.color = "#ffffff";
				b1nTPortal_th.style.whiteSpace = "nowrap";

				if(index == 0) {
					b1nTPortal_th.style.textAlign = "left";
				} else {
					b1nTPortal_th.style.textAlign = "center";
				}

				b1nTPortal_th.innerHTML = value;

				b1nTPortal_tr.appendChild(b1nTPortal_th);
			});

			b1nTPortal_tb.appendChild(b1nTPortal_tr);
			
		}

		{
			var b1nTPortal_content_list = b1nTPortal_list.b1nTPortal_availability_rows;
			b1nTPortal_content_list.forEach(function(value, index) {
				var b1nTPortal_tr = document.createElement("tr");

				b1nTPortal_tr.style.border = "0px";
				b1nTPortal_tr.style.borderBottom = "1px solid #c2c2c2";

				value.forEach(function(inner_value, inner_index) {
					var b1nTPortal_td = document.createElement("td");

					b1nTPortal_td.style.border = "0px";
					b1nTPortal_td.style.whiteSpace = "nowrap";

					if(inner_index == 0) {
						b1nTPortal_td.innerHTML = inner_value;
						b1nTPortal_td.style.textAlign = "left";
					} else {
						b1nTPortal_td.style.textAlign = "center";

						if(inner_value * 1 > b1nTPortal_buffer * 1) {
							var b1nTPortal_tick_image = document.createElement("img");
							b1nTPortal_tick_image.setAttribute("src", b1nTPortal_data.config.image_url+"tick.png");

							b1nTPortal_tick_image.style.display = "unset";

							b1nTPortal_td.appendChild(b1nTPortal_tick_image);
						} else {
							b1nTPortal_td.style.color = "#ff0000";
							b1nTPortal_td.style.fontWeight = "bolder";
							b1nTPortal_td.innerHTML = "X";
						}
					}

					b1nTPortal_tr.appendChild(b1nTPortal_td);
				});

				b1nTPortal_tb.appendChild(b1nTPortal_tr);
			});
		}

		b1nTPortal_div_row.appendChild(b1nTPortal_tb);

		return b1nTPortal_div_row;
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

			if(b1nTPortal_type == "textarea") {
				b1nTPortal_input = document.createElement("textarea");
			} else {
				b1nTPortal_input.setAttribute("type", b1nTPortal_type);
			}

			if(b1nTPortal_disabled) { 
				b1nTPortal_input.disabled = true;
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
					case "onsite":
						b1nTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							option.value = value.ID;
							option.innerHTML = value.ContainerID;
							b1nTPortal_select.appendChild(option);

							if(value.ID == b1nTPortal_value) {
								foundValue++;
							}
						});
						break;
					case "wotype":
						var b1nTPortal_append_types = function(key) {
							var option = document.createElement("option");

							option.value = key;
							option.innerHTML = b1nTPortal_list[key];
							b1nTPortal_select.appendChild(option);

							if(key == b1nTPortal_value) {
								foundValue++;
							}
						}

						//append in a specific order
						b1nTPortal_append_types("Delivery");
						b1nTPortal_append_types("Switch");
						b1nTPortal_append_types("SOS");
						b1nTPortal_append_types("Out");
						b1nTPortal_append_types("Live");
						b1nTPortal_append_types("Move");
						break;
					case "asset":
						b1nTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							option.value = value;
							option.innerHTML = value;
							b1nTPortal_select.appendChild(option);

							//because of the way box tracker does the assets we have
							//make sure that when we make the check we normalize the 
							//value in this case making them uppercase. this will all-
							//ow us to match assets regardless of the case. For this 
							//reason, we are going to change the way we select values 
							//when doing asset classes.
							if(value.toUpperCase() == b1nTPortal_value.toUpperCase()) {
								b1nTPortal_select.value = value;
							}
						});
						break;
					case "contqty":
						//just a number range 1..30
						for (var b1nTPortal_index = 1; b1nTPortal_index < 31; b1nTPortal_index++) {
							var option = document.createElement("option");
							option.value = b1nTPortal_index;
							option.innerHTML = b1nTPortal_index;
							b1nTPortal_select.appendChild(option);

							if(b1nTPortal_index == b1nTPortal_value) {
								foundValue++;
							}
						}
						break;
					case "material":
						b1nTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							option.value = value.ID;
							option.innerHTML = value.Material;
							b1nTPortal_select.appendChild(option);

							if(value.ID == b1nTPortal_value) {
								foundValue++;
							}
						});
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

	//user confirmation
	this.b1nTPortal_user_confirmation = function(b1nTPortal_response_data) {
		var b1nTPortal_nextF = function() {
			//the is no async calls in the b1nTPortal_open
			b1nTPortal_response_data.similarWOs.forEach(function(b1nTPortal_value, b1nTPortal_index) {
				var b1nTPortal_div = document.createElement("div");
				b1nTPortal_div.style.paddingLeft = "5px";
				b1nTPortal_div.style.color = "#ff0000";
				b1nTPortal_div.innerHTML = b1nTPortal_value;
				b1nTPortal_data.b1nTPortal_wo_flags.appendChild(b1nTPortal_div);
			});			
		}

		b1nTPortal_data.b1nTPortal_user_confirm.b1nTPortal_open("Warning!!", b1nTPortal_nextF);
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