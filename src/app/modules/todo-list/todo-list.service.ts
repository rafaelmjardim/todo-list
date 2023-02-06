import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Todo, TodoTest } from './todo-list';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  API_KEY = environment.API_KEY;
  

  constructor(private http: HttpClient) { }

  getTodoList = () => {
    return this.http.get<any>(`${this.API_KEY}/todo/.json`)
  }

  postTodoList = (txtPost: string):Observable<Todo> => {
    return this.http.post<Todo>(`${this.API_KEY}/todo.json`, {
      txt: txtPost,
      checked: false
    })
  }

  deleteTodoList = (id: string) => {
    return this.http.delete<any>(`${this.API_KEY}/todo/${id}.json`, {

    })
  }

  putTodoList = (id: string, txtPost?: string, checkedChange?:boolean) => {
    return this.http.put<any>(`${this.API_KEY}/todo/${id}.json`, {
      txt: txtPost,
      checked: checkedChange
    })
  }
}
