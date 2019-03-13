import { InstitutionAdminModule } from './institution-admin.module';

describe('InstitutionAdminModule', () => {
  let blackPageModule: InstitutionAdminModule;

  beforeEach(() => {
    blackPageModule = new InstitutionAdminModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
