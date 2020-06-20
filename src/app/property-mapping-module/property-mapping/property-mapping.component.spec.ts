import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyMappingComponent } from './property-mapping.component';

describe('PropertyMappingComponent', () => {
  let component: PropertyMappingComponent;
  let fixture: ComponentFixture<PropertyMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
