<?php
/**
 * @package BinTrackerPortal
 */

//Some security protocols
if(!defined('WP_UNINSTALL_PLUGIN')) { die; }

//now delete the options.
 delete_option('b1nTPortal_page_title');
 delete_option('b1nTPortal_username');
 delete_option('b1nTPortal_password');
 delete_option('b1nTPortal_zipcode_label');
 delete_option('b1nTPortal_admin_country');
 delete_option('b1nTPortal_google_api_key');
 delete_option('b1nTPortal_mode');