import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanInsertComponent } from './kanban-insert.component';

describe('KanbanInsertComponent', () => {
  let component: KanbanInsertComponent;
  let fixture: ComponentFixture<KanbanInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
