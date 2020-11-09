'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDo')));
  }

  // Методы
  addToStorage() {
    localStorage.setItem('toDo', JSON.stringify([...this.todoData]));
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
    li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>
    `);
    
    if (todo.completed) {
        this.todoCompleted.append(li);
        this.input.value = '';
    } else {
        this.todoList.append(li);
        this.input.value = '';
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
        key: this.generateKey()
      };
      // Добавляем в коллекцию
      this.todoData.set(newTodo.key, newTodo);
      // Теперь рендерим
      this.render();
    } else {
      alert('Пустое дело добавить нельзя!');
    }
  }

  // Генератор ключей
  generateKey() {
    return Math.random(). toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // Найти по ключу элемент и удалить из new Map и делаем render
  deleteItem(event) {
    this.todoData.delete(event.closest('li').key);
    this.render();
  }

  /* Перебрать через forEach все элементы todoData и найти тот элемент, которому соответствует ключ элемента на который мы нажали и поменять значение completed*/
  completedItem(event) {
    if (!this.todoData.get(event.closest('li').key).completed) {
      this.todoData.get(event.closest('li').key).completed = true;
    } else {
      this.todoData.get(event.closest('li').key).completed = false;
    }

    this.render();
  }

  // Делегирование, на какую кнопку кликнули, после вызвать один из методов,
  handler() {
    this.form.addEventListener('submit', this.addTodo.bind(this));

    const todoContainer = document.querySelector('.todo-container');

    todoContainer.addEventListener('click', event => {
      let target = event.target;

      if (target.matches('.todo-remove')) {
        this.deleteItem(target);
      } else if (target.matches('.todo-complete')) {
        this.completedItem(target);
      }
    });
  }

  init() {
    this.handler();
    this.render();
  }
}

// Todo принимает 4 селектора
const todo = new Todo('.todo-control', '.haeder-input', '.todo-list', '.todo-completed');

todo.init();