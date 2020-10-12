import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private db: AngularFireDatabase) { }

  add(obj) {
    console.log('test1',obj)
    return  this.db.list(`/`).push(obj);
   }

   update(id, obj) {
    return this.db.object(`/-MGvY7ZzlSODThKJUYZL/` + id).update(obj);
   }
   
 getByIDivision(id):Observable<any>{
  return this.db.list(`/-MGvY7ZzlSODThKJUYZL/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
 getAll():any { 
  return  this.db.list(`/-MGvY7ZzlSODThKJUYZL`);
}

  delete(key: string) {
  return this.db.list(`/-MGvY7ZzlSODThKJUYZL`).remove(key);
}
}
