import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountRolComponent } from './accountrol.component';

describe('AccountRolComponent', () => {
   let component: AccountRolComponent;
   let fixture: ComponentFixture<AccountRolComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [AccountRolComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(AccountRolComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});