<?php
/**
 * This class will create an admin
 * setting page on the dashboard.
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_gui;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Global_Variables;

class B1nTPortal_Admin_Options extends B1nTPortal_Global_Variables {
    function b1nTPortal_init() {
        add_action('admin_menu', array($this, 'b1nTPortal_admin_menu_page'));
        add_action('admin_init', array($this, 'b1nTPortal_admin_options_settings'));
    }

    //admin page menu
    function b1nTPortal_admin_menu_page() {
        $b1nTPortal_imgage_icon = '';
        if($this->b1nTPortal_plugin_url && wp_http_validate_url($this->b1nTPortal_plugin_url)) {
            $b1nTPortal_imgage_icon = $this->b1nTPortal_plugin_url.'images/icon.png';
        }

        add_menu_page('Bin Tracker Portal', 'Bin Tracker Portal', 'administrator', 'bin-tracker-portal', method_exists($this, 'b1nTPortal_admin_options_template') ? array($this, 'b1nTPortal_admin_options_template') : '', $b1nTPortal_imgage_icon, 101);
    }

    //admin page menu settings
    function b1nTPortal_admin_options_settings() {
        register_setting('b1nTPortal_setting_group', 'b1nTPortal_username', method_exists($this, 'b1nTPortal_validate_username') ? array($this, 'b1nTPortal_validate_username') : '');
        register_setting('b1nTPortal_setting_group', 'b1nTPortal_password', method_exists($this, 'b1nTPortal_validate_password') ? array($this, 'b1nTPortal_validate_password') : '');
        register_setting('b1nTPortal_setting_group', 'b1nTPortal_admin_country', method_exists($this, 'b1nTPortal_validate_admin_country') ? array($this, 'b1nTPortal_validate_admin_country') : '');
        register_setting('b1nTPortal_setting_group', 'b1nTPortal_google_api_key', method_exists($this, 'b1nTPortal_validate_google_api_key') ? array($this, 'b1nTPortal_validate_google_api_key') : '');
        register_setting('b1nTPortal_setting_group', 'b1nTPortal_mode', method_exists($this, 'b1nTPortal_validate_mode') ? array($this, 'b1nTPortal_validate_mode') : '');
        register_setting('b1nTPortal_setting_group', 'b1nTPortal_zipcode_label', '');
        register_setting('b1nTPortal_setting_group', 'b1nTPortal_page_title', '');
    }

    //load main template
    function b1nTPortal_admin_options_template() {
        if($this->b1nTPortal_plugin_path && file_exists($this->b1nTPortal_plugin_path.'templates/admin-options-template.php')) {      
            return require_once $this->b1nTPortal_plugin_path.'templates/admin-options-template.php';
        }       
    }

    /**
     * Validate and sanitize input
     * 
     * @param string $b1nTPortal_input
     * @return string $b1nTPortal_input
     */
    function b1nTPortal_validate_username($b1nTPortal_input) {
        //sanitize
        $b1nTPortal_input = sanitize_text_field($b1nTPortal_input);

        //validate
        if($b1nTPortal_input == ""){
            add_settings_error('b1nTPortal_username', 'b1nTPortal_username', __('Please enter a username', 'bin-tracker-portal'), 'error');
            $b1nTPortal_input = sanitize_text_field(get_option('b1nTPortal_username'));
        }  

        return $b1nTPortal_input;
    }

    /**
     * Validate and sanitize input
     * 
     * @param string $b1nTPortal_input
     * @return string $b1nTPortal_input
     */
    function b1nTPortal_validate_password($b1nTPortal_input) {
        //sanitize
        $b1nTPortal_input = sanitize_text_field($b1nTPortal_input);

        //validate
        if($b1nTPortal_input == ""){
            add_settings_error('b1nTPortal_password', 'b1nTPortal_password', __('Please enter a password', 'bin-tracker-portal'), 'error');
            $b1nTPortal_input = sanitize_text_field(get_option('b1nTPortal_password'));
        }

        return $b1nTPortal_input;
    }

    /**
     * Validate and sanitize input
     * 
     * @param string $b1nTPortal_input
     * @return string $b1nTPortal_input
     */
    function b1nTPortal_validate_admin_country($b1nTPortal_input) {
        //sanitize
        $b1nTPortal_input = sanitize_text_field($b1nTPortal_input);

        //validate
        if(!($b1nTPortal_input == "United States" || $b1nTPortal_input == "Canada")) {
            add_settings_error('b1nTPortal_admin_country', 'b1nTPortal_admin_country', __('Please select a country', 'bin-tracker-portal'), 'error');
            $b1nTPortal_input = sanitize_text_field(get_option('b1nTPortal_admin_country'));
        }   

        return $b1nTPortal_input;
    }

    /**
     * Validate and sanitize input
     * 
     * @param string $b1nTPortal_input
     * @return string $b1nTPortal_input
     */
    function b1nTPortal_validate_google_api_key($b1nTPortal_input) {
        //sanitize
        $b1nTPortal_input = sanitize_text_field($b1nTPortal_input);

        //validate
        if($b1nTPortal_input == ""){
            add_settings_error('b1nTPortal_google_api_key', 'b1nTPortal_google_api_key', __('Please enter a Google API Key', 'bin-tracker-portal'), 'error');
            $b1nTPortal_input = sanitize_text_field(get_option('b1nTPortal_google_api_key'));
        }   

        return $b1nTPortal_input;
    }

    /**
     * Validate and sanitize input
     * 
     * @param string $b1nTPortal_input
     * @return string $b1nTPortal_input
     */
    function b1nTPortal_validate_mode($b1nTPortal_input) {
        //sanitize
        $b1nTPortal_input = sanitize_text_field($b1nTPortal_input);

        //validate
        if(!($b1nTPortal_input == "TEST" || $b1nTPortal_input == "LIVE")){
            add_settings_error('b1nTPortal_mode', 'b1nTPortal_mode', __('Please select a Test/Live mode', 'bin-tracker-portal'), 'error');
            $b1nTPortal_input = sanitize_text_field(get_option('b1nTPortal_mode'));
        }  

        return $b1nTPortal_input;
    }
}