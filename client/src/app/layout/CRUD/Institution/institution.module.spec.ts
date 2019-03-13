import { InstitutionModule } from './institution.module';

describe('InstitutionModule', () => {
   let blackPageModule: InstitutionModule;

   beforeEach(() => {
      blackPageModule = new InstitutionModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});