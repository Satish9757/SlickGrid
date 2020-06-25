import { Component, OnInit } from '@angular/core';
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
  Formatter
} from 'angular-slickgrid';

import { HttpClient } from '@angular/common/http';
import { SlickGridConfig } from 'src/app/slick-grid/slickgrid.config';
import { SlickGridService } from 'src/app/slick-grid/slick-grid.service';
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
  selector: 'app-property-mapping',
  templateUrl: './property-mapping.component.html',
  styleUrls: ['./property-mapping.component.scss']
})
export class PropertyMappingComponent implements OnInit {

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
  ELEMENT_DATA: any[]=[];
  slickGridConfig: SlickGridConfig;
  constructor(private _httpClient: HttpClient,private slickGridService:SlickGridService) {

  }

  prepareGrid() {

    this.columnDefinitions = [
      {
        id: 'LevelArea', name: 'LEVEL / AREA', field: 'LevelArea',
        width: 70, minWidth: 50,
        cssClass: 'cell-title', 
        formatter: myCustomCheckmarkFormatter, 
        //formatter: this.checkModelAndScopeboxMaterial('sav','als'),
        filterable: true,
        sortable: true,
        grouping: {
          getter: 'title',
          formatter: (g) => `Title: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
          aggregators: [
            new Aggregators.Sum('cost')
          ],
          aggregateCollapsed: false,
          collapsed: false
        }
      },
      {
        id: 'ct', name: 'CT / OT', field: 'ct',
        width: 70,
        sortable: true,
        formatter: myCustomCTData,
        filterable: true,
        //filter: { model: Filters.slider, operator: '>=' },
        type: FieldType.number,
        groupTotalsFormatter: GroupTotalFormatters.sumTotals,
        grouping: {
          getter: 'duration',
          formatter: (g) => `Duration: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
          comparer: (a, b) => {
            return this.durationOrderByCount ? (a.count - b.count) : Sorters.numeric(a.value, b.value, SortDirectionNumber.asc);
          },
          aggregators: [
            new Aggregators.Sum('cost')
          ],
          aggregateCollapsed: false,
          collapsed: false
        }
      },
      {
        id: 'Category', name: 'Component', field: 'Category',
        minWidth: 70, width: 90,
        //type: FieldType.string,
        filterable: true,
        sortable: true,
        filter: { model: Filters.inputText },
        type: FieldType.string,
        groupTotalsFormatter: GroupTotalFormatters.sumTotals,
        grouping: {
          
          getter: 'Category',
          formatter: (g) => `COMPONENT:  ${g.value}  <span style="color:green">(${g.count} items)</span>`,
          aggregators: [
            new Aggregators.Sum('cost')
          ],
          aggregateCollapsed: false,
          collapsed: false
        },
        params: { groupFormatterPrefix: '<i>Avg</i>: ' }
      },
      {
        id: 'ModelMaterial', name: 'MODEL VALUE', field: 'ModelMaterial', minWidth: 60,
        sortable: true,
        filterable: true,
        type: FieldType.dateUtc,
        outputType: FieldType.dateIso,
        exportWithFormatter: true,
        grouping: {
          getter: 'start',
          formatter: (g) => `Start: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
          aggregators: [
            new Aggregators.Sum('cost')
          ],
          aggregateCollapsed: false,
          collapsed: false
        }
      },
      {
        id: 'INSPIRErec', name: 'INSPIRE RECOMMENDATION', field: 'INSPIRErec',
        minWidth: 60,
        sortable: true,
        filterable: true,
        formatter: myCustomInsprieData,
        type: FieldType.dateUtc,
        outputType: FieldType.dateIso,
        exportWithFormatter: true,
        grouping: {
          getter: 'finish',
          formatter: (g) => `Finish: ${g.value} <span style="color:green">(${g.count} items)</span>`,
          aggregators: [
            new Aggregators.Sum('cost')
          ],
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
        filter: { model: Filters.inputText },
        groupTotalsFormatter: GroupTotalFormatters.sumTotalsDollar,
        type: FieldType.number,
        grouping: {
          getter: 'cost',
          formatter: (g) => `Cost: ${g.value} <span style="color:green">(${g.count} items)</span>`,
          aggregators: [
            new Aggregators.Sum('cost')
          ],
          aggregateCollapsed: true,
          collapsed: true
        }
      }
  
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
      enablePagination: true,
      pagination: {
        pageSizes: [10,20,50,100],
        pageSize: 10
      },
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
    this.slickGridConfig=new SlickGridConfig();
    this.prepareGrid();
    this.dataset = [];
    this.setSlickConfig();
    this.generateGridData();
    this.slickGridService.todos.subscribe(data=>{
      alert(JSON.stringify(data));
    })

  }
   private setSlickConfig() {
     this.slickGridConfig.downloadConfig.downloadFileName="project 1";
    this.slickGridConfig.isSearch=true;
    this.slickGridConfig.isFindReaplce = true;
    this.slickGridConfig.findReplaceConfig.isDisabled = true;
    this.slickGridConfig.findReplaceConfig.defualtValue = "Category";
    this.slickGridConfig.findReplaceConfig.columnDef=this.columnDefinitions;
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
      this.slickGridConfig.dataSource = this.ELEMENT_DATA;
      this.slickGridConfig.searchConfig.dataSource=this.ELEMENT_DATA;
      this.slickGridConfig.findReplaceConfig.dataSource=this.ELEMENT_DATA;
      //   //this.prepareGrid();
    })
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
