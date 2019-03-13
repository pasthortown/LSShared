import { PublicationModule } from './publication.module';

describe('PublicationModule', () => {
   let blackPageModule: PublicationModule;

   beforeEach(() => {
      blackPageModule = new PublicationModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});