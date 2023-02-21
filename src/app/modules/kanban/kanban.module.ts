import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanComponent } from './kanban.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  declarations: [
    KanbanComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    DragDropModule
  ]
})
export class KanbanModule { }
