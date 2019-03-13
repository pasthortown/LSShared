import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { ProfilePictureService } from '../services/profile/profilepicture.service';
import { ProfilePicture } from '../models/profile/ProfilePicture';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password: String = '';
  email: String = '';
  busy: Promise<any>;
  esperando: boolean;

  constructor(private router: Router, private authDataServise: AuthService, private profilePictureDataService: ProfilePictureService) {}

  ngOnInit() {
    this.email = '';
    this.password = '';
    this.esperando = false;
  }

  login() {
    if ( !this.esperando ) {
      this.esperando = true;
      this.busy = this.authDataServise.login(this.email, this.password).then( r => {
        this.esperando = false;
        sessionStorage.setItem('api_token', r.token);
        sessionStorage.setItem('isLoggedin', 'true');
        sessionStorage.setItem('rols', JSON.stringify(r.rol));
        const userData = { id: r.id, name: r.name };
        sessionStorage.setItem('user', JSON.stringify(userData));
        this.router.navigate(['/main']);
      }).catch( e => {
        this.esperando = false;
        swal({
          title: 'Iniciar Sesión',
          text: 'Credenciales Incorrectos',
          icon: 'error',
        })
        .then( response => {
          sessionStorage.clear();
          this.router.navigate(['/login']);
        });
      });
    }
  }

  password_recovery() {
    if ( !this.esperando ) {
      this.esperando = true;
      this.busy = this.authDataServise.password_recovery_request(this.email).then( r => {
        this.esperando = false;
        if ( r === 'Success!') {
          swal({
            title: 'Contraseña Recuperada',
            text: 'Para completar el proceso, revisa tu correo',
            icon: 'success',
          })
          .then( response => {
            this.password = '';
            this.email = '';
          });
        } else {
          swal({
            title: 'Contraseña Recuperada',
            text: 'La dirección de correo proporcionada, no corresponde a cuenta alguna',
            icon: 'error',
          })
          .then( response => {
            this.password = '';
            this.email = '';
          });
        }
      }).catch( e => {
        this.esperando = false;
        console.log(e);
      });
    }
  }
}
