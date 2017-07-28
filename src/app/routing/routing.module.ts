import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent }   from '../about/about.component'; // DAB
import { SigninComponent }   from '../signin/signin.component'; // DAB
import { AdminEventComponent } from '../admin-event/admin-event.component'; // DAB
import { AdminEventStatusComponent } from '../admin-event-status/admin-event-status.component'; // DAB
import { AdminUserComponent } from '../admin-user/admin-user.component'; // DAB
import { HomeComponent }   from '../home/home.component';
import { MemberComponent }   from '../member/member.component';
import { MemberFormComponent }   from '../member-form/member-form.component';
import { WellnesseventComponent }   from '../wellnessevent/wellnessevent.component';
import { WellnesseventFormComponent }   from '../wellnessevent-form/wellnessevent-form.component';
import { AdminComponent }   from '../admin/admin.component';
import { EventMapComponent }   from '../event-map/event-map.component';
import { FacebookComponent }   from '../facebook/facebook.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'about',  component: AboutComponent }, // DAB
  { path: 'member-form',  component: MemberFormComponent }, // DAB
  { path: 'wellnessevent-form',  component: WellnesseventFormComponent }, // DAB
  { path: 'signin',  component: SigninComponent }, // DAB
  { path: 'admin-event',  component: AdminEventComponent }, // DAB
  { path: 'admin-event-status',  component: AdminEventStatusComponent }, // DAB
  { path: 'home',  component: HomeComponent },
  { path: 'member',  component: MemberComponent },
  { path: 'member/edit', component: MemberFormComponent },
  { path: 'member/add', component: MemberFormComponent },
  { path: 'wellnessevent',  component: WellnesseventComponent },
  // { path: 'wellnessevent-form/:id',  component: WellnesseventFormComponent },
  { path: 'admin-event/wellnessevent/edit/:id', component: WellnesseventFormComponent }, // DAB
  { path: 'admin-event/adminuser/display/:id/:name', component: AdminUserComponent }, // DAB
  { path: 'admin-event-status/adminuser/display/:id/:name', component: AdminUserComponent }, // DAB
  { path: 'wellnessevent/add', component: WellnesseventFormComponent },
  { path: 'admin',  component: AdminComponent },
  { path: 'eventmap',  component: EventMapComponent },
  { path: 'eventmap/:id',  component: EventMapComponent },
  { path: 'facebook',  component: FacebookComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}