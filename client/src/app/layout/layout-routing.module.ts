import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
         {
            path: '',
            redirectTo: 'main'
         },
         {
            path: 'main',
            loadChildren: './main/main.module#MainModule'
         },
         {
            path: 'my-publications',
            loadChildren: './my-publications/my-publications.module#MyPublicationsModule'
         },
         {
            path: 'institution-admin',
            loadChildren: './institution-admin/institution-admin.module#InstitutionAdminModule'
         },
         {
            path: 'profile',
            loadChildren: './profile/profile.module#ProfileModule'
         },
         {
            path: 'institution',
            loadChildren: './CRUD/Institution/institution.module#InstitutionModule'
         },
         {
            path: 'person',
            loadChildren: './CRUD/Person/person.module#PersonModule'
         },
         {
            path: 'institution_logo',
            loadChildren: './CRUD/InstitutionLogo/institutionlogo.module#InstitutionLogoModule'
         },
         {
            path: 'author',
            loadChildren: './CRUD/Author/author.module#AuthorModule'
         },
         {
            path: 'publication_comment',
            loadChildren: './CRUD/PublicationComment/publicationcomment.module#PublicationCommentModule'
         },
         {
            path: 'publication_type',
            loadChildren: './CRUD/PublicationType/publicationtype.module#PublicationTypeModule'
         },
         {
            path: 'institution_internal_divition',
            loadChildren: './CRUD/InstitutionInternalDivition/institutioninternaldivition.module#InstitutionInternalDivitionModule'
         },
         {
            path: 'institution_internal_rol',
            loadChildren: './CRUD/InstitutionInternalRol/institutioninternalrol.module#InstitutionInternalRolModule'
         },
         {
            path: 'institution_internal_rol_assignment',
            loadChildren: './CRUD/InstitutionInternalRolAssignment/institutioninternalrolassignment.module#InstitutionInternalRolAssignmentModule'
         },
         {
            path: 'account_rol',
            loadChildren: './CRUD/AccountRol/accountrol.module#AccountRolModule'
         },
         {
            path: 'administrative_rol',
            loadChildren: './CRUD/AdministrativeRol/administrativerol.module#AdministrativeRolModule'
         },
         {
            path: 'publication',
            loadChildren: './CRUD/Publication/publication.module#PublicationModule'
         },
         {
            path: 'publication_attachment',
            loadChildren: './CRUD/PublicationAttachment/publicationattachment.module#PublicationAttachmentModule'
         },
         {
            path: 'blank',
            loadChildren: './blank-page/blank-page.module#BlankPageModule'
         },
         {
            path: 'not-found',
            loadChildren: './not-found/not-found.module#NotFoundModule'
         },
         {
            path: '**',
            redirectTo: 'not-found'
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LayoutRoutingModule {}