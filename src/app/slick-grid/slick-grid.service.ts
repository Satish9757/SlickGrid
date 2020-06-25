import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlickGridService {
private _customRowStyle:any;
private _custRowRule:any;
private _todos: Subject<any> = new Subject();
public readonly todos: Observable<any> = this._todos.asObservable();
  constructor() { }

  get customRowStyle(){
    return this._customRowStyle;
  }
  set customRowStyle(custRow){
     this._customRowStyle=custRow;
  }

  get custRowRule(){
    return this._custRowRule;
  }
  set custRowRule(custRow){
     this._custRowRule=custRow;
  }
  changeAlert(data){
    this._todos.next(data);
  }

}
