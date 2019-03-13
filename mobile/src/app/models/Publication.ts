import { Author } from './Author';

export class Publication {
   id: number;
   title: String;
   abstract: String;
   written_date: Date;
   published_date: Date;
   keywords: String;
   authors_on_publication: Author[];
   publication_type_id: number;
   institution_internal_divition_id: number;
   constructor() {
      this.authors_on_publication = [];
   }
}