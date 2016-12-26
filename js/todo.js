'use strict';

var app = angular.module('AppModule', ['ngMaterial', 'ngMdIcons', 'ngCookies', 'ngStorage']);

app.controller('AppCtrl', function( $scope, $cookies, $sessionStorage, $mdBottomSheet, $mdSidenav, $q, $mdDialog ) {
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.activity = [{
        what: 'Create a company',
        who: 'Ali Conners',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
    }];

    $scope.alert = '';
    $scope.showListBottomSheet = function( $event ) {
        $scope.alert = '';

        $mdBottomSheet.show({
            template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
            controller: 'ListBottomSheetCtrl',
            targetEvent: $event
        }).then(function( clickedItem ) {
            $scope.alert = clickedItem.name + ' clicked!';
        });
    };
  
    $scope.showAdd = function( ev ) {
        $mdDialog.show({
            controller: DialogController,
            template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"><div layout layout-sm="column"> <md-input-container flex> <label>Task</label> <input ng-model="user.firstName" placeholder="Task text"></input> </md-input-container> </div> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
            targetEvent: ev,
        })
        .then(function(answer) {
            $scope.alert = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.alert = 'You cancelled the dialog.';
        });
    };
});

app.controller('ListBottomSheetCtrl', function( $scope, $mdBottomSheet ) {
    $scope.items = [
        { name: 'add task', icon: 'add' },
    ];
  
    $scope.listItemClick = function( $index ) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
    };
});

function DialogController( $scope, $mdDialog ) {
  	$scope.hide = function() {
  		  $mdDialog.hide();
  	};

  	$scope.cancel = function() {
  		  $mdDialog.cancel();
  	};
	
  	$scope.answer = function(answer) {
		    $mdDialog.hide(answer);
  	};
};

app.config(function( $mdThemingProvider ) {
  	var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
    		'contrastDefaultColor': 'light',
    		'contrastDarkColors': ['50'],
    		'50': '6b6b99'
  	});
  
    $mdThemingProvider.definePalette( 'customBlue', customBlueMap );
  
    $mdThemingProvider
    		.theme('default')
      	.primaryPalette('customBlue', {
        		'default': '500',
        		'hue-1': '50'
      	})
  	    .primaryPalette('grey')
  	    .accentPalette('blue-grey');

  	$mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});
