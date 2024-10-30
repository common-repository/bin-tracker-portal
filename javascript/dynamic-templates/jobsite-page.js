function b1nTPortal_jobsite_page_template(b1nTPortal_arg_config) {
	var b1nTPortal_data = this;
	b1nTPortal_data.config = b1nTPortal_arg_config;

	//Choose to pass in the required fields here in case we want
	//to add special styling when creating and appending children
	this.b1nTPortal_init = function(b1nTPortal_extra_config) {
		var b1nTPortal_host_div = document.getElementById(b1nTPortal_data.config.hostDiv);
		var b1nTPortal_parent_div = document.getElementById(b1nTPortal_data.config.parentDiv);

		if(b1nTPortal_parent_div) {
			b1nTPortal_parent_div.style.maxWidth = "975px";
		}

		//make sure host exists
		if(b1nTPortal_host_div) {
			{
				//factory reset
				b1nTPortal_host_div.innerHTML = "";
			}

			//wrapper div
			var b1nTPortal_wrapper_div = document.createElement("div");
			b1nTPortal_wrapper_div.setAttribute("id", "b1nTPortal_jobsites_page_template");

			{
				//limiter div
				var b1nTPortal_limiter_div = document.createElement("div");
				b1nTPortal_data.fields = {};                   //place holder for the fields
				b1nTPortal_data.jobsite_list_offset = 0;       //offset place holder
				b1nTPortal_data.jobsite_list_record_count = 0; //record count place holder
				b1nTPortal_data.tbJobList = undefined;         //table control place holder

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
							b1nTPortal_config.customerName = '<strong style="font-size: x-large;"">JOB SITES</strong>';
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

						b1nTPortal_button.value = "Add";

						b1nTPortal_button.onclick = function() {
							if(typeof(b1nTPortal_data.config.loadAddEditNextF) === "function") {
								b1nTPortal_data.config.loadAddEditNextF(0);
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
							if(b1nTPortal_data.tbJobList && b1nTPortal_data.tbJobList.b1nTPortal_validate()) {
								if(typeof(b1nTPortal_data.config.loadAddEditNextF) === "function") {
									_b1nTPortal_clear_js_search_timeout();
									b1nTPortal_data.config.loadAddEditNextF(b1nTPortal_data.tbJobList.value);
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

						b1nTPortal_button.value = "Order";

						b1nTPortal_button.onclick = function() {
							if(b1nTPortal_data.tbJobList && b1nTPortal_data.tbJobList.b1nTPortal_validate()) {
								if(typeof(b1nTPortal_data.config.loadAddEditWONextF) === "function") {
									_b1nTPortal_clear_js_search_timeout();
									b1nTPortal_data.config.loadAddEditWONextF(0, b1nTPortal_data.tbJobList.value);
								}
							}
						}

						b1nTPortal_add_edit_div.appendChild(b1nTPortal_button);
					}

					{
						var b1nTPortal_button = document.createElement("input");
						b1nTPortal_button.setAttribute("type", "textbox");
						b1nTPortal_button.setAttribute("placeholder", "Search");

						b1nTPortal_button.style.width  = "150px";
						b1nTPortal_button.style.borderRadius = "10px";
						b1nTPortal_button.style.textAlign = "center";

						b1nTPortal_button.onkeyup = function() {
							_b1nTPortal_clear_js_search_timeout();

							b1nTPortal_data.searchTimer = setTimeout(function() {
								//blur the button
								b1nTPortal_data.jsSearch.blur();

								var b1nTPortal_data_object       = new Object();
								b1nTPortal_data_object.offset    = 0;
								b1nTPortal_data_object.search    = b1nTPortal_data.jsSearch.value;
								b1nTPortal_data_object.sort      = _b1nTPortal_get_sort_by(b1nTPortal_data.jsHeaders);
								b1nTPortal_data_object.call_back = function() { b1nTPortal_data.jsSearch.focus(); };
								b1nTPortal_data_object.control   = "refresh";

								if(typeof(b1nTPortal_data.config.loadListNextF) === "function") {
									_b1nTPortal_clear_js_search_timeout();
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
								b1nTPortal_data.jsSearch.value = "";

								var b1nTPortal_data_object       = new Object();
								b1nTPortal_data_object.offset    = 0;
								b1nTPortal_data_object.search    = b1nTPortal_data.jsSearch.value;
								b1nTPortal_data_object.sort      = _b1nTPortal_get_sort_by(b1nTPortal_data.jsHeaders);
								b1nTPortal_data_object.control   = "refresh";

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

					b1nTPortal_content_div.setAttribute("id", "b1nTPortal_jobsite_page_jobsite_list");

					b1nTPortal_content_div.style.width = "100%";
					b1nTPortal_content_div.style.minWidth = "537px";

					{
						var b1nTPortal_table_div = document.createElement("div");

						b1nTPortal_table_div.style.borderBottom = "1px solid #c3c3c3";
						b1nTPortal_table_div.style.borderTop = "1px solid #c3c3c3";

						var b1nTPortal_table  = document.createElement("table");

						b1nTPortal_table.style.margin = "0px";
						b1nTPortal_table.style.border = "0px";
						b1nTPortal_table.style.width  = "100%";

						var b1nTPortal_table_tr = document.createElement("tr");

						{
							var b1nTPortal_table_tr_th = document.createElement("th");

							b1nTPortal_table_tr_th.style.userSelect = "none";
							b1nTPortal_table_tr_th.style.width = "80px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";
							b1nTPortal_table_tr_th.style.cursor = "pointer";

							var b1nTPortal_span_one = document.createElement("span");

							b1nTPortal_span_one.style.marginRight = "1px";

							b1nTPortal_span_one.innerHTML = "ID";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_one);

							var b1nTPortal_span_two = document.createElement("span");

							b1nTPortal_span_two.style.color = "#0073aa";
							b1nTPortal_span_two.style.fontSize = "0.85em";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_two);

							b1nTPortal_table_tr_th.onclick = function() {
								if(typeof(b1nTPortal_data.config.loadListNextF) === "function") {
									_b1nTPortal_clear_js_search_timeout();
									_b1nTPortal_sort_update("ID", b1nTPortal_data.jsHeaders);

									var b1nTPortal_data_object       = new Object();
									b1nTPortal_data_object.offset    = 0;
									b1nTPortal_data_object.search    = b1nTPortal_data.jsSearch.value;
									b1nTPortal_data_object.sort      = _b1nTPortal_get_sort_by(b1nTPortal_data.jsHeaders);
									b1nTPortal_data_object.control   = "refresh";

									b1nTPortal_data.config.loadListNextF(b1nTPortal_data_object);
								}
							}

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						{
							var b1nTPortal_table_tr_th = document.createElement("th");

							b1nTPortal_table_tr_th.style.userSelect = "none";
							b1nTPortal_table_tr_th.style.width = "125px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";
							b1nTPortal_table_tr_th.style.cursor = "pointer";

							var b1nTPortal_span_one = document.createElement("span");

							b1nTPortal_span_one.style.marginRight = "1px";

							b1nTPortal_span_one.innerHTML = "Job Name";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_one);

							var b1nTPortal_span_two = document.createElement("span");

							b1nTPortal_span_two.style.color = "#0073aa";
							b1nTPortal_span_two.style.fontSize = "0.85em";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_two);

							b1nTPortal_table_tr_th.onclick = function() {
								if(typeof(b1nTPortal_data.config.loadListNextF) === "function") {
									_b1nTPortal_clear_js_search_timeout();
									_b1nTPortal_sort_update("Job Name", b1nTPortal_data.jsHeaders);

									var b1nTPortal_data_object       = new Object();
									b1nTPortal_data_object.offset    = 0;
									b1nTPortal_data_object.search    = b1nTPortal_data.jsSearch.value;
									b1nTPortal_data_object.sort      = _b1nTPortal_get_sort_by(b1nTPortal_data.jsHeaders);
									b1nTPortal_data_object.control   = "refresh";

									b1nTPortal_data.config.loadListNextF(b1nTPortal_data_object);
								}
							}

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						{
							var b1nTPortal_table_tr_th = document.createElement("th");

							b1nTPortal_table_tr_th.style.userSelect = "none";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.width = "200px";
							b1nTPortal_table_tr_th.style.textAlign = "left";
							b1nTPortal_table_tr_th.style.cursor = "pointer";

							var b1nTPortal_span_one = document.createElement("span");

							b1nTPortal_span_one.style.marginRight = "1px";

							b1nTPortal_span_one.innerHTML = "Address";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_one);

							var b1nTPortal_span_two = document.createElement("span");

							b1nTPortal_span_two.style.color = "#0073aa";
							b1nTPortal_span_two.style.fontSize = "0.85em";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_two);

							b1nTPortal_table_tr_th.onclick = function() {
								if(typeof(b1nTPortal_data.config.loadListNextF) === "function") {
									_b1nTPortal_clear_js_search_timeout();
									_b1nTPortal_sort_update("Address", b1nTPortal_data.jsHeaders);

									var b1nTPortal_data_object       = new Object();
									b1nTPortal_data_object.offset    = 0;
									b1nTPortal_data_object.search    = b1nTPortal_data.jsSearch.value;
									b1nTPortal_data_object.sort      = _b1nTPortal_get_sort_by(b1nTPortal_data.jsHeaders);
									b1nTPortal_data_object.control   = "refresh";

									b1nTPortal_data.config.loadListNextF(b1nTPortal_data_object);
								}
							}

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						{
							var b1nTPortal_table_tr_th = document.createElement("th");

							b1nTPortal_table_tr_th.style.userSelect = "none";
							b1nTPortal_table_tr_th.style.width = "120px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";
							b1nTPortal_table_tr_th.style.cursor = "pointer";

							var b1nTPortal_span_one = document.createElement("span");

							b1nTPortal_span_one.style.marginRight = "1px";

							b1nTPortal_span_one.innerHTML = "City";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_one);

							var b1nTPortal_span_two = document.createElement("span");

							b1nTPortal_span_two.style.color = "#0073aa";
							b1nTPortal_span_two.style.fontSize = "0.85em";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_two);

							b1nTPortal_table_tr_th.onclick = function() {
								if(typeof(b1nTPortal_data.config.loadListNextF) === "function") {
									_b1nTPortal_clear_js_search_timeout();
									_b1nTPortal_sort_update("City", b1nTPortal_data.jsHeaders);

									var b1nTPortal_data_object       = new Object();
									b1nTPortal_data_object.offset    = 0;
									b1nTPortal_data_object.search    = b1nTPortal_data.jsSearch.value;
									b1nTPortal_data_object.sort      = _b1nTPortal_get_sort_by(b1nTPortal_data.jsHeaders);
									b1nTPortal_data_object.control   = "refresh";

									b1nTPortal_data.config.loadListNextF(b1nTPortal_data_object);
								}
							}

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						{
							var b1nTPortal_table_tr_th = document.createElement("th");

							b1nTPortal_table_tr_th.style.userSelect = "none";
							b1nTPortal_table_tr_th.style.width = "95px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";
							b1nTPortal_table_tr_th.style.cursor = "pointer";

							var b1nTPortal_span_one = document.createElement("span");

							b1nTPortal_span_one.style.marginRight = "1px";

							b1nTPortal_span_one.innerHTML = "State";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_one);

							var b1nTPortal_span_two = document.createElement("span");

							b1nTPortal_span_two.style.color = "#0073aa";
							b1nTPortal_span_two.style.fontSize = "0.85em";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_two);							

							b1nTPortal_table_tr_th.onclick = function() {
								if(typeof(b1nTPortal_data.config.loadListNextF) === "function") {
									_b1nTPortal_clear_js_search_timeout();
									_b1nTPortal_sort_update("State", b1nTPortal_data.jsHeaders);

									var b1nTPortal_data_object       = new Object();
									b1nTPortal_data_object.offset    = 0;
									b1nTPortal_data_object.search    = b1nTPortal_data.jsSearch.value;
									b1nTPortal_data_object.sort      = _b1nTPortal_get_sort_by(b1nTPortal_data.jsHeaders);
									b1nTPortal_data_object.control   = "refresh";

									b1nTPortal_data.config.loadListNextF(b1nTPortal_data_object);
								}
							}

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						{
							var b1nTPortal_table_tr_th = document.createElement("th");

							b1nTPortal_table_tr_th.style.userSelect = "none";
							b1nTPortal_table_tr_th.style.width = "90px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";
							b1nTPortal_table_tr_th.style.cursor = "pointer";

							var b1nTPortal_span_one = document.createElement("span");

							b1nTPortal_span_one.style.marginRight = "1px";

							b1nTPortal_span_one.innerHTML = "Zip";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_one);

							var b1nTPortal_span_two = document.createElement("span");

							b1nTPortal_span_two.style.color = "#0073aa";
							b1nTPortal_span_two.style.fontSize = "0.85em";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_two);							

							b1nTPortal_table_tr_th.onclick = function() {
								if(typeof(b1nTPortal_data.config.loadListNextF) === "function") {
									_b1nTPortal_clear_js_search_timeout();
									_b1nTPortal_sort_update("Zip", b1nTPortal_data.jsHeaders);

									var b1nTPortal_data_object       = new Object();
									b1nTPortal_data_object.offset    = 0;
									b1nTPortal_data_object.search    = b1nTPortal_data.jsSearch.value;
									b1nTPortal_data_object.sort      = _b1nTPortal_get_sort_by(b1nTPortal_data.jsHeaders);
									b1nTPortal_data_object.control   = "refresh";

									b1nTPortal_data.config.loadListNextF(b1nTPortal_data_object);
								}
							}

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						{
							var b1nTPortal_table_tr_th = document.createElement("th");

							b1nTPortal_table_tr_th.style.userSelect = "none";
							b1nTPortal_table_tr_th.style.width = "100px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";
							b1nTPortal_table_tr_th.style.cursor = "pointer";

							var b1nTPortal_span_one = document.createElement("span");

							b1nTPortal_span_one.style.marginRight = "1px";

							b1nTPortal_span_one.innerHTML = "Boxes";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_one);

							var b1nTPortal_span_two = document.createElement("span");

							b1nTPortal_span_two.style.color = "#0073aa";
							b1nTPortal_span_two.style.fontSize = "0.85em";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_two);							

							b1nTPortal_table_tr_th.onclick = function() {
								if(typeof(b1nTPortal_data.config.loadListNextF) === "function") {
									_b1nTPortal_clear_js_search_timeout();
									_b1nTPortal_sort_update("Boxes", b1nTPortal_data.jsHeaders);

									var b1nTPortal_data_object       = new Object();
									b1nTPortal_data_object.offset    = 0;
									b1nTPortal_data_object.search    = b1nTPortal_data.jsSearch.value;
									b1nTPortal_data_object.sort      = _b1nTPortal_get_sort_by(b1nTPortal_data.jsHeaders);
									b1nTPortal_data_object.control   = "refresh";

									b1nTPortal_data.config.loadListNextF(b1nTPortal_data_object);
								}
							}

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}						

						{
							var b1nTPortal_table_tr_th = document.createElement("th");

							b1nTPortal_table_tr_th.style.userSelect = "none";
							b1nTPortal_table_tr_th.style.width = "100px";
							b1nTPortal_table_tr_th.style.border = "0px";
							b1nTPortal_table_tr_th.style.textAlign = "left";

							var b1nTPortal_span_one = document.createElement("span");

							b1nTPortal_span_one.innerHTML = "Msgs";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_one);

							var b1nTPortal_span_two = document.createElement("span");

							b1nTPortal_span_two.style.color = "#0073aa";
							b1nTPortal_span_two.style.fontSize = "0.85em";

							b1nTPortal_table_tr_th.appendChild(b1nTPortal_span_two);

							b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_th);
						}

						b1nTPortal_table.appendChild(b1nTPortal_table_tr);
						b1nTPortal_table_div.appendChild(b1nTPortal_table);
						b1nTPortal_content_div.appendChild(b1nTPortal_table_div);

						b1nTPortal_data.jsHeaders = b1nTPortal_table_tr;

						_b1nTPortal_sort_update("Address", b1nTPortal_data.jsHeaders);
					}

					{
						var b1nTPortal_table_div = document.createElement("div");

						b1nTPortal_table_div.style.height = "500px";
						b1nTPortal_table_div.style.overflowY = "auto";

						//we need to store table wrapper div to use later
						b1nTPortal_data.fields["b1nTPortal_table_list_content_wrapper"] = b1nTPortal_table_div;

						b1nTPortal_table_div.onscroll = function() {
							if(!b1nTPortal_data.jobsite_list_offset) { return; }
							if(b1nTPortal_data.jobsite_list_offset == b1nTPortal_data.jobsite_list_record_count) { return; }
						
							if(!b1nTPortal_data.fields) { return; }

							b1nTPortal_target_div = b1nTPortal_data.fields["b1nTPortal_table_list_content_wrapper"];

							if(!b1nTPortal_target_div) { return; }

							//make sure we only proceed when scrolling reaches the bottom
							if(Math.ceil(b1nTPortal_target_div.scrollTop) >= Math.floor(b1nTPortal_target_div.scrollHeight - b1nTPortal_target_div.offsetHeight)) {
								if(typeof(b1nTPortal_data.config.loadListNextF) === "function") {
									var b1nTPortal_offset = b1nTPortal_data.jobsite_list_offset;

									if(b1nTPortal_data.searchTimer) {
										_b1nTPortal_clear_js_search_timeout();
										b1nTPortal_offset = 0;
									}

									var b1nTPortal_data_object       = new Object();
									b1nTPortal_data_object.offset    = b1nTPortal_offset;
									b1nTPortal_data_object.search    = b1nTPortal_data.jsSearch.value;
									b1nTPortal_data_object.sort      = _b1nTPortal_get_sort_by(b1nTPortal_data.jsHeaders);
									b1nTPortal_data_object.control   = "scroll_load";

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
						b1nTPortal_content_div.appendChild(b1nTPortal_count_div_wrapper);
					}

					if(typeof(b1nTPortal_extra_config) === "object") {
						var b1nTPortal_list = b1nTPortal_extra_config.b1nTPortal_jobsite_object_list;
						var b1nTPortal_record_count = b1nTPortal_extra_config.b1nTPortal_jobsite_object_list_record_count;
						var b1nTPortal_offset = b1nTPortal_extra_config.b1nTPortal_jobsite_object_list_offset;
						_b1nTPortal_load_jobsite_list(b1nTPortal_list, b1nTPortal_record_count, b1nTPortal_offset);
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

	//sort update
	function _b1nTPortal_sort_update(b1nTPortal_key, b1nTPortal_tr) {
		var b1nTPortal_th = Array.from(b1nTPortal_tr.children);
		b1nTPortal_th.forEach(function(value, index) {
			b1nTPortal_span = Array.from(value.children);
			if(b1nTPortal_span[0].innerHTML == b1nTPortal_key) {
				if(value.getAttribute("thSort") && value.getAttribute("thSort") == "ASC") {
					value.setAttribute("thSort", "DESC");
					b1nTPortal_span[1].innerHTML = "&darr;";
				} else {
					value.setAttribute("thSort", "ASC");
					b1nTPortal_span[1].innerHTML = "&uarr;";
				}
			} else {
				value.removeAttribute("thSort");
				b1nTPortal_span[1].innerHTML = "";
			}
		});
	}

	function _b1nTPortal_get_sort_by(b1nTPortal_tr) {
		var b1nTPortal_th = Array.from(b1nTPortal_tr.children);
		
		var b1nTPortal_return;
		b1nTPortal_th.forEach(function(value, index) {
			if(b1nTPortal_return) { return; }			
			b1nTPortal_span = Array.from(value.children);

			if(value.getAttribute("thSort")) {
				b1nTPortal_return = b1nTPortal_span[0].innerHTML+"|"+value.getAttribute("thSort");
			}
		});

		if(!b1nTPortal_return) {
			b1nTPortal_return = "Address|ASC";
		}

		return b1nTPortal_return;
	}

	//dynamic blend
	function _b1nTPortal_observer() {
		var b1nTPortal_resize_observer = new ResizeObserver(function() {
			var b1nTPortal_div = document.getElementById("b1nTPortal_jobsites_page_template");

			if(b1nTPortal_div) {} else {
				b1nTPortal_resize_observer.disconnect();
				return; //skip evaluations
			}

			//get offset
			var b1nTPortal_div_width = b1nTPortal_div.offsetWidth;

			var b1nTPortal_class_array = new Array();

			if(b1nTPortal_div_width <= 420) {
				b1nTPortal_class_array.push("b1nTPortal_jobsites_page_template_mw420");
			}

			if(b1nTPortal_div_width <= 550) {
				b1nTPortal_class_array.push("b1nTPortal_jobsites_page_template_mw550");
			}

			if(b1nTPortal_div_width <= 760) {
				b1nTPortal_class_array.push("b1nTPortal_jobsites_page_template_mw600");
			}

			if(b1nTPortal_div_width <= 900) {
				b1nTPortal_class_array.push("b1nTPortal_jobsites_page_template_mw900");
			}

			var b1nTPortal_class_array_string = b1nTPortal_class_array.join(" ");
			b1nTPortal_div.className = b1nTPortal_class_array_string;			
		});

		var b1nTPortal_div = document.getElementById("b1nTPortal_jobsites_page_template");
		b1nTPortal_resize_observer.observe(b1nTPortal_div);
	}

	//load jobsite list
	function _b1nTPortal_load_jobsite_list(b1nTPortal_list, b1nTPortal_record_count, b1nTPortal_offset) {	
		if(b1nTPortal_data.fields) {
			var b1nTPortal_table_wrapper = b1nTPortal_data.fields["b1nTPortal_table_list_content_wrapper"];
			var b1nTPortal_table_tbody = b1nTPortal_data.fields["b1nTPortal_table_list_content"];
			var b1nTPortal_record_count_span = b1nTPortal_data.fields["b1nTPortal_table_list_content_record_count"];
			var b1nTPortal_offset_span = b1nTPortal_data.fields["b1nTPortal_table_list_content_offset"];

			//make a table control
			if(!b1nTPortal_data.tbJobList) {
				var b1nTPortal_tbJobListObj = new Object();
				b1nTPortal_tbJobListObj.table_wrapper = b1nTPortal_table_wrapper;
				b1nTPortal_data.tbJobList = new b1nTPortal_table_control(b1nTPortal_tbJobListObj);
			} 

			if(b1nTPortal_table_tbody && b1nTPortal_record_count_span && b1nTPortal_offset_span) {
				//build table trs
				b1nTPortal_list.forEach(function(b1nTPortal_value, b1nTPortal_index) {
					var b1nTPortal_table_tr = document.createElement("tr");

					b1nTPortal_table_tr.setAttribute("id", "jobList_"+b1nTPortal_value.ID);

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "80px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.ID;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "125px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.JobName;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "200px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.Address;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "120px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.City;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "95px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.State;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "90px";
						b1nTPortal_table_tr_td.style.border = "0px";

						b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.Zip;
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					let b1nTPortal_message_create_img = function(b1nTPortal_img_name) {
						var msgImg = document.createElement("img");
						msgImg.style.height = "15px";
						msgImg.style.display = "inline-block";
						msgImg.setAttribute("src", b1nTPortal_data.config.image_url+b1nTPortal_img_name);
						return msgImg;
					}					

					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "100px";
						b1nTPortal_table_tr_td.style.border = "0px";

						if(Array.isArray(b1nTPortal_value.ContainersOnSite) && b1nTPortal_value.ContainersOnSite.length > 0) {
							b1nTPortal_table_tr_td.innerHTML = b1nTPortal_value.ContainersOnSite.length+"  ";
							b1nTPortal_table_tr_td.appendChild(b1nTPortal_message_create_img("bin.png"));
						}

						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}


					{
						var b1nTPortal_table_tr_td = document.createElement("td");

						b1nTPortal_table_tr_td.style.width = "100px";
						b1nTPortal_table_tr_td.style.border = "0px";

						if(b1nTPortal_value.Validated*1 == 0) {
							b1nTPortal_table_tr_td.appendChild(b1nTPortal_message_create_img("cross.png"));
						} else if(b1nTPortal_value.Validated*1 == 1) {
							b1nTPortal_table_tr_td.appendChild(b1nTPortal_message_create_img("tick.png"));
						} else if(b1nTPortal_value.Validated*1 == 2) {
							b1nTPortal_table_tr_td.appendChild(b1nTPortal_message_create_img("user.png"));
						} else if(b1nTPortal_value.Validated*1 == 3) {
							b1nTPortal_table_tr_td.appendChild(b1nTPortal_message_create_img("icon.png"));
						}
						
						b1nTPortal_table_tr.appendChild(b1nTPortal_table_tr_td);
					}

					b1nTPortal_data.tbJobList.b1nTPortal_attach_handlers(b1nTPortal_table_tr);

					b1nTPortal_table_tbody.appendChild(b1nTPortal_table_tr);
				});

				b1nTPortal_offset_span.innerHTML = "<strong>"+b1nTPortal_offset+"</strong>";
				b1nTPortal_record_count_span.innerHTML = "<strong>"+b1nTPortal_record_count+"</strong>";

				//store the offset/record count for later use
				b1nTPortal_data.jobsite_list_offset = b1nTPortal_offset;
				b1nTPortal_data.jobsite_list_record_count = b1nTPortal_record_count;
			}
		}
	}

	//reload jobsite list
	this.b1nTPortal_reload_jobsite_list = function(b1nTPortal_extra_config, b1nTPortal_control) {
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
			b1nTPortal_data.tbJobList = undefined;

			//scroll to top if its a refresh
			b1nTPortal_table_wrapper.scrollTop = 0;
		}

		//re populate
		if(typeof(b1nTPortal_extra_config) === "object") {
			var b1nTPortal_list = b1nTPortal_extra_config.b1nTPortal_jobsite_object_list;
			var b1nTPortal_record_count = b1nTPortal_extra_config.b1nTPortal_jobsite_object_list_record_count;
			var b1nTPortal_offset = b1nTPortal_extra_config.b1nTPortal_jobsite_object_list_offset;
			_b1nTPortal_load_jobsite_list(b1nTPortal_list, b1nTPortal_record_count, b1nTPortal_offset);
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