import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  setTodoListStorege = (todo: Todo[]) => {
    const todoStorege = JSON.stringify(todo);
    localStorage.setItem('todoList', todoStorege);
  }

  getTodoListStorege = () => {
    const todoStorge = localStorage.getItem('todoList');

    return todoStorge ? JSON.parse(todoStorge) : [];
  }
}
