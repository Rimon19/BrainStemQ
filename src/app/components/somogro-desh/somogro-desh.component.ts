import { Component, ElementRef, OnInit, PipeTransform } from '@angular/core';
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
export class SomogroDeshComponent implements OnInit,PipeTransform {
  displaySampleCode='';
bold=`<strong>..</strong>`;

hyperlink=`<Strong><a href="">Link</a></Strong> 
<a href="http://" target="_blank" rel="noopener noreferrer">Blank Link</a>`;

image=` <img src="...." alt="" style="height:500px;width: 900px;">`;
Ul=`<ul>
<li>...</li>
<li>...</li>
</ul>`;

code=`<pre style="background-color: cornsilk;font-size: large;">
<code>
 ..........
</code>
</pre>`;
textarea=`
<textarea name="" id="" cols="30" rows="10">--</textarea>
`

tbl=`
<table>
  <thead>
    <th>A</th>
    <th>B</th>
    <th>C</th>
  </thead>
  <tbody>
    <td>1</td>
    <td>1</td>
    <td>1</td>
  </tbody>
  
 
</table>`;

  ul=`
  <br>
  
  <ul>
  <li>live</li><br>
  <li>Food</li>
</ul>
<ol>
<input type="text">
    <li>Relax</li>
                      </ol>
                      
                     
                      <br>

                      <Strong><a href="">Link</a></Strong> 
                      <a href="http://" target="_blank" rel="noopener noreferrer">Blank Link</a>
                       
                      

<h1>Hello</h1>

<ul>
  <li>Test</li>
  <li>Unorder </li>
  <li>list</li>
  
</ul>


                      
`
;
 ImgUrl="";
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
      protected sanitizer: DomSanitizer
   //    private _sanitizer: DomSanitizer 
  ) { 
      //  this.videoURL='https://www.youtube.com/embed/1ozGKlOzEVc';
      //  this.vedio1 = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
    //  this.itemsMap = itemsMap || {};
       }
       transform() {
    
      
        return this.sanitizer.bypassSecurityTrustHtml(this.answer.answerDetails);
      }
      SetObj(value){
         
      //   let obj='';
      //   if(value=='Bold'){
      //     obj=this.bold;
      //   }
      // //  else if(value='Italic'){
      // //     obj=this.
      // //   }
      //     if(value=='Hyperlink'){
      //     obj=this.hyperlink;
      //   }
      //      if(value=='Image'){
      //     obj=this.image;
      //   }
      //      if(value=='Ul'){
      //     obj=this.Ul;
      //   }
      //   // else  if(value='Ol'){
      //   //   obj=this.
      //   // }
      //      if(value=='code'){
      //     obj=this.code;
      //   }
      //      if(value=='Table'){
      //     obj=this.tbl;
      //   }
      //   this.answer.answerDetails=this.answer.answerDetails+obj;
      this.displaySampleCode=value;
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
    
   
     // if(aObject.imageUrlFile!=null){
       // this.uploadNewsService.startUpLoad(aObject,'Answers');
     // } else{
       this.uploadNewsService.add(aObject,'Answers').then(t=>{
           console.log(t);
           alert('Saved')
         }).catch(c=>{console.log(c)});

     // }
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
     
    this.uploadNewsService.startUpLoadTwo(this.answer,'Answers');
  }

}
