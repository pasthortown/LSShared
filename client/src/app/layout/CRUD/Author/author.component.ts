import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { AuthorService } from './../../../services/CRUD/author.service';
import { Author } from './../../../models/Author';

@Component({
   selector: 'app-author',
   templateUrl: './author.component.html',
   styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
   authors: Author[] = [];
   authorSelected: Author = new Author();

   currentPage = 1;
   lastPage = 1;
   recordsByPage = 5;
   constructor(private modalService: NgbModal,
               private toastr: ToastrManager,
               private authorDataService: AuthorService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectAuthor(author: Author) {
      this.authorSelected = author;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getAuthors();
   }

   getAuthors() {
      this.authors = [];
      this.authorSelected = new Author();
      this.authorDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.authors = r.data as Author[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newAuthor(content) {
      this.authorSelected = new Author();
      this.openDialog(content);
   }

   editAuthor(content) {
      if (typeof this.authorSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteAuthor() {
      if (typeof this.authorSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.authorDataService.delete(this.authorSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getAuthors();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.authorDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Authors.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.authorDataService.get().then( r => {
         const backupData = r as Author[];
         let output = 'id;name;last_name;affiliation;email\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.last_name + ';' + element.affiliation + ';' + element.email + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Authors.csv');
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
            this.authorDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.authorSelected.id === 'undefined') {
               this.authorDataService.post(this.authorSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getAuthors();
               }).catch( e => console.log(e) );
            } else {
               this.authorDataService.put(this.authorSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getAuthors();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}