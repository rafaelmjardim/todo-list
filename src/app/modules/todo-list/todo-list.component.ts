import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Todo, TodoTest } from './todo-list';

import { FormGroup , FormBuilder, FormControl, RequiredValidator } from "@angular/forms";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList!: any;
  todoListCount: number = 0;

  formTodo!: FormGroup;
  inputTxt!: string;

  todoItemChecked: boolean = false;
  todoCheckCount: number = 0;
  todoId!: string;

  requiredError: boolean = false;
  
  arrayDeTodos: any[] = [];

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
    const getTodoListResponse = res;

    Object.keys(getTodoListResponse).forEach((object) => {
    const todoID = object; // O ID DO OBJECT É O PROPRIO OBJECT;
    const todoObjeto = res[object]; // AQUI É AS PROPRIEDADES DO OBJECT;

    if (todoID && todoObjeto) {
      const todoItem = {
        id: todoID,
        checked: todoObjeto.checked,
        txt: todoObjeto.txt
      }

      this.arrayDeTodos.push(todoItem);
      console.log('array de todos: ', this.arrayDeTodos);
      }
    })
  })
}

  submitTodoList = () => {
    
    if(!this.formTodo.controls['inputTxt'].value.length){
      this.requiredError = true;
      console.log('error status', this.requiredError)
      return
    }else {
      this.requiredError = false;
    }

    if(this.todoId){
      //Update
      this.inputTxt = this.formTodo.controls['inputTxt'].value;
      
      this.todo_list_service.putTodoList(this.todoId, this.inputTxt, this.todoItemChecked).subscribe(res =>{
        console.log('Editado com sucesso ID', this.todoId)
        this.onGetTodolist();
        this.onFormInit();

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

  deleteTodoList = (id: string) => {
    this.todo_list_service.deleteTodoList(id).subscribe(res => {
      this.onGetTodolist();
    })
  }

  putTodoList = (id:string, txt?: string) => {
    this.todoId = id;
    
    //Setar o valor do testo no input
    this.formTodo.controls['inputTxt'].setValue(txt);
  }

  changeTodoCheckbox = (event: any, id: string, currentTxt: string) => {
    this.todoItemChecked = event.target.checked;

    this.todo_list_service.putTodoList(id, currentTxt, this.todoItemChecked).subscribe(res => {
      this.onGetTodolist();
    })
  }
}
