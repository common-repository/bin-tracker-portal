=== Bin Tracker Portal === 

Requires at least: 4.9 
Requires PHP: 5.6.4 
Tested up to: 6.5.0 
Stable tag: 1.1.3 
License: GPLv2 or later 
License URI: http://www.gnu.org/licenses/gpl-2.0.html

The plug in provides integration with a private web application for Bin their Dump That, a franchisor in the waste hauling industry.

== External services ==

https://maps.googleapis.com/maps/api/js?key=$b1nTPortal_google_api_key&libraries=places: a google api used to validate the address a user inputs in to the plugin. A valid and existing address is very important when providing a service in the waste hauling industry. The terms of use can be found at https://cloud.google.com/maps-platform/terms

https://btdt.dev2.rocks/controller.html or https://www.Bintracker.software/controller.html: allows the plugin to request/send information from/to the franchisee database. It also, does all the security checks as a first line of defence to make sure that the module in quesiton is valid and authorized to an external party. After all security checks are done, the module is called where a second layer of security checks is done; verifying the data received. The terms of use can be found at https://www.bintracker.software/forms/EULA.html

https://www.gstatic.com/charts/loader.js: allows the plugin to generate charts using google charts, this is used to generate graph based reports that user can use. The terms of use can found at https://cloud.google.com/maps-platform/terms

== External documentation ==

https://developers.google.com/places/web-service/get-api-key: provides information to the user admin about obtaining a google api key. Without an api key the plugin will not be able to validate address, calculate distance, or get longitude and latitude.

https://www.bintracker.software/api/word-press-plugin.html: provides information about plugin and it's features.

https://www.cloud-computing.rocks: provides information about the plugin author.

https://jqueryui.com/themeroller: part of the jquery-ui.css which we had to include locally since wordpress does not include it with the core jquery.

== Importing Plugin == 

To import “Bin Tracker Portal” plugin into WordPress. User needs to navigate to “Upload Plugin” feature under the Plugins area in the WordPress dashboard.

== Activating Plugin == 

To activate the “Bin Tracker Portal” plugin user need to navigate to “Installed Plugins” section under the Plugins area in the WordPress dashboard.  
Here user will get list of all the installed plugins, from this list user need to find “Bin Tracker Portal ” and click on “Activate”.

== Setting up Bin Tracker Portal ==

To update the settings “Bin Tracker Portal”, the user will need to access the plugin's setting using the “Bin Tracker Portal” feature from the sidebar of the admin panel, and then update all required fields.

Amongts those required fields is the google api key. The user will need it or the plugin wont function. To obtain a google api key follow the steps bellow:

1. Go to "https://cloud.google.com/maps-platform/" and click on "Get Started"
2. A pop up window will open, asking you to select a product(s); select maps and places.
3. Login to or create a google account, then enter a project name and create a billing account.
4. After you billing account is created, you will be prompt with another option, allowing you to
   enable google maps platform. Click next, and google will respond with an api key. This method will
   activate all google maps platform API(s). However, you can go back and remove the ones you wont need
   for this plugin. The API(s) you will need are the followings: Directions API, Distance Matrix API, 
   Geocoding API, Maps Elevation API, Maps JavaScript API and Places API.

== Using Plugin in front end == 
 
To use the plugin at front of the WordPress site user needs to create a new page and use the shortcode [bin-tracker-portal] in the page or the user can add the shortcode [b1nTPortal_bin-tracker-portal] in any existing page where user wants to use the plugin. 