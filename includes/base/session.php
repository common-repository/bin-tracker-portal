<?php
/**
 * This class will create a session
 * when the plug in launches.
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes\b1nTPortal_base;

class B1nTPortal_Session {
    function b1nTPortal_init() {
        add_action('init', array($this, 'b1nTPortal_session_start'));
    }

    //start session
    function b1nTPortal_session_start() {
        if(!session_id()) {
            session_start();
        }
    }
}