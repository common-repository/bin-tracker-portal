function b1nTPortal_slide_up_dialog(b1nTPortal_arg_config) {
	var b1nTPortal_data = this;
	b1nTPortal_data.config = b1nTPortal_arg_config;

	function _b1nTPortal_build_dialog(b1nTPortal_title, b1nTPortal_nextF) {
		//dialog box
		b1nTPortal_data.dBox = document.createElement("div");

		b1nTPortal_data.dBox.style.display = "none";
		b1nTPortal_data.dBox.style.position = "absolute";
		b1nTPortal_data.dBox.style.bottom = "0px";
		b1nTPortal_data.dBox.style.left = "0px";
		b1nTPortal_data.dBox.style.width = "100%";
		b1nTPortal_data.dBox.style.minHeight = "100px";
		b1nTPortal_data.dBox.style.zIndex = "998";
		b1nTPortal_data.dBox.style.backgroundColor = "#f3f3f3";	

		//header
		var b1nTPortal_div_header = document.createElement("div");

		b1nTPortal_div_header.style.backgroundColor = "#1782b5";
		b1nTPortal_div_header.style.display = "inline-block";
		b1nTPortal_div_header.style.width = "100%";

		{
			var b1nTPortal_div_header_title = document.createElement("div");

			b1nTPortal_div_header_title.innerHTML = b1nTPortal_title

			b1nTPortal_div_header_title.style.display = "inline-block";
			b1nTPortal_div_header_title.style.fontWeight = "900";
			b1nTPortal_div_header_title.style.fontSize = "larger";
			b1nTPortal_div_header_title.style.padding = "5px";
			b1nTPortal_div_header_title.style.color = "#ffffff";

			b1nTPortal_div_header.appendChild(b1nTPortal_div_header_title);
		}

		{
			var b1nTPortal_div_header_exit = document.createElement("div");

			b1nTPortal_div_header_exit.style.display = "inline-block";
			b1nTPortal_div_header_exit.style.fontWeight = "900";
			b1nTPortal_div_header_exit.style.fontSize = "larger";
			b1nTPortal_div_header_exit.style.padding = "5px";
			b1nTPortal_div_header_exit.style.marginRight = "5px";
			b1nTPortal_div_header_exit.style.color = "#ffffff";
			b1nTPortal_div_header_exit.style.cursor = "pointer";
			b1nTPortal_div_header_exit.style.cssFloat = "right";

			b1nTPortal_div_header_exit.innerHTML = "X";

			b1nTPortal_div_header_exit.onclick = function() {
				b1nTPortal_data.b1nTPortal_close();
			}

			b1nTPortal_div_header.appendChild(b1nTPortal_div_header_exit);
		}

		b1nTPortal_data.dBox.appendChild(b1nTPortal_div_header);

		//content
		var b1nTPortal_div_content = document.createElement("div");

		b1nTPortal_div_content.style.padding = "10px";
		b1nTPortal_div_content.style.fontSize = "larger";

		b1nTPortal_data.dBox.appendChild(b1nTPortal_div_content);

		if(typeof(b1nTPortal_data.config.behaviors) === "function") {
			b1nTPortal_data.config.behaviors(b1nTPortal_div_content, b1nTPortal_nextF);
		}
	}

	function _b1nTPortal_set_defaults() {
		if(b1nTPortal_data.config.container == undefined) { //temp container
			b1nTPortal_data.config.container = document.createElement("div"); 
		}
	}

	function _b1nTPortal_open_overlay() {
		if(b1nTPortal_data.config.overlay == undefined) { return false; }

		b1nTPortal_data.config.overlay.style.display = "block";
		b1nTPortal_data.config.overlay.style.position = "absolute";
		b1nTPortal_data.config.overlay.style.bottom = "0px";
		b1nTPortal_data.config.overlay.style.left = "0px";
		b1nTPortal_data.config.overlay.style.width = "100%";
		b1nTPortal_data.config.overlay.style.height = "100%";
		b1nTPortal_data.config.overlay.style.opacity = "0.5";
		b1nTPortal_data.config.overlay.style.zIndex = "997";
		b1nTPortal_data.config.overlay.style.backgroundColor = "#efeeee";

		return true;
	}

	this.b1nTPortal_open = function(b1nTPortal_title, b1nTPortal_nextF) {
		if(_b1nTPortal_open_overlay()) {
			_b1nTPortal_build_dialog(b1nTPortal_title, b1nTPortal_nextF);
			b1nTPortal_data.config.container.appendChild(b1nTPortal_data.dBox);
			b1nTPortal_data.dBox.style.display = "block";
			return;
		}
	}

	this.b1nTPortal_close = function() {
		b1nTPortal_data.config.container.removeChild(b1nTPortal_data.dBox);
		b1nTPortal_data.config.overlay.style.display = "none";
	}

	_b1nTPortal_set_defaults();
	return this;
}