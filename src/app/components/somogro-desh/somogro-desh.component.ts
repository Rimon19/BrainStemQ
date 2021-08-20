import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Answers } from 'app/Model/answers';
import { Questions } from 'app/Model/questions';
import { UploadNews } from 'app/Model/upload';
import { DistricsService } from 'app/Services/districs.service';
import { DivisionService } from 'app/Services/division.service';
import { UploadNewsService } from 'app/Services/upload-news.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-somogro-desh',
  templateUrl: './somogro-desh.component.html',
  styleUrls: ['./somogro-desh.component.css']
})
export class SomogroDeshComponent implements OnInit {


answer=new Answers();
selectedFilesForImage:FileList;

public vedio1: SafeResourceUrl;
public videoURL: string;
filteredItem:any[];
  items: Questions[] = [];
  constructor(
    // private districsService:DistricsService,
     // private divisionService:DivisionService,
     // private element : ElementRef,
      private uploadNewsService:UploadNewsService,
      private route:ActivatedRoute,
   //    private _sanitizer: DomSanitizer 
  ) { 
      //  this.videoURL='https://www.youtube.com/embed/1ozGKlOzEVc';
      //  this.vedio1 = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
    //  this.itemsMap = itemsMap || {};
       }

  ngOnInit(): void {
    // this.districsService.getAll().valueChanges().subscribe(item=>{
    //      this.districList=item;
    //       console.log(this.districList);
    //       // item.forEach(element => {
    //       //   console.log(element.bn_name);
    //       // });
    //       });

    // let a=  this.uploadNewsService.getAll('Questions').snapshotChanges()
    //       .pipe(
    //         map((products: any[]) => products.map(prod => {
    //           const payload = prod.payload.val();
    //           console.log(payload);
    //           const key = prod.key;
    //           return <any>{ key, ...payload };
    //         }).values),
    //       );

        //  a.subscribe(s=>{console.log(s)})
        // console.log(a.);   
        
        this.uploadNewsService.getAll('Questions').valueChanges().subscribe(s=>{
          console.log(s);
         
          for (let productId in s) {
            let item = s[productId];

            console.log(productId); 
        
                this.items.push(({ 
                  ...item, key: productId }));  
                  console.log(this.items);    
          }

        });
  }
//   onChangeDivision(divisionId){
// console.log(divisionId);
// console.log(this.districList);
// this.searchDistricListByDivision=this.districList.filter(f=>f.division_id==divisionId);

//   }

  // onSearch(){
  //   this.uploadNewsService.getAll().valueChanges().subscribe(item=>{
  //     this.news=item.filter(f=>f.category=='জাতীয়');
  //       console.log(this.news);
  //     //  this.news.sort((b, a) => new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime());
  //     this.latestNews= this.news.pop();
   
  //      console.log(this.latestNews);
  //      console.log(this.news);
  //      this.subNews=this.news.pop();
  //      this.SubSubNews=this.news.pop();
    
  //     this.sideTrendingNews= this.news.slice(1).slice(-4);

  //      });
  // }
  onSubmit(aObject:Answers){
    aObject.aEntryDate = new Date().getTime();
    aObject.isViewd =false;
    aObject.ViewCount =0;
  //  aObject.qId =aObject.qId;

    aObject.aBy ='Admin';
    console.log(aObject);
    
   
      if(aObject.imageUrlFile!=null){
        this.uploadNewsService.startUpLoad(aObject,'Answers');
      } else{
       this.uploadNewsService.add(aObject,'Answers').then(t=>{
           console.log(t);
           alert('Saved')
         }).catch(c=>{console.log(c)});

      }
  }
  onChangeQuestion(qId){
    // this.uploadNewsService.getAll('Questions').valueChanges().subscribe(s=>{
    //   console.log(s);
    // });
    console.log(this.items);
   let token= this.items.find(f=>f.key==qId).token;
   this.answer.qToken=token;
 let filteredItem= this.items.filter(f=>f.token==token);
 this.filteredItem=filteredItem;
   console.log(filteredItem);
  }

  detectFilesForImageUrlFile(event) {
    this.selectedFilesForImage = event.target.files;
    this.answer.imageUrlFile = this.selectedFilesForImage.item(0);
    console.log(this.answer.imageUrlFile);
  }

}
