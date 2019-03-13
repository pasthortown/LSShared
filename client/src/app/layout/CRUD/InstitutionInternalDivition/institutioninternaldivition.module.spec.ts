import { InstitutionInternalDivitionModule } from './institutioninternaldivition.module';

describe('InstitutionInternalDivitionModule', () => {
   let blackPageModule: InstitutionInternalDivitionModule;

   beforeEach(() => {
      blackPageModule = new InstitutionInternalDivitionModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});