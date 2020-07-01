import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierBOMComponent } from './supplier-bom.component';

describe('SupplierBOMComponent', () => {
  let component: SupplierBOMComponent;
  let fixture: ComponentFixture<SupplierBOMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierBOMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierBOMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
