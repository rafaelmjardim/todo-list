import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './modules/todo-list/todo-list.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'todo'
  },
  {
    path:'todo',
    loadChildren:() => import('./modules/todo-list/todo-list.module').then(m => m.TodoListModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
