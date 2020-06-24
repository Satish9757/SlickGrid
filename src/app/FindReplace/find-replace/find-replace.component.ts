import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FindReplaceConfig } from './find-replace.config';

@Component({
  selector: 'app-find-replace',
  templateUrl: './find-replace.component.html',
  styleUrls: ['./find-replace.component.scss']
})
export class FindReplaceComponent implements OnInit {
  selectedOption:any;
  ShowTab:boolean = false;
  isFindReplace: boolean = false;
  find:string='';
  replace:string='';

  @Output('replacedData') replacedData = new EventEmitter(); 
  @Input() findReplaceConfig:FindReplaceConfig;
  updateMaterialList: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.ShowTab = true;   
  }

  ngAfterViewInit():void{
    debugger;
  }
  showFindReplace(){
    debugger
    this.selectedOption=this.findReplaceConfig.defualtValue;
    this.updateMaterialList= this.findReplaceConfig.columnDef.map(x=>({'name':x.name,'field':x.field}));
  this.isFindReplace = !this.isFindReplace;
  }
  
  updateTable(){   
   
  //  const replcedData= this.findReplaceConfig.dataSource.filter(function(e){
  //   return e[`${this.selectedOption}`] === this.find ? e[`${this.selectedOption}`] =this.replace :'';
  //  }) 
  const findText=this.find;
  const replaceText=this.replace;
  const select=this.selectedOption;
  const replcedData= this.findReplaceConfig.dataSource.filter(function(e){
    return e[`${select}`]===findText ?e[`${select}`]=replaceText:''
  })
    this.replacedData.emit(replcedData);
  }




}
