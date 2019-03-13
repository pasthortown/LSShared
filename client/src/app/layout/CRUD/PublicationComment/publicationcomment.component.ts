import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { PublicationCommentService } from './../../../services/CRUD/publicationcomment.service';
import { PublicationComment } from './../../../models/PublicationComment';
import { PublicationService } from './../../../services/CRUD/publication.service';
import { Publication } from './../../../models/Publication';

import { PersonService } from './../../../services/CRUD/person.service';
import { Person } from './../../../models/Person';


@Component({
   selector: 'app-publicationcomment',
   templateUrl: './publicationcomment.component.html',
   styleUrls: ['./publicationcomment.component.scss']
})
export class PublicationCommentComponent implements OnInit {
   publication_comments: PublicationComment[] = [];
   publication_commentSelected: PublicationComment = new PublicationComment();

   currentPage = 1;
   lastPage = 1;
   recordsByPage = 5;
   publications: Publication[] = [];
   people: Person[] = [];
   constructor(private modalService: NgbModal,
               private toastr: ToastrManager,
               private publicationDataService: PublicationService,
               private personDataService: PersonService,
               private publication_commentDataService: PublicationCommentService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getPublication();
      this.getPerson();
   }

   selectPublicationComment(publication_comment: PublicationComment) {
      this.publication_commentSelected = publication_comment;
   }

   getPublication() {
      this.publications = [];
      this.publicationDataService.get().then( r => {
         this.publications = r as Publication[];
      }).catch( e => console.log(e) );
   }

   getPerson() {
      this.people = [];
      this.personDataService.get().then( r => {
         this.people = r as Person[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getPublicationComments();
   }

   getPublicationComments() {
      this.publication_comments = [];
      this.publication_commentSelected = new PublicationComment();
      this.publication_commentSelected.publication_id = 0;
      this.publication_commentSelected.person_id = 0;
      this.publication_commentDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.publication_comments = r.data as PublicationComment[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newPublicationComment(content) {
      this.publication_commentSelected = new PublicationComment();
      this.publication_commentSelected.publication_id = 0;
      this.publication_commentSelected.person_id = 0;
      this.openDialog(content);
   }

   editPublicationComment(content) {
      if (typeof this.publication_commentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deletePublicationComment() {
      if (typeof this.publication_commentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.publication_commentDataService.delete(this.publication_commentSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getPublicationComments();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.publication_commentDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_PublicationComments.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.publication_commentDataService.get().then( r => {
         const backupData = r as PublicationComment[];
         let output = 'id;content;publication_id;person_id\n';
         backupData.forEach(element => {
            output += element.id; + element.content + ';' + element.publication_id + ';' + element.person_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_PublicationComments.csv');
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
            this.publication_commentDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.publication_commentSelected.id === 'undefined') {
               this.publication_commentDataService.post(this.publication_commentSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getPublicationComments();
               }).catch( e => console.log(e) );
            } else {
               this.publication_commentDataService.put(this.publication_commentSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getPublicationComments();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}