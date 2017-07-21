import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MemberComponent }   from './member/member.component';
import { WellnesseventComponent }   from './wellnessevent/wellnessevent.component';
import { AdminComponent }   from './admin/admin.component';

import { MemberFormComponent }   from './member-form/member-form.component';
// import { AboutComponent }   from './about/about.component'; // DAB

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wellness Event Tracker';
  // @Input() erroMessage: string;

  // receiveMember(member:object){
  //   console.log("hola")
  //   console.log(member)
  // }
}
