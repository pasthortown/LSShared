import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { AdministrativeRolService } from './../../../services/CRUD/administrativerol.service';
import { AdministrativeRol } from './../../../models/AdministrativeRol';

@Component({
   selector: 'app-administrativerol',
   templateUrl: './administrativerol.component.html',
   styleUrls: ['./administrativerol.component.scss']
})
export class AdministrativeRolComponent implements OnInit {
   administrative_rols: AdministrativeRol[] = [];
   administrative_rolSelected: AdministrativeRol = new AdministrativeRol();

   currentPage = 1;
   lastPage = 1;
   recordsByPage = 5;
   constructor(private modalService: NgbModal,
               private toastr: ToastrManager,
               private administrative_rolDataService: AdministrativeRolService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectAdministrativeRol(administrative_rol: AdministrativeRol) {
      this.administrative_rolSelected = administrative_rol;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getAdministrativeRols();
   }

   getAdministrativeRols() {
      this.administrative_rols = [];
      this.administrative_rolSelected = new AdministrativeRol();
      this.administrative_rolDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.administrative_rols = r.data as AdministrativeRol[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newAdministrativeRol(content) {
      this.administrative_rolSelected = new AdministrativeRol();
      this.openDialog(content);
   }

   editAdministrativeRol(content) {
      if (typeof this.administrative_rolSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteAdministrativeRol() {
      if (typeof this.administrative_rolSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.administrative_rolDataService.delete(this.administrative_rolSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getAdministrativeRols();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.administrative_rolDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_AdministrativeRols.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.administrative_rolDataService.get().then( r => {
         const backupData = r as AdministrativeRol[];
         let output = 'id;description\n';
         backupData.forEach(element => {
            output += element.id; + element.description + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_AdministrativeRols.csv');
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
            this.administrative_rolDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.administrative_rolSelected.id === 'undefined') {
               this.administrative_rolDataService.post(this.administrative_rolSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getAdministrativeRols();
               }).catch( e => console.log(e) );
            } else {
               this.administrative_rolDataService.put(this.administrative_rolSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getAdministrativeRols();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}