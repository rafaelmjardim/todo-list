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
  todoId!: number;

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
    console.log('Item', this.todoId)
    console.log('Editado com sucesso ID', this.todoId)

    if(this.todoId){
      //Update
      this.inputTxt = this.formTodo.controls['inputTxt'].value;
      
      this.todo_list_service.putTodoList(this.todoId, this.inputTxt, this.todoItemChecked).subscribe(res =>{
        console.log('Editado com sucesso ID', this.todoId)
        this.onGetTodolist();
        this.onFormInit();
        console.log('TXT', this.inputTxt)
      })
    }else{
      //Post

      //Adiciona o valor do input na variavel
      this.inputTxt = this.formTodo.controls['inputTxt'].value;
  
      this.todo_list_service.postTodoList(this.inputTxt).subscribe( res => {
        // console.log('Log Post', res)
  
        this.onGetTodolist();
      })
  
      this.onFormInit();
    }

  }

  deleteTodoList = (id: number) => {
    this.todo_list_service.deleteTodoList(id).subscribe(res => {
      this.onGetTodolist();
    })
  }

  putTodoList = (id:number) => {
    this.todoId = id;

    // this.todo_list_service.putTodoList(id, 'Editado', true).subscribe(res => {
    //   console.log('Editado com sucesso, ID:', this.todoId)
    // })
  }

  changeTodoCheckbox = (event: any) => {
    this.todoItemChecked = event.target.checked;
  }

}
