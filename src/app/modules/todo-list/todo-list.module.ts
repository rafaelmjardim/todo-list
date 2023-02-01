import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';

import { HttpClientModule } from "@angular/common/http";



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class TodoListModule { }
