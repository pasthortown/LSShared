import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionInternalDivitionComponent } from './institutioninternaldivition.component';

describe('InstitutionInternalDivitionComponent', () => {
   let component: InstitutionInternalDivitionComponent;
   let fixture: ComponentFixture<InstitutionInternalDivitionComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [InstitutionInternalDivitionComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(InstitutionInternalDivitionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});