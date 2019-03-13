import { PublicationTypeModule } from './publicationtype.module';

describe('PublicationTypeModule', () => {
   let blackPageModule: PublicationTypeModule;

   beforeEach(() => {
      blackPageModule = new PublicationTypeModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});