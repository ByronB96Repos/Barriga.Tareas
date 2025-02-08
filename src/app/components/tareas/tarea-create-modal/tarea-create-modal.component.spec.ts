import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaCreateModalComponent } from './tarea-create-modal.component';

describe('TareaCreateModalComponent', () => {
  let component: TareaCreateModalComponent;
  let fixture: ComponentFixture<TareaCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaCreateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareaCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
