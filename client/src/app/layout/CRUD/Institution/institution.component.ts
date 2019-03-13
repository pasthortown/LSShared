import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { InstitutionService } from './../../../services/CRUD/institution.service';
import { Institution } from './../../../models/Institution';

@Component({
   selector: 'app-institution',
   templateUrl: './institution.component.html',
   styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent implements OnInit {
   institutions: Institution[] = [];
   institutionSelected: Institution = new Institution();

   currentPage = 1;
   lastPage = 1;
   recordsByPage = 5;
   constructor(private modalService: NgbModal,
               private toastr: ToastrManager,
               private institutionDataService: InstitutionService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectInstitution(institution: Institution) {
      this.institutionSelected = institution;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getInstitutions();
   }

   address_mapEvent(event) {
      this.institutionSelected.address_map_latitude = event.coords.lat;
      this.institutionSelected.address_map_longitude = event.coords.lng;
   }

   getInstitutions() {
      this.institutions = [];
      this.institutionSelected = new Institution();
      this.institutionDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.institutions = r.data as Institution[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newInstitution(content) {
      this.institutionSelected = new Institution();
      this.openDialog(content);
   }

   editInstitution(content) {
      if (typeof this.institutionSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteInstitution() {
      if (typeof this.institutionSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.institutionDataService.delete(this.institutionSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getInstitutions();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.institutionDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Institutions.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.institutionDataService.get().then( r => {
         const backupData = r as Institution[];
         let output = 'id;name;address;address_map_latitude;address_map_longitude;phone_number;web\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.address + ';' + element.address_map_latitude + ';' + element.address_map_longitude + ';' + element.phone_number + ';' + element.web + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Institutions.csv');
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
            this.institutionDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.institutionSelected.id === 'undefined') {
               this.institutionDataService.post(this.institutionSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getInstitutions();
               }).catch( e => console.log(e) );
            } else {
               this.institutionDataService.put(this.institutionSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getInstitutions();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}