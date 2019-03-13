import { InstitutionInternalRolModule } from './institutioninternalrol.module';

describe('InstitutionInternalRolModule', () => {
   let blackPageModule: InstitutionInternalRolModule;

   beforeEach(() => {
      blackPageModule = new InstitutionInternalRolModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});