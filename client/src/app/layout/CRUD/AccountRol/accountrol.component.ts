import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { AccountRolService } from './../../../services/CRUD/accountrol.service';
import { AccountRol } from './../../../models/AccountRol';
import { UserService } from './../../../services/profile/user.service';
import { User } from './../../../models/profile/User';

import { AdministrativeRolService } from './../../../services/CRUD/administrativerol.service';
import { AdministrativeRol } from './../../../models/AdministrativeRol';


@Component({
   selector: 'app-accountrol',
   templateUrl: './accountrol.component.html',
   styleUrls: ['./accountrol.component.scss']
})
export class AccountRolComponent implements OnInit {
   account_rols: AccountRol[] = [];
   account_rolSelected: AccountRol = new AccountRol();

   currentPage = 1;
   lastPage = 1;
   recordsByPage = 5;
   users: User[] = [];
   administrative_rols: AdministrativeRol[] = [];
   constructor(private modalService: NgbModal,
               private toastr: ToastrManager,
               private userDataService: UserService,
               private administrative_rolDataService: AdministrativeRolService,
               private account_rolDataService: AccountRolService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getUser();
      this.getAdministrativeRol();
   }

   selectAccountRol(account_rol: AccountRol) {
      this.account_rolSelected = account_rol;
   }

   getUser() {
      this.users = [];
      this.userDataService.get().then( r => {
         this.users = r as User[];
      }).catch( e => console.log(e) );
   }

   getAdministrativeRol() {
      this.administrative_rols = [];
      this.administrative_rolDataService.get().then( r => {
         this.administrative_rols = r as AdministrativeRol[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getAccountRols();
   }

   getAccountRols() {
      this.account_rols = [];
      this.account_rolSelected = new AccountRol();
      this.account_rolSelected.user_id = 0;
      this.account_rolSelected.administrative_rol_id = 0;
      this.account_rolDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.account_rols = r.data as AccountRol[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newAccountRol(content) {
      this.account_rolSelected = new AccountRol();
      this.account_rolSelected.user_id = 0;
      this.account_rolSelected.administrative_rol_id = 0;
      this.openDialog(content);
   }

   editAccountRol(content) {
      if (typeof this.account_rolSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteAccountRol() {
      if (typeof this.account_rolSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.account_rolDataService.delete(this.account_rolSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getAccountRols();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.account_rolDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_AccountRols.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.account_rolDataService.get().then( r => {
         const backupData = r as AccountRol[];
         let output = 'id;user_id;administrative_rol_id\n';
         backupData.forEach(element => {
            output += element.id; + element.user_id + ';' + element.administrative_rol_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_AccountRols.csv');
      }).catch( e => console.log(e) );
   }

   decodeUploadFile(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            const fileBytes = reader.result.toString().split(',')[1];
            const newData = JSON.parse(decodeURIComponent(escape(atob(fileBytes)))) as any[];
            this.account_rolDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.account_rolSelected.id === 'undefined') {
               this.account_rolDataService.post(this.account_rolSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getAccountRols();
               }).catch( e => console.log(e) );
            } else {
               this.account_rolDataService.put(this.account_rolSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getAccountRols();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}