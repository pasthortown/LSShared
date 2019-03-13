import { Institution } from 'src/app/models/Institution';
import { InstitutionInternalRol } from './../../../../../../models/InstitutionInternalRol';
import { DocumentSharingService } from './../../../../../../services/negocio/DocumentSharing.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { InstitutionInternalRolService } from './../../../../../../services/CRUD/institutioninternalrol.service';

@Component({
  selector: 'app-rols',
  templateUrl: './rols.component.html',
  styleUrls: ['./rols.component.scss']
})
export class RolsComponent implements OnInit {
  institution_internal_rols: Array<any> = [];
  institution: Institution = new Institution();
  institution_internal_rolSelected: InstitutionInternalRol = new InstitutionInternalRol();

  constructor(private modalService: NgbModal,
    private toastr: ToastrManager,
    private institution_internal_rolDataService: InstitutionInternalRolService,
    private documentSharingDataService: DocumentSharingService) { }

  ngOnInit() {
    this.refresh();
  }

  selectInstitutionInternalRol(institution_internal_rol: InstitutionInternalRol) {
    this.institution_internal_rolSelected = institution_internal_rol;
  }

  refresh() {
    this.getMyInstitution();
  }

  getMyInstitution() {
    this.documentSharingDataService.myInstitution().then( r => {
      this.institution_internal_rols = r.institution_internal_rols;
      this.institution = r.institution;
    }).catch( e => {
      console.log(e);
    });
  }

  newInstitutionInternalRol(content) {
    this.institution_internal_rolSelected = new InstitutionInternalRol();
    this.institution_internal_rolSelected.institution_id = this.institution.id;
    this.openDialog(content);
  }

 editInstitutionInternalRol(content) {
    if (typeof this.institution_internal_rolSelected.id === 'undefined') {
       this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
       return;
    }
    this.openDialog(content);
 }

 deleteInstitutionInternalRol() {
    if (typeof this.institution_internal_rolSelected.id === 'undefined') {
       this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
       return;
    }
    this.institution_internal_rolDataService.delete(this.institution_internal_rolSelected.id).then( r => {
       this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
       this.getMyInstitution();
    }).catch( e => console.log(e) );
 }

 openDialog(content) {
  this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
     if ( response === 'Guardar click' ) {
        if (typeof this.institution_internal_rolSelected.id === 'undefined') {
           this.institution_internal_rolDataService.post(this.institution_internal_rolSelected).then( r => {
              this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
              this.getMyInstitution();
           }).catch( e => console.log(e) );
        } else {
           this.institution_internal_rolDataService.put(this.institution_internal_rolSelected).then( r => {
              this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
              this.getMyInstitution();
           }).catch( e => console.log(e) );
        }
     }
    }), ( r => {}));
  }
}
