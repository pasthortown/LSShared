import { AuthorModule } from './author.module';

describe('AuthorModule', () => {
   let blackPageModule: AuthorModule;

   beforeEach(() => {
      blackPageModule = new AuthorModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});