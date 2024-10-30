<?php
/**
 * This class will load up the
 * form for the front house page.
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_gui;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Global_Variables;

class B1nTPortal_Front_House extends B1nTPortal_Global_Variables {
    function b1nTPortal_init() {
        add_shortcode('b1nTPortal_bin-tracker-portal', array($this, 'b1nTPortal_load_plugin_form'));
    }

     /**
     * Load the main plug template
     * 
     * @return an error if any
     */
    function b1nTPortal_load_plugin_form() {
        //lets make sure we have some credentials on file.
        $b1nTPortal_username = sanitize_text_field(get_option('b1nTPortal_username'));
        $b1nTPortal_password = sanitize_text_field(get_option('b1nTPortal_password'));
        if($b1nTPortal_username == "" || $b1nTPortal_password == "") {
            return __('Please contact to administrator, Invalid configuration.', 'bin-tracker-portal');
        }

        if($this->b1nTPortal_plugin_path) {
            if(file_exists($this->b1nTPortal_plugin_path.'templates/front-house-template.php')) {
                require_once $this->b1nTPortal_plugin_path.'templates/front-house-template.php';
            }
        }
    }
}