<?php
/**
 * @package BinTrackerPortal
 */

/*
Plugin Name: Bin Tracker Portal
Plugin URI: https://www.bintracker.software/api/word-press-plugin.html
Description: The Bin Tracker Portal plugin facilitates online ordering for waste haulers. Customers will be able to book and manage work orders, manage job sites, view reporting and manage their transactions.  Using the Web API tab on Bin Tracker's Preferences app, you can prevent over booking, control which days of the week online orders will be accepted, and prevent same day ordering.
Version: 1.1.3
Author: Cairn Applications Inc
Author URI: https://www.cloud-computing.rocks/
License: GPLv2 or later
Text Domain: bin-tracker-portal
*/

//security protocols
if(!defined('ABSPATH')) { die; }
if(!function_exists('add_action')) { die; }

//include some classes, these classes will be used to implement namespaces
if(file_exists(plugin_dir_path(__FILE__).'includes/base/required-paths.php')) {
    require_once plugin_dir_path(__FILE__).'includes/base/required-paths.php';
}

if(class_exists('b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Required_Paths')) {
    $b1nTPortal_required_paths = new b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Required_Paths(plugin_dir_path(__FILE__));
    foreach($b1nTPortal_required_paths->b1nTPortal_get_paths() as $b1nTPortal_path) {
        require_once $b1nTPortal_path;
    }
}

//flush and create tables
function b1nTPortal_activate_flush() {
    if(class_exists('b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Activate')) {
        b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Activate::b1nTPortal_activate();
    }
}

//flushes and drop tables
function b1nTPortal_deactivate_flush() {
    if(class_exists('b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Deactivate')) {
        b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Deactivate::b1nTPortal_deactivate();
    }
}

register_activation_hook(__FILE__, 'b1nTPortal_activate_flush');
register_deactivation_hook(__FILE__, 'b1nTPortal_deactivate_flush');

//initialize some classes 
if(class_exists('b1nTPortal_includes\B1nTPortal_Init')) {
    b1nTPortal_includes\B1nTPortal_Init::b1nTPortal_init();
}