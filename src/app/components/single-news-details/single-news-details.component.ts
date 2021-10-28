import { Component, OnInit, ElementRef, OnDestroy, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Questions } from 'app/Model/questions';
import { UploadNews } from 'app/Model/upload';
import { UploadNewsService } from 'app/Services/upload-news.service';

@Component({
  selector: 'app-single-news-details',
  templateUrl: './single-news-details.component.html',
  styleUrls: ['./single-news-details.component.css']
})
export class SingleNewsDetailsComponent implements OnInit,PipeTransform {
  questions =new Questions();
  key;
  sideTrendingQ=[];
  items=[];
  isYoutubeLink:boolean;
  newsDetailsByEntryDate=new UploadNews();
  constructor( private element : ElementRef,
    private route:ActivatedRoute,
    private uploadNewsService:UploadNewsService,
    protected sanitizer: DomSanitizer) {
    
    console.log(this.key );
    this.route.params.subscribe(routeParams => {
      this.key = this.route.snapshot.paramMap.get('id');
      
      this.items=[];
    this.uploadNewsService.getAll('Questions').valueChanges().subscribe(i=>{
      console.log(i)

          for (let p in i) {
            let item = i[p];
           this.items.push(({ 
              ...item,key:p}));  
            }
            
            this.questions=this.items.find(f=>f.key==this.key);
            this.sideTrendingQ=this.items.filter(f=>f.qCatagory==this.questions.qCatagory);
       this.uploadNewsService.getAllList('Answers').valueChanges().subscribe(ans=>{
        let items=[];
        for (let p in ans) {
          let item = ans[p];

          console.log(p); 
      
          items.push(({ 
                ...item, key: p }));  
                console.log(items);    
        }
                console.log(ans);
               
                this.questions.Answers=items.filter(f=>f.qToken==this.questions.token);
              //   this.questions.Answers.forEach(qaElm => {
              //    this.transform(qaElm.answerDetails);
              //  });
                console.log(this.questions) 
           });
           
           });

          });
   }

  ngOnInit() {
    let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

  navbar.classList.remove('navbar-transparent');

 
}
transform(value) {
  // console.log(value);
  // value=this.ans.answerDetails;
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
ngOnDestroy(){
    let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

}

}
