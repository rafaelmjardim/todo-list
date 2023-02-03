import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo-list';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  API_KEY = environment.API_KEY;
  

  constructor(private http: HttpClient) { }

  getTodoList = ():Observable<Todo> => {
    return this.http.get<Todo>(`${this.API_KEY}/todo`, {
      
    })
  }

  postTodoList = (txtPost: string):Observable<Todo> => {
    return this.http.post<Todo>(`${this.API_KEY}/todo`, {
      txt: txtPost,
      checked: false
    })
  }

  deleteTodoList = (id: number): Observable<Todo> => {
    return this.http.delete<Todo>(`${this.API_KEY}/todo/${id}`, {

    })
  }

  putTodoList = (id: number, txtPost?: string, checkedChange?:boolean): Observable<Todo> => {
    return this.http.put<Todo>(`${this.API_KEY}/todo/${id}`, {
      txt: txtPost,
      checked: checkedChange
    })
  }
}
