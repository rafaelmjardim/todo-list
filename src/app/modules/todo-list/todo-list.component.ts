import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Todo } from './todo-list';

import { FormGroup , FormBuilder, FormControl, RequiredValidator } from "@angular/forms";

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

  todoItemChecked: boolean = false;
  todoCheckCount: number = 0;
  todoId!: number;

  requiredError: boolean = false;

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
        
        //reseta o id para retornar o insert
        this.todoId = 0
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

  putTodoList = (id:number, txt?: string) => {
    this.todoId = id;
    
    //Setar o valor do testo no input
    this.formTodo.controls['inputTxt'].setValue(txt);
  }

  changeTodoCheckbox = (event: any, id: number, currentTxt: string) => {
    this.todoItemChecked = event.target.checked;

    this.todo_list_service.putTodoList(id, currentTxt, this.todoItemChecked).subscribe(res => {
      this.onGetTodolist();
    })
  }
}
