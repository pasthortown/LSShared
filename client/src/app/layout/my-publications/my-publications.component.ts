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
import { PublicationAttachmentService } from './../../services/CRUD/publicationattachment.service';

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
  newAuthorToAdd: Author = new Author();
  addingAuthor = false;

  constructor(private documentSharingDataService: DocumentSharingService,
    private toastr: ToastrManager,
    private modalService: NgbModal,
    private authorDataService: AuthorService,
    private publication_typeDataService: PublicationTypeService,
    private publicationDataService: PublicationService,
    private publication_attachmentDataService: PublicationAttachmentService,
    private publication_commentDataService: PublicationCommentService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.newAuthorToAdd = new Author();
    this.newAuthorToAdd.id = 0;
    this.addingAuthor = false;
    this.getInstitutionPublications();
    this.getAuthor();
    this.getPublicationType();
    this.getMyInstitution();
  }

  newAuthor() {
    this.addingAuthor = true;
    this.authors_publicationSelectedId = 0;
  }

  addAuthor() {
    if (this.authors_publicationSelectedId === 0) {
      this.toastr.errorToastr('Seleccione un registro.', 'Error');
      return;
    }
    this.authors.forEach(author => {
      if (author.id == this.authors_publicationSelectedId) {
         let existe = false;
         this.publicationToBuild.authors_on_publication.forEach(element => {
            if (element.id == author.id) {
               existe = true;
            }
         });
         if (!existe) {
            this.publicationToBuild.authors_on_publication.push(author);
            this.authors_publicationSelectedId = 0;
         } else {
            this.toastr.errorToastr('El registro ya existe.', 'Error');
         }
      }
    });
  }

  removeAuthor() {
    if (this.authors_publicationSelectedId === 0) {
      this.toastr.errorToastr('Seleccione un registro.', 'Error');
      return;
    }
    const newAuthors: Author[] = [];
    let eliminado = false;
    this.publicationToBuild.authors_on_publication.forEach(author => {
      if (author.id !== this.authors_publicationSelectedId) {
         newAuthors.push(author);
      } else {
         eliminado = true;
      }
    });
    if (!eliminado) {
      this.toastr.errorToastr('Registro no encontrado.', 'Error');
      return;
    }
    this.publicationToBuild.authors_on_publication = newAuthors;
    this.authors_publicationSelectedId = 0;
  }

  selectAuthor(author: Author) {
    this.authors_publicationSelectedId = author.id;
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
      if (this.selectedInternalInstitucionDivitionId != 0) {
        const newListToShow = [];
        this.publicationsToShow.forEach(element => {
          if (element.institution_internal_divition.id == this.selectedInternalInstitucionDivitionId){
            newListToShow.push(element);
          }
        });
        this.publicationsToShow = newListToShow;
      }
    }).catch( e => {console.log(e);} );
  }

  filterChangeInternalInstitucionDivition() {
    this.getInstitutionPublications();
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
  
  downloadPublicationToBuildFile() {
    this.downloadFile(
      this.publicationToBuildAttachment.publication_attachment_file,
      this.publicationToBuildAttachment.publication_attachment_file_type,
      this.publicationToBuildAttachment.publication_attachment_file_name);
  }

  downloadFile(file: any, type: any, name: any) {
    const byteCharacters = atob(file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: type });
    saveAs(blob, name);
  }

  saveNewAuthor() {
    this.authorDataService.post(this.newAuthorToAdd).then( r => {
      this.toastr.successToastr('Autor guardado satisfactoriamente.', 'Nuevo');
      this.getAuthor();
      this.publicationToBuild.authors_on_publication.push(r);
      this.newAuthorToAdd = new Author();
      this.addingAuthor = false;
    }).catch( e => console.log(e) );
  }

  cancelAddingAuthor() {
    this.newAuthorToAdd = new Author();
    this.addingAuthor = false;
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
    this.addingAuthor = false;
    this.openDialog(content);
  }

  editPublication(content) {
    this.hasSelected = false;
    this.addingAuthor = false;
    if ( typeof this.publicationToBuild.authors_on_publication === 'undefined' ) {
       this.publicationToBuild.authors_on_publication = [];
    }
    if (typeof this.publicationToBuild.id === 'undefined') {
       this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
       return;
    }
    this.getAuthorsOnPublication();
    this.getAttachedFileOfPublication(this.publicationToBuild.id);
    this.authors_publicationSelectedId = 0;
    this.openDialog(content);
  }

  getAttachedFileOfPublication(id: number) {
    this.documentSharingDataService.getPublicationAttachmentByPublicationId(id).then( r => {
      this.publicationToBuildAttachment = r;
    }).catch( e => {
        console.log(e);
    });
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
        if (typeof this.publicationToBuild.id === 'undefined') {
          this.publicationDataService.post(this.publicationToBuild).then( r => {
            this.publicationToBuildAttachment.publication_id = r.id;
            this.documentSharingDataService.getPublicationAttachmentByPublicationId(r.id).then( r1 => {
              if (typeof r1.id === 'undefined') {
                this.publication_attachmentDataService.post(this.publicationToBuildAttachment).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.refresh();
                }).catch( e => console.log(e) );
              } else {
                this.publicationToBuildAttachment.id = r1.id;
                this.publication_attachmentDataService.put(this.publicationToBuildAttachment).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.refresh();
                }).catch( e => console.log(e) );
              }
            }).catch( e1 => {
              console.log(e1);
            });
          }).catch( e => console.log(e) );
        } else {
          this.publicationDataService.put(this.publicationToBuild).then( r => {
            this.publicationToBuildAttachment.publication_id = r.id;
            this.documentSharingDataService.getPublicationAttachmentByPublicationId(r.id).then( r1 => {
              if (typeof r1.id === 'undefined') {
                this.publication_attachmentDataService.post(this.publicationToBuildAttachment).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.refresh();
                }).catch( e => console.log(e) );
              } else {
                this.publicationToBuildAttachment.id = r1.id;
                this.publication_attachmentDataService.put(this.publicationToBuildAttachment).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.refresh();
                }).catch( e => console.log(e) );
              }
            }).catch( e => console.log(e) );
          }).catch( e => console.log(e) );
        }
       } else {
         this.refresh();
       }
      }), ( r => {
        this.refresh();
      }));
    }
}
