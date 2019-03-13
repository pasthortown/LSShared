import { InstitutionInternalDivition } from './../../../../../../models/InstitutionInternalDivition';
import { DocumentSharingService } from './../../../../../../services/negocio/DocumentSharing.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { InstitutionInternalDivitionService } from './../../../../../../services/CRUD/institutioninternaldivition.service';
import { Institution } from 'src/app/models/Institution';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  institution_internal_divitions: Array<any> = [];
  institution = new Institution();
  institution_internal_divitionSelected: InstitutionInternalDivition = new InstitutionInternalDivition();

  constructor(private modalService: NgbModal,
    private toastr: ToastrManager,
    private institution_internal_divitionDataService: InstitutionInternalDivitionService,
    private documentSharingDataService: DocumentSharingService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.getMyInstitution();
  }

  getMyInstitution() {
    this.documentSharingDataService.myInstitution().then( r => {
      this.institution = r.institution;
      this.institution_internal_divitions = r.institution_internal_divition;
    }).catch( e => {
      console.log(e);
    });
  }

  selectInstitutionInternalDivition(institutionInternalDivition) {
    this.institution_internal_divitionSelected = institutionInternalDivition;
  }

  newInstitutionInternalDivition(content) {
    this.institution_internal_divitionSelected = new InstitutionInternalDivition();
    this.institution_internal_divitionSelected.institution_id = this.institution.id;
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
       this.getMyInstitution();
    }).catch( e => console.log(e) );
  }

  openDialog(content) {
    this.modalService.open(content, { centered: true }).result.then(( response => {
       if ( response === 'Guardar click' ) {
          if (typeof this.institution_internal_divitionSelected.id === 'undefined') {
             this.institution_internal_divitionDataService.post(this.institution_internal_divitionSelected).then( r => {
                this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                this.getMyInstitution();
             }).catch( e => console.log(e) );
          } else {
             this.institution_internal_divitionDataService.put(this.institution_internal_divitionSelected).then( r => {
                this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                this.getMyInstitution();
             }).catch( e => console.log(e) );
          }
       }
    }), ( r => {}));
  }
}
