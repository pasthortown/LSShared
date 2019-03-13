import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationCommentComponent } from './publicationcomment.component';

describe('PublicationCommentComponent', () => {
   let component: PublicationCommentComponent;
   let fixture: ComponentFixture<PublicationCommentComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [PublicationCommentComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(PublicationCommentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});