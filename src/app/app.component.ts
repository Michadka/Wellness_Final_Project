import { Component, Input } from '@angular/core';

import { MemberComponent }   from './member/member.component';
import { WellnesseventComponent }   from './wellnessevent/wellnessevent.component';
import { AdminComponent }   from './admin/admin.component';


import { MemberFormComponent }   from './member-form/member-form.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wellness Event Tracker';
  @Input() erroMessage: string;
}
