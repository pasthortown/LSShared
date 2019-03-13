import { InstitutionLogoModule } from './institutionlogo.module';

describe('InstitutionLogoModule', () => {
   let blackPageModule: InstitutionLogoModule;

   beforeEach(() => {
      blackPageModule = new InstitutionLogoModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});