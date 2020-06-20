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
  constructor(private _httpClient: HttpClient) {

  }

  prepareGrid() {

    this.columnDefinitions = [
      {
        id: 'ModelMaterial', name: 'LEVEL / AREA', field: 'ModelMaterial',
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
        id: 'Category', name: 'COMPONENT', field: 'Category',
        minWidth: 70, width: 90,
        type: FieldType.number,
        filterable: true,
        sortable: true,
        groupTotalsFormatter: GroupTotalFormatters.avgTotalsPercentage,
        grouping: {
          getter: 'percentComplete',
          formatter: (g) => `% Complete:  ${g.value}  <span style="color:green">(${g.count} items)</span>`,
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
      },
     
      // {
      //   id: 'Status', name: 'Delete', field: 'Delete',
      //   width: 10, minWidth: 20, maxWidth: 100,
      //   cssClass: 'cell-effort-driven',
      //   sortable: true,
      //   formatter: Formatters.deleteIcon,       
      // }
  
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
        pageSizes: [5, 10, 15, 20, 25, 30, 40, 50, 75, 100],
        pageSize: 5
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



  renderDifferentColspan(item: any) {
    if (item) {
      return {
        columns: {
          duration: {
            colspan: 3 // "duration" will span over 3 columns
          }
        }
      };
    }
  }

  onGroupChanged(change: { caller?: string; groupColumns: Grouping[] }) {
    debugger;
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
    debugger;
    if (this.draggableGroupingPlugin && this.draggableGroupingPlugin.setDroppedGroups) {
      this.draggableGroupingPlugin.clearDroppedGroups();
    }
    this.gridObj.invalidate(); // invalidate all rows and re-render
  }

  clearGroupingSelects() {
    debugger;
    this.selectedGroupingFields.forEach((g, i) => this.selectedGroupingFields[i] = '');
  }

  ngOnInit(): void {
    debugger;
    this._httpClient.get("assets/sourceData.json").subscribe((dt: any[]) => {
      debugger;
      dt.forEach(element => {
        this.ELEMENT_DATA.push({
          id: element.ObjectId,
          ct: '',
          CtDistance: 0,
          Category: element.Category,
          Model: element.ModelMaterial,
          INSPIRErec: '',
          bomvalue: '',
          InspireRecommendation: element.InspireRecommendation,
          ScopeboxMaterial: element.ScopeboxMaterial,
           UpdatedMaterial: element.UpdatedMaterial,
           ModelMaterial:element.ModelMaterial
        })
      });
      this.dataset=this.ELEMENT_DATA;

      debugger;
      this.prepareGrid();
    })
  }
}

const myCustomCheckmarkFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
  debugger;
   let cellIcon;
  if (dataContext.ModelMaterial.toLowerCase().search(dataContext.ScopeboxMaterial.split(' ')[0].toLowerCase()) > -1) {
    cellIcon = '<i style="color:green" class="fa fa-check" aria-hidden="true"></i>';
  }
  else {
    cellIcon = '<i style="color:red" class="fa fa-times" aria-hidden="true"></i>'
  }
  // // you can return a string of a object (of type FormatterResultObject), the 2 types are shown below
   return cellIcon;
};

const myCustomCTData: Formatter = (row, cell, value, columnDef, dataContext) => {
  debugger;
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
  debugger;
  let cellIcon;
  if (dataContext.ScopeboxMaterial === 'PVC') {
    cellIcon = 'PVC40';
  }
  else {
    cellIcon = dataContext.ScopeboxMaterial;
  }
  return cellIcon;
};

//----------- Inspire Data----------//
const myCustomBOMValue: Formatter = (row, cell, value, columnDef, dataContext) => {
  debugger;
  let cellIcon;
  if (dataContext.UpdatedMaterial === 'PVC') {
    cellIcon = 'PVC40';
  }
  else {
    cellIcon = dataContext.UpdatedMaterial;
  }
  return cellIcon;
};

