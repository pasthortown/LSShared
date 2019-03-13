import { DocumentSharingService } from './../services/negocio/DocumentSharing.service';
import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { InstitutionService } from './../services/CRUD/institution.service';
import { Institution } from './../models/Institution';
import { InstitutionLogoService } from './../services/CRUD/institutionlogo.service';
import { InstitutionLogo } from './../models/InstitutionLogo';
import { PublicationService } from './../services/CRUD/publication.service';
import { Publication } from './../models/Publication';
import { AuthorService } from './../services/CRUD/author.service';
import { Author } from './../models/Author';
import { PublicationTypeService } from './../services/CRUD/publicationtype.service';
import { PublicationType } from './../models/PublicationType';
import { InstitutionInternalDivitionService } from './../services/CRUD/institutioninternaldivition.service';
import { InstitutionInternalDivition } from './../models/InstitutionInternalDivition';
import { PublicationAttachmentService } from './../services/CRUD/publicationattachment.service';
import { PublicationAttachment } from './../models/PublicationAttachment';
import { saveAs } from 'file-saver/FileSaver';
import { PublicationCommentService } from './../services/CRUD/publicationcomment.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  sliders: Array<any> = [];
  publicationsToShow: Array<any> = [];
  comments: Array<any> = [];
  institutions: Institution[] = [];
  institution_logos: InstitutionLogo[] = [];
  publications: Publication[] = [];
  publicationSelected: any;
  authors: Author[] = [];
  publication_types: PublicationType[] = [];
  institution_internal_divitions: InstitutionInternalDivition[] = [];
  institution_internal_divitions_combo: InstitutionInternalDivition[] = [];
  publication_attachments: PublicationAttachment[] = [];
  currentPage = 1;
  lastPage = 1;
  selectedInternalInstitucionDivitionId = 0;
  recordsByPage = 10;
  hasSelected = false;
  selectedInstitucionId = 0;
  searchValue = '';

  constructor(
    private toastr: ToastrManager,
    private institution_logoDataService: InstitutionLogoService,
    private institutionDataService: InstitutionService,
    private authorDataService: AuthorService,
    private publication_attachmentDataService: PublicationAttachmentService,
    private publication_typeDataService: PublicationTypeService,
    private institution_internal_divitionDataService: InstitutionInternalDivitionService,
    private publicationDataService: PublicationService,
    private publication_commentDataService: PublicationCommentService,
    private documentSharingDataService: DocumentSharingService
  ) {
    this.publicationSelected = null;
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.getInstitutions();
    this.getInstitutionLogos();
  }

  getInstitutions() {
    this.institutions = [];
    this.institutionDataService
      .get()
      .then(r => {
        this.institutions = r as Institution[];
      })
      .catch(e => console.log(e));
  }

  getInstitutionLogos() {
    this.institution_logos = [];
    this.sliders = [];
    this.institution_logoDataService
      .get()
      .then(r => {
        this.institution_logos = r as InstitutionLogo[];
        this.institutions.forEach(institution => {
          this.institution_logos.forEach(logo => {
            if (logo.institution_id === institution.id) {
              const newSlide = {
                institution: institution,
                logo: logo,
                style: 'elegant' + (institution.id % 6).toString()
              };
              this.sliders.push(newSlide);
            }
          });
        });
        this.getInstitutionInternalDivition();
      })
      .catch(e => console.log(e));
  }

  searchPublications() {
    this.goToPage(1, this.selectedInternalInstitucionDivitionId, this.searchValue);
  }

  filterChangeInstitution() {
    this.institution_internal_divitions_combo = [];
    if (this.selectedInstitucionId == 0) {
      this.institution_internal_divitions.forEach(institution_internal_divition => {
        this.institution_internal_divitions_combo.push(institution_internal_divition);
      });
      this.selectedInternalInstitucionDivitionId = 0;
      this.goToPage(1, this.selectedInternalInstitucionDivitionId, this.searchValue);
      return;
    }
    this.institution_internal_divitions.forEach(institution_internal_divition => {
      if (institution_internal_divition.institution_id == this.selectedInstitucionId) {
        this.institution_internal_divitions_combo.push(institution_internal_divition);
      }
    });
    this.selectedInternalInstitucionDivitionId = 0;
    this.publicationsToShow = [];
  }

  filterChangeInternalInstitucionDivition() {
    if(this.selectedInternalInstitucionDivitionId != 0) {
      this.goToPage(1, this.selectedInternalInstitucionDivitionId, this.searchValue);
    } else {
      this.publicationsToShow = [];
    }
  }

  selectPublication(publication) {
    this.publicationSelected = publication;
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

  getAuthor() {
    this.authors = [];
    this.authorDataService
      .get()
      .then(r => {
        this.authors = r as Author[];
        this.goToPage(1, 0, '');
      })
      .catch(e => console.log(e));
  }

  getAuthorsOnPublication() {
    this.publicationSelected.authors_on_publication = [];
    this.publicationDataService
      .get(this.publicationSelected.id)
      .then(r => {
        this.publicationSelected.authors_on_publication = r.attach[0]
          .authors_on_publication as Author[];
      })
      .catch(e => console.log(e));
  }

  getPublicationType() {
    this.publication_types = [];
    this.publication_typeDataService
      .get()
      .then(r => {
        this.publication_types = r as PublicationType[];
        this.getAuthor();
      })
      .catch(e => console.log(e));
  }

  getInstitutionInternalDivition() {
    this.institution_internal_divitions = [];
    this.institution_internal_divitions_combo = [];
    this.institution_internal_divitionDataService
      .get()
      .then(r => {
        this.institution_internal_divitions = r as InstitutionInternalDivition[];
        this.institution_internal_divitions_combo = r as InstitutionInternalDivition[];
        this.getPublicationType();
      })
      .catch(e => console.log(e));
  }

  goToPage(page: number, institution_internal_divition_id: number, filter: string) {
    this.hasSelected = false;
    if (page < 1 || page > this.lastPage) {
      this.toastr.errorToastr('La página solicitada no existe.', 'Error');
      return;
    }
    this.currentPage = page;
    this.getPublications(institution_internal_divition_id, filter);
  }

  getPublications(institution_internal_divition_id: number, filter: string) {
    this.publications = [];
    this.publicationsToShow = [];
    this.publicationSelected = new Publication();
    this.documentSharingDataService
      .publicationsFiltered(this.recordsByPage, this.currentPage, institution_internal_divition_id, filter)
      .then(r => {
        this.publications = r.data as Publication[];
        this.lastPage = r.last_page;
        this.publications.forEach(publication => {
          this.publicationDataService
            .get(publication.id)
            .then(response => {
              publication.authors_on_publication = response.attach[0]
                .authors_on_publication as Author[];
              let publicationTypeToAdd = new PublicationType();
              this.publication_types.forEach(publicationType => {
                if (publicationType.id === publication.publication_type_id) {
                  publicationTypeToAdd = publicationType;
                }
              });
              let publicationInstitutionInternalDivitionToAdd = new InstitutionInternalDivition();
              this.institution_internal_divitions.forEach(
                institutionInternalDivition => {
                  if (
                    institutionInternalDivition.id ===
                    publication.institution_internal_divition_id
                  ) {
                    publicationInstitutionInternalDivitionToAdd = institutionInternalDivition;
                  }
                }
              );
              let publicationInstitutionToAdd = new Institution();
              this.institutions.forEach(institution => {
                if (
                  institution.id ===
                  publicationInstitutionInternalDivitionToAdd.institution_id
                ) {
                  publicationInstitutionToAdd = institution;
                }
              });
              const newPublication = {
                publication: publication,
                publicationInstitution: publicationInstitutionToAdd,
                publicationInstitutionInternalDivition: publicationInstitutionInternalDivitionToAdd,
                publicationType: publicationTypeToAdd
              };
              this.publicationsToShow.push(newPublication);
            })
            .catch(e => console.log(e));
        });
      })
      .catch(e => console.log(e));
  }

  getPublicationAttachment() {
    this.publication_attachments = [];
    this.publication_attachmentDataService
      .get()
      .then(r => {
        this.publication_attachments = r.data as PublicationAttachment[];
      })
      .catch(e => console.log(e));
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
}
