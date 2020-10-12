import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UploadNews } from 'app/Model/upload';
import { UploadNewsService } from 'app/Services/upload-news.service';

@Component({
  selector: 'app-single-news-details',
  templateUrl: './single-news-details.component.html',
  styleUrls: ['./single-news-details.component.css']
})
export class SingleNewsDetailsComponent implements OnInit {

  newsByEntryDate;
  newsDetailsByEntryDate=new UploadNews();
  constructor( private element : ElementRef,
    private route:ActivatedRoute,
    private uploadNewsService:UploadNewsService) {
    this.newsByEntryDate = this.route.snapshot.paramMap.get('id');
    console.log(this.newsByEntryDate );
    this.uploadNewsService.getAll().valueChanges().subscribe(item=>{
     this.newsDetailsByEntryDate=item.find(f=>f.entryDate==this.newsByEntryDate);
     console.log(this.newsDetailsByEntryDate);
    });
   }

  ngOnInit() {
    let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

  navbar.classList.remove('navbar-transparent');
}

ngOnDestroy(){
    let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

}

}
