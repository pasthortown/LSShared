import { HttpModule } from '@angular/http';
import { AuthService } from './../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PersonService } from './../../services/CRUD/person.service';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UserService } from 'src/app/services/profile/user.service';
import { ProfilePictureService } from 'src/app/services/profile/profilepicture.service';
import { DocumentSharingService } from './../../services/negocio/DocumentSharing.service';

@NgModule({
  imports: [CommonModule, ProfileRoutingModule, FormsModule, HttpModule],
  declarations: [ProfileComponent],
  providers: [AuthService, UserService, ProfilePictureService, PersonService, DocumentSharingService]
})
export class ProfileModule {}
