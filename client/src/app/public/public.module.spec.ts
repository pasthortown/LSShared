import { PublicModule } from './public.module';

describe('PublicModule', () => {
    let blackPageModule: PublicModule;

    beforeEach(() => {
        blackPageModule = new PublicModule();
    });

    it('should create an instance', () => {
        expect(blackPageModule).toBeTruthy();
    });
});
