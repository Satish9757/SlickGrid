import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchInput:string;
  @Input() inputDataSource:any[];
  @Output('outPutDataSource') outPutDataSource = new EventEmitter(); 
  constructor() { }

  ngOnInit(): void {
  }

  search(data){
     const filterData= this.inputDataSource.filter(ele => JSON.stringify(ele).trim().toLowerCase().includes(data.trim().toLowerCase()));
      this.outPutDataSource.emit(filterData);
  }

}
