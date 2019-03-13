import { MyPublicationsModule } from './my-publications.module';

describe('MyPublicationsModule', () => {
  let blackPageModule: MyPublicationsModule;

  beforeEach(() => {
    blackPageModule = new MyPublicationsModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
