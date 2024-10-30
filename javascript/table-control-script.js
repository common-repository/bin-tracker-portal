function b1nTPortal_table_control(b1nTPortal_arg_config) {
	var b1nTPortal_data = this;
	b1nTPortal_data.config = b1nTPortal_arg_config;
	b1nTPortal_data.value = 0;
	b1nTPortal_data.record_count = 0;
	b1nTPortal_data.selected = undefined;

	this.b1nTPortal_attach_handlers = function(b1nTPortal_tr) {
		if(b1nTPortal_tr) {
			var b1nTPortal_class = b1nTPortal_data.record_count++ % 2 ? "b1nTPortal_odd" : "b1nTPortal_even";
			b1nTPortal_tr.setAttribute("class", b1nTPortal_class);

			b1nTPortal_tr.onclick = function() {
				if(b1nTPortal_data.selected) {
					b1nTPortal_data.selected.style.removeProperty("background-color");
				}

				//update some values
				b1nTPortal_data.selected = b1nTPortal_tr;
				b1nTPortal_data.value = this.id.split("_")[1];
				this.style.backgroundColor = "#feff95";
			}
		}
	}

	this.b1nTPortal_validate = function() {
		if(b1nTPortal_data.selected && b1nTPortal_data.config.table_wrapper) {
			b1nTPortal_data.config.table_wrapper.style.border = "none";
			return 1;
		}

		if(b1nTPortal_data.config.table_wrapper) {
			b1nTPortal_data.config.table_wrapper.style.border = "1px solid #ff0000";
		}
		
		return 0;
	}

	return this;
}