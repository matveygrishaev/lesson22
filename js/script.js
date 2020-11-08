'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    // Коллекция
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  }

  // Методы
  addToStorage() {
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {

    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('before', `
        <span class="text-todo">${todo.value}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
        </div>
    `);

    if(todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  // Получаем данные из из input, создать объект и добавить в todoData 
  addTodo(e) {
    e.preventDefault();
    // Проверка на пустой input
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };

      // Добавляем в коллекцию
      this.todoData.set(newTodo.key, newTodo);
      // Теперь рендерим
      this.render();
    }

  }

  // Генератор ключей
  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  deleteItem() {
    // Найти по ключу элемент и удалить из new Map и делаем render
  }

  completedItem() {
    /* Перебрать через forEach все элементы todoData и найти тот элемент, которому соответствует ключ элемента на который мы нажали и поменять значение completed*/
  }

  handler() {
    // Делегирование, на какую кнопку кликнули, после вызвать один из методов,
  }


  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
  }
}

// Todo принимает 4 селектора
const todo = new Todo('.todo-control', '.haeder-input', '.todo-list', '.todo-completed');

todo.init();