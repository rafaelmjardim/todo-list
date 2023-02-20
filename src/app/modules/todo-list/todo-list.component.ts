import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { FormGroup , FormBuilder } from "@angular/forms";

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
  todoCheckCount!: any;
  todoId!: string;

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
      
      if(res){
        this.todoList = Object.entries(res).map(key => {
          return key
        })
        
        this.todoListCount = this.todoList.length

        //Faz a filtragem dos itens checados (true) e envia para a variavel todoCheckCount
        const filterTodoListChecked = this.todoList.filter((f: any) => {
          return f[1].checked === true;
        })

        this.todoCheckCount = filterTodoListChecked.length

      }else {
        this.todoListCount = 0;
      }      
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

    console.log('id', this.todoId)
    if(this.todoId){
      //Update
      this.inputTxt = this.formTodo.controls['inputTxt'].value;
      
      this.todo_list_service.putTodoList(this.todoId, this.inputTxt, this.todoItemChecked).subscribe(res =>{
        console.log('Editado com sucesso ID', this.todoId)
        this.onGetTodolist();
        this.onFormInit();
      })

      //reseta o todoID após click
      this.todoId = '';
      
    }else{
      //Post
      this.inputTxt = this.formTodo.controls['inputTxt'].value;
  
      this.todo_list_service.postTodoList(this.inputTxt).subscribe( res => {  
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
