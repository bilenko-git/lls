'use strict';

var app = angular.module('AppModule', ['ngMaterial', 'ngMdIcons', 'ngCookies', 'ngStorage']);

app.controller('AppCtrl', function( $scope, $sessionStorage, $mdBottomSheet, $mdSidenav, $q, $mdDialog, http, cookie ) {
    var sessionKey = cookie.get('sessionKey');
    
    function renderPage(sessionKey) {
        http.getUser({ 
            'sessionKey' : sessionKey 
        }).success(function (response) {
            $scope.user = response.Account;
        });

        http.getLeftMenu({ 
            'sessionKey' : sessionKey 
        }).success(function (response) {
            var firstMenu = response.projects[0].Project.id;
            $scope.activeMenu = firstMenu;
            $scope.menu = response.projects;
            fetchTasks(firstMenu);
        });
    }  

    function fetchTasks(projectId) {
        http.fetchTasks({ 
            'sessionKey' : sessionKey, 
            'projectId' : projectId, 
            'paging_size' : 100, 
            'paging_offset' : 0 
        }).success(function (response) {
            $scope.tasks = response.tasks;
        });
    }

    if(sessionKey) {
        renderPage( sessionKey );
    } else {
        cookie.set().then(function( response ) {
            renderPage( response.data.session );
        });
    }

    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.showListBottomSheet = function( $event ) {
        $mdBottomSheet.show({
            templateUrl: 'templates/settingsPenel.html',
            controller: 'settingsPenelCtrl',
            targetEvent: $event
        }).then(function( clickedItem ) {});
    };
  
    $scope.showAdd = function( $event ) {
        $mdDialog.show({
            templateUrl: 'templates/addTaskModal.html',
            controller: 'addTaskModalCtrl',
            targetEvent: $event,
        })
        .then(function(answer) {});
    };
});

app.controller('settingsPenelCtrl', function( $scope, $mdBottomSheet ) {
    $scope.items = [
        { name: 'Rename', icon: 'share' },
        { name: 'Delete', icon: 'upload' }
    ];
  
    $scope.listItemClick = function( $index ) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
    };
});

app.controller('addTaskModalCtrl', function( $scope, $mdDialog, http, cookie ) {
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };
  
    $scope.answer = function(answer) {
        http.createTasks({ 
            'sessionKey' : cookie.get('sessionKey'), 
            'projectId' : $scope.activeMenu, 
            'description' : '', 
            'title' : $scope.description_task 
        }).success(function (response) {
            $scope.menu = response.projects;
            $mdDialog.hide(answer);
        });
    };
});

