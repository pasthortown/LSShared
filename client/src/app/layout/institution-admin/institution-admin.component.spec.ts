import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionAdminComponent } from './institution-admin.component';

describe('InstitutionAdminComponent', () => {
  let component: InstitutionAdminComponent;
  let fixture: ComponentFixture<InstitutionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutionAdminComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
