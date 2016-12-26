'use strict';

app.factory('http', function( $http ) {
    var API = {};

    API.getUser = function( data ) {
        return $http({
            method: 'GET', 
            url: 'https://api-test-task.decodeapps.io/account', 
            params: {
                session: data['sessionKey']
            }
        });
    }; 

    API.getLeftMenu = function( data ) {
        return $http({
            method: 'GET', 
            url: 'https://api-test-task.decodeapps.io/projects',
            params: {
                session: data['sessionKey']
            }
        });
    };

    API.createTasks = function( data ) {
        return $http({
            method: 'POST', 
            url: 'https://api-test-task.decodeapps.io/tasks/task',
            data: {
                'session': data['sessionKey'],
                'Project': {
                    'id': data['projectId']
                },
                'Task': {
                    'title': data['title'],
                    'description': data['description']
                }
            }
        });
    };

    API.updateTasks = function( data ) {
        return $http({
            method: 'POST', 
            url : 'https://api-test-task.decodeapps.io/tasks/task',
            data : {
                'session': data['sessionKey'],
                'Task': {
                    'id': data['id'],
                    'title': data['title']
                }
            }
        });
    };

    API.deleteTasks = function( data ) {
        return $http({
            method: 'POST', 
            url: 'https://api-test-task.decodeapps.io/tasks/task',
            data: {
                'session': data['sessionKey'],
                'task_id': data['task_id']
            }
        });
    };

    API.fetchTasks = function( data ) {
        return $http({
            method: 'GET', 
            url: 'https://api-test-task.decodeapps.io/tasks',
            params: {
                session: data['sessionKey'],
                project_id: data['projectId'],
                paging_size: data['paging_size'],
                paging_offset: data['paging_offset']
            }
        });
    };

    return API;
});

app.factory('cookie', function( $cookies, http ) {
    return {
        set : function() {
            return http({
                method: 'POST', 
                url: 'https://api-test-task.decodeapps.io/signup'
            }).then(function( response ) {
                $cookies.put("sessionKey", response.session, {
                    path: '/'
                });
                return response.session;
            });
        },
        get: function(name) {
            return $cookies.get(name);
        }
    }
});