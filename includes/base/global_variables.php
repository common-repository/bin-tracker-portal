<?php
/**
 * This class will set global variables
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_base;

class B1nTPortal_Global_Variables {
    public $b1nTPortal_plugin;
    public $b1nTPortal_plugin_path;
    public $b1nTPortal_plugin_url;
    public $b1nTPortal_admin_url;
    public $b1nTPortal_binT_url;

    //set variables
    function __construct() {
        $this->b1nTPortal_plugin      = plugin_basename(dirname(__FILE__, 3)).'/bin-tracker-portal.php';
        $this->b1nTPortal_plugin_path = plugin_dir_path(dirname(__FILE__, 2));
        $this->b1nTPortal_plugin_url  = plugin_dir_url(dirname(__FILE__, 2));
        $this->b1nTPortal_admin_url   = admin_url();
        $this->b1nTPortal_binT_url    = 'https://www.bintracker.software/controller.html';
        //$this->b1nTPortal_binT_url  = 'https://btdt.dev2.rocks/controller.html';
    }
}
