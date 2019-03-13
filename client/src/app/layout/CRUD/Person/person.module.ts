import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';
import { PersonService } from './../../../services/CRUD/person.service';
import { environment } from 'src/environments/environment';
import { UserService } from './../../../services/profile/user.service';

@NgModule({
   imports: [CommonModule,
             PersonRoutingModule,
             FormsModule],
   declarations: [PersonComponent],
   providers: [NgbModal,
               UserService,
               PersonService
               ]
})
export class PersonModule {}