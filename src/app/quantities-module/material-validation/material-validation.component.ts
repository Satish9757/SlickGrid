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
  selector: 'app-material-validation',
  templateUrl: './material-validation.component.html',
  styleUrls: ['./material-validation.component.scss']
})
export class MaterialValidationComponent implements OnInit {
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
  constructor(private _httpClient: HttpClient) {

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
      rowDetailView: {
        // optionally change the column index position of the icon (defaults to 0)
        // columnIndexPosition: 1,

        // We can load the "process" asynchronously in 2 different ways (httpClient OR even Promise)
        process: (item) => this.simulateServerAsyncCall(item),
        // process: (item) => this.http.get(`api/item/${item.id}`),

        // load only once and reuse the same item detail without calling process method
        loadOnce: true,

        // limit expanded row to only 1 at a time
        singleRowExpand: false,

        // false by default, clicking anywhere on the row will open the detail view
        // when set to false, only the "+" icon would open the row detail
        // if you use editor or cell navigation you would want this flag set to false (default)
        useRowClick: true,

        // how many grid rows do we want to use for the row detail panel (this is only set once and will be used for all row detail)
        // also note that the detail view adds an extra 1 row for padding purposes
        // so if you choose 4 panelRows, the display will in fact use 5 rows
        panelRows: this.detailViewRowCount,

        // you can override the logic for showing (or not) the expand icon
        // for example, display the expand icon only on every 2nd row
        // expandableOverride: (row: number, dataContext: any, grid: any) => (dataContext.id % 2 === 1),

        // Preload View Component
        //preloadComponent: RowDetailPreloadComponent,

        // View Component to load when row detail data is ready
        viewComponent: RowDetailsComponent,

        // Optionally pass your Parent Component reference to your Child Component (row detail component)
        parent: this
      },
      // gridMenu:{
      //   customItems:[
      //     {
      //     title: "Export to Excel",
      //     disabled: false,
      //     command: "exportToExcel",
      //     cssClass: 'bold fa fa-file-excel-o',     // container css class
      //     textCssClass: 'red'  
      //     }
      //   ]
      // }

    };

  }

  deleteData(event) {
    alert(JSON.stringify(event))
  }

  SelectCellEditor() {

  }

  
  onGroupChanged(change: { caller?: string; groupColumns: Grouping[] }) {

    // the "caller" property might not be in the SlickGrid core lib yet, reference PR https://github.com/6pac/SlickGrid/pull/303
    const caller = change && change.caller || [];
    const groups = change && change.groupColumns || [];

    if (Array.isArray(this.selectedGroupingFields) && Array.isArray(groups) && groups.length > 0) {
      // update all Group By select dropdown
      this.selectedGroupingFields.forEach((g, i) => this.selectedGroupingFields[i] = groups[i] && groups[i].getter || '');
    } else if (groups.length === 0 && caller === 'remove-group') {
      this.clearGroupingSelects();
    }
  }

  clearGrouping() {

    if (this.draggableGroupingPlugin && this.draggableGroupingPlugin.setDroppedGroups) {
      this.draggableGroupingPlugin.clearDroppedGroups();
    }
    this.gridObj.invalidate(); // invalidate all rows and re-render
  }

  clearGroupingSelects() {

    this.selectedGroupingFields.forEach((g, i) => this.selectedGroupingFields[i] = '');
  }

  ngOnInit(): void {
    debugger
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

  private randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  simulateServerAsyncCall(item: any) {
    // random set of names to use for more item detail
    const randomNames = ['John Doe', 'Jane Doe', 'Chuck Norris', 'Bumblebee', 'Jackie Chan', 'Elvis Presley', 'Bob Marley', 'Mohammed Ali', 'Bruce Lee', 'Rocky Balboa'];

    // fill the template on async delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const itemDetail = item;

        // let's add some extra properties to our item for a better async simulation
        itemDetail.assignee = randomNames[this.randomNumber(0, 10)];
        itemDetail.reporter = randomNames[this.randomNumber(0, 10)];

        // resolve the data after delay specified
        resolve(itemDetail);
      }, 1000);
    });
  }



}



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

//----------- Inspire Data----------//
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

