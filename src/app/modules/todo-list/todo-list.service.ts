import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  API_KEY = environment.API_KEY;

  constructor(private http: HttpClient) { }

  getTodoList = () => {
    return this.http.get(`${this.API_KEY}/todo/.json`)
  }

  postTodoList = (txtPost: string) => {
    return this.http.post(`${this.API_KEY}/todo.json`, {
      txt: txtPost,
      checked: false
    })
  }

  deleteTodoList = (id: string) => {
    return this.http.delete(`${this.API_KEY}/todo/${id}.json`, {

    })
  }

  putTodoList = (id: string, txtPost?: string, checkedChange?:boolean) => {
    return this.http.put(`${this.API_KEY}/todo/${id}.json`, {
      txt: txtPost,
      checked: checkedChange
    })
  }
}
