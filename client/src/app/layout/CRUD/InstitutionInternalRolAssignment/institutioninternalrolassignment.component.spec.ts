import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionInternalRolAssignmentComponent } from './institutioninternalrolassignment.component';

describe('InstitutionInternalRolAssignmentComponent', () => {
   let component: InstitutionInternalRolAssignmentComponent;
   let fixture: ComponentFixture<InstitutionInternalRolAssignmentComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [InstitutionInternalRolAssignmentComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(InstitutionInternalRolAssignmentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});