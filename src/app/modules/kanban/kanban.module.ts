import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanInsertComponent } from './kanban-insert/kanban-insert.component';

@NgModule({
  declarations: [

  
    KanbanInsertComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    DragDropModule
  ]
})
export class KanbanModule { }
