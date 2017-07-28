import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { WellnesseventComponent } from './wellnessevent/wellnessevent.component';
import { HomeComponent } from './home/home.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { WellnesseventFormComponent } from './wellnessevent-form/wellnessevent-form.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './routing/routing.module';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { DataService } from './data.service';
import { SigninComponent } from './signin/signin.component';
import { AboutComponent } from './about/about.component';
import { AdminEventComponent } from './admin-event/admin-event.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { FacebookComponent } from './facebook/facebook.component';
import { AgmCoreModule } from '@agm/core';
import { EventMapComponent } from './event-map/event-map.component';
import { DataTablesModule } from 'angular-datatables';
import { AdminEventStatusComponent } from './admin-event-status/admin-event-status.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    WellnesseventComponent,
    HomeComponent,
    MemberFormComponent,
    WellnesseventFormComponent,
    NavigationComponent,
    FooterComponent,
    DeleteConfirmComponent,
    AdminComponent,
    SigninComponent,
    AboutComponent,
    AdminEventComponent,
    AdminUserComponent,
    FacebookComponent,
    EventMapComponent,
    AdminEventStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    DataTablesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDw_wrt-dI7J184tbMmfI6h6kJsAXxLN7w'
    }),
    ChartsModule
  ],
  entryComponents: [DeleteConfirmComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
