import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchConfig } from './search.config';
import { Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchInput:string;
  @Input() searchConfig:SearchConfig;
  @Output('outPutDataSource') outPutDataSource = new EventEmitter(); 
  userInput$ = new Subject<string>()
  constructor() { }

  ngOnInit(): void {
    this.userInput$.pipe(debounceTime(800), distinctUntilChanged()).subscribe(data =>{
      debugger
      const filterData= this.searchConfig.dataSource.filter(ele =>
        { 
  
  const {Category,CtTypeName,INSPIRErec,Model,ModelMaterial,SbTypeName,ScopeboxMaterial,OcTypeName,UpdatedMaterial,assignee,bomvalue,RevitId} = ele;
  const newElement = {Category,CtTypeName,INSPIRErec,Model,ModelMaterial,SbTypeName,ScopeboxMaterial,OcTypeName,UpdatedMaterial,assignee,bomvalue,RevitId};
         return JSON.stringify(newElement).trim().toLowerCase().includes(data.trim().toLowerCase())});
        this.outPutDataSource.emit(filterData);
    })
  }

//   search(data){
//     debugger
//     const filterData= this.searchConfig.dataSource.filter(ele =>
//       { 

// const {Category,CtTypeName,INSPIRErec,Model,ModelMaterial,SbTypeName,ScopeboxMaterial,OcTypeName,UpdatedMaterial,assignee,bomvalue,RevitId} = ele;
// const newElement = {Category,CtTypeName,INSPIRErec,Model,ModelMaterial,SbTypeName,ScopeboxMaterial,OcTypeName,UpdatedMaterial,assignee,bomvalue,RevitId};
//        return JSON.stringify(newElement).trim().toLowerCase().includes(data.trim().toLowerCase())});
//       this.outPutDataSource.emit(filterData);
//   }

}

/**
 * BomRecommendation: (12) ["EMT", "ENT", "FMC", "IMC", "LFMC", "LFNC", "PVC40", "PVC80", "RMC", "RTRC↵Fiberglass", "MC Cable", "GRC"]
Category: "Conduit"
CtDistance: 0
CtTypeName: "Type II(B)"
INSPIRErec: "RMC"
InspireRecommendation: (13) ["EMT", "IMC", "RMC", "PVC40", "PVC80", "Stainless↵Steel", "Rigid Steel", "Rigid↵Aluminum", "FMC", "LFMC", "RTRC↵Fiberglass", "ENT", "LFNC"]
Level: ""
Model: "PVC"
ModelMaterial: "PVC"
OcTypeName: "Business(B)"
RevitId: 134669
SbTypeName: "Overhead"
ScopeboxMaterial: "RMC"
UpdatedMaterial: "EMT"
assignee: "Jane Doe"
bomvalue: "EMT"
ct: ""
id: 0
reporter: "Chuck Norris"
 */