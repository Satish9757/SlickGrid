import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-replace',
  templateUrl: './find-replace.component.html',
  styleUrls: ['./find-replace.component.scss']
})
export class FindReplaceComponent implements OnInit {
  ShowTab:boolean = false;
  isFindReplace: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.ShowTab = true;
  }
  showFindReplace(){
  this.isFindReplace = !this.isFindReplace;
  }
  updateBulkData(){

    
  }

}
