import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugDashboardComponent } from './drug-dashboard.component';

describe('DrugDashboardComponent', () => {
  let component: DrugDashboardComponent;
  let fixture: ComponentFixture<DrugDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrugDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
