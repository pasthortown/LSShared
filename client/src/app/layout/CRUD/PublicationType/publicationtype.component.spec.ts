import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationTypeComponent } from './publicationtype.component';

describe('PublicationTypeComponent', () => {
   let component: PublicationTypeComponent;
   let fixture: ComponentFixture<PublicationTypeComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [PublicationTypeComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(PublicationTypeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});