import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { InstitutionLogoService } from './../../../services/CRUD/institutionlogo.service';
import { InstitutionLogo } from './../../../models/InstitutionLogo';
import { InstitutionService } from './../../../services/CRUD/institution.service';
import { Institution } from './../../../models/Institution';


@Component({
   selector: 'app-institutionlogo',
   templateUrl: './institutionlogo.component.html',
   styleUrls: ['./institutionlogo.component.scss']
})
export class InstitutionLogoComponent implements OnInit {
   institution_logos: InstitutionLogo[] = [];
   institution_logoSelected: InstitutionLogo = new InstitutionLogo();

   currentPage = 1;
   lastPage = 1;
   recordsByPage = 5;
   institutions: Institution[] = [];
   constructor(private modalService: NgbModal,
               private toastr: ToastrManager,
               private institutionDataService: InstitutionService,
               private institution_logoDataService: InstitutionLogoService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getInstitution();
   }

   CodeFileInstitutionLogo(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            this.institution_logoSelected.institution_logo_file_name = file.name;
            this.institution_logoSelected.institution_logo_file_type = file.type;
            this.institution_logoSelected.institution_logo_file = reader.result.toString().split(',')[1];
         };
      }
   }

   selectInstitutionLogo(institution_logo: InstitutionLogo) {
      this.institution_logoSelected = institution_logo;
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
      this.getInstitutionLogos();
   }

   getInstitutionLogos() {
      this.institution_logos = [];
      this.institution_logoSelected = new InstitutionLogo();
      this.institution_logoSelected.institution_id = 0;
      this.institution_logoDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.institution_logos = r.data as InstitutionLogo[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newInstitutionLogo(content) {
      this.institution_logoSelected = new InstitutionLogo();
      this.institution_logoSelected.institution_id = 0;
      this.openDialog(content);
   }

   editInstitutionLogo(content) {
      if (typeof this.institution_logoSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteInstitutionLogo() {
      if (typeof this.institution_logoSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.institution_logoDataService.delete(this.institution_logoSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getInstitutionLogos();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.institution_logoDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_InstitutionLogos.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.institution_logoDataService.get().then( r => {
         const backupData = r as InstitutionLogo[];
         let output = 'id;institution_logo_file_type;institution_logo_file_name;institution_logo_file;institution_id\n';
         backupData.forEach(element => {
            output += element.id; + element.institution_logo_file_type + ';' + element.institution_logo_file_name + ';' + element.institution_logo_file + ';' + element.institution_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_InstitutionLogos.csv');
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
            this.institution_logoDataService.masiveLoad(newData).then( r => {
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
            if (typeof this.institution_logoSelected.id === 'undefined') {
               this.institution_logoDataService.post(this.institution_logoSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getInstitutionLogos();
               }).catch( e => console.log(e) );
            } else {
               this.institution_logoDataService.put(this.institution_logoSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getInstitutionLogos();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}