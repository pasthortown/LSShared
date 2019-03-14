import { DocumentSharingService } from './../../../../services/negocio/DocumentSharing.service';
import { Component, OnInit } from '@angular/core';
import { InstitutionLogo } from './../../../../models/InstitutionLogo';
import { Institution } from './../../../../models/Institution';
import { InstitutionLogoService } from './../../../../services/CRUD/institutionlogo.service';
import { InstitutionService } from './../../../../services/CRUD/institution.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-institution-profile',
  templateUrl: './institution-profile.component.html',
  styleUrls: ['./institution-profile.component.scss']
})
export class InstitutionProfileComponent implements OnInit {
  institutionSelected: Institution = new Institution();
  institution_logoSelected: InstitutionLogo = new InstitutionLogo();

  constructor(
    private toastr: ToastrManager,
    private documentSharingDataService: DocumentSharingService,
    private institutionDataService: InstitutionService,
    private institution_logoDataService: InstitutionLogoService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.getMyInstitution();
  }

  address_mapEvent(event) {
    this.institutionSelected.address_map_latitude = event.coords.lat;
    this.institutionSelected.address_map_longitude = event.coords.lng;
  }

  getMyInstitution() {
    this.documentSharingDataService.myInstitution().then( r => {
      this.institutionSelected = r.institution as Institution;
      this.institution_logoSelected = r.institution_logo as InstitutionLogo;
    }).catch( e => {
      console.log(e);
    });
  }

  guardar() {
    this.institutionDataService.put(this.institutionSelected).then( r => {
      this.actualizarLogo();
      this.toastr.successToastr('Cambios Guardados Satisfactoriamente', 'Actualizar');
    }).catch( e => console.log(e) );
  }

  actualizarLogo() {
    this.institution_logoDataService.put(this.institution_logoSelected).then( r => {
      this.refresh();
    }).catch( e => console.log(e) );
  }

  cancelar() {
    this.toastr.warningToastr('Cambios Descartados', 'Cancelar');
    this.refresh();
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
}
