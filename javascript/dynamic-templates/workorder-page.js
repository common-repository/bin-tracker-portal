function b1nTPortal_workorder_page_template(b1nTPortal_arg_config) {
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
			b1nTPortal_wrapper_div.setAttribute("id", "b1nTPortal_workorder_page_template");
			b1nTPortal_wrapper_div.setAttribute("class", "b1nTPortal_backend_template");

			{
				//limiter div
				var b1nTPortal_limiter_div = document.createElement("div");
				b1nTPortal_data.fields = {};                     //place holder for the fields
				b1nTPortal_data.workorder_list_offset = 0;       //offset place holder
				b1nTPortal_data.workorder_list_record_count = 0; //record count place holder
				b1nTPortal_data.tbWOList = undefined;            //table control place holder

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
							b1nTPortal_config.customerName = '<strong style="font-size: x-large;"">WORK ORDERS</strong>';
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

						b1nTPortal_button.style.width = "75px";
						b1nTPortal_button.style.marginRight = "20px";

						b1nTPortal_button.value = "Remove";

						b1nTPortal_button.onclick = function() {
							if(b1nTPortal_data.tbWOList && b1nTPortal_data.tbWOList.b1nTPortal_validate()) {
								if(typeof(b1nTPortal_data.config.removeNextF) === "function") {
									_b1nTPortal_clear_js_search_timeout();
									b1nTPortal_data.config.removeNextF(b1nTPortal_data.tbWOList.value);
								}
							}
						}

						b1nTPortal_add_edit_div.appendChild(b1nTPortal_button);
					}

					{
						var b1nTPortal_button = document.createElement("input");
						b1nTPortal_button.setAttribute("type", "button");

						b1nTPortal_button.style.width = "75px";
						b1nTPortal_button.style.marginRight = "20px";

						b1nTPortal_button.value = "Edit";

						b1nTPortal_button.onclick = function() {
							if(b1nTPortal_data.tbWOList && b1nTPortal_data.tbWOList.b1nTPortal_validate()) {
								if(typeof(b1nTPortal_data.config.loadAddEditNextF) === "function") {
									_b1nTPortal_clear_js_search_timeout();
									b1nTPortal_data.config.loadAddEditNextF(b1nTPortal_data.tbWOList.value, 0);
								}
							}
						}

						b1nTPortal_add_edit_div.appendChild(b1nTPortal_button);
					}

					{ //search
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

									var b1nTPortal_data_object     = new Object();
								    b1nTPortal_data_object.offset  = 0;
									b1nTPortal_data_object.control = "refresh";
									b1nTPortal_data_object.search  = b1nTPortal_data.jsSearch.value;
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

					b1nTPortal_content_div.setAttribute("id", "b1nTPortal_workorder_page_workorder_list");

					b1nTPortal_content_div.style.width = "100%";
					b1nTPortal_content_div.style.minWidth = "600px";

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
							b1nTPortal_table_tr_th.innerHTML = "Adress";

							b1nTPortal_table_tr_th.style.width = "250px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						{
							var b1nTPortal_table_tr_th = document.createElement("th");
							b1nTPortal_table_tr_th.innerHTML = "City";

							b1nTPortal_table_tr_th.style.width = "150px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						{
							var b1nTPortal_table_tr_th = document.createElement("th");
							b1nTPortal_table_tr_th.innerHTML = "State";

							b1nTPortal_table_tr_th.style.width = "100px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						{
							var b1nTPortal_table_tr_th = document.createElement("th");
							b1nTPortal_table_tr_th.innerHTML = "Zip";

							b1nTPortal_table_tr_th.style.width = "100px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";

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
							if(!b1nTPortal_data.workorder_list_offset) { return; }
							if(b1nTPortal_data.workorder_list_offset == b1nTPortal_data.workorder_list_record_count) { return; }
						
							if(!b1nTPortal_data.fields) { return; }

							b1nTPortal_target_div = b1nTPortal_data.fields["b1nTPortal_table_list_content_wrapper"];

							if(!b1nTPortal_target_div) { return; }

							//make sure we only proceed when scrolling reaches the bottom
							if(Math.ceil(b1nTPortal_target_div.scrollTop) >= Math.floor(b1nTPortal_target_div.scrollHeight - b1nTPortal_target_div.offsetHeight)) {
								if(typeof(b1nTPortal_data.config.loadListNextF) === "function") {
									b1nTPortal_offset = b1nTPortal_data.workorder_list_offset;

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
						var b1nTPortal_list = b1nTPortal_extra_config.b1nTPortal_workorder_object_list;
						var b1nTPortal_record_count = b1nTPortal_extra_config.b1nTPortal_workorder_object_list_record_count;
						var b1nTPortal_offset = b1nTPortal_extra_config.b1nTPortal_workorder_object_list_offset;
						_b1nTPortal_load_workorder_list(b1nTPortal_list, b1nTPortal_record_count, b1nTPortal_offset);
					}
				}

				//finalize structure
				b1nTPortal_wrapper_div.appendChild(b1nTPortal_limiter_div);
			}

			b1nTPortal_host_div.appendChild(b1nTPortal_wrapper_div);

			_b1nTPortal_observer();
		}
	}

	function _b1nTPortal_clear_js_search_timeout() {
		clearTimeout(b1nTPortal_data.searchTimer);
		b1nTPortal_data.searchTimer = null;	
	}

	//dynamic blend
	function _b1nTPortal_observer() {
		var b1nTPortal_resize_observer = new ResizeObserver(function() {
			var b1nTPortal_div = document.getElementById("b1nTPortal_workorder_page_template");

			if(b1nTPortal_div) {} else {
				b1nTPortal_resize_observer.disconnect();
				return; //skip evaluations
			}

			//get offset
			var b1nTPortal_div_width = b1nTPortal_div.offsetWidth;

			var b1nTPortal_class_array = new Array();

			if(b1nTPortal_div_width <= 780) {
				b1nTPortal_class_array.push("b1nTPortal_workorder_page_template_mw780");
			}

			if(b1nTPortal_div_width <= 710) {
				b1nTPortal_class_array.push("b1nTPortal_workorder_page_template_mw710");
			}

			if(b1nTPortal_div_width <= 650) {
				b1nTPortal_class_array.push("b1nTPortal_workorder_page_template_mw650");
			}

			if(b1nTPortal_div_width <= 500) {
				b1nTPortal_class_array.push("b1nTPortal_workorder_page_template_mw500");
			}

			var b1nTPortal_class_array_string = b1nTPortal_class_array.join(" ");
			b1nTPortal_div.className = b1nTPortal_class_array_string;
		});

		var b1nTPortal_div = document.getElementById("b1nTPortal_workorder_page_template");
		b1nTPortal_resize_observer.observe(b1nTPortal_div);
	}

	//load jobsite list
	function _b1nTPortal_load_workorder_list(b1nTPortal_list, b1nTPortal_record_count, b1nTPortal_offset) {	
		if(b1nTPortal_data.fields) {
			var b1nTPortal_table_wrapper = b1nTPortal_data.fields["b1nTPortal_table_list_content_wrapper"];
			var b1nTPortal_table_tbody = b1nTPortal_data.fields["b1nTPortal_table_list_content"];
			var b1nTPortal_record_count_span = b1nTPortal_data.fields["b1nTPortal_table_list_content_record_count"];
			var b1nTPortal_offset_span = b1nTPortal_data.fields["b1nTPortal_table_list_content_offset"];

			//make a table control
			if(!b1nTPortal_data.tbWOList) {
				var b1nTPortal_tbWOListObj = new Object();
				b1nTPortal_tbWOListObj.table_wrapper = b1nTPortal_table_wrapper;
				b1nTPortal_data.tbWOList = new b1nTPortal_table_control(b1nTPortal_tbWOListObj);
			} 

			if(b1nTPortal_table_tbody && b1nTPortal_record_count_span && b1nTPortal_offset_span) {
				//build table trs
				b1nTPortal_list.forEach(function(b1nTPortal_value, b1nTPortal_index) {
					var b1nTPortal_table_tr = document.createElement("tr");

					b1nTPortal_table_tr.setAttribute("id", "woList_"+b1nTPortal_value.ID);

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

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.OrderType;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "100px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.OrderDateString;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "250px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.jobSiteObj.Address;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "150px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.jobSiteObj.City;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "100px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.jobSiteObj.State;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "100px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.jobSiteObj.Zip;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					b1nTPortal_data.tbWOList.b1nTPortal_attach_handlers(b1nTPortal_table_tr);

					b1nTPortal_table_tbody.appendChild(b1nTPortal_table_tr);
				});

				b1nTPortal_offset_span.innerHTML = "<strong>"+b1nTPortal_offset+"</strong>";
				b1nTPortal_record_count_span.innerHTML = "<strong>"+b1nTPortal_record_count+"</strong>";

				//store the offset/record count for later use
				b1nTPortal_data.workorder_list_offset = b1nTPortal_offset;
				b1nTPortal_data.workorder_list_record_count = b1nTPortal_record_count;
			}
		}
	}

	//reload jobsite list
	this.b1nTPortal_reload_workorder_list = function(b1nTPortal_extra_config, b1nTPortal_control) {
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
			b1nTPortal_data.tbWOList = undefined;

			//scroll to top if its a refresh
			b1nTPortal_table_wrapper.scrollTop = 0;
		}

		//re populate
		if(typeof(b1nTPortal_extra_config) === "object") {
			var b1nTPortal_list = b1nTPortal_extra_config.b1nTPortal_workorder_object_list;
			var b1nTPortal_record_count = b1nTPortal_extra_config.b1nTPortal_workorder_object_list_record_count;
			var b1nTPortal_offset = b1nTPortal_extra_config.b1nTPortal_workorder_object_list_offset;
			_b1nTPortal_load_workorder_list(b1nTPortal_list, b1nTPortal_record_count, b1nTPortal_offset);
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