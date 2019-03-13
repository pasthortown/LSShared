import { AccountRolModule } from './accountrol.module';

describe('AccountRolModule', () => {
   let blackPageModule: AccountRolModule;

   beforeEach(() => {
      blackPageModule = new AccountRolModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});