import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import * as Rellax from 'rellax';
import { DistricsService } from 'app/Services/districs.service';
import { DivisionService } from 'app/Services/division.service';
import { UploadNewsService } from 'app/Services/upload-news.service';
import { UploadNews } from 'app/Model/upload';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{
 
  news:UploadNews[]=[];
  sideTrendingNews:UploadNews[]=[];
  category;
  isHomeAndSomeExtraShow=true;
  latestNews=new UploadNews();
  subNews=new UploadNews();
  SubSubNews=new UploadNews();
 
  public vedio1: SafeResourceUrl;
  public videoURL: string;
    constructor(private element : ElementRef,
      private uploadNewsService:UploadNewsService,
      private route:ActivatedRoute,
       private _sanitizer: DomSanitizer ) { 
       this.videoURL='https://www.youtube.com/embed/1ozGKlOzEVc';
        this.vedio1 = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);

        this.route.params.subscribe(routeParams => {
          this.category = this.route.snapshot.paramMap.get('id');
          if(this.category=='home'){
           this.isHomeAndSomeExtraShow=true;
          }else{
            this.isHomeAndSomeExtraShow=false;
          }
        console.log(this.category);
        this.uploadNewsService.getAll().valueChanges().subscribe(item=>{
          this.news=item.filter(f=>f.category==this.category);
            console.log(this.news);
          //  this.news.sort((b, a) => new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime());
          this.latestNews= this.news.pop();
       
           console.log(this.latestNews);
           console.log(this.news);
           this.subNews=this.news.pop();
           this.SubSubNews=this.news.pop();
        
          this.sideTrendingNews= this.news.slice(1).slice(-4);
  
           });
      });
    
      }

    ngOnInit() {
     
      let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

    navbar.classList.remove('navbar-transparent');
  }

  ngOnDestroy(){
      let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

  }
  loadSingleNewsDetails(n){
    console.log(n);
  }
}
