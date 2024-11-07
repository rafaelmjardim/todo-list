import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { FormGroup, FormControl } from "@angular/forms";
import { Todo } from './todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList: Todo[] = [];
  formTodo!: FormGroup;

  inputTxt: string = '';

  todoCheckCount = 0;
  editIndex: number | null = null;

  showError: boolean = false;

  constructor(
    private todoListService: TodoListService
  ) { }

  ngOnInit(): void {
    this.onFormInit();
    this.onGetTodolist();
  }

  onFormInit = () => {
    this.formTodo = new FormGroup({
      inputTxt: new FormControl([''])
    })
    
    this.updateTodoCheckCount();
    this.inputTxt = '';
  }
  
  onGetTodolist = () => {
    this.todoList = this.todoListService.getTodoListStorege();
    this.updateTodoCheckCount();
  }
  
  updateTodoCheckCount = () => {
    const todoCheckeds = this.todoList.filter(item => item.checked === true);
    this.todoCheckCount = todoCheckeds.length;
  }

  changeInputValue = (event: Event) => {
    const target = event.target as HTMLInputElement;

    this.inputTxt = target.value;
  }

  submitTodoList = () => {      
    this.showError = !this.inputTxt.length ? true : false; 

    const item: Todo = {
      txt: this.inputTxt,
      checked: false,
    }

    //PUT
    if (this.editIndex !== null) {
      this.todoList[this.editIndex] = {...item};     
      this.editIndex = null;    
      this.todoListService.setTodoListStorege(this.todoList)
      this.onFormInit()
      return
    } 
    
    //POST
    if (!this.editIndex && this.inputTxt) {
      this.todoList = [...this.todoList, item];
      this.todoListService.setTodoListStorege(this.todoList);
      this.onFormInit()
    }
  }

  deleteTodoList = (index: number) => {  
    this.todoList.splice(index, 1)
    this.updateTodoCheckCount();
    this.todoListService.setTodoListStorege(this.todoList);
  }

  editTodoList = (index: number, txt: string) => {
    this.editIndex = index;
    
    //Setar o valor do testo no input
    this.formTodo.controls['inputTxt'].setValue(txt);
    this.inputTxt = txt;
  }

  changeTodoCheckbox = (event: any, index: number, currentTxt: string) => {
    const eventChecked = event.target.checked;

    this.todoList = this.todoList.map((item, i) => {
      if (i === index) {
        return {...item, checked: eventChecked}
      }
      return item
    })

    this.todoListService.setTodoListStorege(this.todoList);
    this.updateTodoCheckCount();
  }
}
