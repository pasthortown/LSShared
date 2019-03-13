import { PublicationAttachmentModule } from './publicationattachment.module';

describe('PublicationAttachmentModule', () => {
   let blackPageModule: PublicationAttachmentModule;

   beforeEach(() => {
      blackPageModule = new PublicationAttachmentModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});