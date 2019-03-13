import { PersonModule } from './person.module';

describe('PersonModule', () => {
   let blackPageModule: PersonModule;

   beforeEach(() => {
      blackPageModule = new PersonModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});