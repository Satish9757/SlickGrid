import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlickGridService {
private _customRowStyle:any;
private _custRowRule:any;
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

}
