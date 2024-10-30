<?php
/**
 * This class will trigger everytime
 * the plugin gets deactivated
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_base;

class B1nTPortal_Deactivate {
    public static function b1nTPortal_deactivate() {
        flush_rewrite_rules();
        self::b1nTPortal_clean_database();
    }

    /**
     * This function will drop the
     * states table if it exist..
     * 
     */
    private static function b1nTPortal_clean_database() {
        global $wpdb;
        $b1nTPortal_table_name = $wpdb->prefix.'b1nTPortal_states';
               
        if($wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $wpdb->esc_like($b1nTPortal_table_name))) === $b1nTPortal_table_name) {
            $wpdb->query($wpdb->prepare("DROP TABLE %i", $b1nTPortal_table_name));
        }
    }
}