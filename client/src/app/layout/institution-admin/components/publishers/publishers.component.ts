import { DocumentSharingService } from './../../../../services/negocio/DocumentSharing.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { InstitutionInternalRolAssignmentService } from './../../../../services/CRUD/institutioninternalrolassignment.service';
import { InstitutionInternalRolAssignment } from './../../../../models/InstitutionInternalRolAssignment';
import { Person } from './../../../../models/Person';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent implements OnInit {
  institution_internal_rols: Array<any> = [];
  publishers: Array<any> = [];
  institution_internal_rol_assignmets: Array<any> = [];
  candidates: Person[] = [];
  people: Person[] = [];
  institution_internal_rol_assignmentSelected: InstitutionInternalRolAssignment = new InstitutionInternalRolAssignment();

  constructor(private modalService: NgbModal,
    private toastr: ToastrManager,
    private institution_internal_rol_assignmentDataService: InstitutionInternalRolAssignmentService,
    private documentSharingDataService: DocumentSharingService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.getInstitutionPublishers();
  }

  selectInstitutionInternalRolAssignment(institutionInternalRolAssignment) {
    this.institution_internal_rol_assignmentSelected = institutionInternalRolAssignment;
  }

  getInstitutionPublishers() {
    this.documentSharingDataService.getInstitutionPublishers().then( r => {
      this.institution_internal_rols = r.institution_internal_rols;
      this.publishers = r.publishers;
      this.candidates = r.candidates;
      this.people = [];
      this.publishers.forEach(element => {
        this.people.push(element);
      });
      this.candidates.forEach(element => {
        this.people.push(element);
      });
      this.institution_internal_rol_assignmets = r.institution_internal_rol_assignmets;
    }).catch( e => {
      console.log(e);
    });
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
       this.getInstitutionPublishers();
    }).catch( e => console.log(e) );
  }

  openDialog(content) {
    this.modalService.open(content, { centered: true }).result.then(( response => {
       if ( response === 'Guardar click' ) {
          if (typeof this.institution_internal_rol_assignmentSelected.id === 'undefined') {
             this.institution_internal_rol_assignmentDataService.post(this.institution_internal_rol_assignmentSelected).then( r => {
                this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                this.getInstitutionPublishers();
             }).catch( e => console.log(e) );
          } else {
             this.institution_internal_rol_assignmentDataService.put(this.institution_internal_rol_assignmentSelected).then( r => {
                this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                this.getInstitutionPublishers();
             }).catch( e => console.log(e) );
          }
       }
    }), ( r => {}));
  }
}
