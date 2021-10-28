import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';

import { HomeComponent } from './components/home/home.component';

import { SignUpComponent } from './examples/sign-up/sign-up.component';
import { SomogroDeshComponent } from './components/somogro-desh/somogro-desh.component';
import { UploadNewsComponent } from './components/upload-news/upload-news.component';
import { SingleNewsDetailsComponent } from './components/single-news-details/single-news-details.component';

const routes: Routes =[
    { path: '', redirectTo: 'home/Angular', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/login',       component: LoginComponent },
    { path: 'examples/login',       component: LoginComponent },
    { path: 'examples/sign-up',     component: SignUpComponent },

    { path: 'home/:id',     component: HomeComponent },
     { path: 'somogroDesh',     component: SomogroDeshComponent },

    { path: 'Answer/:id/:a',     component: SingleNewsDetailsComponent },
    { path: 'uploadNews',     component: UploadNewsComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
