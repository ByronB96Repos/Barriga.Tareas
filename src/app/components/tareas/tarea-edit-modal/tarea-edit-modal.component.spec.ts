import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaEditModalComponent } from './tarea-edit-modal.component';

describe('TareaEditModalComponent', () => {
  let component: TareaEditModalComponent;
  let fixture: ComponentFixture<TareaEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaEditModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareaEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
