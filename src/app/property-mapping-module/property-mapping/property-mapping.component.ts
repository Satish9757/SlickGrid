import { Component, Injectable, OnInit } from '@angular/core';
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
  Formatter
} from 'angular-slickgrid';
import { SlickGridService } from 'src/app/slick-grid/slick-grid.service';
import { HttpClient } from '@angular/common/http';
import { SlickGridConfig } from 'src/app/slick-grid/slickgrid.config';


@Component({
  selector: 'app-property-mapping',
  templateUrl: './property-mapping.component.html',
  styleUrls: ['./property-mapping.component.scss']
})


export class PropertyMappingComponent implements OnInit {
 
  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  dataset: any[];
  dataviewObj: any;
  draggableGroupingPlugin: any;
  draggableGroupingPlugineee: any;
  durationOrderByCount = false;
  gridObj: any;
  gridOptions: GridOption;
  processing = false;
  ELEMENT_DATA: any[]=[];
  slickGridConfig: SlickGridConfig;
  selectedGroupingFields: Array<string | GroupingGetterFunction> = ['', '', ''];

  constructor(private _httpClient: HttpClient,private slickGridService:SlickGridService) {
    // define the grid options & columns and then create the grid itself
  //  this.loadData(500);
    //this.defineGrid();
  }

  ngOnInit(): void {
    // populate the dataset once the grid is ready
    this.slickGridConfig=new SlickGridConfig();
    this.defineGrid();         
      this.dataset = [];      
      this.generateGridData();
      this.slickGridService.todos.subscribe(data=>{
        console.log(JSON.stringify(data))
        alert(JSON.stringify(data));
      })
  this.setGridConfig();
    
  }
  setGridConfig(){
    this.slickGridConfig.isOnClickCellAlert=true;
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
      //this.dataset = this.ELEMENT_DATA;
      
      this.slickGridConfig.dataSource = this.ELEMENT_DATA;
      //this.slickGridConfig.searchConfig.dataSource=this.ELEMENT_DATA;
      //this.slickGridConfig.findReplaceConfig.dataSource=this.ELEMENT_DATA;
      //   //this.prepareGrid();
    })
  }

  // angularGridReady(angularGrid: AngularGridInstance) {
  //   ;
  //   this.angularGrid = angularGrid;
  //   this.gridObj = angularGrid.slickGrid; // grid object
  //   this.dataviewObj = angularGrid.dataView;
  // }

  /* Define grid Options and Columns */
  defineGrid() {
    this.columnDefinitions = [
      {
        id: 'Model', name: 'LEVEL / AREA', field: 'Model',
        width: 70, minWidth: 50,
        cssClass: 'cell-title',
        filterable: true,
        sortable: true,
        //formatter: myCustomCheckmarkFormatter, 
        grouping: {
          getter: 'Model',
          formatter: (g) => `Level: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
          
          aggregateCollapsed: false,
          collapsed: false
        }
      },
      {
        id: 'ct', name: 'CT / OT', field: 'ct',
        width: 70,
        sortable: true,
        filterable: true,
        //filter: { model: Filters.slider, operator: '>=' },
       // type: FieldType.number,
        formatter: myCustomCTData,
        groupTotalsFormatter: GroupTotalFormatters.sumTotals,
        grouping: {
          getter: 'ct',
          formatter: (g) => `ct: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
          // comparer: (a, b) => {
          //   return this.durationOrderByCount ? (a.count - b.count) : Sorters.numeric(a.value, b.value, SortDirectionNumber.asc);
          // },
         
          aggregateCollapsed: false,
          collapsed: false
        }
      },
      {
        id: 'Category', name: 'Component', field: 'Category',
        minWidth: 70, width: 90,
        //formatter: Formatters.percentCompleteBar,
        //type: FieldType.number,
        filterable: true,
        filter: { model: Filters.inputText },
        sortable: true,
        groupTotalsFormatter: GroupTotalFormatters.avgTotalsPercentage,
        grouping: {
          getter: 'Category',
          formatter: (g) => `Component:  ${g.value}  <span style="color:green">(${g.count} items)</span>`,
          
          aggregateCollapsed: true,
          collapsed: true
        },
        params: { groupFormatterPrefix: '<i>Avg</i>: ' }
      },
      {
        id: 'ModelMaterial', name: 'MODEL VALUE', field: 'ModelMaterial', minWidth: 60,
        sortable: true,
        filterable: true,
        //filter: { model: Filters.compoundDate },
        //formatter: Formatters.dateIso,
        //type: FieldType.dateUtc,
        //outputType: FieldType.dateIso,
        exportWithFormatter: true,
              grouping: {
          getter: 'ModelMaterial',
          formatter: (g) => `ModelMaterial: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
         
          aggregateCollapsed: true,
          collapsed: true
        }
      },
      {
        id: 'INSPIRErec', name: 'INSPIRE RECOMMENDATION', field: 'INSPIRErec',
        minWidth: 60,
        sortable: true,
        filterable: true,
        formatter: myCustomInsprieData,
        //filter: { model: Filters.compoundDate },
       // formatter: Formatters.dateIso,
        //type: FieldType.dateUtc,
       // outputType: FieldType.dateIso,
        exportWithFormatter: true,
        grouping: {
          getter: 'INSPIRErec',
          formatter: (g) => `INSPIRE RECOMMENDATION: ${g.value} <span style="color:green">(${g.count} items)</span>`,
          
          aggregateCollapsed: false,
          collapsed: false
        }
      },
      {
        id: 'bomvalue', name: 'BOM VALUE', field: 'bomvalue',
        width: 90,
        sortable: true,
        filterable: true,
        formatter:  myCustomBOMValue,
        //filter: { model: Filters.compoundInput },
        //formatter: Formatters.dollar,
        //groupTotalsFormatter: GroupTotalFormatters.sumTotalsDollar,
        //type: FieldType.number,
        grouping: {
          getter: 'bomvalue',
          formatter: (g) => `bomvalue: ${g.value} <span style="color:green">(${g.count} items)</span>`,
         
          aggregateCollapsed: true,
          collapsed: true
        }
      },      
    ];

    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 10
      },
      enableDraggableGrouping: true,
      createPreHeaderPanel: true,
      showPreHeaderPanel: true,
      preHeaderPanelHeight: 40,
      enableFiltering: true,
      enableSorting: true,
      enableColumnReorder: true,
      exportOptions: {
        sanitizeDataExport: true
      },
      gridMenu: {
        onCommand: (e, args) => {
          if (args.command === 'toggle-preheader') {
            // in addition to the grid menu pre-header toggling (internally), we will also clear grouping
            this.clearGrouping();
          }
        },
      },
      draggableGrouping: {
        dropPlaceHolderText: 'Drop a column header here to group by the column',
        // groupIconCssClass: 'fa fa-outdent',
        deleteIconCssClass: 'fa fa-times',
        onGroupChanged: (e, args) => this.onGroupChanged(args),
        onExtensionRegistered: (extension) => this.draggableGroupingPlugin = extension,
      }
    };

    //this.loadData(500);
  }

  loadData(rowCount: number) {
    // mock a dataset
    this.dataset = [];
    for (let i = 0; i < rowCount; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);

      this.dataset[i] = {
        id: 'id_' + i,
        num: i,
        title: 'Task ' + i,
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        start: new Date(randomYear, randomMonth, randomDay),
        finish: new Date(randomYear, (randomMonth + 1), randomDay),
        cost: (i % 33 === 0) ? null : Math.round(Math.random() * 10000) / 100,
        effortDriven: (i % 5 === 0)
      };
    }
  }

  clearGroupsAndSelects() {
    this.clearGroupingSelects();
    this.clearGrouping();
  }

  clearGrouping() {
    ;
    if (this.draggableGroupingPlugin && this.draggableGroupingPlugin.setDroppedGroups) {
      this.draggableGroupingPlugin.clearDroppedGroups();
    }
    this.gridObj.invalidate(); // invalidate all rows and re-render
  }

  clearGroupingSelects() {
    ;
    this.selectedGroupingFields.forEach((g, i) => this.selectedGroupingFields[i] = '');
  }

  collapseAllGroups() {
    this.dataviewObj.collapseAllGroups();
  }

  expandAllGroups() {
    this.dataviewObj.expandAllGroups();
  }

  exportToExcel() {
    this.angularGrid.excelExportService.exportToExcel({
      filename: 'Export',
      format: FileType.xlsx
    });
  }

  exportToCsv(type = 'csv') {
    this.angularGrid.exportService.exportToFile({
      delimiter: (type === 'csv') ? DelimiterType.comma : DelimiterType.tab,
      filename: 'myExport',
      format: (type === 'csv') ? FileType.csv : FileType.txt
    });
  }

  groupByDuration() {
    ;
    this.clearGrouping();
    if (this.draggableGroupingPlugin && this.draggableGroupingPlugin.setDroppedGroups) {
      this.showPreHeader();
      this.draggableGroupingPlugin.setDroppedGroups('duration');
      this.gridObj.invalidate(); // invalidate all rows and re-render
    }
  }

  groupByDurationOrderByCount(sortedByCount = false) {
    ;
    this.durationOrderByCount = sortedByCount;
    this.clearGrouping();
    this.groupByDuration();

    // you need to manually add the sort icon(s) in UI
    const sortColumns = sortedByCount ? [] : [{ columnId: 'duration', sortAsc: true }];
    this.angularGrid.filterService.setSortColumnIcons(sortColumns);
  }

  groupByDurationEffortDriven() {
    ;
    this.clearGrouping();
    if (this.draggableGroupingPlugin && this.draggableGroupingPlugin.setDroppedGroups) {
      this.showPreHeader();
      this.draggableGroupingPlugin.setDroppedGroups(['duration', 'effortDriven']);
      this.gridObj.invalidate(); // invalidate all rows and re-render
    }
  }

  groupByFieldName(fieldName, index) {
    debugger;
    //this.clearGrouping();
    if (this.draggableGroupingPlugin && this.draggableGroupingPlugin.setDroppedGroups) {
      // get the field names from Group By select(s) dropdown, but filter out any empty fields
     const groupedFields = this.selectedGroupingFields.filter((g) => g !== '');

      //this.showPreHeader();
      this.draggableGroupingPlugin.setDroppedGroups(groupedFields);
     // this.gridObj.invalidate(); // invalidate all rows and re-render
    }
  }

  onGroupChanged(change: { caller?: string; groupColumns: Grouping[] }) {
    ;
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

  showPreHeader() {
    ;
    this.gridObj.setPreHeaderPanelVisibility(true);
  }

  selectTrackByFn(index, item) {

    return index;
  }

  setFiltersDynamically() {
    // we can Set Filters Dynamically (or different filters) afterward through the FilterService
    this.angularGrid.filterService.updateFilters([
      { columnId: 'percentComplete', operator: '>=', searchTerms: ['55'] },
      { columnId: 'cost', operator: '<', searchTerms: ['80'] },
    ]);
  }

  setSortingDynamically() {
    this.angularGrid.sortService.updateSorting([
      // orders matter, whichever is first in array will be the first sorted column
      { columnId: 'percentComplete', direction: 'ASC' },
    ]);
  }

  toggleDraggableGroupingRow() {
    ;
    this.clearGrouping();
    this.gridObj.setPreHeaderPanelVisibility(!this.gridObj.getOptions().showPreHeaderPanel);
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
  if (dataContext.InspireRecommendation && dataContext.InspireRecommendation.filter(m => dataContext.ModelMaterial.toLowerCase().search(m.toLowerCase()) > -1).length > 0) {
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
