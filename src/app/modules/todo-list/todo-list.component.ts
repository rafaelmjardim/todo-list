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
  todoListCount!: number;

  formTodo!: FormGroup;
  inputTxt!: string;

  todoItemChecked!: any;
  todoCheckCount: number = 0;

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
      this.todoListCount = res.length;
      this.todoCheckCount = this.todoList.filter(i => i.checked).length
    })
  }

  postTodoList = () => {
    //Adiciona o valor do input na variavel
    this.inputTxt = this.formTodo.controls['inputTxt'].value;

    this.todo_list_service.postTodoList(this.inputTxt).subscribe( res => {
      // console.log('Log Post', res)

      this.onGetTodolist();
    })

    this.onFormInit();

  }

  deleteTodoList = (id: number) => {
    this.todo_list_service.deleteTodoList(id).subscribe(res => {
      this.onGetTodolist();
    })
  }

  putTodoList = () => {
    this.todo_list_service.putTodoList(1, 'Editado', true).subscribe(res => {
      console.log('Editado com sucesso')
    })
  }

  changeTodoCheckbox = (event: any) => {
    
    
    // console.log(this.todoCheckCount)
  }

}
