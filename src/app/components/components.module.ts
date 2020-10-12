import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { BasicelementsComponent } from './basicelements/basicelements.component';
import { NavigationComponent } from './navigation/navigation.component';


import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';
import { NgbdModalBasic } from './modal/modal.component';
import { HomeComponent } from './home/home.component';


import { SomogroDeshComponent } from './somogro-desh/somogro-desh.component';
import { UploadNewsComponent } from './upload-news/upload-news.component';
import { SingleNewsDetailsComponent } from './single-news-details/single-news-details.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module
      ],
    declarations: [
        ComponentsComponent,
        BasicelementsComponent,
        NavigationComponent,
   
        NotificationComponent,
        NgbdModalBasic,
        HomeComponent,
        SomogroDeshComponent,
        UploadNewsComponent,
        SingleNewsDetailsComponent
    ],
    exports:[ ComponentsComponent ]
})
export class ComponentsModule { }
