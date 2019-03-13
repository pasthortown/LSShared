import { InstitutionInternalRolAssignmentModule } from './institutioninternalrolassignment.module';

describe('InstitutionInternalRolAssignmentModule', () => {
   let blackPageModule: InstitutionInternalRolAssignmentModule;

   beforeEach(() => {
      blackPageModule = new InstitutionInternalRolAssignmentModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});