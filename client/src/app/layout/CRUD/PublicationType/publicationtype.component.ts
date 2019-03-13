import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { PublicationTypeService } from './../../../services/CRUD/publicationtype.service';
import { PublicationType } from './../../../models/PublicationType';

@Component({
   selector: 'app-publicationtype',
   templateUrl: './publicationtype.component.html',
   styleUrls: ['./publicationtype.component.scss']
})
export class PublicationTypeComponent implements OnInit {
   publication_types: PublicationType[] = [];
   publication_typeSelected: PublicationType = new PublicationType();

   currentPage = 1;
   lastPage = 1;
   recordsByPage = 5;
   constructor(private modalService: NgbModal,
               private toastr: ToastrManager,
               private publication_typeDataService: PublicationTypeService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectPublicationType(publication_type: PublicationType) {
      this.publication_typeSelected = publication_type;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getPublicationTypes();
   }

   getPublicationTypes() {
      this.publication_types = [];
      this.publication_typeSelected = new PublicationType();
      this.publication_typeDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.publication_types = r.data as PublicationType[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newPublicationType(content) {
      this.publication_typeSelected = new PublicationType();
      this.openDialog(content);
   }

   editPublicationType(content) {
      if (typeof this.publication_typeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deletePublicationType() {
      if (typeof this.publication_typeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.publication_typeDataService.delete(this.publication_typeSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getPublicationTypes();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.publication_typeDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_PublicationTypes.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.publication_typeDataService.get().then( r => {
         const backupData = r as PublicationType[];
         let output = 'id;name;description\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.description + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_PublicationTypes.csv');
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
            this.publication_typeDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.publication_typeSelected.id === 'undefined') {
               this.publication_typeDataService.post(this.publication_typeSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getPublicationTypes();
               }).catch( e => console.log(e) );
            } else {
               this.publication_typeDataService.put(this.publication_typeSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getPublicationTypes();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}