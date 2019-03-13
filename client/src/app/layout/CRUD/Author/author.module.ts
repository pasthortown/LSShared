import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author.component';
import { AuthorService } from './../../../services/CRUD/author.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             AuthorRoutingModule,
             FormsModule],
   declarations: [AuthorComponent],
   providers: [NgbModal,
               AuthorService
               ]
})
export class AuthorModule {}