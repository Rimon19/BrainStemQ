import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap, finalize } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class UploadNewsService {
  task:AngularFireUploadTask;
  percentage:Observable<number>;
  snapshot:Observable<any>;
  downloadURL:string;
  constructor(private db: AngularFireDatabase,
    private storage:AngularFireStorage) { }

  add(obj) {
  
    return  this.db.list(`uploadNews`).push(obj);
   }

   update(id, obj) {
    return this.db.object(`/uploadNews/` + id).update(obj);
   }
   
 getByIdDistric(id):Observable<any>{
  return this.db.list(`/uploadNews/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
 getAll():any { 
  return  this.db.list(`/uploadNews`);
}

  delete(key: string) {
  return this.db.list(`/uploadNews`).remove(key);
}

startUpLoad(uploadNews){
    
  const path=`uploadImage/${Date.now()}_${uploadNews.imageUrlFile.name}`;
  uploadNews.imageUrlName=`${Date.now()}_${uploadNews.imageUrlFile.name}`;
  const ref=this.storage.ref(path);
  
  this.task=this.storage.upload(path,uploadNews.imageUrlFile);


  this.percentage=this.task.percentageChanges();

 
  this.snapshot=this.task.snapshotChanges().pipe(
    finalize(async()=>{
      await ref.getDownloadURL().toPromise().then(t=>{
         
        uploadNews.imageUrl=t;
       this.db.list(`uploadNews/`).push(uploadNews);
      });

      
    
    }),
  );
      
  this.snapshot.subscribe(d=>{})
}


}
