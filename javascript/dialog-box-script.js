function b1nTPortal_pop_up_dialog(b1nTPortal_arg_config) {
	var b1nTPortal_dialog_box = this;
	b1nTPortal_dialog_box.config = b1nTPortal_arg_config;

	this._b1nTPortal_init = function(b1nTPortal_header, b1nTPortal_content, b1nTPortal_callBack) {
		//should always exist.
		var b1nTPortal_dialog_container = document.getElementById("b1nTPortal_dialog_box");

		if(b1nTPortal_dialog_box) {
			var b1nTPortal_hostDiv_shield = document.createElement("div");

			b1nTPortal_hostDiv_shield.style.position = "absolute";
			b1nTPortal_hostDiv_shield.style.top = "0px";
			b1nTPortal_hostDiv_shield.style.left = "0px";
			b1nTPortal_hostDiv_shield.style.height = "100%";
			b1nTPortal_hostDiv_shield.style.width = "100%";
			b1nTPortal_hostDiv_shield.style.zIndex = "9998";

			var b1nTPortal_hostDiv = document.createElement("div");

			b1nTPortal_hostDiv.style.position = "absolute";
			b1nTPortal_hostDiv.style.left = "50%";
			b1nTPortal_hostDiv.style.transform = "translate(-50%, 0px)";
			b1nTPortal_hostDiv.style.minHeight = "50px";
			b1nTPortal_hostDiv.style.maxWidth = "275px";
			b1nTPortal_hostDiv.style.background = "#fff";
			b1nTPortal_hostDiv.style.transition = "box-shadow 2s";
			b1nTPortal_hostDiv.style.boxShadow = "0 0 0 1900px hsla(220,7%,18%,0.6), 0 10px 30px -5px hsla(220,7%,18%,0.6)";
			b1nTPortal_hostDiv.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
			b1nTPortal_hostDiv.style.zIndex = "9999";

			//bind the dialogs position
			if(b1nTPortal_dialog_box.config.binder) {
				var b1nTPortal_binder_position = b1nTPortal_dialog_box.config.binder.offsetTop;
				b1nTPortal_hostDiv.style.top = String(b1nTPortal_binder_position)+"px";
			}

			{//header
				var b1nTPortal_header_div = document.createElement("div");

				b1nTPortal_header_div.style.display = "flex";
				b1nTPortal_header_div.style.backgroundColor = "#f5f5f5";
				b1nTPortal_header_div.style.borderBottom = "2px solid #efeeee";
				b1nTPortal_header_div.style.lineHeight = "normal";
				b1nTPortal_header_div.style.marginBottom = "10px";
				b1nTPortal_header_div.style.fontSize = "90%";
				b1nTPortal_header_div.style.fontWeight = "bold";

				{
					var b1nTPortal_first_child = document.createElement("div");

					b1nTPortal_first_child.style.flexGrow = "1";
					b1nTPortal_first_child.style.marginLeft = "10px";

					b1nTPortal_first_child.innerHTML = b1nTPortal_header;
					b1nTPortal_header_div.appendChild(b1nTPortal_first_child);
				}

				{
					var b1nTPortal_second_child = document.createElement("div");

					b1nTPortal_second_child.style.width = "30px";
					b1nTPortal_second_child.style.marginRight = "10px";
					b1nTPortal_second_child.style.textAlign = "right";
					b1nTPortal_second_child.style.cursor = "pointer";

					var b1nTPortal_span = document.createElement("span");

					b1nTPortal_span.innerHTML = "X";

					b1nTPortal_second_child.appendChild(b1nTPortal_span);

					b1nTPortal_second_child.onclick = function() {
						if(typeof(b1nTPortal_callBack) === "function") {
							b1nTPortal_callBack();
						}
						b1nTPortal_dialog_box.b1nTPortal_close_dialog();
					}

					b1nTPortal_header_div.appendChild(b1nTPortal_second_child);
				}

				b1nTPortal_hostDiv.appendChild(b1nTPortal_header_div);
			}	

			{//content
				var b1nTPortal_content_div = document.createElement("div");

				b1nTPortal_content_div.style.marginLeft = "10px";
				b1nTPortal_content_div.style.marginRight = "10px";
				b1nTPortal_content_div.style.marginBottom = "10px";
				b1nTPortal_content_div.style.lineHeight = "normal";
				b1nTPortal_content_div.style.fontSize = "80%";
				b1nTPortal_content_div.style.color = "#ff0000";
				b1nTPortal_content_div.style.fontWeight = "500";

				if(b1nTPortal_content && b1nTPortal_content.tagName) {
					b1nTPortal_content_div.appendChild(b1nTPortal_content);
				} else {
					b1nTPortal_content_div.innerHTML = b1nTPortal_content;
				}


				b1nTPortal_hostDiv.appendChild(b1nTPortal_content_div);
			}

			b1nTPortal_hostDiv_shield.onclick = function() {
				if(typeof(b1nTPortal_callBack) === "function") {
					b1nTPortal_callBack();
				}
				b1nTPortal_dialog_box.b1nTPortal_close_dialog();
			}

			b1nTPortal_hostDiv_shield.appendChild(b1nTPortal_hostDiv);
			b1nTPortal_dialog_container.appendChild(b1nTPortal_hostDiv_shield);

			//store the whole shielded div
			b1nTPortal_dialog_box.shieldDiv = b1nTPortal_hostDiv_shield;
		}
	}

	this.b1nTPortal_open_dialog = function(b1nTPortal_header, b1nTPortal_content) {
		if(b1nTPortal_dialog_box.shieldDiv) {
			b1nTPortal_dialog_box.shieldDiv.remove();
		}

		b1nTPortal_dialog_box._b1nTPortal_init(b1nTPortal_header, b1nTPortal_content);
	}

	this.b1nTPortal_close_dialog = function() {
		if(b1nTPortal_dialog_box.shieldDiv) {
			b1nTPortal_dialog_box.shieldDiv.remove();
		}
	}

	return this;
}