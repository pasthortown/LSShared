import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { PublicationAttachmentService } from './../../../services/CRUD/publicationattachment.service';
import { PublicationAttachment } from './../../../models/PublicationAttachment';
import { PublicationService } from './../../../services/CRUD/publication.service';
import { Publication } from './../../../models/Publication';


@Component({
   selector: 'app-publicationattachment',
   templateUrl: './publicationattachment.component.html',
   styleUrls: ['./publicationattachment.component.scss']
})
export class PublicationAttachmentComponent implements OnInit {
   publication_attachments: PublicationAttachment[] = [];
   publication_attachmentSelected: PublicationAttachment = new PublicationAttachment();

   currentPage = 1;
   lastPage = 1;
   recordsByPage = 5;
   publications: Publication[] = [];
   constructor(private modalService: NgbModal,
               private toastr: ToastrManager,
               private publicationDataService: PublicationService,
               private publication_attachmentDataService: PublicationAttachmentService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getPublication();
   }

   CodeFilePublicationAttachment(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            this.publication_attachmentSelected.publication_attachment_file_name = file.name;
            this.publication_attachmentSelected.publication_attachment_file_type = file.type;
            this.publication_attachmentSelected.publication_attachment_file = reader.result.toString().split(',')[1];
         };
      }
   }

   selectPublicationAttachment(publication_attachment: PublicationAttachment) {
      this.publication_attachmentSelected = publication_attachment;
   }

   getPublication() {
      this.publications = [];
      this.publicationDataService.get().then( r => {
         this.publications = r as Publication[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getPublicationAttachments();
   }

   getPublicationAttachments() {
      this.publication_attachments = [];
      this.publication_attachmentSelected = new PublicationAttachment();
      this.publication_attachmentSelected.publication_id = 0;
      this.publication_attachmentDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.publication_attachments = r.data as PublicationAttachment[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newPublicationAttachment(content) {
      this.publication_attachmentSelected = new PublicationAttachment();
      this.publication_attachmentSelected.publication_id = 0;
      this.openDialog(content);
   }

   editPublicationAttachment(content) {
      if (typeof this.publication_attachmentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deletePublicationAttachment() {
      if (typeof this.publication_attachmentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.publication_attachmentDataService.delete(this.publication_attachmentSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getPublicationAttachments();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.publication_attachmentDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_PublicationAttachments.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.publication_attachmentDataService.get().then( r => {
         const backupData = r as PublicationAttachment[];
         let output = 'id;publication_attachment_file_type;publication_attachment_file_name;publication_attachment_file;publication_id\n';
         backupData.forEach(element => {
            output += element.id; + element.publication_attachment_file_type + ';' + element.publication_attachment_file_name + ';' + element.publication_attachment_file + ';' + element.publication_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_PublicationAttachments.csv');
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
            this.publication_attachmentDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   downloadFile(file: string, type: string, name: string) {
      const byteCharacters = atob(file);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
         byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: type});
      saveAs(blob, name);
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.publication_attachmentSelected.id === 'undefined') {
               this.publication_attachmentDataService.post(this.publication_attachmentSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getPublicationAttachments();
               }).catch( e => console.log(e) );
            } else {
               this.publication_attachmentDataService.put(this.publication_attachmentSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getPublicationAttachments();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}