import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCreateUpdateComponent } from './supplier-create-update.component';

describe('SupplierCreateUpdateComponent', () => {
  let component: SupplierCreateUpdateComponent;
  let fixture: ComponentFixture<SupplierCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierCreateUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
