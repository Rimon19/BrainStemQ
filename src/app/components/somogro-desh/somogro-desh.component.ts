import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UploadNews } from 'app/Model/upload';
import { DistricsService } from 'app/Services/districs.service';
import { DivisionService } from 'app/Services/division.service';
import { UploadNewsService } from 'app/Services/upload-news.service';

@Component({
  selector: 'app-somogro-desh',
  templateUrl: './somogro-desh.component.html',
  styleUrls: ['./somogro-desh.component.css']
})
export class SomogroDeshComponent implements OnInit {
districList=[];
divisionList=[];
searchDistricListByDivision=[];
divisionId='';

news:UploadNews[]=[];
sideTrendingNews:UploadNews[]=[];
category;
isHomeAndSomeExtraShow=true;
latestNews=new UploadNews();
subNews=new UploadNews();
SubSubNews=new UploadNews();

public vedio1: SafeResourceUrl;
public videoURL: string;

  constructor( private districsService:DistricsService,
      private divisionService:DivisionService,
      private element : ElementRef,
      private uploadNewsService:UploadNewsService,
      private route:ActivatedRoute,
       private _sanitizer: DomSanitizer ) { 
        this.videoURL='https://www.youtube.com/embed/1ozGKlOzEVc';
        this.vedio1 = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);

       }

  ngOnInit(): void {
    this.districsService.getAll().valueChanges().subscribe(item=>{
         this.districList=item;
          console.log(this.districList);
          // item.forEach(element => {
          //   console.log(element.bn_name);
          // });
          });

          this.divisionService.getAll().valueChanges().subscribe(item=>{
            this.divisionList=item;
            console.log(this.divisionList);
            // item.forEach(element => {
            //   console.log(element.bn_name);
            // });
            });
  }
  onChangeDivision(divisionId){
console.log(divisionId);
console.log(this.districList);
this.searchDistricListByDivision=this.districList.filter(f=>f.division_id==divisionId);

  }

  onSearch(){
    this.uploadNewsService.getAll().valueChanges().subscribe(item=>{
      this.news=item.filter(f=>f.category=='জাতীয়');
        console.log(this.news);
      //  this.news.sort((b, a) => new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime());
      this.latestNews= this.news.pop();
   
       console.log(this.latestNews);
       console.log(this.news);
       this.subNews=this.news.pop();
       this.SubSubNews=this.news.pop();
    
      this.sideTrendingNews= this.news.slice(1).slice(-4);

       });
  }
}
