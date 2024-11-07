import { Component, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { FormGroup , FormBuilder, FormControl } from "@angular/forms";
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Todo } from './todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList: Todo[] = [];

  inputTxt: string = '';

  todoItemChecked: boolean = false;
  todoCheckCount = 0;
  editIndex: number | null = null;

  showError: boolean = false;

  constructor(
    private todoListService: TodoListService
  ) { }

  ngOnInit(): void {
    this.onGetTodolist();
  }

  onGetTodolist = () => {
    this.todoList = this.todoListService.getTodoListStorege();
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
      this.inputTxt = ''
      return
    } 
    
    //POST
    if (!this.editIndex && this.inputTxt) {
      this.todoList = [...this.todoList, item];
      this.todoListService.setTodoListStorege(this.todoList);
      this.inputTxt = ''
    }
  }

  deleteTodoList = (index: number) => {  
    this.todoList.splice(index, 1)
    this.todoListService.setTodoListStorege(this.todoList);
  }

  editTodoList = (index: number, txt?: string) => {
    this.editIndex = index;
    
    //Setar o valor do testo no input
    // this.formTodo.controls['inputTxt'].setValue(txt);
  }

  changeTodoCheckbox = (event: any, index: number, currentTxt: string) => {
    this.todoItemChecked = event.target.checked;
  }
}
