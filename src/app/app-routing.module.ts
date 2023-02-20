import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanComponent } from './modules/kanban/kanban.component';
import { TodoListComponent } from './modules/todo-list/todo-list.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
  },
  {
    path:'todo',
    loadChildren:() => import('./modules/todo-list/todo-list.module').then(m => m.TodoListModule) 
  },
  {
    path:'kanban',
    loadChildren: () => import('./modules/kanban/kanban.module').then(m => m.KanbanModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
