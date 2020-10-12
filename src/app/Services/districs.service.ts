import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DistricsService {

  constructor(private db: AngularFireDatabase) { }

  add(obj) {
    console.log('test1',obj)
    return  this.db.list(`-MGvVSOLEI6OfcsXQ9td/`).push(obj);
   }

   update(id, obj) {
    return this.db.object(`/-MGvVSOLEI6OfcsXQ9td/` + id).update(obj);
   }
   
 getByIdDistric(id):Observable<any>{
  return this.db.list(`/-MGvVSOLEI6OfcsXQ9td/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
 getAll():any { 
  return  this.db.list(`/-MGvVSOLEI6OfcsXQ9td`);
}

  delete(key: string) {
  return this.db.list(`/-MGvVSOLEI6OfcsXQ9td`).remove(key);
}





}
