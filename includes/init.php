<?php
/**
 * This class will create an instance
 * of one or more classes, and then call
 * the b1nTPortal_init method if it exist.
 * 
 * @package BinTrackerPortal
 */

namespace b1nTPortal_includes;

use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Session;
use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Plugin_Links;
use b1nTPortal_includes\b1nTPortal_gui\B1nTPortal_Admin_Options;
use b1nTPortal_includes\b1nTPortal_gui\B1nTPortal_Front_House;
use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Ajax_Control;
use b1nTPortal_includes\b1nTPortal_base\B1nTPortal_Enqueue;

final class B1nTPortal_Init {
    /**
     * Get the desired classes to get the
     * plugin working.
     * 
     * @return an array of classes 
     */
    public static function b1nTPortal_get_classes () {
        $b1nTPortal_array = array();
        array_push($b1nTPortal_array, B1nTPortal_Session::class);
        array_push($b1nTPortal_array, B1nTPortal_Ajax_Control::class);
        array_push($b1nTPortal_array, B1nTPortal_Enqueue::class);

        if(is_admin()) {
            array_push($b1nTPortal_array, B1nTPortal_Plugin_Links::class);
            array_push($b1nTPortal_array, B1nTPortal_Admin_Options::class);
        } else {
            array_push($b1nTPortal_array, B1nTPortal_Front_House::class);
        }

        return $b1nTPortal_array;
    }

    /**
     * Iterate through an array of classes
     * instantiate them, and call b1nTPortal_init.
     * 
     */
    public static function b1nTPortal_init () {
        foreach (self::b1nTPortal_get_classes() as $b1nTPortal_class) {
            $b1nTPortal_instance = self::b1nTPortal_instantiate_class($b1nTPortal_class);
            if(method_exists($b1nTPortal_instance, 'b1nTPortal_init')) {
                $b1nTPortal_instance->b1nTPortal_init();
            }
        }
    }

    /**
     * Instatiate the class
     * 
     * @return an instance of a class
     */
    private static function b1nTPortal_instantiate_class($b1nTPortal_class) {
        $b1nTPortal_instance = new $b1nTPortal_class(); 
        return $b1nTPortal_instance;
    }
}