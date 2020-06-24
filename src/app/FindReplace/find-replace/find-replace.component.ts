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

  @Output('data') data = new EventEmitter(); 
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
    this.selectedOption=this.findReplaceConfig.defualtValue;
   this.updateMaterialList= this.findReplaceConfig.columnDef.map(x=>({'name':x.name,'field':x.field}));
  this.isFindReplace = !this.isFindReplace;
  }
  bulkUpdateModelMaterial(a,b){
    
  }
}
