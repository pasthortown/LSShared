import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationAttachmentComponent } from './publicationattachment.component';

describe('PublicationAttachmentComponent', () => {
   let component: PublicationAttachmentComponent;
   let fixture: ComponentFixture<PublicationAttachmentComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [PublicationAttachmentComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(PublicationAttachmentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});