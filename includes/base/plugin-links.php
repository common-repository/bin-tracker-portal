<?php
/**
 * This class will ad links that will
 * direct us to the setting page.
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_base;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Global_Variables;

class B1nTPortal_Plugin_Links extends B1nTPortal_Global_Variables {
    function b1nTPortal_init() {
        if($this->b1nTPortal_plugin) {
            add_filter('plugin_action_links_'.$this->b1nTPortal_plugin, array($this, 'b1nTPortal_add_links'));
        }
    }

    /**
     * This function will generate a set
     * of links that we can display. i am
     * not sanitizing the param because the
     * array is passed in by add_filter with
     * the deactivate link included.
     * 
     * @param array $b1nTPortal_links
     * @return an array of links
     */
    function b1nTPortal_add_links($b1nTPortal_links) {
        if($this->b1nTPortal_admin_url && wp_http_validate_url($this->b1nTPortal_admin_url)) {
            $b1nTPortal_link = '<a href="'.$this->b1nTPortal_admin_url.'admin.php?page=bin-tracker-portal">Settings</a>';
            array_push($b1nTPortal_links, $b1nTPortal_link);
        }
        return $b1nTPortal_links;
    }
}