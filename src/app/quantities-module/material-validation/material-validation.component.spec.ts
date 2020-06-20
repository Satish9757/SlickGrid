import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialValidationComponent } from './material-validation.component';

describe('MaterialValidationComponent', () => {
  let component: MaterialValidationComponent;
  let fixture: ComponentFixture<MaterialValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
