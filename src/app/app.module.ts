import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
    AdminUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }