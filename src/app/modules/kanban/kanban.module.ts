import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    DragDropModule
  ]
})
export class KanbanModule { }
