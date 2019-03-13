import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';

@Injectable({
   providedIn: 'root'
})
export class DocumentSharingService {

   url = environment.api;
   options = new RequestOptions();

   constructor(private http: Http, private router: Router) {
      this.options.headers = new Headers();
      this.options.headers.append('api_token', sessionStorage.getItem('api_token'));
   }

   /*sharedWithMe(): Promise<any> {
      return this.http.get(this.url + 'shared_with_me', this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json()); });
   }

   writtenByMe(): Promise<any> {
      return this.http.get(this.url + 'written_by_me', this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json()); });
   }

   myUniversities(): Promise<any> {
      return this.http.get(this.url + 'my_universities', this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json()); });
   }

   getUniversityPublishedPapers(university_id: number): Promise<any> {
      const data = {university_id: university_id};
      return this.http.post(this.url + 'get_university_published_papers', JSON.stringify(data), this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json()); });
   }

   getUniversityPeople(university_id: number): Promise<any> {
      const data = {university_id: university_id};
      return this.http.post(this.url + 'get_university_people', JSON.stringify(data), this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json()); });
   }

   getPaperSharingData(paper_id: number): Promise<any> {
      const data = {paper_id: paper_id};
      return this.http.post(this.url + 'get_paper_sharing_data', JSON.stringify(data), this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json()); });
   }
*/

   getPersonUser() {
      return this.http.get(this.url + 'person_user', this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json());  });
   }

   publicationsFiltered(size: number, page: number, institution_internal_divition_id: number, filter: string): Promise<any> {
      const data = {
         size: size,
         institution_internal_divition_id: institution_internal_divition_id,
         filter: filter
      };
      return this.http.post(this.url + 'publications_filtered' + '?page=' + page.toString(), JSON.stringify(data), this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json());  });
   }

   getPublicationAttachmentByPublicationId(publication_id: number): Promise<any> {
      return this.http.post(this.url + 'get_publication_attachment_by_publication_id'
      , JSON.stringify({publication_id: publication_id})
      , this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json()); });
   }

   getPublicationComments(publication_id: number): Promise<any> {
      return this.http.post(this.url + 'get_publication_comments'
      , JSON.stringify({publication_id: publication_id})
      , this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json()); });
   }

   getInstitutionPublications(filter: string): Promise<any> {
      const data = {filter: filter};
      return this.http.post(this.url + 'get_institution_publications'
      , JSON.stringify(data), this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json()); });
   }

   myInstitution(): Promise<any> {
      return this.http.get(this.url + 'my_institution'
      , this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json()); });
   }

   getInstitutionPublishers(): Promise<any> {
      return this.http.get(this.url + 'get_institution_publishers'
      , this.options).toPromise()
      .then( r => {
         return r.json();
      }).catch( error => { this.handledError(error.json()); });
   }

   handledError(error: any) {
      console.log(error);
      sessionStorage.clear();
      this.router.navigate(['/login']);
   }
}