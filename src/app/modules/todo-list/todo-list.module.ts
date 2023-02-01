import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';

import { HttpClientModule } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TodoListModule { }
