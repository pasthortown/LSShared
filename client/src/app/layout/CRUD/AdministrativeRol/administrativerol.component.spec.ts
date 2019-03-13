import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrativeRolComponent } from './administrativerol.component';

describe('AdministrativeRolComponent', () => {
   let component: AdministrativeRolComponent;
   let fixture: ComponentFixture<AdministrativeRolComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [AdministrativeRolComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(AdministrativeRolComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});