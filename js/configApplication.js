app.config(function( $mdThemingProvider ) {
  	var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
    		'contrastDefaultColor' : 'light',
    		'contrastDarkColors' : ['50'],
    		'50' : '6b6b99'
  	});
  
    $mdThemingProvider.definePalette( 'customBlue', customBlueMap );
  
    $mdThemingProvider
    		.theme('default')
      	.primaryPalette('customBlue', {
        		'default' : '500',
        		'hue-1' : '50'
      	})
  	    .primaryPalette('grey')
  	    .accentPalette('blue-grey');

  	$mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});