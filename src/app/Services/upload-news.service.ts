import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

  add(obj,dbName) {
  
    return  this.db.list(`${dbName}`).push(obj);
   }

   update(id, obj,dbName) {
    return this.db.object(`/${dbName}/` + id).update(obj);
   }
   
 getById(key,dbName):Observable<any>{
  return this.db.list(`/${dbName}/` + key)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
 getAll(dbName):any{ 
  return this.db.object(`/${dbName}/`);
}
getAllList(dbName):any{ 
  return this.db.object(`/${dbName}/`);
}
  delete(key: string,dbName) {
  return this.db.list(`/${dbName}`).remove(key);
}

startUpLoad(uploadNews,dbName){
    
  const path=`${dbName}/${Date.now()}_${uploadNews.imageUrlFile.name}`;
  uploadNews.imageUrlName=`${Date.now()}_${uploadNews.imageUrlFile.name}`;
  const ref=this.storage.ref(path);
  
  this.task=this.storage.upload(path,uploadNews.imageUrlFile);


  this.percentage=this.task.percentageChanges();

 
  this.snapshot=this.task.snapshotChanges().pipe(
    finalize(async()=>{
      await ref.getDownloadURL().toPromise().then(t=>{
         
        uploadNews.imageUrl=t;
       this.db.list(`${dbName}/`).push(uploadNews).then(t=>{
        alert('Saved');
       });
      });

      
    
    }),
  );
      
  this.snapshot.subscribe(d=>{})
}


}
