import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchConfig } from './search.config';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchInput:string;
  @Input() searchConfig:SearchConfig;
  @Output('outPutDataSource') outPutDataSource = new EventEmitter(); 
  constructor() { }

  ngOnInit(): void {
  }

  search(data){
    const filterData= this.searchConfig.dataSource.filter(ele => JSON.stringify(ele).trim().toLowerCase().includes(data.trim().toLowerCase()));
      this.outPutDataSource.emit(filterData);
  }

}
