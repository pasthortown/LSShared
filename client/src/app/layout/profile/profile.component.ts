import { DocumentSharingService } from './../../services/negocio/DocumentSharing.service';
import { PersonService } from './../../services/CRUD/person.service';
import { Person } from './../../models/Person';
import { ProfilePicture } from './../../models/profile/ProfilePicture';
import { ProfilePictureService } from './../../services/profile/profilepicture.service';
import { UserService } from './../../services/profile/user.service';
import { User } from './../../models/profile/User';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  cambiandoClaves = false;
  clavesCoinciden = false;
  clave: String = '';
  claveConfirm: String = '';
  profileImg = 'assets/images/accounts.png';
  profilePicture: ProfilePicture;
  user: User;
  person: Person;
  @ViewChild('fotoInput') fotoInput;

  constructor(
    private authDataServise: AuthService,
    private profilePictureDataService: ProfilePictureService,
    private personDataService: PersonService,
    private documentSharingDataService: DocumentSharingService,
    private userDataService: UserService) {
    this.user = new User();
    this.person = new Person();
    this.profilePicture = new ProfilePicture();
  }

  ngOnInit() {
    this.getUser();
    this.getProfilePicture();
  }

  getUser() {
    this.userDataService.get(JSON.parse(sessionStorage.getItem('user')).id).then( r => {
      this.user = r as User;
      this.getPersonUser();
    }).catch( e => console.log(e));
  }

  getPersonUser() {
    this.documentSharingDataService.getPersonUser().then( r => {
      this.person = r as Person;
    }).catch( e => {
      console.log(e);
    });
  }

  getProfilePicture() {
    if ( JSON.parse(sessionStorage.getItem('profilePicture')) !== null ) {
      this.profilePicture = JSON.parse(sessionStorage.getItem('profilePicture')) as ProfilePicture;
      this.profileImg = 'data:' + this.profilePicture.file_type + ';base64,' + this.profilePicture.file;
    } else {
      this.profilePicture.id = 0;
    }
  }

  verificarCambioClaves() {
    if (this.clave.length !== 0 || this.claveConfirm.length !== 0) {
      this.cambiandoClaves = true;
    } else {
      this.cambiandoClaves = false;
    }
    if (this.clave === this.claveConfirm) {
      this.clavesCoinciden = true;
    } else {
      this.clavesCoinciden = false;
    }
  }

  subirFoto() {
    this.fotoInput.nativeElement.click();
  }

  CodificarArchivo(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profilePicture.file_name = file.name;
        this.profilePicture.file_type = file.type;
        this.profilePicture.file = reader.result.toString().split(',')[1];
        this.profileImg = 'data:' + this.profilePicture.file_type + ';base64,' + this.profilePicture.file;
      };
    }
  }

  guardar() {
    const userData = { id: this.user.id, name: this.user.name };
    sessionStorage.setItem('user', JSON.stringify(userData));
    this.userDataService.put(this.user).then( r => {
      this.guardarFoto();
      this.guardarPersona();
      if (this.cambiandoClaves && this.clavesCoinciden) {
        this.actualizarClave();
      } else {
        swal({
          title: 'Datos Guardados',
          text: 'Datos guardados satisfactoriamente.',
          icon: 'success',
        });
      }
    }).catch ( e => console.log(e));
  }

  guardarPersona() {
    if (this.person.id === 0) {
      this.person.email = this.user.email;
      this.personDataService.post(this.person).then( r => {
        this.person.id = r.id;
      }).catch( e => console.log(e) );
    } else {
      this.actualizarPersona();
    }
  }

  guardarFoto() {
    if ( this.profileImg === 'assets/images/accounts.png' ) {
      return;
    }
    if (this.profilePicture.id === 0 ) {
      this.profilePictureDataService.post(this.profilePicture).then( r => {
        this.profileImg = 'data:' + r.file_type + ';base64,' + r.file;
        this.profilePicture.id = r.id;
        sessionStorage.setItem('profilePicture', JSON.stringify(this.profilePicture));
      }).catch( e => console.log(e) );
    } else {
      this.actualizarFoto();
    }
  }

  actualizarPersona() {
    this.personDataService.put(this.person).then( r => {
    }).catch( e => console.log(e) );
  }

  actualizarFoto() {
    this.profilePictureDataService.put(this.profilePicture).then( r => {
      sessionStorage.setItem('profilePicture', JSON.stringify(this.profilePicture));
      this.profileImg = 'data:' + r.file_type + ';base64,' + r.file;
    }).catch( e => console.log(e) );
  }

  actualizarClave() {
    this.authDataServise.password_change(this.clave).then( r => {
      swal({
        title: 'Datos Guardados',
        text: 'Datos guardados satisfactoriamente. Cierre sesión y utilice su nueva contraseña.',
        icon: 'success',
      });
    }).catch( e => {
      console.log(e);
    });
  }
}
