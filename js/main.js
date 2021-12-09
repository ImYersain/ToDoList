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
	if(!addMessage.value) return;
	let newTodo = {
		todo: addMessage.value,
		checked: false,
		important: false
	};

	todoList.push(newTodo);
	showMessages();
	localStorage.setItem('todo', JSON.stringify(todoList));
	addMessage.value = '';
});



function showMessages(){
	let displayMessage = '';
	if(todoList.length === 0) todo.innerHTML = '';
	todoList.forEach((item, i) => {
		
		displayMessage += `
		<li>
		<input type='checkbox' id='item_${i}' ${item.checked ? 'checked': ''}>
		<label for='item_${i}' class='${item.important ? 'important': ''}'>${item.todo}</label>
		</li>
		`;

		todo.innerHTML = displayMessage;
	});
}

todo.addEventListener('change', (e) => {
	let idInput = e.target.getAttribute('id'),
		valueLabel = todo.querySelector(`[for=${idInput}]`).innerHTML;

	todoList.forEach((item) => {
		if(item.todo === valueLabel){
			item.checked = !item.checked;
			localStorage.setItem('todo', JSON.stringify(todoList));
		}
	});
});

todo.addEventListener('contextmenu', (e) =>{
	e.preventDefault();
	todoList.forEach((item,i) => {
		if(item.todo === e.target.innerHTML){
			if(e.ctrlKey || e.metaKey){
				todoList.splice(i,1);
			} else {
				item.important = !item.important;
			}
			localStorage.setItem('todo', JSON.stringify(todoList));
			showMessages();
		}
	});
});







/*   чуть чуть наследования ES6+(классами)    - к проекту туду не относится

const dog = new Animal({name: 'Alex', color: 'white'})

class Cat extends Animal{
	constructor(options){
  	super(options)
  } 
  
  voice(){
  	super.voice();
    console.log(`${this.name} sounds like myay`)
  }
}

const cat = new Cat({name:'Murzik', color:'black'})
cat.voice()

*/
