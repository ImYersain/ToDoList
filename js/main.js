'use sctrict';

let addMessage = document.querySelector('.message'),
	addButton = document.querySelector('.add'),
	todoList = [],
	todo = document.querySelector('.todo');

if(localStorage.getItem('todo')){
	todoList = JSON.parse(localStorage.getItem('todo'));
	showMessages();
}

addButton.addEventListener('click', () => {
	let newTodo = {
		todo: addMessage.value,
		checked: false,
		important: false
	};

	todoList.push(newTodo);
	showMessages();
	localStorage.setItem('todo', JSON.stringify(todoList));
});



function showMessages(){
	let displayMessage = '';
	todoList.forEach((item, i) => {
		
		displayMessage += `
		<li>
		<input type='checkbox' id='item_${i}' ${item.checked ? 'checked': ''}>
		<label for='item_${i}'>${item.todo}</label>
		</li>
		`;

		todo.innerHTML = displayMessage;
	});
}