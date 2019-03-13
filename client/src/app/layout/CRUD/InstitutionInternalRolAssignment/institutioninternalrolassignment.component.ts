import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { InstitutionInternalRolAssignmentService } from './../../../services/CRUD/institutioninternalrolassignment.service';
import { InstitutionInternalRolAssignment } from './../../../models/InstitutionInternalRolAssignment';
import { InstitutionInternalRolService } from './../../../services/CRUD/institutioninternalrol.service';
import { InstitutionInternalRol } from './../../../models/InstitutionInternalRol';

import { PersonService } from './../../../services/CRUD/person.service';
import { Person } from './../../../models/Person';


@Component({
   selector: 'app-institutioninternalrolassignment',
   templateUrl: './institutioninternalrolassignment.component.html',
   styleUrls: ['./institutioninternalrolassignment.component.scss']
})
export class InstitutionInternalRolAssignmentComponent implements OnInit {
   institution_internal_rol_assignments: InstitutionInternalRolAssignment[] = [];
   institution_internal_rol_assignmentSelected: InstitutionInternalRolAssignment = new InstitutionInternalRolAssignment();

   currentPage = 1;
   lastPage = 1;
   recordsByPage = 5;
   institution_internal_rols: InstitutionInternalRol[] = [];
   people: Person[] = [];
   constructor(private modalService: NgbModal,
               private toastr: ToastrManager,
               private institution_internal_rolDataService: InstitutionInternalRolService,
               private personDataService: PersonService,
               private institution_internal_rol_assignmentDataService: InstitutionInternalRolAssignmentService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getInstitutionInternalRol();
      this.getPerson();
   }

   selectInstitutionInternalRolAssignment(institution_internal_rol_assignment: InstitutionInternalRolAssignment) {
      this.institution_internal_rol_assignmentSelected = institution_internal_rol_assignment;
   }

   getInstitutionInternalRol() {
      this.institution_internal_rols = [];
      this.institution_internal_rolDataService.get().then( r => {
         this.institution_internal_rols = r as InstitutionInternalRol[];
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
      this.getInstitutionInternalRolAssignments();
   }

   getInstitutionInternalRolAssignments() {
      this.institution_internal_rol_assignments = [];
      this.institution_internal_rol_assignmentSelected = new InstitutionInternalRolAssignment();
      this.institution_internal_rol_assignmentSelected.institution_internal_rol_id = 0;
      this.institution_internal_rol_assignmentSelected.person_id = 0;
      this.institution_internal_rol_assignmentDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.institution_internal_rol_assignments = r.data as InstitutionInternalRolAssignment[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newInstitutionInternalRolAssignment(content) {
      this.institution_internal_rol_assignmentSelected = new InstitutionInternalRolAssignment();
      this.institution_internal_rol_assignmentSelected.institution_internal_rol_id = 0;
      this.institution_internal_rol_assignmentSelected.person_id = 0;
      this.openDialog(content);
   }

   editInstitutionInternalRolAssignment(content) {
      if (typeof this.institution_internal_rol_assignmentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteInstitutionInternalRolAssignment() {
      if (typeof this.institution_internal_rol_assignmentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.institution_internal_rol_assignmentDataService.delete(this.institution_internal_rol_assignmentSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getInstitutionInternalRolAssignments();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.institution_internal_rol_assignmentDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_InstitutionInternalRolAssignments.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.institution_internal_rol_assignmentDataService.get().then( r => {
         const backupData = r as InstitutionInternalRolAssignment[];
         let output = 'id;date;institution_internal_rol_id;person_id\n';
         backupData.forEach(element => {
            output += element.id; + element.date + ';' + element.institution_internal_rol_id + ';' + element.person_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_InstitutionInternalRolAssignments.csv');
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
            this.institution_internal_rol_assignmentDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.institution_internal_rol_assignmentSelected.id === 'undefined') {
               this.institution_internal_rol_assignmentDataService.post(this.institution_internal_rol_assignmentSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getInstitutionInternalRolAssignments();
               }).catch( e => console.log(e) );
            } else {
               this.institution_internal_rol_assignmentDataService.put(this.institution_internal_rol_assignmentSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getInstitutionInternalRolAssignments();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}