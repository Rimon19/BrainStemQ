import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class NewsCategoryService {

  constructor(private db: AngularFireDatabase) { }

 getAll():any { 
  return  this.db.list(`/NewsCategory`);
}

 
}
