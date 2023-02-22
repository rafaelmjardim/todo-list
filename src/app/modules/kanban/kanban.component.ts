import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {
  todo = ['Primeira tarefa', 'Comprar pão', 'Efetuar testes no sistema', 'Adicionar novos icones'];

  done = ['Alterar tema', 'Efetuar testes', 'Fazer compras', 'Comprar frutas', 'Verificar códigos'];

  progress: string[] = ['']

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
