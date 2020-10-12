import { Component, OnInit } from '@angular/core';
import { NewsCategoryService } from 'app/Services/news-category.service';
import { UploadNews } from 'app/Model/upload';
import { UploadNewsService } from 'app/Services/upload-news.service';

@Component({
  selector: 'app-upload-news',
  templateUrl: './upload-news.component.html',
  styleUrls: ['./upload-news.component.css']
})
export class UploadNewsComponent implements OnInit {
newCategoryList=[];
uploadNews=new UploadNews();
selectedFilesForImage:FileList;
news=[];
  constructor(private newsCategoryService:NewsCategoryService,
    private uploadNewsService:UploadNewsService) { }

  ngOnInit(): void {
    this.newsCategoryService.getAll().valueChanges().subscribe(item=>{
      this.newCategoryList=item;
       console.log(this.newCategoryList);
       // item.forEach(element => {
       //   console.log(element.bn_name);
       // });
       });


       this.uploadNewsService.getAll().valueChanges().subscribe(item=>{
        this.news=item;
         console.log(item);
        
         });
  }
  onSubmit(uploadNews){
    uploadNews.entryDate = new Date().getTime();
    console.log(this.news.length);
    uploadNews.totolNewsLenth= this.news.length;
   this.uploadNewsService.startUpLoad(uploadNews);
  }


  detectFilesForImageUrlFile(event) {
    this.selectedFilesForImage = event.target.files;
    this.uploadNews.imageUrlFile = this.selectedFilesForImage.item(0);
    console.log(this.uploadNews.imageUrlFile);
  }
}
