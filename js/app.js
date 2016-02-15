
angular.module('login', ['ionic', 'login.controllers'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
	// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	// for form inputs)
	if (window.cordova && window.cordova.plugins.Keyboard) {
		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		cordova.plugins.Keyboard.disableScroll(true);
	}

	if (window.StatusBar) {
		// org.apache.cordova.statusbar required
		StatusBar.styleDefault();
	}
	});
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/content.html'
	})

	.state('app.login', {
		url: '/login',
		views: {
			'menuContent': {
				templateUrl: 'templates/login.html',
				controller: 'LoginCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/login');
})

// Create a factory function for transforming JSON objects into FORM request objects
.factory(
	"transformRequestAsFormPost",
	function() {
		// The following was lifted from: http://www.bennadel.com/blog/2615-posting-form-data-with-http-in-angularjs.htm
		function transformRequest( data, getHeaders ) {
			var headers = getHeaders();
			headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";
			return( serializeData( data ) );
		}
		// Return the factory value.
		return( transformRequest );
		// ---
		// PRVIATE METHODS.
		// ---
		// I serialize the given Object into a key-value pair string. This
		// method expects an object and will default to the toString() method.
		// --
		// NOTE: This is an atered version of the jQuery.param() method which
		// will serialize a data collection for Form posting.
		// --
		// https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
		function serializeData( data ) {
			// If this is not an object, defer to native stringification.
			if ( ! angular.isObject( data ) ) {
				return( ( data == null ) ? "" : data.toString() );
			}
			var buffer = [];

			// Serialize each key in the object.
			for ( var name in data ) {
				if ( ! data.hasOwnProperty( name ) ) {
					continue;
				}
				var value = data[ name ];
				buffer.push(
					encodeURIComponent( name ) +
					"=" +
					encodeURIComponent( ( value == null ) ? "" : value )
				);
			}

			// Serialize the buffer and clean it up for transportation.
			var source = buffer
				.join( "&" )
				.replace( /%20/g, "+" )
			;
			return( source );
		}
	}
);
