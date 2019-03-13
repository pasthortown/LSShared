import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { PublicationService } from './../../../services/CRUD/publication.service';
import { Publication } from './../../../models/Publication';
import { AuthorService } from './../../../services/CRUD/author.service';
import { Author } from './../../../models/Author';

import { PublicationTypeService } from './../../../services/CRUD/publicationtype.service';
import { PublicationType } from './../../../models/PublicationType';

import { InstitutionInternalDivitionService } from './../../../services/CRUD/institutioninternaldivition.service';
import { InstitutionInternalDivition } from './../../../models/InstitutionInternalDivition';


@Component({
   selector: 'app-publication',
   templateUrl: './publication.component.html',
   styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {
   publications: Publication[] = [];
   publicationSelected: Publication = new Publication();

   currentPage = 1;
   lastPage = 1;
   recordsByPage = 5;
   authors: Author[] = [];
   authors_publicationSelectedId: number;
   publication_types: PublicationType[] = [];
   institution_internal_divitions: InstitutionInternalDivition[] = [];
   constructor(private modalService: NgbModal,
               private toastr: ToastrManager,
               private authorDataService: AuthorService,
               private publication_typeDataService: PublicationTypeService,
               private institution_internal_divitionDataService: InstitutionInternalDivitionService,
               private publicationDataService: PublicationService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getAuthor();
      this.getPublicationType();
      this.getInstitutionInternalDivition();
   }

   selectPublication(publication: Publication) {
      this.publicationSelected = publication;
   }

   getAuthor() {
      this.authors = [];
      this.authorDataService.get().then( r => {
         this.authors = r as Author[];
      }).catch( e => console.log(e) );
   }

   getAuthorsOnPublication() {
      this.publicationSelected.authors_on_publication = [];
      this.publicationDataService.get(this.publicationSelected.id).then( r => {
         this.publicationSelected.authors_on_publication = r.attach[0].authors_on_publication as Author[];
      }).catch( e => console.log(e) );
   }

   getPublicationType() {
      this.publication_types = [];
      this.publication_typeDataService.get().then( r => {
         this.publication_types = r as PublicationType[];
      }).catch( e => console.log(e) );
   }

   getInstitutionInternalDivition() {
      this.institution_internal_divitions = [];
      this.institution_internal_divitionDataService.get().then( r => {
         this.institution_internal_divitions = r as InstitutionInternalDivition[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getPublications();
   }

   getPublications() {
      this.publications = [];
      this.publicationSelected = new Publication();
      this.authors_publicationSelectedId = 0;
      this.publicationSelected.publication_type_id = 0;
      this.publicationSelected.institution_internal_divition_id = 0;
      this.publicationDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.publications = r.data as Publication[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newPublication(content) {
      this.publicationSelected = new Publication();
      this.authors_publicationSelectedId = 0;
      this.publicationSelected.publication_type_id = 0;
      this.publicationSelected.institution_internal_divition_id = 0;
      this.openDialog(content);
   }

   editPublication(content) {
      if ( typeof this.publicationSelected.authors_on_publication === 'undefined' ) {
         this.publicationSelected.authors_on_publication = [];
      }
      if (typeof this.publicationSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.getAuthorsOnPublication();
      this.authors_publicationSelectedId = 0;
      this.openDialog(content);
   }

   deletePublication() {
      if (typeof this.publicationSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.publicationDataService.delete(this.publicationSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getPublications();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.publicationDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Publications.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.publicationDataService.get().then( r => {
         const backupData = r as Publication[];
         let output = 'id;title;abstract;written_date;published_date;keywords;publication_type_id;institution_internal_divition_id\n';
         backupData.forEach(element => {
            output += element.id; + element.title + ';' + element.abstract + ';' + element.written_date + ';' + element.published_date + ';' + element.keywords + ';' + element.publication_type_id + ';' + element.institution_internal_divition_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Publications.csv');
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
            this.publicationDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   selectAuthor(author: Author) {
      this.authors_publicationSelectedId = author.id;
   }

   addAuthor() {
      if (this.authors_publicationSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      this.authors.forEach(author => {
         if (author.id == this.authors_publicationSelectedId) {
            let existe = false;
            this.publicationSelected.authors_on_publication.forEach(element => {
               if (element.id == author.id) {
                  existe = true;
               }
            });
            if (!existe) {
               this.publicationSelected.authors_on_publication.push(author);
               this.authors_publicationSelectedId = 0;
            } else {
               this.toastr.errorToastr('El registro ya existe.', 'Error');
            }
         }
      });
   }

   removeAuthor() {
      if (this.authors_publicationSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      const newAuthors: Author[] = [];
      let eliminado = false;
      this.publicationSelected.authors_on_publication.forEach(author => {
         if (author.id !== this.authors_publicationSelectedId) {
            newAuthors.push(author);
         } else {
            eliminado = true;
         }
      });
      if (!eliminado) {
         this.toastr.errorToastr('Registro no encontrado.', 'Error');
         return;
      }
      this.publicationSelected.authors_on_publication = newAuthors;
      this.authors_publicationSelectedId = 0;
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.publicationSelected.id === 'undefined') {
               this.publicationDataService.post(this.publicationSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getPublications();
               }).catch( e => console.log(e) );
            } else {
               this.publicationDataService.put(this.publicationSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getPublications();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}