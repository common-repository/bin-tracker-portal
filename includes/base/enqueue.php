<?php
/**
 * This class will load my
 * scripts and my css files.
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_base;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Global_Variables;

class B1nTPortal_Enqueue extends B1nTPortal_Global_Variables {
    function b1nTPortal_init() {
        if($this->b1nTPortal_plugin_url && wp_http_validate_url($this->b1nTPortal_plugin_url)) {
            add_action('admin_enqueue_scripts', array($this, 'b1nTPortal_admin_enqueue'));
            add_action('wp_enqueue_scripts', array($this, 'b1nTPortal_wp_enqueue'));
        }
    }

    //Admin page
    function b1nTPortal_admin_enqueue() {
        wp_enqueue_style('b1nTPortal-admin-options-style', $this->b1nTPortal_plugin_url.'styles/admin-options-styles.css', '', '1.1.3', 'all');
    }

    //Front end page
    function b1nTPortal_wp_enqueue() {
        global $post; //we need to know if the short code exist before we load scripts/css
        if(is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'b1nTPortal_bin-tracker-portal')) {
            wp_enqueue_style('b1nTPortal-front-house-style', $this->b1nTPortal_plugin_url.'styles/front-house-style.css', '', '1.1.3', 'all');
            wp_enqueue_style('b1nTPortal-jquery-ui-style', $this->b1nTPortal_plugin_url.'styles/jquery-ui.css', '', '1.1.3', 'all');

            wp_enqueue_script('b1nTPortal-login-page', $this->b1nTPortal_plugin_url.'javascript/dynamic-templates/login-page.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-home-page', $this->b1nTPortal_plugin_url.'javascript/dynamic-templates/home-page.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-profile-page', $this->b1nTPortal_plugin_url.'javascript/dynamic-templates/profile-page.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-jobsite-page', $this->b1nTPortal_plugin_url.'javascript/dynamic-templates/jobsite-page.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-add-edit-jobsite-page', $this->b1nTPortal_plugin_url.'javascript/dynamic-templates/add-edit-jobsite-page.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-workorder-page', $this->b1nTPortal_plugin_url.'javascript/dynamic-templates/workorder-page.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-add-edit-workorder-page', $this->b1nTPortal_plugin_url.'javascript/dynamic-templates/add-edit-workorder-page.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-ccard-page', $this->b1nTPortal_plugin_url.'javascript/dynamic-templates/ccard-page.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-transactions-page', $this->b1nTPortal_plugin_url.'javascript/dynamic-templates/transactions-page.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-payment-page', $this->b1nTPortal_plugin_url.'javascript/dynamic-templates/payment-page.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-reports-page', $this->b1nTPortal_plugin_url.'javascript/dynamic-templates/reports-page.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-reports-output-page', $this->b1nTPortal_plugin_url.'javascript/dynamic-templates/reports-output-page.js', '', '1.1.3', 'all');

            $b1nTPortal_google_api_key = sanitize_text_field(get_option('b1nTPortal_google_api_key'));
            wp_enqueue_script('b1nTPortal-google-maps', "https://maps.googleapis.com/maps/api/js?key=$b1nTPortal_google_api_key&libraries=places", '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-google-charts', "https://www.gstatic.com/charts/loader.js", '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-dialog-box-script', $this->b1nTPortal_plugin_url.'javascript/dialog-box-script.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-slide-up-dialog', $this->b1nTPortal_plugin_url.'javascript/slide-up-dialog.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-address-validation-script', $this->b1nTPortal_plugin_url.'javascript/address-validation-script.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-table-control-script', $this->b1nTPortal_plugin_url.'javascript/table-control-script.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-header-script', $this->b1nTPortal_plugin_url.'javascript/header-script.js', '', '1.1.3', 'all');
            wp_enqueue_script('b1nTPortal-front-house-script', $this->b1nTPortal_plugin_url.'javascript/front-house-script.js', array('jquery'), '1.1.3', 'all');
            wp_enqueue_script('jquery-ui-datepicker');

            $this->b1nTPortal_front_house_script_localize();
        }
    }

    //localize front end page
    private function b1nTPortal_front_house_script_localize() {
        if($this->b1nTPortal_admin_url && wp_http_validate_url($this->b1nTPortal_admin_url)) {
            $b1nTPortal_config = array(
                 'ajax_url'   => $this->b1nTPortal_admin_url."admin-ajax.php",
                 'image_url'  => $this->b1nTPortal_plugin_url.'images/',
                 'ajax_nonce' => wp_create_nonce('_check__ajax_101')
             );
            wp_localize_script('b1nTPortal-front-house-script', 'b1nTPortal_config', $b1nTPortal_config);
        }
    }
}