angular.module('todoApp', [])
	.controller('todoController', function() {
	
	var todoList = this;
	todoList.button_active = 'all';
	
	todoList.todos = [
		{ text:'Buy flowers', done:false },
		{ text:'Drink beer', done:true }
	];

	todoList.addTodo = function() {
		console.log('add');
		var text = todoList.todoText;

		if(text) {
			todoList.todos.push( {
				text: text, 
				done: todoList.new_done
			});

			todoList.todoText = '';
		}
	};

	todoList.sortingTodo = function() {
		todoList.count = 0;

		angular.forEach(todoList.todos, function(todo) {
			if(1) {
				console.log(todo.done);

				todoList.todos = todo;
				//todoList.count += todo.done ? 0 : 1;
			}
		});
		console.log(todoList.todos);
		return todoList.todos;
	}

	todoList.activeButton = function(button) {
		todoList.button_active = button; 
	};

	todoList.clear = function() {
		todoList.todos = [];
	};
});
