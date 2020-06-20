import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleaccessComponent } from './roleaccess.component';

describe('RoleaccessComponent', () => {
  let component: RoleaccessComponent;
  let fixture: ComponentFixture<RoleaccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleaccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
