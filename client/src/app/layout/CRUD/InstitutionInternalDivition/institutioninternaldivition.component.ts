import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { InstitutionInternalDivitionService } from './../../../services/CRUD/institutioninternaldivition.service';
import { InstitutionInternalDivition } from './../../../models/InstitutionInternalDivition';
import { InstitutionService } from './../../../services/CRUD/institution.service';
import { Institution } from './../../../models/Institution';


@Component({
   selector: 'app-institutioninternaldivition',
   templateUrl: './institutioninternaldivition.component.html',
   styleUrls: ['./institutioninternaldivition.component.scss']
})
export class InstitutionInternalDivitionComponent implements OnInit {
   institution_internal_divitions: InstitutionInternalDivition[] = [];
   institution_internal_divitionSelected: InstitutionInternalDivition = new InstitutionInternalDivition();

   currentPage = 1;
   lastPage = 1;
   recordsByPage = 5;
   institutions: Institution[] = [];
   constructor(private modalService: NgbModal,
               private toastr: ToastrManager,
               private institutionDataService: InstitutionService,
               private institution_internal_divitionDataService: InstitutionInternalDivitionService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getInstitution();
   }

   selectInstitutionInternalDivition(institution_internal_divition: InstitutionInternalDivition) {
      this.institution_internal_divitionSelected = institution_internal_divition;
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
      this.getInstitutionInternalDivitions();
   }

   getInstitutionInternalDivitions() {
      this.institution_internal_divitions = [];
      this.institution_internal_divitionSelected = new InstitutionInternalDivition();
      this.institution_internal_divitionSelected.institution_id = 0;
      this.institution_internal_divitionDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.institution_internal_divitions = r.data as InstitutionInternalDivition[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newInstitutionInternalDivition(content) {
      this.institution_internal_divitionSelected = new InstitutionInternalDivition();
      this.institution_internal_divitionSelected.institution_id = 0;
      this.openDialog(content);
   }

   editInstitutionInternalDivition(content) {
      if (typeof this.institution_internal_divitionSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteInstitutionInternalDivition() {
      if (typeof this.institution_internal_divitionSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.institution_internal_divitionDataService.delete(this.institution_internal_divitionSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getInstitutionInternalDivitions();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.institution_internal_divitionDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_InstitutionInternalDivitions.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.institution_internal_divitionDataService.get().then( r => {
         const backupData = r as InstitutionInternalDivition[];
         let output = 'id;description;institution_id\n';
         backupData.forEach(element => {
            output += element.id; + element.description + ';' + element.institution_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_InstitutionInternalDivitions.csv');
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
            this.institution_internal_divitionDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.institution_internal_divitionSelected.id === 'undefined') {
               this.institution_internal_divitionDataService.post(this.institution_internal_divitionSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getInstitutionInternalDivitions();
               }).catch( e => console.log(e) );
            } else {
               this.institution_internal_divitionDataService.put(this.institution_internal_divitionSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getInstitutionInternalDivitions();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}