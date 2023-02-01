import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Todo } from './todo-list';

import { FormGroup , FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList!: Todo;

  formTodo!: FormGroup;
  inputTxt!: FormControl;

  constructor(
    private todo_list_service: TodoListService,
    private form_builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.onGetTodolist();
    this.onFormInit();
  }

  onFormInit = () => {
    this.formTodo = this.form_builder.group({
      inputTxt: ['']
    })
    
  }

  onGetTodolist = () => {
    this.todo_list_service.getTodoList().subscribe(res => {
      this.todoList = res;
    })
  }

  postTodoList = () => {
    //Adiciona o valor do input na variavel
    const inputTxt = this.formTodo.controls['inputTxt'].value;

    this.todo_list_service.postTodoList(inputTxt).subscribe( res => {
      // console.log('Log Post', res)
    })
    this.onFormInit();

  }

}
