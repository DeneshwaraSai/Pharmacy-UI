import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDashboardComponent } from './supplier-dashboard.component';

describe('SupplierDashboardComponent', () => {
  let component: SupplierDashboardComponent;
  let fixture: ComponentFixture<SupplierDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
