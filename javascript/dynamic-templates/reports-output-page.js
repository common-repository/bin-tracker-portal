function b1nTPortal_reports_output_page_template(b1nTPortal_arg_config) {
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

				if(b1nTPortal_extra_config) {
					b1nTPortal_data.report_id = b1nTPortal_extra_config.b1nTPortal_report_params.ID;
				} else {
					b1nTPortal_data.report_id = "0";
				}

				//make sure the element passed in is an array
				if(Array.isArray(b1nTPortal_extra_config.b1nTPortal_required_fields)) {
					b1nTPortal_data.required_fields = b1nTPortal_extra_config.b1nTPortal_required_fields;
				}
			}

			//wrapper div
			var b1nTPortal_wrapper_div = document.createElement("div");
			b1nTPortal_wrapper_div.setAttribute("id", "b1nTPortal_reports_output_page_template");
			b1nTPortal_wrapper_div.setAttribute("class", "b1nTPortal_backend_template");

			{
				//limiter div
				var b1nTPortal_limiter_div = document.createElement("div");
				b1nTPortal_data.fields = {}; //place holder for the fields
				b1nTPortal_data.check_boxes = [];

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
							b1nTPortal_config.customerName = '<strong style="font-size: x-large;">REPORTS</strong>';
							b1nTPortal_data.config.header.b1nTPortal_build_header(b1nTPortal_config);
						} 
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_header_div);
				}

				{
					var b1nTPortal_div_table = document.createElement("div");
					b1nTPortal_div_table.style.display = "flex";
					b1nTPortal_div_table.style.flexDirection = "column";
					b1nTPortal_div_table.style.marginBottom = "15px";

					{
						var b1nTPortal_div_row = document.createElement("div");
						var b1nTPortal_report_name = b1nTPortal_extra_config.b1nTPortal_report_params.Name;
						var b1nTPortal_report_description = b1nTPortal_extra_config.b1nTPortal_report_params.RptDesc;
						b1nTPortal_div_row.innerHTML = '<strong>'+b1nTPortal_report_name+' - </strong>'+b1nTPortal_report_description;
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_div_table);
				}

				{
					var b1nTPortal_div_table = document.createElement("div");
					b1nTPortal_div_table.style.display = "flex";
					b1nTPortal_div_table.style.flexDirection = "column";
					b1nTPortal_div_table.style.gap = "2px";
					
					b1nTPortal_extra_config.b1nTPortal_report_params.Params.forEach(function(value, index) {
						var b1nTPortal_div_row = _b1nTPortal_get_params(value);
						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					});

					{
						var b1nTPortal_div_row = document.createElement("div");
						b1nTPortal_div_row.style.justifyContent = "end";
						b1nTPortal_div_row.style.marginTop = "20px";
						b1nTPortal_div_row.style.display = "flex";
						b1nTPortal_div_row.style.gap = "10px";

						{
							var b1nTPortal_button = document.createElement("input");
							b1nTPortal_button.setAttribute("type", "button");

							b1nTPortal_button.style.width = "125px";

							b1nTPortal_button.value = "Get Report";

							b1nTPortal_button.onclick = function() {
								var b1nTPortal_a = b1nTPortal_data.fields["b1nTPortal_report_download_a"];

								if(b1nTPortal_a) {
									b1nTPortal_a.removeAttribute("href");
									b1nTPortal_a.removeAttribute("download");
									b1nTPortal_a.firstChild.style.backgroundColor = "#c5c5c5";
									b1nTPortal_a.firstChild.style.cursor = "default";
								}

								if(typeof(b1nTPortal_data.config.getReportNextF) === "function") {
									var object = new Object();
									object.report_id = b1nTPortal_data.report_id;

									if(b1nTPortal_data.fields["b1nTPortal_report_start_date"]) {
										object.report_start_date = "b1nTPortal_report_start_date";
									}

									if(b1nTPortal_data.fields["b1nTPortal_report_end_date"]) {
										object.report_end_date = "b1nTPortal_report_end_date";
									}

									if(b1nTPortal_data.fields["b1nTPortal_report_delivery_date"]) {
										object.report_delivery_date = "b1nTPortal_report_delivery_date";
									}

									if(b1nTPortal_data.fields["b1nTPortal_report_month"]) {
										b1nTPortal_value = b1nTPortal_data.fields["b1nTPortal_report_month"].value;
										object.report_month = b1nTPortal_value ? b1nTPortal_value : undefined;
									}

									if(b1nTPortal_data.fields["b1nTPortal_report_year"]) {
										b1nTPortal_value = b1nTPortal_data.fields["b1nTPortal_report_year"].value;
										object.report_year = b1nTPortal_value ? b1nTPortal_value : undefined;
									}

									if(b1nTPortal_data.fields["b1nTPortal_report_job_site"]) {
										b1nTPortal_value = b1nTPortal_data.fields["b1nTPortal_report_job_site"].value;
										object.report_jobsite_id = b1nTPortal_value ? b1nTPortal_value : undefined;
									}

									if(b1nTPortal_data.fields["b1nTPortal_report_wo_type"]) {
										b1nTPortal_value = b1nTPortal_data.fields["b1nTPortal_report_wo_type"].value;
										object.report_wo_type = b1nTPortal_value ? b1nTPortal_value : undefined;
									}

									if(b1nTPortal_data.check_boxes.length > 0) {
										object.check_boxes = [];
										b1nTPortal_data.check_boxes.forEach(function(value, index) {
											var b1nTPortal_checked = value.checked ? 1 : 0;
											var b1nTPortal_string = value.id+"|"+b1nTPortal_checked;
											object.check_boxes.push(b1nTPortal_string);
										});	
									}

									if(b1nTPortal_data.fields["b1nTPortal_report_sort_by"]) {
										b1nTPortal_value = b1nTPortal_data.fields["b1nTPortal_report_sort_by"].value;
										object.report_sort_by = b1nTPortal_value ? b1nTPortal_value : undefined;
									}

									if(b1nTPortal_data.fields["b1nTPortal_report_filter_by"]) {
										b1nTPortal_value = b1nTPortal_data.fields["b1nTPortal_report_filter_by"].value;
										object.report_filter_by = b1nTPortal_value ? b1nTPortal_value : undefined;
									}

									if(b1nTPortal_data.fields["b1nTPortal_report_list_by"]) {
										b1nTPortal_value = b1nTPortal_data.fields["b1nTPortal_report_list_by"].value;
										object.report_list_by = b1nTPortal_value ? b1nTPortal_value : undefined;
									}

									b1nTPortal_data.config.getReportNextF(object);
								}
							}

							b1nTPortal_div_row.appendChild(b1nTPortal_button);
						}

						{
							var b1nTPortal_a = document.createElement("a");
							var b1nTPortal_button = document.createElement("input");
							b1nTPortal_button.setAttribute("type", "button");

							b1nTPortal_button.style.width = "125px";
							b1nTPortal_button.style.backgroundColor = "#c5c5c5";
							b1nTPortal_button.style.cursor = "default";

							b1nTPortal_button.value = "Download";

							b1nTPortal_a.appendChild(b1nTPortal_button);
							b1nTPortal_div_row.appendChild(b1nTPortal_a);

							//store the download button to be used later
							b1nTPortal_data.fields["b1nTPortal_report_download_a"] = b1nTPortal_a;
						}

						b1nTPortal_div_table.appendChild(b1nTPortal_div_row);
					}

					b1nTPortal_limiter_div.appendChild(b1nTPortal_div_table);
				}

				{
					var b1nTPortal_div_table = document.createElement("div");
					b1nTPortal_div_table.style.display = "flex";
					b1nTPortal_div_table.style.flexDirection = "column";
					b1nTPortal_div_table.style.fontSize = "x-large";
					b1nTPortal_div_table.style.marginTop = "20px";

					b1nTPortal_div_table.innerHTML = '<strong>Report Details</strong>';

					b1nTPortal_limiter_div.appendChild(b1nTPortal_div_table);
				}

				{
					var b1nTPortal_div_table = document.createElement("div");
					b1nTPortal_div_table.style.display = "flex";
					b1nTPortal_div_table.style.flexDirection = "column";
					b1nTPortal_div_table.style.gap = "2px";
					b1nTPortal_div_table.style.height = "500px";
					b1nTPortal_div_table.style.overflowY = "auto";
					b1nTPortal_div_table.style.overflowX = "auto";

					b1nTPortal_limiter_div.appendChild(b1nTPortal_div_table);

					//store for later use
					b1nTPortal_data.fields["b1nTPortal_report_details_div"] = b1nTPortal_div_table;

				}

				//finalize structure
				b1nTPortal_wrapper_div.appendChild(b1nTPortal_limiter_div);
			}

			b1nTPortal_host_div.appendChild(b1nTPortal_wrapper_div);

			//set up the date picker
			if(typeof(b1nTPortal_data.config.datePicker) === "function") {
				var b1nTPortal_get_today = function() {
					var b1nTPortal_date  = new Date();
					var b1nTPortal_month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
					var b1nTPortal_day = (b1nTPortal_date.getDate().length == 1) ? "0"+b1nTPortal_date.getDate() : b1nTPortal_date.getDate();
					return b1nTPortal_month[b1nTPortal_date.getMonth()]+" "+b1nTPortal_day+", "+b1nTPortal_date.getFullYear();
				}

				if(b1nTPortal_data.fields["b1nTPortal_report_start_date"]) {
					b1nTPortal_data.config.datePicker("b1nTPortal_report_start_date", b1nTPortal_get_today(), "", "");
					_b1nTPortal_observer("b1nTPortal_report_start_date");
				}

				if(b1nTPortal_data.fields["b1nTPortal_report_end_date"]) {
					b1nTPortal_data.config.datePicker("b1nTPortal_report_end_date", b1nTPortal_get_today(), "", "");
					_b1nTPortal_observer("b1nTPortal_report_end_date");
				}

				if(b1nTPortal_data.fields["b1nTPortal_report_delivery_date"]) {
					b1nTPortal_data.config.datePicker("b1nTPortal_report_delivery_date", b1nTPortal_get_today(), "", "");
					_b1nTPortal_observer("b1nTPortal_report_delivery_date");
				}
			}
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

	function _b1nTPortal_get_params(b1nTPortal_param) {
		if((b1nTPortal_param.Param == "startDate")) {
			var b1nTPortal_div_row = _b1nTPortal_create_rows("Start Date", "", "b1nTPortal_report_start_date", "date", 0);
			b1nTPortal_data.fields["b1nTPortal_report_start_date"].readOnly = true;
			return b1nTPortal_div_row;
		}

		if((b1nTPortal_param.Param == "endDate")) {
			var b1nTPortal_div_row = _b1nTPortal_create_rows("End Date", "", "b1nTPortal_report_end_date", "date", 0);
			b1nTPortal_data.fields["b1nTPortal_report_end_date"].readOnly = true;
			return b1nTPortal_div_row;
		}

		if((b1nTPortal_param.Param == "deliveryDate")) {
			var b1nTPortal_div_row = _b1nTPortal_create_rows("Delivery Date", "", "b1nTPortal_report_delivery_date", "date", 0);
			b1nTPortal_data.fields["b1nTPortal_report_delivery_date"].readOnly = true;
			return b1nTPortal_div_row;
		}

		if((b1nTPortal_param.Param == "month")) {
			var b1nTPortal_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var b1nTPortal_div_row = _b1nTPortal_create_select_rows("Month", "", "b1nTPortal_report_month", b1nTPortal_list, 0, "month");
			return b1nTPortal_div_row;
		}

		if((b1nTPortal_param.Param == "year")) {
			var b1nTPortal_list = new Array();
			var b1nTPortal_div_row = _b1nTPortal_create_select_rows("Year", "", "b1nTPortal_report_year", b1nTPortal_list, 0, "year");
			return b1nTPortal_div_row;
		}

		if((b1nTPortal_param.Param == "jobSite")) {
			var b1nTPortal_list = b1nTPortal_param.ParamExtra;
			var b1nTPortal_div_row = _b1nTPortal_create_select_rows("Job Sites", "", "b1nTPortal_report_job_site", b1nTPortal_list, 0, "jobsite");
			return b1nTPortal_div_row;
		}

		if((b1nTPortal_param.Param == "woType")) {
			var b1nTPortal_list = b1nTPortal_param.ParamExtra;
			var b1nTPortal_div_row = _b1nTPortal_create_select_rows("WO. Type", "", "b1nTPortal_report_wo_type", b1nTPortal_list, 0, "wotype");
			return b1nTPortal_div_row;
		}

		var b1nTPortal_pattern = /^chk_/;
		if(b1nTPortal_pattern.test(b1nTPortal_param.Param)) {
			var b1nTPortal_match = b1nTPortal_param.Param.match(/^chk_(.*)/);
			var b1nTPortal_temp_value = b1nTPortal_match ? b1nTPortal_match[1] : "";
			var b1nTPortal_label_list = b1nTPortal_temp_value.split("_");
			var b1nTPortal_label = b1nTPortal_label_list.join(" ");
			var b1nTPortal_id    = "chk"+b1nTPortal_label_list.join("");

			//put it together
			var b1nTPortal_div_row = _b1nTPortal_create_rows("", 0, "b1nTPortal_"+b1nTPortal_id, "checkbox");
			b1nTPortal_div_row.style.flexGrow = 1;

			var b1nTPortal_row_wrapper = document.createElement("div");
			b1nTPortal_row_wrapper.style.display = "flex";

			{
				var b1nTPortal_div_label_row = document.createElement("div");
				b1nTPortal_div_label_row.style.width = "100px";
				b1nTPortal_div_label_row.style.flexShrink = 0;
				b1nTPortal_div_label_row.style.marginRight = "10px";
				b1nTPortal_div_label_row.innerHTML = "<strong>"+b1nTPortal_label+"</strong>";
				b1nTPortal_row_wrapper.appendChild(b1nTPortal_div_label_row);
			}

			{
				b1nTPortal_row_wrapper.appendChild(b1nTPortal_div_row);
			}

			var b1nTPortal_checkbox = b1nTPortal_data.fields["b1nTPortal_"+b1nTPortal_id];
			b1nTPortal_checkbox.setAttribute("id", b1nTPortal_id);
			b1nTPortal_data.check_boxes.push(b1nTPortal_checkbox);
			return b1nTPortal_row_wrapper;
		}

		b1nTPortal_pattern = /^sortBy_/;
		if(b1nTPortal_pattern.test(b1nTPortal_param.Param)) {
			var b1nTPortal_match = b1nTPortal_param.Param.match(/^sortBy_(.*)/);
			var b1nTPortal_temp_value = b1nTPortal_match ? b1nTPortal_match[1] : "";
			var b1nTPortal_list = b1nTPortal_temp_value.split("|");
			var b1nTPortal_div_row = _b1nTPortal_create_select_rows("Sort By", "", "b1nTPortal_report_sort_by", b1nTPortal_list, 0, "sortby");
			return b1nTPortal_div_row;
		}

		b1nTPortal_pattern = /^filterBy_/;
		if(b1nTPortal_pattern.test(b1nTPortal_param.Param)) {
			var b1nTPortal_match = b1nTPortal_param.Param.match(/^filterBy_(.*)/);
			var b1nTPortal_temp_value = b1nTPortal_match ? b1nTPortal_match[1] : "";
			var b1nTPortal_list = b1nTPortal_temp_value.split("|");
			var b1nTPortal_div_row = _b1nTPortal_create_select_rows("Filter By", "", "b1nTPortal_report_filter_by", b1nTPortal_list, 0, "filterby");
			return b1nTPortal_div_row;
		}

		b1nTPortal_pattern = /^listBy_/;
		if(b1nTPortal_pattern.test(b1nTPortal_param.Param)) {
			var b1nTPortal_match = b1nTPortal_param.Param.match(/^listBy_(.*)/);
			var b1nTPortal_temp_value = b1nTPortal_match ? b1nTPortal_match[1] : "";
			var b1nTPortal_list = b1nTPortal_temp_value.split("|");
			var b1nTPortal_div_row = _b1nTPortal_create_select_rows("List By", "", "b1nTPortal_report_list_by", b1nTPortal_list, 0, "listby");
			return b1nTPortal_div_row;
		}

		return document.createElement("div");
	}

	this.b1nTPortal_build_report_details = function(b1nTPortal_extra_config) {
		var b1nTPortal_report_details_div = b1nTPortal_data.fields["b1nTPortal_report_details_div"];

		if(typeof(b1nTPortal_extra_config === "object")) {} else { return; }
		if(b1nTPortal_report_details_div) {} else { return; }

		var b1nTPortal_report_lines = b1nTPortal_extra_config.b1nTPortal_report_lines;

		if(Array.isArray(b1nTPortal_report_lines)) {} else { return; }

		b1nTPortal_report_details_div.innerHTML = "";

		//we are going to listen for a few values.
		//the headers, content, legend and axis
		var b1nTPortal_report_chart_headers = new Object();
		var b1nTPortal_report_chart_content = new Object();
		var b1nTPortal_report_chart_type    = undefined;
		var b1nTPortal_report_chart_legend  = new Array();
		var b1nTPortal_report_chart_axis    = new Array();
		var b1nTPortal_report_tables = document.createElement("div");
		var b1nTPortal_report_csv = "";

		//TODO: remaster
		var b1nTPortal_report_chart_headers2 = new Object;
		var b1nTPortal_report_chart_content2 = new Object();

		//a function to build columns 
		var b1nTPortal_col  = function(tag, value) {
			var b1nTPortal_table_col = document.createElement(tag);
			b1nTPortal_table_col.style.border = "0px";
			b1nTPortal_table_col.innerHTML = value;
			return b1nTPortal_table_col;
		}

		//we are going to iterate through
		//the csv that we get from the server
		var b1nTPortal_class_count = 0;
		var b1nTPortal_section_count = -1;
		var b1nTPortal_valid_format = 1;
		var b1nTPortal_current_header_keys;

		b1nTPortal_report_lines.forEach(function(value, index) {
			//make sure that no problems was found on the 
			//the previous iteration. throw an error later
			if(b1nTPortal_valid_format) {} else { return; }

			//first we are going to look for the  section rows if its
			//there we are going to build a div to wrap the content.
			if(value.indexOf("[SectionRow]") > -1) {
				var b1nTPortal_parsed_value = value.replace(/\[SectionRow\]/g, "");
				var b1nTPortal_section_row = document.createElement("div");

				b1nTPortal_section_row.style.marginBottom = "10px";

				{ 
					var b1nTPortal_section_row_header = document.createElement("div");

					b1nTPortal_section_row_header.style.fontSize = "large";
					b1nTPortal_section_row_header.style.fontWeight = "bold";

					b1nTPortal_section_row_header.innerHTML = b1nTPortal_parsed_value;
					b1nTPortal_section_row.appendChild(b1nTPortal_section_row_header);
				}

				//store in dom and csv.
				b1nTPortal_report_tables.appendChild(b1nTPortal_section_row);
				b1nTPortal_report_csv += b1nTPortal_parsed_value+"\n";

				b1nTPortal_class_count = 0;
				b1nTPortal_section_count++;

				//at this point current header key 
				//should always be set to undefined.
				b1nTPortal_current_header_keys = [];

				return;
			}

			//lets make sure that there is a section for use to otherwise
			//dont go anything further, otherwise an error will occur
			var b1nTPortal_section_list = b1nTPortal_report_tables.children;
			var b1nTPortal_section = b1nTPortal_section_list[b1nTPortal_section_count];

			//next we are going to look for the headers
			//create a table to go with it and append to
			//the section.
			if(value.indexOf("[HeaderRow]") > -1 && b1nTPortal_section) {
				var b1nTPortal_split_value  = value.split("|");
				var b1nTPortal_match = value.match(/\[HeaderRow\]\[([0-9]+)\]/);
				var b1nTPortal_expected_length = b1nTPortal_match ? b1nTPortal_match[1] : 1;

				//we need to know if the headers are properly stored
				if(Array.isArray(b1nTPortal_current_header_keys) && 
					b1nTPortal_current_header_keys.length == 0) {} else {
					b1nTPortal_valid_format = 0;
					return;
				}

				//lets create a table now
				var b1nTPortal_table = document.createElement("table");

				b1nTPortal_table.style.margin = "0px";

				var b1nTPortal_table_tr = document.createElement("tr");

				b1nTPortal_table_tr.setAttribute("class", "b1nTPortal_odd");

				var b1nTPortal_temp_array = new Array();
				b1nTPortal_split_value.forEach(function(sub_value, sub_index) {
					if(sub_index == 0) { return; }           //skip the row markers
					if(!b1nTPortal_valid_format) { return; } //skip if any previous format was bad

					var b1nTPortal_split_sub_value = sub_value.split("/");

					//these values must match else we cant continue any further
					if(b1nTPortal_expected_length == b1nTPortal_split_sub_value.length) {} else {
						b1nTPortal_valid_format = 0;
						return;
					}

					//should always be undefined at this very moment
					if(b1nTPortal_current_header_keys[sub_index]) {
						b1nTPortal_valid_format = 0;
						return;
					}

					b1nTPortal_table_tr.appendChild(b1nTPortal_col("th", _b1nTPortal_clean_value(sub_value)));

					//i need to be able to keep track of the current header iteration.
					b1nTPortal_current_header_keys[sub_index] = sub_value;

					//lets keep a unique copy of each header
					if(!b1nTPortal_report_chart_headers[sub_value]) {
						b1nTPortal_report_chart_headers[sub_value] = sub_value;

						var b1nTPortal_default_temp_array = Array();
						for(var i = 0; i < b1nTPortal_expected_length*1; i++) {
							b1nTPortal_default_temp_array.push(0);
						}

						b1nTPortal_report_chart_content[sub_value] = b1nTPortal_default_temp_array.join("/");
					}

					//keep track of the value so that we
					//can create a csv for customers to
					//download.
					b1nTPortal_temp_array.push(_b1nTPortal_clean_value(sub_value));
				});

				//make sure we did not find any errors
				if(b1nTPortal_valid_format) {} else { return; }

				//put csv together
				b1nTPortal_report_csv += b1nTPortal_temp_array.join("|")+"\n";

				b1nTPortal_table.appendChild(b1nTPortal_table_tr);
				b1nTPortal_section.appendChild(b1nTPortal_table);
				return;
			}

			//lets make sure there is a valid table appended to the section. without
			//the table we cant continue any further without experiencing an error.
			var b1nTPortal_section_table_list = b1nTPortal_section.getElementsByTagName("table");
			var b1nTPortal_section_table = b1nTPortal_section_table_list[0];

			//now lets look for some content and append it
			//to the table we created when parsing headers.
			if(value.indexOf("[ContentRow]") > -1 && b1nTPortal_section && b1nTPortal_section_table) {
				var b1nTPortal_split_value  = value.split("|");
				var b1nTPortal_match = value.match(/\[ContentRow\]\[([0-9]+)\]/);
				var b1nTPortal_expected_length = b1nTPortal_match ? b1nTPortal_match[1] : 1;;

				var b1nTPortal_class = b1nTPortal_class_count++ % 2 ? "b1nTPortal_odd" : "b1nTPortal_even";
				var b1nTPortal_table_tr = document.createElement("tr");

				b1nTPortal_table_tr.setAttribute("class", b1nTPortal_class);

				var b1nTPortal_temp_array = new Array();
				b1nTPortal_split_value.forEach(function(sub_value, sub_index) {
					if(sub_index == 0) { return; }           //skip the row markers
					if(!b1nTPortal_valid_format) { return; } //skip if any previous format was bad

					var b1nTPortal_parsed_value = sub_value.replace(/\,/g, "");
					var b1nTPortal_split_sub_value = b1nTPortal_parsed_value.split("/");

					//these values must match else we cant continue any further
					if(b1nTPortal_expected_length == b1nTPortal_split_sub_value.length) {} else {
						b1nTPortal_valid_format = 0;
						return;
					}

					b1nTPortal_table_tr.appendChild(b1nTPortal_col("td", _b1nTPortal_clean_value(b1nTPortal_parsed_value)));

					//keep track of the value so that we
					//can create a csv for customers to
					//download.
					b1nTPortal_temp_array.push(_b1nTPortal_clean_value(b1nTPortal_parsed_value));
				});

				//make sure we did not find any errors
				if(b1nTPortal_valid_format) {} else { return; }

				//put csv together
				b1nTPortal_report_csv += b1nTPortal_temp_array.join("|")+"\n";

				b1nTPortal_section_table.appendChild(b1nTPortal_table_tr);
				return;
			}

			//the last part of the section will be
			//the total row. if its present append it
			//to the table.
			if(value.indexOf("[TotalRow]") > -1 && b1nTPortal_section && b1nTPortal_section_table) {
				var b1nTPortal_split_value  = value.split("|");
				var b1nTPortal_match = value.match(/\[TotalRow\]\[([0-9]+)\]/);
				var b1nTPortal_expected_length = b1nTPortal_match ? b1nTPortal_match[1] : 1;

				//we need to know if the headers are properly stored
				if(Array.isArray(b1nTPortal_current_header_keys)) {} else {
					b1nTPortal_valid_format = 0;
					return;
				}

				var b1nTPortal_table_tr = document.createElement("tr");

				b1nTPortal_table_tr.style.borderTop = "4px double";

				var b1nTPortal_temp_array = new Array();
				b1nTPortal_split_value.forEach(function(sub_value, sub_index) {
					if(sub_index == 0) { return; }           //skip the row markers
					if(!b1nTPortal_valid_format) { return; } //skip if any previous format was bad

					var b1nTPortal_parsed_value = sub_value.replace(/\,/g, "");
					var b1nTPortal_split_sub_value = b1nTPortal_parsed_value.split("/");

					//these values must match else we cant continue any further
					if(b1nTPortal_expected_length == b1nTPortal_split_sub_value.length) {} else {
						b1nTPortal_valid_format = 0;
						return;
					}

					//we need the key for the content and headers
					var b1nTPortal_key = b1nTPortal_current_header_keys[sub_index];

					b1nTPortal_table_tr.appendChild(b1nTPortal_col("th", _b1nTPortal_clean_value(b1nTPortal_parsed_value)));

					var b1nTPortal_sub_sub_temp_array = new Array();
					b1nTPortal_split_sub_value.forEach(function(sub_sub_value, sub_sub_index) {
						if(!b1nTPortal_valid_format) { return; } //skip if any previous format was bad

						var b1nTPortal_trimed_sub_sub_value = sub_sub_value.trim();
						b1nTPortal_trimed_sub_sub_value = b1nTPortal_trimed_sub_sub_value ? b1nTPortal_trimed_sub_sub_value : "0";
						b1nTPortal_trimed_sub_sub_value = isNaN(b1nTPortal_trimed_sub_sub_value) ? "0" : b1nTPortal_trimed_sub_sub_value;

						//now that we have a trimed value that we can use lets break apart the
						//value we stored when creating the headers. and add the new value to it.
						var b1nTPortal_split_chart_content = b1nTPortal_report_chart_content[b1nTPortal_key];
						b1nTPortal_split_chart_content = b1nTPortal_split_chart_content.toString().split("/");

						if(b1nTPortal_expected_length == b1nTPortal_split_chart_content.length) {} else {
							b1nTPortal_valid_format = 0;
							return;
						}

						var b1nTPortal_target_value = b1nTPortal_split_chart_content[sub_sub_index];

						//lets put together some numbers			
						b1nTPortal_target_value = b1nTPortal_target_value.trim();
						b1nTPortal_target_value = b1nTPortal_target_value ? b1nTPortal_target_value : "0";
						b1nTPortal_target_value = isNaN(b1nTPortal_target_value) ? "0" : b1nTPortal_target_value;
						b1nTPortal_target_value = b1nTPortal_target_value*1 + b1nTPortal_trimed_sub_sub_value*1;
						b1nTPortal_sub_sub_temp_array.push(b1nTPortal_target_value);
					});

					//make sure we did not find any errors
					if(b1nTPortal_valid_format) {} else { return; }

					//rebuild the total row
					b1nTPortal_report_chart_content[b1nTPortal_key] = b1nTPortal_sub_sub_temp_array.join("/");

					//keep track of the value so that we
					//can create a csv for customers to
					//download.
					b1nTPortal_temp_array.push(_b1nTPortal_clean_value(b1nTPortal_parsed_value));
				});

				//make sure we did not find any errors
				if(b1nTPortal_valid_format) {} else { return; }

				//put csv together
				b1nTPortal_report_csv += b1nTPortal_temp_array.join("|")+"\n";

				b1nTPortal_section_table.appendChild(b1nTPortal_table_tr);
				return;
			}

			//parse the content.
			if(value.indexOf("[LegendRow]") > -1) {
				var b1nTPortal_split_value  = value.split("|");
				var b1nTPortal_match = value.match(/\[LegendRow\]\[([A-Za-z]+)\]/);
				b1nTPortal_report_chart_type = b1nTPortal_match ? b1nTPortal_match[1] : undefined;

				b1nTPortal_split_value.forEach(function(sub_value, sub_index) {
					if(sub_index == 0) { return; } //skip the row markers
					b1nTPortal_parsed_value = sub_value.trim();
					b1nTPortal_report_chart_legend.push(sub_value);
				});

				return;
			}

			//parse the content.
			if(value.indexOf("[AxisRow]") > -1) {
				var b1nTPortal_split_value  = value.split("|");
				b1nTPortal_split_value.forEach(function(sub_value, sub_index) {
					if(sub_index == 0) { return; } //skip the row markers
					b1nTPortal_parsed_value = sub_value.trim();
					b1nTPortal_report_chart_axis.push(sub_value);
				});

				return;
			}
		});


		if(b1nTPortal_valid_format) {} else {
			_b1nTPortal_force_error("Error: Invalid format. Please contact administration.");
			return;
		}

		//if at this point we cant verify that this
		//report will be displayed as any type of
		//chart then we are going display the table
		if(b1nTPortal_report_chart_type) {} else {
			b1nTPortal_report_details_div.appendChild(b1nTPortal_report_tables);
			_b1nTPortal_activate_download(b1nTPortal_report_csv);
			return;
		}

		switch(b1nTPortal_report_chart_type) {
			case "bar":
				break;
			case "corechart":
				if(b1nTPortal_report_chart_legend.length == 2) {} else {
					b1nTPortal_valid_format = 0;
				}
				break;
			default:
				//if should never get here
				b1nTPortal_valid_format = 0;
		}

		if(b1nTPortal_valid_format) {} else {
			_b1nTPortal_force_error("Error: Invalid format. Please contact administration.");
			return;
		}

		var b1nTPortal_data_array = [b1nTPortal_report_chart_legend];
		for(b1nTPortal_key in b1nTPortal_report_chart_headers) {
			//skip if any previous format was bad
			if(!b1nTPortal_valid_format) { continue; }

			//we are not going to evaluate any
			//headers, and their content, that
			//are flagged as [ChartHide].
			if(b1nTPortal_report_chart_headers[b1nTPortal_key].indexOf("[ChartHide]") > -1) {
				continue;
			}

			switch(b1nTPortal_report_chart_type) {
				case "bar":
					var b1nTPortal_sub_data_array = new Array();

					//for the bar graphs we only want first header option in the string. to do this
					//we are going to split the headers and only push index 0 on to the sub data array
					var b1nTPortal_split_header_value = b1nTPortal_report_chart_headers[b1nTPortal_key].split("/");

					//we need atleast one item
					if(b1nTPortal_split_header_value.length >= 1) {} else {
						b1nTPortal_valid_format = 0;
						break;
					}

					b1nTPortal_sub_data_array.push(_b1nTPortal_extract_key(b1nTPortal_split_header_value[0]));

					//lets take the content and covert it to a number then push on to sub data array
					var b1nTPortal_split_content_value = b1nTPortal_report_chart_content[b1nTPortal_key].split("/");

					//but first lets make sure the content is in a valid format.
					if(b1nTPortal_split_content_value.length+1 == b1nTPortal_report_chart_legend.length) {} else {
						b1nTPortal_valid_format = 0;
						break;
					}

					//next lets make sure that both headers and content are the same length
					if(b1nTPortal_split_header_value.length == b1nTPortal_split_content_value.length) {} else {
						b1nTPortal_valid_format = 0;
						break;
					}

					b1nTPortal_split_content_value.forEach(function(value, index) {
						b1nTPortal_sub_data_array.push(value*1);
					});

					b1nTPortal_data_array.push(b1nTPortal_sub_data_array);
					break;
				case "corechart":
					//the pie chart will be done a little diffrent, this time we will make
					//use of all headers and pair them with their corresponding content...
					var b1nTPortal_split_header_value = b1nTPortal_report_chart_headers[b1nTPortal_key].split("/");
					var b1nTPortal_split_content_value = b1nTPortal_report_chart_content[b1nTPortal_key].split("/");

					//make sure the content and headers match in length
					if(b1nTPortal_split_header_value.length == b1nTPortal_split_content_value.length) {} else {
						b1nTPortal_valid_format = 0;
						break;
					}

					b1nTPortal_split_header_value.forEach(function(value, index) {
						b1nTPortal_data_array.push([_b1nTPortal_extract_key(value), b1nTPortal_split_content_value[index]*1]);
					});
					break;
			}
		}

		if(b1nTPortal_valid_format) {} else {
			_b1nTPortal_force_error("Error: Invalid format. Please contact administration.");
			return;
		}

		var b1nTPortal_args_config = new Object();
		b1nTPortal_args_config.chart_type = b1nTPortal_report_chart_type;
		b1nTPortal_args_config.host_div   = b1nTPortal_report_details_div;
		b1nTPortal_args_config.data_array = b1nTPortal_data_array;
		b1nTPortal_args_config.axis_array = b1nTPortal_report_chart_axis;
		_b1nTPortal_chart_data(b1nTPortal_args_config);
		_b1nTPortal_activate_download(b1nTPortal_report_csv);
	}

	function _b1nTPortal_clean_value(b1nTPortal_value) {
		//verify that value passed in
		if(b1nTPortal_value == undefined || b1nTPortal_value == null) {
			b1nTPortal_value = "";
		}

		b1nTPortal_value = b1nTPortal_value.toString();
		b1nTPortal_value = b1nTPortal_value.replace(/\[ChartHide\]/g, "");
		b1nTPortal_value = b1nTPortal_value.replace(/\[ChartAS-.*?\]/g, "");
		b1nTPortal_value = b1nTPortal_value.replace(/\,/g, "");
		return b1nTPortal_value;
	}

	function _b1nTPortal_extract_key(b1nTPortal_value) {
		//verify that value passed in
		if(b1nTPortal_value == undefined || b1nTPortal_value == null) {
			b1nTPortal_value = "";
		}

		b1nTPortal_value = b1nTPortal_value.toString();
		var b1nTPortal_match = b1nTPortal_value.match(/(\[ChartAS-(.*?)\])?(.*)$/);

		if(b1nTPortal_match && b1nTPortal_match[2]) {
			b1nTPortal_value =  b1nTPortal_match[2];	
		} else if(b1nTPortal_match && b1nTPortal_match[3]) {
			b1nTPortal_value =  b1nTPortal_match[3];
		}

		return b1nTPortal_value;
	}

	function _b1nTPortal_activate_download(b1nTPortal_csv) {
		var b1nTPortal_a = b1nTPortal_data.fields["b1nTPortal_report_download_a"];
		if(b1nTPortal_a) {} else { return; }

		b1nTPortal_a.firstChild.style.backgroundColor = "#0073aa";
		b1nTPortal_a.firstChild.style.cursor = "pointer";

		b1nTPortal_a.setAttribute("href", "data:text/plain;charset=utf-8,"+encodeURIComponent(b1nTPortal_csv));
		b1nTPortal_a.setAttribute("download", "report.csv");
	}

	function _b1nTPortal_force_error(b1nTPortal_error) {
		var b1nTPortal_failure_flag = document.getElementById(b1nTPortal_data.config.failFlag);
		if(b1nTPortal_failure_flag) { b1nTPortal_failure_flag.innerHTML = ""; }

		if(b1nTPortal_failure_flag) {
			var b1nTPortal_message = document.createElement("p");
			b1nTPortal_message.setAttribute("class", "b1nTPortal-error-msg");
			b1nTPortal_message.innerHTML = b1nTPortal_error;
			b1nTPortal_failure_flag.appendChild(b1nTPortal_message);
		}
	}

	function _b1nTPortal_chart_data(b1nTPortal_args_config) {
		//validate object values
		if(typeof(b1nTPortal_args_config === "object")) {} else { return; }
		if(b1nTPortal_args_config.chart_type){} else { return; }
		if(b1nTPortal_args_config.host_div) {} else { return; }
		if(Array.isArray(b1nTPortal_args_config.data_array)) {} else { return; }
		if(Array.isArray(b1nTPortal_args_config.axis_array)) {} else { return; }

		google.charts.load('current', {'packages':[b1nTPortal_args_config.chart_type]});

		//we need a place to put the chart
		b1nTPortal_chart_div = document.createElement("div");

		b1nTPortal_chart_div.style.marginTop = "20px";

		b1nTPortal_args_config.host_div.appendChild(b1nTPortal_chart_div);

		var b1nTPortal_draw_chart = function() {
			var b1nTPortal_chart_data = new google.visualization.arrayToDataTable(b1nTPortal_args_config.data_array);

			var b1nTPortal_options;
			var b1nTPortal_chart;
			switch(b1nTPortal_args_config.chart_type) {
				case "bar":
					b1nTPortal_options = {
						bars: 'vertical',
						axes: {
							x: {0: { side: 'bottom', label: b1nTPortal_args_config.axis_array[0]}},
							y: {0: { side: 'left', label: b1nTPortal_args_config.axis_array[2]}}
						}
					};

					b1nTPortal_chart = new google.charts.Bar(b1nTPortal_chart_div);
					break;
				case "corechart":
					b1nTPortal_options = {
						is3D: true
					};

					b1nTPortal_chart = new google.visualization.PieChart(b1nTPortal_chart_div);
					break;	
			}

			b1nTPortal_chart.draw(b1nTPortal_chart_data, b1nTPortal_options);
		}

		google.charts.setOnLoadCallback(b1nTPortal_draw_chart);
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
				var b1nTPortal_options_value;
				switch(b1nTPortal_control) {
					case "month":
					case "year":
					case "wotype":
					case "sortby":
					case "filterby":
					case "listby":
						b1nTPortal_options_value = undefined;
						break;
					default:
						b1nTPortal_options_value = "Show All";
				}

				if(b1nTPortal_options_value) {
					var option = document.createElement("option");
					option.value = "";
					option.innerHTML = b1nTPortal_options_value;
					b1nTPortal_select.appendChild(option);
				}
			}

			if(Array.isArray(b1nTPortal_list) || typeof(b1nTPortal_list) === "object") {
				var foundValue = 0; //make sure the value exist
				switch(b1nTPortal_control) {
					case "jobsite":
						b1nTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							option.value = value.ID;
							option.innerHTML = value.JobName ? "("+value.JobName+")"+" "+value.Address : value.Address;
							b1nTPortal_select.appendChild(option);

							if(value.ID == b1nTPortal_value) {
								foundValue++;
							}
						});
						break;
					case "month":
						b1nTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							var b1nTPortal_options_value = index+1;
			
							if(b1nTPortal_options_value <= 9) {
								b1nTPortal_options_value = "0"+b1nTPortal_options_value;
							}

							option.value = b1nTPortal_options_value;
							option.innerHTML = value;
							b1nTPortal_select.appendChild(option);

							if(value == b1nTPortal_value) {
								foundValue++;
							}
						});
						break;
					case "year":
						var b1nTPortal_date       = new Date();
						var b1nTPortal_end_year   = b1nTPortal_date.getFullYear();
						var b1nTPortal_start_year = 2016;
						while(b1nTPortal_end_year >= b1nTPortal_start_year) {
							var option = document.createElement("option");
							option.value = b1nTPortal_start_year;
							option.innerHTML = b1nTPortal_start_year;
							b1nTPortal_select.appendChild(option);

							if(b1nTPortal_start_year == b1nTPortal_value) {
								foundValue++;
							}

							b1nTPortal_start_year++;
						}
						break;
					case "wotype":
						for(var key in b1nTPortal_list) {
							if(key == "ID")              { continue; }
							if(key == "excludeFromJSON") { continue; }
							if(key == "dbh")             { continue; }

							var option = document.createElement("option");

							option.value = key;
							option.innerHTML = b1nTPortal_list[key];
							b1nTPortal_select.appendChild(option);

							if(key == b1nTPortal_value) {
								foundValue++;
							}
						}
						break;
					case "sortby":
					case "filterby":
					case "listby":
						b1nTPortal_list.forEach(function(value, index) {
							var option = document.createElement("option");
							option.value = value;
							option.innerHTML = value;
							b1nTPortal_select.appendChild(option);

							if(value == b1nTPortal_value) {
								foundValue++;
							}
						});
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