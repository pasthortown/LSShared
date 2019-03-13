import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionInternalRolComponent } from './institutioninternalrol.component';

describe('InstitutionInternalRolComponent', () => {
   let component: InstitutionInternalRolComponent;
   let fixture: ComponentFixture<InstitutionInternalRolComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [InstitutionInternalRolComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(InstitutionInternalRolComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});