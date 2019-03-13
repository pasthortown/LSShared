import { PublicationAttachment } from './../../models/PublicationAttachment';
import { InstitutionInternalDivition } from './../../models/InstitutionInternalDivition';
import { PublicationComment } from './../../models/PublicationComment';
import { Component, OnInit } from '@angular/core';
import { DocumentSharingService } from 'src/app/services/negocio/DocumentSharing.service';
import { PublicationCommentService } from './../../services/CRUD/publicationcomment.service';
import { saveAs } from 'file-saver/FileSaver';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Author } from './../../models/Author';
import { Publication } from './../../models/Publication';
import { PublicationType } from './../../models/PublicationType';
import { PublicationTypeService } from './../../services/CRUD/publicationtype.service';
import { PublicationService } from './../../services/CRUD/publication.service';
import { AuthorService } from './../../services/CRUD/author.service';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.scss']
})
export class MyPublicationsComponent implements OnInit {
  publicationToBuild: Publication = new Publication();
  publicationToBuildAttachment: PublicationAttachment = new PublicationAttachment();
  publicationsToShow: Array<any> = [];
  institution_internal_divitions_combo: Array<any> = [];
  publicationSelected: any;
  comments: Array<any> = [];
  searchValue = '';
  hasSelected = false;
  selectedInternalInstitucionDivitionId = 0;
  comment: PublicationComment = new PublicationComment();
  authors: Author[] = [];
  authors_publicationSelectedId: number;
  publication_types: PublicationType[] = [];
  institution_internal_divitions: InstitutionInternalDivition[] = [];

  constructor(private documentSharingDataService: DocumentSharingService,
    private toastr: ToastrManager,
    private modalService: NgbModal,
    private authorDataService: AuthorService,
    private publication_typeDataService: PublicationTypeService,
    private publicationDataService: PublicationService,
    private publication_commentDataService: PublicationCommentService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.getInstitutionPublications();
    this.getAuthor();
    this.getPublicationType();
    this.getMyInstitution();
  }

  getMyInstitution() {
    this.documentSharingDataService.myInstitution().then( r => {
      this.institution_internal_divitions = r.institution_internal_divition;
    }).catch( e => {
      console.log(e);
    });
  }

  getAuthor() {
    this.authors = [];
    this.authorDataService.get().then( r => {
       this.authors = r as Author[];
    }).catch( e => console.log(e) );
 }

 getPublicationType() {
  this.publication_types = [];
  this.publication_typeDataService.get().then( r => {
     this.publication_types = r as PublicationType[];
  }).catch( e => console.log(e) );
}

  getInstitutionPublications() {
    this.publicationsToShow = [];
    this.documentSharingDataService.getInstitutionPublications(this.searchValue).then( r => {
      this.publicationsToShow = r;
      this.getInstitutionInternalDivitions();
    }).catch( e => {console.log(e);} );
  }

  filterChangeInternalInstitucionDivition() {
    if (this.selectedInternalInstitucionDivitionId == 0) {
      this.getInstitutionPublications();
    } else {
      const newListToShow = [];
      this.publicationsToShow.forEach(element => {
        if (element.institution_internal_divition.id == this.selectedInternalInstitucionDivitionId){
          newListToShow.push(element);
        }
      });
      this.publicationsToShow = newListToShow;
    }
  }

  searchPublications() {
    this.getInstitutionPublications();
  }

  getInstitutionInternalDivitions() {
    this.institution_internal_divitions_combo = [];
    this.publicationsToShow.forEach(element => {
      let existe = false;
      this.institution_internal_divitions_combo.forEach(toShow => {
        if (toShow.description === element.institution_internal_divition.description) {
          existe = true;
        }
      });
      if (!existe) {
        this.institution_internal_divitions_combo.push(element.institution_internal_divition);
      }
    });
  }

  selectPublication(publication) {
    this.publicationSelected = publication;
    this.publicationToBuild = publication.publication;
    this.hasSelected = true;
    this.getPublicationComments(publication);
  }

  getPublicationComments(publication) {
    this.comments = [];
    this.documentSharingDataService.getPublicationComments(publication.publication.id)
    .then( r => {
        this.comments = r;
    }).catch( e => { console.log(e); });
  }

  downloadPublication(publication_id: number) {
    this.documentSharingDataService.getPublicationAttachmentByPublicationId(publication_id).then( r => {
        this.downloadFile(r.publication_attachment_file, r.publication_attachment_file_type, r.publication_attachment_file_name);
    }).catch( e => {
        console.log(e);
    });
  }

  downloadFile(file: string, type: string, name: string) {
    const byteCharacters = atob(file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: type });
    saveAs(blob, name);
  }

  sendNewComment() {
      this.comment.publication_id = this.publicationSelected.publication.id;
      this.comment.person_id = JSON.parse(sessionStorage.getItem('user')).id;
      this.publication_commentDataService.post(this.comment).then( r => {
        this.toastr.successToastr('Comentario Receptado', 'Nuevo');
        this.getPublicationComments(this.publicationSelected);
        this.comment = new PublicationComment();
      }).catch( e => {
          console.log(e);
      });
  }

  newPublication(content) {
    this.publicationToBuild = new Publication();
    this.publicationToBuildAttachment = new PublicationAttachment();
    this.publicationSelected = null;
    this.hasSelected = false;
    this.authors_publicationSelectedId = 0;
    this.publicationToBuild.publication_type_id = 0;
    this.publicationToBuild.institution_internal_divition_id = 0;
    this.openDialog(content);
  }

  editPublication(content) {
    this.hasSelected = false;
    if ( typeof this.publicationToBuild.authors_on_publication === 'undefined' ) {
       this.publicationToBuild.authors_on_publication = [];
    }
    if (typeof this.publicationToBuild.id === 'undefined') {
       this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
       return;
    }
    this.getAuthorsOnPublication();
    this.authors_publicationSelectedId = 0;
    this.openDialog(content);
  }

  getAuthorsOnPublication() {
    this.publicationToBuild.authors_on_publication = [];
    this.publicationDataService.get(this.publicationToBuild.id).then( r => {
      this.publicationToBuild.authors_on_publication = r.attach[0].authors_on_publication as Author[];
    }).catch( e => console.log(e) );
  }

  CodeFilePublicationAttachment(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
       const file = event.target.files[0];
       reader.readAsDataURL(file);
       reader.onload = () => {
          this.publicationToBuildAttachment.publication_attachment_file_name = file.name;
          this.publicationToBuildAttachment.publication_attachment_file_type = file.type;
          this.publicationToBuildAttachment.publication_attachment_file = reader.result.toString().split(',')[1];
       };
    }
  }

  openDialog(content) {
    this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
       if ( response === 'Guardar click' ) {
          if (typeof this.publicationSelected.id === 'undefined') {
            alert(1);
          } else {
            alert(2);
          }
       }
    }), ( r => {}));
 }
}
