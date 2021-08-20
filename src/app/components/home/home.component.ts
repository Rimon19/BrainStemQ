import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import * as Rellax from 'rellax';
import { DistricsService } from 'app/Services/districs.service';
import { DivisionService } from 'app/Services/division.service';
import { UploadNewsService } from 'app/Services/upload-news.service';
import { UploadNews } from 'app/Model/upload';
import { ActivatedRoute } from '@angular/router';
//import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Questions } from 'app/Model/questions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{
 
  Questions:Questions[]=[];
  items:Questions[]=[];
  filteredItems:Questions[]=[];
  sideTrendingNews:UploadNews[]=[];
  category;
  isHomeAndSomeExtraShow=true;
  latestNews=new UploadNews();
  subNews=new UploadNews();
  SubSubNews=new UploadNews();
  query;
 // public vedio1: SafeResourceUrl;
  //public videoURL: string;
    constructor(
    //  private element : ElementRef,
      private uploadNewsService:UploadNewsService,
      private route:ActivatedRoute,
     //  private _sanitizer: DomSanitizer
        ) { 
     //  this.videoURL='https://www.youtube.com/embed/1ozGKlOzEVc';
     //   this.vedio1 = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);

        this.route.params.subscribe(routeParams => {
          this.category = this.route.snapshot.paramMap.get('id');

        this.items=[] ;
        this.uploadNewsService.getAll('Questions').valueChanges().subscribe(i=>{

          for (let p in i) {
            let item = i[p];
           this. items.push(({ 
              ...item,key:p}));  
            }
           
            //this.Questions=this.items.filter(f=>f.qCatagory==this.category);
            this.filteredItems=this.items.filter(f=>f.qCatagory==this.category);
        
      //  this.uploadNewsService.getAllList('Answers').valueChanges().subscribe(ans=>{
      //   let items=[];
      //   for (let p in ans) {
      //     let item = ans[p];

      //     console.log(p); 
      
      //     items.push(({ 
      //           ...item, key: p }));  
      //           console.log(items);    
      //   }
      //           console.log(ans);
      //           this.Questions.forEach(element => {
      //             element.Answers=items.filter(f=>f.qToken==element.token);
      //           });
      //           console.log(this.Questions) 
      //      });
           
           });
      });
    
      }

    ngOnInit() {
     
      let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

    navbar.classList.remove('navbar-transparent');
  }
  filterQs(query:string){
    let filterQ = (query) ?
    this.items.filter(p => p.questions
    .toLowerCase()
    .includes(query.toLowerCase())) :
    this.items;      
     this.filteredItems=filterQ;
    console.log(this.filteredItems);
  }
  ngOnDestroy(){
      let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

  }
  
}
