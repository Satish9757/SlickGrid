import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-find-replace',
  templateUrl: './find-replace.component.html',
  styleUrls: ['./find-replace.component.scss']
})
export class FindReplaceComponent implements OnInit {
  ShowTab:boolean = false;
  isFindReplace: boolean = false;
  @Input() inputDataSource:any[];
  @Input() columnDef:any[];
  @Output('data') data = new EventEmitter(); 
  updateMaterialList: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.ShowTab = true;
    //this.updateMaterialList['modelList'] = [];
    // this.inputDataSource.forEach(element => {
    //   if (this.updateMaterialList['modelList'].includes(element['ModelMaterial']) === false && element['ModelMaterial']) {
    //     this.updateMaterialList['modelList'].push(element['ModelMaterial'])
    //   }
    // });
    // debugger
  }

  ngAfterViewInit():void{
    debugger;
  }
  showFindReplace(){
   this.updateMaterialList= this.columnDef.map(x=>({'name':x.name,'field':x.field}));
  this.isFindReplace = !this.isFindReplace;
  }
  updateBulkData(){
    // this.updateMaterialList['modelList'] = [];
    // this.inputDataSource.forEach(element => {
    //   if (this.updateMaterialList['modelList'].includes(element['ModelMaterial']) === false && element['ModelMaterial']) {
    //     this.updateMaterialList['modelList'].push(element['ModelMaterial'])
    //   }
    // });
    debugger

  }

  bulkUpdateModelMaterial(t,e){
debugger;
  }

}
