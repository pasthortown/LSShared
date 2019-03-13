import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionLogoComponent } from './institutionlogo.component';

describe('InstitutionLogoComponent', () => {
   let component: InstitutionLogoComponent;
   let fixture: ComponentFixture<InstitutionLogoComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [InstitutionLogoComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(InstitutionLogoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});