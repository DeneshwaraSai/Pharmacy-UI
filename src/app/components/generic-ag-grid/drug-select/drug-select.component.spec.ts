import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugSelectComponent } from './drug-select.component';

describe('DrugSelectComponent', () => {
  let component: DrugSelectComponent;
  let fixture: ComponentFixture<DrugSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrugSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
