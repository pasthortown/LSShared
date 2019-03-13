import { AdministrativeRolModule } from './administrativerol.module';

describe('AdministrativeRolModule', () => {
   let blackPageModule: AdministrativeRolModule;

   beforeEach(() => {
      blackPageModule = new AdministrativeRolModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});