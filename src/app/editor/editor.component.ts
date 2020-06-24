import { Component, OnInit, DebugElement } from '@angular/core';
import {
  AngularGridInstance,
  Aggregators,
  Column,
  DelimiterType,
  FieldType,
  FileType,
  Filters,
  Formatters,
  GridOption,
  Grouping,
  GroupingGetterFunction,
  GroupTotalFormatters,
  SortDirectionNumber,
  Sorters,
  Editors,
  Formatter,
  ExcelExportService
} from 'angular-slickgrid';

import { HttpClient } from '@angular/common/http';
import { RowDetailsComponent } from 'src/app/row-details/row-details.component';
import { SlickGridConfig } from 'src/app/slick-grid/slickgrid.config';
export interface PeriodicElement {
  id: number;
  ModelMaterial: string;
  ct: string;
  Category: string;
  Model: string;
  INSPIRErec: string;
  bomvalue: string;
  CtDistance: number;
  InspireRecommendation: string[];
  ScopeboxMaterial: string;
  UpdatedMaterial: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  slickGridConfig: SlickGridConfig;
  title = 'SlickGridPOC';
  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  dataset = [];
  isSearch: boolean = true;
  isAddNewRoq: boolean = true;
  durationOrderByCount = false;
  selectedGroupingFields: Array<string | GroupingGetterFunction> = ['', '', ''];
  draggableGroupingPlugin: any;
  material;
  gridObj: any;
  ELEMENT_DATA: any[] = [];
  detailViewRowCount = 9;
  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.slickGridConfig=new SlickGridConfig();
    this.prepareGrid();
    this.dataset = [];
    this.setSlickConfig();
    this.generateGridData();

  }

  private setSlickConfig() {
    this.slickGridConfig.isSearch=true;
    this.slickGridConfig.isFindReaplce = true;
    this.slickGridConfig.findReplaceConfig.isDisabled = true;
    this.slickGridConfig.findReplaceConfig.defualtValue = "Category";
    this.slickGridConfig.findReplaceConfig.columnDef=this.columnDefinitions;
    this.slickGridConfig.downloadFileName="project1";
  }

  private generateGridData() {
    this._httpClient.get("assets/sourceData.json").subscribe((dt: any[]) => {
      let id = 0;
      dt.forEach(element => {
        this.ELEMENT_DATA.push({
          id: id++,
          ct: '',
          CtDistance: 0,
          Category: element.Category,
          Model: element.ModelMaterial,
          INSPIRErec: '',
          bomvalue: '',
          InspireRecommendation: element.InspireRecommendation,
          ScopeboxMaterial: element.ScopeboxMaterial,
          UpdatedMaterial: element.UpdatedMaterial,
          ModelMaterial: element.ModelMaterial,
          BomRecommendation: element.BomRecommendation,
          SbTypeName: element.SbTypeName,
          Level: element.Level,
          CtTypeName: element.CtTypeName,
          OcTypeName: element.OcTypeName,
          RevitId: element.RevitId,
        })
      });
      debugger;
      this.slickGridConfig.dataSource = this.ELEMENT_DATA;
      this.slickGridConfig.searchConfig.dataSource=this.ELEMENT_DATA;
      this.slickGridConfig.findReplaceConfig.dataSource=this.ELEMENT_DATA;
      //   //this.prepareGrid();
    })
  }


  prepareGrid() {

    this.columnDefinitions = [
      { id: 'LevelArea', name: 'Level / Area', field: 'LevelArea', sortable: true, width: 70, filterable: true, formatter: myCustomCheckmarkFormatter },
      { id: 'ct', name: 'Ct / Ot', field: 'ct', sortable: true, type: FieldType.number, minWidth: 90, filterable: true, formatter: myCustomCheckmarkFormatter },
      { id: 'Category', name: 'Component', field: 'Category', sortable: true, minWidth: 100, filterable: true },
      { id: 'ModelMaterial', name: 'Model Value', field: 'ModelMaterial', sortable: true, minWidth: 90, filterable: true },
      { id: 'INSPIRErec', name: 'Inspire Recommendation', field: 'INSPIRErec', sortable: true, minWidth: 90, filterable: true, formatter: myCustomInsprieData },
      { id: 'bomvalue', name: 'Bom Value', field: 'bomvalue', minWidth: 100, filterable: true, sortable: true, formatter: myCustomBOMValue }
    ];


    this.gridOptions = {
      enableExcelExport: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 10
      },
      enablePagination: true,
      pagination: {
        pageSizes: [10, 20, 50, 100],
        pageSize: 10
      },
      enableFiltering: true,
      enableRowDetailView: true,
      rowSelectionOptions: {
        selectActiveRow: true
      },
      datasetIdPropertyName: 'id', // optionally use a different "id"
    };

  }

  deleteData(row){
    
  }

}
const myCustomInsprieData: Formatter = (row, cell, value, columnDef, dataContext) => {

  let cellIcon;
  if (dataContext.ScopeboxMaterial === 'PVC') {
    cellIcon = 'PVC40';
  }
  else {
    cellIcon = dataContext.ScopeboxMaterial;
  }
  return cellIcon;
}

//----------- Inspire Data----------//
const myCustomBOMValue: Formatter = (row, cell, value, columnDef, dataContext) => {

  let cellIcon;
  if (dataContext.UpdatedMaterial === 'PVC') {
    cellIcon = 'PVC40';
  }
  else {
    cellIcon = dataContext.UpdatedMaterial;
  }
  return cellIcon;
};

const myCustomCTData: Formatter = (row, cell, value, columnDef, dataContext) => {

  let cellIcon;
  if (dataContext.InspireRecommendation.filter(m => dataContext.ModelMaterial.toLowerCase().search(m.toLowerCase()) > -1).length > 0) {
    cellIcon = '<i style="color:green" class="fa fa-check" aria-hidden="true"></i>';
  }
  else {
    cellIcon = '<i style="color:red" class="fa fa-times" aria-hidden="true"></i>'
  }
  // you can return a string of a object (of type FormatterResultObject), the 2 types are shown below
  return cellIcon;
};

const myCustomCheckmarkFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
  // 
  let cellIcon;
  if (dataContext.ModelMaterial && dataContext.ModelMaterial.toLowerCase().search(dataContext.ScopeboxMaterial.split(' ')[0].toLowerCase()) > -1) {
    cellIcon = '<i style="color:green" class="fa fa-check" aria-hidden="true"></i>';
  }
  else {
    cellIcon = '<i style="color:red" class="fa fa-times" aria-hidden="true"></i>'
  }
  // // you can return a string of a object (of type FormatterResultObject), the 2 types are shown below
  return cellIcon;
};
