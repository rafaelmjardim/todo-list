import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Todo } from './todo-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList!: Todo;

  constructor(
    private todo_list_service: TodoListService
  ) { }

  ngOnInit(): void {
    this.onGetTodolist();
  }

  onGetTodolist = () => {
    this.todo_list_service.getTodoList().subscribe(res => {
      this.todoList = res;
    })
  }

}
