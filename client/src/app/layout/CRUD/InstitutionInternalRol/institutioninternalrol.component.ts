import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { InstitutionInternalRolService } from './../../../services/CRUD/institutioninternalrol.service';
import { InstitutionInternalRol } from './../../../models/InstitutionInternalRol';
import { InstitutionService } from './../../../services/CRUD/institution.service';
import { Institution } from './../../../models/Institution';


@Component({
   selector: 'app-institutioninternalrol',
   templateUrl: './institutioninternalrol.component.html',
   styleUrls: ['./institutioninternalrol.component.scss']
})
export class InstitutionInternalRolComponent implements OnInit {
   institution_internal_rols: InstitutionInternalRol[] = [];
   institution_internal_rolSelected: InstitutionInternalRol = new InstitutionInternalRol();

   currentPage = 1;
   lastPage = 1;
   recordsByPage = 5;
   institutions: Institution[] = [];
   constructor(private modalService: NgbModal,
               private toastr: ToastrManager,
               private institutionDataService: InstitutionService,
               private institution_internal_rolDataService: InstitutionInternalRolService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getInstitution();
   }

   selectInstitutionInternalRol(institution_internal_rol: InstitutionInternalRol) {
      this.institution_internal_rolSelected = institution_internal_rol;
   }

   getInstitution() {
      this.institutions = [];
      this.institutionDataService.get().then( r => {
         this.institutions = r as Institution[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getInstitutionInternalRols();
   }

   getInstitutionInternalRols() {
      this.institution_internal_rols = [];
      this.institution_internal_rolSelected = new InstitutionInternalRol();
      this.institution_internal_rolSelected.institution_id = 0;
      this.institution_internal_rolDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.institution_internal_rols = r.data as InstitutionInternalRol[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newInstitutionInternalRol(content) {
      this.institution_internal_rolSelected = new InstitutionInternalRol();
      this.institution_internal_rolSelected.institution_id = 0;
      this.openDialog(content);
   }

   editInstitutionInternalRol(content) {
      if (typeof this.institution_internal_rolSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteInstitutionInternalRol() {
      if (typeof this.institution_internal_rolSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.institution_internal_rolDataService.delete(this.institution_internal_rolSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getInstitutionInternalRols();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.institution_internal_rolDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_InstitutionInternalRols.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.institution_internal_rolDataService.get().then( r => {
         const backupData = r as InstitutionInternalRol[];
         let output = 'id;name;description;institution_id\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.description + ';' + element.institution_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_InstitutionInternalRols.csv');
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
            this.institution_internal_rolDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.institution_internal_rolSelected.id === 'undefined') {
               this.institution_internal_rolDataService.post(this.institution_internal_rolSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getInstitutionInternalRols();
               }).catch( e => console.log(e) );
            } else {
               this.institution_internal_rolDataService.put(this.institution_internal_rolSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getInstitutionInternalRols();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}