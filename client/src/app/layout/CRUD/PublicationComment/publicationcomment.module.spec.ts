import { PublicationCommentModule } from './publicationcomment.module';

describe('PublicationCommentModule', () => {
   let blackPageModule: PublicationCommentModule;

   beforeEach(() => {
      blackPageModule = new PublicationCommentModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});