function b1nTPortal_cls_address_vldtr(b1nTPortal_arg_config) { 
     var b1nTPortal_address_data = this;
     b1nTPortal_address_data.config = b1nTPortal_arg_config;

     b1nTPortal_address_data.validated = "0";

     var b1nTPortal_place_auto_complete;

     this._b1nTPortal_init = function() {
          //setup google places address autocomplete
          var b1nTPortal_search = b1nTPortal_address_data.config.searchCtrl;
          b1nTPortal_place_auto_complete = new google.maps.places.Autocomplete(
               b1nTPortal_search, { 
                    fields: ['geometry', 'address_component', 'type']
               }
          );

          var b1nTPortal_call_back = function () {
               b1nTPortal_address_data._b1nTPortal_fill_in_address();
          }

          b1nTPortal_place_auto_complete.addListener( 'place_changed',  b1nTPortal_call_back);
          b1nTPortal_address_data.placeautocomplete = b1nTPortal_place_auto_complete;

          //limit the counties to usa and canada
          b1nTPortal_place_auto_complete.setComponentRestrictions({
               country: ['us', 'ca']
          });

          //setup event listensers on fields
          b1nTPortal_address_data.config.addressCtrl.oninput = b1nTPortal_address_data._b1nTPortal_address_changed;
          b1nTPortal_address_data.config.cityCtrl.onchange = b1nTPortal_address_data._b1nTPortal_address_changed;
          b1nTPortal_address_data.config.stateCtrl.onchange = b1nTPortal_address_data._b1nTPortal_address_changed;
          b1nTPortal_address_data.config.postalCtrl.onchange = b1nTPortal_address_data._b1nTPortal_address_changed;
     };

     this._b1nTPortal_fill_in_address = function () {
          var b1nTPortal_place = b1nTPortal_address_data.placeautocomplete.getPlace();

          if (!b1nTPortal_place.geometry) {
               b1nTPortal_address_data.config.addressCtrl.value = "";
               b1nTPortal_address_data.b1nTPortal_refresh_google_verification();
               if(b1nTPortal_address_data.dBox) {
                    b1nTPortal_address_data.dBox.b1nTPortal_open_dialog("WARNING!!", 'No details available for input: '+b1nTPortal_place.name, null);
               }
               return;
          }
        
          //get autocompleted address
          let b1nTPortal_street_number = b1nTPortal_address_data._b1nTPortal_find_address_component( b1nTPortal_place.address_components, 'street_number' );
          b1nTPortal_street_number.short_name = b1nTPortal_street_number.short_name ? b1nTPortal_street_number.short_name : b1nTPortal_address_data.config.searchCtrl.value.split(' ')[0].replaceAll(/\D/g, '');
  
          let b1nTPortal_street_name = b1nTPortal_address_data._b1nTPortal_find_address_component( b1nTPortal_place.address_components, 'street_address' );
          b1nTPortal_street_name = b1nTPortal_street_name.long_name ? b1nTPortal_street_name : b1nTPortal_address_data._b1nTPortal_find_address_component( b1nTPortal_place.address_components, 'route' );
          b1nTPortal_street_name = b1nTPortal_street_name.long_name ? b1nTPortal_street_name : b1nTPortal_address_data._b1nTPortal_find_address_component( b1nTPortal_place.address_components, 'intersection' );
  
          let b1nTPortal_city = b1nTPortal_address_data._b1nTPortal_find_address_component( b1nTPortal_place.address_components, 'locality' );
          b1nTPortal_city = b1nTPortal_city.long_name ? b1nTPortal_city : b1nTPortal_address_data._b1nTPortal_find_address_component( b1nTPortal_place.address_components, 'administrative_area_level_3' );
          b1nTPortal_city = b1nTPortal_city.long_name ? b1nTPortal_city : b1nTPortal_address_data._b1nTPortal_find_address_component( b1nTPortal_place.address_components, 'sublocality_level_1' );
  
          let b1nTPortal_state = b1nTPortal_address_data._b1nTPortal_find_address_component( b1nTPortal_place.address_components, 'administrative_area_level_1' );
          let b1nTPortal_postal = b1nTPortal_address_data._b1nTPortal_find_address_component( b1nTPortal_place.address_components, 'postal_code' );         
          let b1nTPortal_postal_suffix = b1nTPortal_address_data._b1nTPortal_find_address_component( b1nTPortal_place.address_components, 'postal_code_suffix' );

          //we are done, clear address field
          b1nTPortal_address_data.config.addressCtrl.value = "";

          //however, is state part of the selected country ?
          //if not we dont want to go any further than this
          var found_state = 0;
          for(var option of b1nTPortal_address_data.config.stateCtrl.options) {
               if(option.value == b1nTPortal_state.short_name) {
                    found_state++;
               }
          }

          if(!found_state) {
               b1nTPortal_address_data.config.cityCtrl.value = "";
               b1nTPortal_address_data.config.stateCtrl.value = "";
               b1nTPortal_address_data.b1nTPortal_refresh_google_verification();
               if(b1nTPortal_address_data.dBox) {
                    b1nTPortal_address_data.dBox.b1nTPortal_open_dialog("WARNING!!", "This address appears to reside in a country that is not accepted by this company", null);
               }
               return;
          }

          b1nTPortal_address_data.config.addressCtrl.value = `${b1nTPortal_street_number.short_name} ${b1nTPortal_street_name.short_name}`;
          b1nTPortal_address_data.current_address = `${b1nTPortal_street_number.short_name} ${b1nTPortal_street_name.short_name}`;
          b1nTPortal_address_data.config.cityCtrl.value = b1nTPortal_city.long_name;
          b1nTPortal_address_data.config.stateCtrl.value = b1nTPortal_state.short_name;
          b1nTPortal_address_data.config.postalCtrl.value = b1nTPortal_postal.short_name;

          //check if the address is rooftop
          let b1nTPortal_verified = b1nTPortal_place.types.includes('premise') || b1nTPortal_place.geometry.location_type == 'ROOFTOP' || b1nTPortal_postal_suffix.short_name.length;

          b1nTPortal_verified = b1nTPortal_verified ? 1 : 0;
          b1nTPortal_address_data.b1nTPortal_refresh_google_verification(b1nTPortal_verified);
     };

     this._b1nTPortal_find_address_component = function( b1nTPortal_address_array, b1nTPortal_search ) {
          for( let i = 0; i < b1nTPortal_address_array.length; i++ ) {
               if ( b1nTPortal_address_array[i].types[0] == b1nTPortal_search ) {
                    return b1nTPortal_address_array[i];
               }
          }
          return { long_name: '', short_name: '', types: [ b1nTPortal_search ] };
     };

     this.b1nTPortal_refresh_google_verification = function(b1nTPortal_arg_code) {
          //sanity check
          if(!b1nTPortal_arg_code) {
               b1nTPortal_arg_code = 0; 
          }

          switch(b1nTPortal_arg_code * 1) { //make sure its number
               case 1:
               case 2:
               case 3:
                    b1nTPortal_address_data.config.validateCtrl.style.color = "#008000";
                    b1nTPortal_address_data.config.validateCtrl.innerHTML = 'VERIFIED';
                    break;
               default:
                    b1nTPortal_address_data.config.validateCtrl.style.color = "#f30c0c";
                    b1nTPortal_address_data.config.validateCtrl.innerHTML = 'NOT VERIFIED';
                    break;
          }

          b1nTPortal_address_data.validated = String(b1nTPortal_arg_code);
     };

     this._b1nTPortal_address_changed = function() {
          if(b1nTPortal_address_data.validated * 1 == 0) {} else {
               b1nTPortal_address_data.b1nTPortal_refresh_google_verification(0);
          }
     };

     this._b1nTPortal_set_defaults = function() {
          if ( !b1nTPortal_address_data.config.addressCtrl   ) b1nTPortal_address_data.config.addressCtrl   = b1nTPortal_address_data._b1nTPortal_create_input_text_obj();
          if ( !b1nTPortal_address_data.config.cityCtrl      ) b1nTPortal_address_data.config.cityCtrl      = b1nTPortal_address_data._b1nTPortal_create_input_text_obj();
          if ( !b1nTPortal_address_data.config.stateCtrl     ) b1nTPortal_address_data.config.stateCtrl     = b1nTPortal_address_data._b1nTPortal_create_input_text_obj();
          if ( !b1nTPortal_address_data.config.postalCtrl    ) b1nTPortal_address_data.config.postalCtrl    = b1nTPortal_address_data._b1nTPortal_create_input_text_obj();

          if (b1nTPortal_address_data.config.status) {
               b1nTPortal_address_data.validated = b1nTPortal_address_data.config.status;
          }

          if(b1nTPortal_address_data.config.validateCtrl) {
               b1nTPortal_address_data.b1nTPortal_refresh_google_verification(b1nTPortal_address_data.validated);
          }

          if((typeof(b1nTPortal_pop_up_dialog) === "function")) {
               var config = new Object();
               config.binder = b1nTPortal_address_data.config.addressCtrl;
               b1nTPortal_address_data.dBox = new b1nTPortal_pop_up_dialog(config);
          }
     };

     this._b1nTPortal_create_input_text_obj = function() {
        let b1nTPortal_input = document.createElement('INPUT');
        b1nTPortal_input.setAttribute('type', 'text');
        return b1nTPortal_input;
     };

     this._b1nTPortal_set_defaults();
     this._b1nTPortal_init();
     return this;
}



