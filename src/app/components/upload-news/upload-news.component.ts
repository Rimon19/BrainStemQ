import { Component, OnInit, PipeTransform } from '@angular/core';
import { NewsCategoryService } from 'app/Services/news-category.service';
import { UploadNews } from 'app/Model/upload';
import { UploadNewsService } from 'app/Services/upload-news.service';
import { Questions } from 'app/Model/questions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-news',
  templateUrl: './upload-news.component.html',
  styleUrls: ['./upload-news.component.css']
})
export class UploadNewsComponent implements OnInit, PipeTransform   {
  
  


newCategoryList=[];
uploadNews=new Questions();
selectedFilesForImage:FileList;
news=[];
  constructor(private newsCategoryService:NewsCategoryService,
    private uploadNewsService:UploadNewsService,
    protected sanitizer: DomSanitizer) { }
    transform(value) {
      
      return this.sanitizer.bypassSecurityTrustHtml(value);
    }
  ngOnInit(): void {
    this.newsCategoryService.getAll().valueChanges().subscribe(item=>{
      this.newCategoryList=item;
       console.log(this.newCategoryList);
       // item.forEach(element => {
       //   console.log(element.bn_name);
       // });
       });

      
      //  this.uploadNewsService.getAll().valueChanges().subscribe(item=>{
      //   this.news=item;
      //    console.log(item);
        
      //    });
  }
  readyQuirePrerams(value:string){
         console.log(value)
         var new_string = value.replace(/-|\s/g,"-").trim();
         console.log(new_string)
         this.uploadNews.queryParams=new_string;
  }
  onSubmit(qObject){
    qObject.qEntryDate = new Date().getTime();
    qObject.isViewd =false;
    qObject.ViewCount =0;
    qObject.qBy ='Admin';
    console.log(qObject);
    
   
      if(qObject.imageUrlFile!=null){
        this.uploadNewsService.startUpLoad(qObject,'Questions');
      } else{
       this.uploadNewsService.add(qObject,'Questions').then(t=>{
           console.log(t);
           alert('Saved')
         }).catch(c=>{console.log(c)});

      }
  }

  genarateToken(question){
    this.uploadNewsService.add(question,'Token').then(t=>{
      console.log(t.key);
      this.uploadNews.token=t.key;
    });
  }
  detectFilesForImageUrlFile(event) {
    this.selectedFilesForImage = event.target.files;
    this.uploadNews.imageUrlFile = this.selectedFilesForImage.item(0);
    console.log(this.uploadNews.imageUrlFile);
  }
}
