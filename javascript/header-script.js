function b1nTPortal_header_builder(b1nTPortal_arg_config) {
	var b1nTPortal_data = this;
	b1nTPortal_data.config = b1nTPortal_arg_config;

	this.b1nTPortal_build_header = function(b1nTPortal_extra_config) {
		var b1nTPortal_host_div =  b1nTPortal_extra_config.hostDiv;

		if(b1nTPortal_host_div) {	
			//factory reset
			b1nTPortal_host_div.innerHTML = "";
			b1nTPortal_data.header_row_count = 0;

			{
				//header div
				var b1nTPortal_header_div = document.createElement("div");
				b1nTPortal_data.fields = {}; //place holder for the fields

				b1nTPortal_header_div.style.display = "flex";
				b1nTPortal_header_div.style.marginBottom = "2px";

				{
					//welcome label
					var b1nTPortal_welcome_wrapper = document.createElement("div");

					b1nTPortal_welcome_wrapper.style.flexGrow = "1";
					b1nTPortal_welcome_wrapper.style.margin = "auto";

					b1nTPortal_welcome_wrapper.innerHTML = b1nTPortal_extra_config.customerName;

					b1nTPortal_header_div.appendChild(b1nTPortal_welcome_wrapper);
				}

				{
					//hamburder icon
					var b1nTPortal_hamburger_icon_wrapper = document.createElement("div");

					b1nTPortal_hamburger_icon_wrapper.setAttribute("class", "b1nTPortal_nav_collapsed");

					b1nTPortal_hamburger_icon_wrapper.style.cursor = "pointer";

					{
						//content
						var b1nTPortal_hamburger_icon_div = document.createElement("div");

						b1nTPortal_hamburger_icon_div.style.width = "40px";
						b1nTPortal_hamburger_icon_div.style.height = "7px";
						b1nTPortal_hamburger_icon_div.style.backgroundColor = "#1782b5";
						b1nTPortal_hamburger_icon_div.style.margin = "0px";

						b1nTPortal_hamburger_icon_wrapper.appendChild(b1nTPortal_hamburger_icon_div);
					}

					{
						//content
						var b1nTPortal_hamburger_icon_div = document.createElement("div");

						b1nTPortal_hamburger_icon_div.style.width = "40px";
						b1nTPortal_hamburger_icon_div.style.height = "7px";
						b1nTPortal_hamburger_icon_div.style.backgroundColor = "#1782b5";
						b1nTPortal_hamburger_icon_div.style.margin = "6px 0px";

						b1nTPortal_hamburger_icon_wrapper.appendChild(b1nTPortal_hamburger_icon_div);
					}

					{
						//content
						var b1nTPortal_hamburger_icon_div = document.createElement("div");

						b1nTPortal_hamburger_icon_div.style.width = "40px";
						b1nTPortal_hamburger_icon_div.style.height = "7px";
						b1nTPortal_hamburger_icon_div.style.backgroundColor = "#1782b5";
						b1nTPortal_hamburger_icon_div.style.margin = "0px";

						b1nTPortal_hamburger_icon_wrapper.appendChild(b1nTPortal_hamburger_icon_div);
					}

					b1nTPortal_hamburger_icon_wrapper.onclick = function() {
						var b1nTPortal_nav_options = b1nTPortal_data.fields["b1nTPortal_nav_options"];

						if(this.className === "b1nTPortal_nav_collapsed") {
							this.className = "b1nTPortal_nav_extended";
							if(b1nTPortal_nav_options) {
								//dynamiclly calculate height.
								b1nTPortal_nav_options.style.height = ((b1nTPortal_nav_options.firstChild.offsetHeight*b1nTPortal_data.header_row_count) - 3)+"px";
							}
						} else {
							this.className = "b1nTPortal_nav_collapsed";
							if(b1nTPortal_nav_options) {
								b1nTPortal_nav_options.style.height = "0px";
							}
						}
					}

					b1nTPortal_header_div.appendChild(b1nTPortal_hamburger_icon_wrapper);
				}

				b1nTPortal_host_div.appendChild(b1nTPortal_header_div);

				//navigation options
				var b1nTPortal_nav_options= document.createElement("div");

				b1nTPortal_nav_options.style.display = "flex";
				b1nTPortal_nav_options.style.backgroundColor = "#efefef";
				b1nTPortal_nav_options.style.overflow = "hidden";
				b1nTPortal_nav_options.style.height = "0px";
				b1nTPortal_nav_options.style.transition = "height 0.5s ease-in-out";
				b1nTPortal_nav_options.style.boxShadow = "0 0 5px 0 rgb(208 210 215 / 50%)";
				b1nTPortal_nav_options.style.border = "border: 1px solid #eee";
				b1nTPortal_nav_options.style.borderRadius = "4px";
				b1nTPortal_nav_options.style.flexWrap = "wrap";

				{
					if(typeof(b1nTPortal_data.config.homeNextF) === "function") {
						var b1nTPortal_selected = (b1nTPortal_extra_config.selected == "HOME") ? 1 : 0;
						var b1nTPortal_nav_option = _b1nTPortal_create_nav_option("HOME", "home.png", b1nTPortal_selected);

						b1nTPortal_nav_option.style.cursor = "pointer"; 

						//handler
						b1nTPortal_nav_option.onclick = b1nTPortal_data.config.homeNextF;

						b1nTPortal_nav_options.appendChild(b1nTPortal_nav_option);
					}

					if(typeof(b1nTPortal_data.config.profileNextF) === "function") {
						var b1nTPortal_selected = (b1nTPortal_extra_config.selected == "PROFILE") ? 1 : 0;
						var b1nTPortal_nav_option = _b1nTPortal_create_nav_option("PROFILE", "profile.png", b1nTPortal_selected);

						b1nTPortal_nav_option.style.cursor = "pointer"; 

						//handler
						b1nTPortal_nav_option.onclick = b1nTPortal_data.config.profileNextF;

						b1nTPortal_nav_options.appendChild(b1nTPortal_nav_option);
					}

					if(typeof(b1nTPortal_data.config.jobsiteNextF) === "function") {
						var b1nTPortal_selected = (b1nTPortal_extra_config.selected == "JOB SITES") ? 1 : 0;
						var b1nTPortal_nav_option = _b1nTPortal_create_nav_option("JOB SITES", "jobsite.png", b1nTPortal_selected);

						b1nTPortal_nav_option.style.cursor = "pointer"; 

						//handler
						b1nTPortal_nav_option.onclick = b1nTPortal_data.config.jobsiteNextF;

						b1nTPortal_nav_options.appendChild(b1nTPortal_nav_option);
					}

					if(typeof(b1nTPortal_data.config.workOrderNextF) === "function") {
						var b1nTPortal_selected = (b1nTPortal_extra_config.selected == "WORK ORDERS") ? 1 : 0;
						var b1nTPortal_nav_option = _b1nTPortal_create_nav_option("WORK ORDERS", "workOrders.png", b1nTPortal_selected);

						b1nTPortal_nav_option.style.cursor = "pointer"; 

						//handler
						b1nTPortal_nav_option.onclick = b1nTPortal_data.config.workOrderNextF;

						b1nTPortal_nav_options.appendChild(b1nTPortal_nav_option);
					}

					if(typeof(b1nTPortal_data.config.transactionsNextF) === "function") {
						var b1nTPortal_selected = (b1nTPortal_extra_config.selected == "FINANCIALS") ? 1 : 0;
						var b1nTPortal_nav_option = _b1nTPortal_create_nav_option("FINANCIALS", "transactions.jpg", b1nTPortal_selected);

						b1nTPortal_nav_option.style.cursor = "pointer"; 

						//handler
						b1nTPortal_nav_option.onclick = b1nTPortal_data.config.transactionsNextF;

						b1nTPortal_nav_options.appendChild(b1nTPortal_nav_option);
					}

					if(typeof(b1nTPortal_data.config.reportsNextF) === "function") {
						var b1nTPortal_selected = (b1nTPortal_extra_config.selected == "REPORTS") ? 1 : 0;
						var b1nTPortal_nav_option = _b1nTPortal_create_nav_option("REPORTS", "reports.png", b1nTPortal_selected);

						b1nTPortal_nav_option.style.cursor = "pointer"; 

						//handler
						b1nTPortal_nav_option.onclick = b1nTPortal_data.config.reportsNextF;

						b1nTPortal_nav_options.appendChild(b1nTPortal_nav_option);
					}

					if(typeof(b1nTPortal_data.config.logOutNextF) === "function") {
						var b1nTPortal_selected = (b1nTPortal_extra_config.selected == "LOG OUT") ? 1 : 0;
						var b1nTPortal_nav_option = _b1nTPortal_create_nav_option("LOG OUT", "logout.png", b1nTPortal_selected);

						b1nTPortal_nav_option.style.cursor = "pointer";

						//handler
						b1nTPortal_nav_option.onclick = b1nTPortal_data.config.logOutNextF;

						b1nTPortal_nav_options.appendChild(b1nTPortal_nav_option);
					}

					//place holder
					if(typeof(b1nTPortal_data.config.logOutNextF) === "function") {
						var b1nTPortal_nav_option = _b1nTPortal_create_nav_option("", "", 0);
						b1nTPortal_nav_options.appendChild(b1nTPortal_nav_option);
					}

					//we need to know the rows to dynamiclly calculate height
					b1nTPortal_data.header_row_count = 4;
				}

				b1nTPortal_data.fields["b1nTPortal_nav_options"] = b1nTPortal_nav_options;
				b1nTPortal_host_div.appendChild(b1nTPortal_nav_options);
			}

		}
	}

	function _b1nTPortal_create_nav_option(b1nTPortal_name, b1nTPortal_icon, b1nTPortal_selected) {
		var b1nTPortal_nav = document.createElement("div");

		b1nTPortal_nav.style.width = "100%";
		b1nTPortal_nav.style.height = "40px";
		b1nTPortal_nav.style.padding = "8px";
		b1nTPortal_nav.style.border = "1px solid #e9e8e8";
		b1nTPortal_nav.style.flex = "50%";
		b1nTPortal_nav.style.overflow = "hidden";
		b1nTPortal_nav.style.textOverflow = "ellipsis";
		b1nTPortal_nav.style.whiteSpace = "nowrap";

		if(b1nTPortal_selected) {
			b1nTPortal_nav.style.backgroundColor = "#feff95";	
		}

		if(b1nTPortal_name) {
			b1nTPortal_nav.onmouseover = function() {
				if(b1nTPortal_selected) {} else {
					b1nTPortal_nav.style.backgroundColor = "#e3e3e3";
				}
			}

			b1nTPortal_nav.onmouseout = function() {
				if(b1nTPortal_selected) {} else {
					b1nTPortal_nav.style.backgroundColor = "#efefef";
				}
			}
		}

		if(b1nTPortal_icon) {
			var b1nTPortal_nav_icon = document.createElement("img");
			b1nTPortal_nav_icon.setAttribute("src", b1nTPortal_data.config.image_url+b1nTPortal_icon);

			b1nTPortal_nav_icon.style.height = "20px";
			b1nTPortal_nav_icon.style.marginRight = "10px";
			b1nTPortal_nav_icon.style.verticalAlign = "middle";
			b1nTPortal_nav_icon.style.display = "unset";

			b1nTPortal_nav.appendChild(b1nTPortal_nav_icon);
		}

		var b1nTPortal_nav_span = document.createElement("span");

		b1nTPortal_nav_span.setAttribute("class", "b1nTPortal_no_user_select");

		b1nTPortal_nav_span.style.textDecoration = "none";
		b1nTPortal_nav_span.style.color = b1nTPortal_selected ? "#115d81" : "#404040";
		b1nTPortal_nav_span.style.textShadow = "2px 2px 5px rgb(0 0 0 / 40%)";
		b1nTPortal_nav_span.style.verticalAlign = "middle";

		b1nTPortal_nav_span.innerHTML = "<strong>"+b1nTPortal_name+"</strong>";
		b1nTPortal_nav.appendChild(b1nTPortal_nav_span);

		return b1nTPortal_nav;
	} 

	return this;
}


















	