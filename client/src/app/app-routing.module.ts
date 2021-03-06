import { AuthGuard } from './components/guard/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full'
  },
  {
      path: 'login',
      loadChildren: './login/login.module#LoginModule'
  },
  {
      path: 'public',
      loadChildren: './public/public.module#PublicModule'
  },
  {
      path: 'register',
      loadChildren: './register/register.module#RegisterModule'
  },
  {
      path: '',
      loadChildren: './layout/layout.module#LayoutModule',
      canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
