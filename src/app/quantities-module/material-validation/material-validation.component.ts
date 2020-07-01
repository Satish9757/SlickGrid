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
import { CustomRowModel } from 'src/app/slick-grid/customRowModel';
import { SlickGridService } from 'src/app/slick-grid/slick-grid.service';

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
  //selectedGroupingFields: Array<string | GroupingGetterFunction> = ['', '', ''];
  draggableGroupingPlugin: any;
  material;
  gridObj: any;
  ELEMENT_DATA: any[] = [];
  detailViewRowCount = 9;
  constructor(private _httpClient: HttpClient, private slickGridService: SlickGridService) {
  }

  ngOnInit(): void {
    this.slickGridConfig = new SlickGridConfig();
    this.prepareGrid();
    this.dataset = [];
    this.setSlickConfig();
    this.generateGridData();

  }

  prepareGrid() {
    this.columnDefinitions = [
      { id: 'LevelArea', name: 'Level / Area', field: 'LevelArea', sortable: true, width: 70, filterable: false, formatter: myCustomCheckmarkFormatter },
      { id: 'ct', name: 'Ct / Ot', field: 'ct', sortable: true, type: FieldType.number, minWidth: 90, filterable: true, formatter: myCustomCheckmarkFormatter },
      { id: 'Category', name: 'Component', field: 'Category', sortable: true, minWidth: 100, filterable: true },
      { id: 'ModelMaterial', name: 'Model Value', field: 'ModelMaterial', sortable: true, minWidth: 90, filterable: true },
      { id: 'INSPIRErec', name: 'Inspire Recommendation', field: 'INSPIRErec', sortable: true, minWidth: 90, filterable: true },
      { id: 'bomvalue', name: 'Bom Value', field: 'bomvalue', minWidth: 100, filterable: true, sortable: true, }
    ];

    // ----- Grid otions show & hide function 
    this.gridOptions = {
      enableExcelExport: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 10
      },
      enablePagination: true,
      pagination: {
        pageSizes: [20, 50, 100],
        pageSize: 20
      },
      enableFiltering: true,
      enableRowDetailView: true,
      rowSelectionOptions: {
        selectActiveRow: true
      },
      datasetIdPropertyName: 'id', // optionally use a different "id"
      rowDetailView: {

        // We can load the "process" asynchronously in 2 different ways (httpClient OR even Promise)
        process: (item) => this.simulateServerAsyncCall(item),

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
        // View Component to load when row detail data is ready
        viewComponent: RowDetailsComponent,
        // Optionally pass your Parent Component reference to your Child Component (row detail component)
        parent: this
      },
    };
  }

  deleteData(event) {
    alert(JSON.stringify(event))
  }

  SelectCellEditor() {
  }

  private setSlickConfig() {
    debugger;
    this.slickGridConfig.isSearch = true;
    this.slickGridConfig.isCustomRowStyle = true;
    this.slickGridConfig.isFindReaplce = true;
    this.slickGridConfig.findReplaceConfig.isDisabled = true;
    this.slickGridConfig.findReplaceConfig.defualtValue = "Category";
    this.slickGridConfig.findReplaceConfig.columnDef = this.columnDefinitions;
    this.slickGridConfig.downloadConfig.downloadFileName = "project1";
    this.slickGridConfig.downloadConfig.isCustomDownload = true;
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
          INSPIRErec: element.ScopeboxMaterial === 'PVC' ? 'PVC40' : element.ScopeboxMaterial,
          bomvalue: element.UpdatedMaterial === 'PVC' ? 'PVC40' : element.UpdatedMaterial,
        })
      });
      this.slickGridConfig.dataSource = this.ELEMENT_DATA;
      this.slickGridConfig.searchConfig.dataSource = this.ELEMENT_DATA;
      this.slickGridConfig.findReplaceConfig.dataSource = this.ELEMENT_DATA;

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

  downloadExcel() {
    alert('my download is called')
  }
  customRowStyle(customRowModel: CustomRowModel) {
    this.slickGridService.custRowRule = this.customRowStyleImpl(customRowModel);
  }

  customRowStyleImpl(customRowModel: CustomRowModel) {
    const newCssClass = 'duration-bg'; debugger;


    const item = customRowModel.dataView.getItem(customRowModel.rowNumber);
    let meta = (customRowModel.metaData(customRowModel.rowNumber) || {});
    if (meta && item) {
      debugger;
      // convert to number
      if (item.Category === "Conduit Elbow") {
        meta.cssClasses = (meta.cssClasses || '') + ' ' + newCssClass;
      }
      else {
        meta.cssClasses = (meta.cssClasses || '');
      }
    }
    return meta;

  };
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

//----------- BOM Data----------//
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

