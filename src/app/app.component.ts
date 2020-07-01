import { Component } from '@angular/core';
// import {
//   AngularGridInstance,
//   Aggregators,
//   Column,
//   DelimiterType,
//   FieldType,
//   FileType,
//   Filters,
//   Formatters,
//   GridOption,
//   Grouping,
//   GroupingGetterFunction,
//   GroupTotalFormatters,
//   SortDirectionNumber,
//   Sorters,
//   Editors,
//   Formatter,
//   OperatorType
// } from 'angular-slickgrid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
 // title = 'SlickGridPOC';
  //columnDefinitions: Column[] = [];
  //gridOptions: GridOption = {};
  //dataset: any[] = [];
  //isSearch: boolean = true;
  //isAddNewRoq: boolean = true;
  //durationOrderByCount = false;
//  selectedGroupingFields: Array<string | GroupingGetterFunction> = ['', '', ''];
  //draggableGroupingPlugin: any;
  //material;
  //optionData=[];
  //gridObj: any;
  //constructor() 
 // {
//     this.prepareGrid();
// this.optionData=[
//   { "value": 0, "label": 0, "prefix": "Task", "suffix": "day" }, { "value": 1, "label": 1, "prefix": "Task", "suffix": "day" }, { "value": 2, "label": 2, "prefix": "Task", "suffix": "days" }, { "value": 3, "label": 3, "prefix": "Task", "suffix": "days" }, { "value": 4, "label": 4, "prefix": "Task", "suffix": "days" }, { "value": 5, "label": 5, "prefix": "Task", "suffix": "days" }, { "value": 6, "label": 6, "prefix": "Task", "suffix": "days" }, { "value": 7, "label": 7, "prefix": "Task", "suffix": "days" }, { "value": 8, "label": 8, "prefix": "Task", "suffix": "days" }, { "value": 9, "label": 9, "prefix": "Task", "suffix": "days" },
//   { "value": 10, "label": 10, "prefix": "Task", "suffix": "days" }, { "value": 11, "label": 11, "prefix": "Task", "suffix": "days" }, { "value": 12, "label": 12, "prefix": "Task", "suffix": "days" }, { "value": 13, "label": 13, "prefix": "Task", "suffix": "days" }, { "value": 14, "label": 14, "prefix": "Task", "suffix": "days" }, { "value": 15, "label": 15, "prefix": "Task", "suffix": "days" }, { "value": 16, "label": 16, "prefix": "Task", "suffix": "days" }, { "value": 17, "label": 17, "prefix": "Task", "suffix": "days" }, { "value": 18, "label": 18, "prefix": "Task", "suffix": "days" }, { "value": 19, "label": 19, "prefix": "Task", "suffix": "days" },
//   { "value": 20, "label": 20, "prefix": "Task", "suffix": "days" }, { "value": 21, "label": 21, "prefix": "Task", "suffix": "days" }, { "value": 22, "label": 22, "prefix": "Task", "suffix": "days" }, { "value": 23, "label": 23, "prefix": "Task", "suffix": "days" }, { "value": 24, "label": 24, "prefix": "Task", "suffix": "days" }, { "value": 25, "label": 25, "prefix": "Task", "suffix": "days" }, { "value": 26, "label": 26, "prefix": "Task", "suffix": "days" }, { "value": 27, "label": 27, "prefix": "Task", "suffix": "days" }, { "value": 28, "label": 28, "prefix": "Task", "suffix": "days" }, { "value": 29, "label": 29, "prefix": "Task", "suffix": "days" },
//   { "value": 30, "label": 30, "prefix": "Task", "suffix": "days" }, { "value": 31, "label": 31, "prefix": "Task", "suffix": "days" }, { "value": 32, "label": 32, "prefix": "Task", "suffix": "days" }, { "value": 33, "label": 33, "prefix": "Task", "suffix": "days" }, { "value": 34, "label": 34, "prefix": "Task", "suffix": "days" }, { "value": 35, "label": 35, "prefix": "Task", "suffix": "days" }, { "value": 36, "label": 36, "prefix": "Task", "suffix": "days" }, { "value": 37, "label": 37, "prefix": "Task", "suffix": "days" }, { "value": 38, "label": 38, "prefix": "Task", "suffix": "days" }, { "value": 39, "label": 39, "prefix": "Task", "suffix": "days" },
//   { "value": 40, "label": 40, "prefix": "Task", "suffix": "days" }, { "value": 41, "label": 41, "prefix": "Task", "suffix": "days" }, { "value": 42, "label": 42, "prefix": "Task", "suffix": "days" }, { "value": 43, "label": 43, "prefix": "Task", "suffix": "days" }, { "value": 44, "label": 44, "prefix": "Task", "suffix": "days" }, { "value": 45, "label": 45, "prefix": "Task", "suffix": "days" }, { "value": 46, "label": 46, "prefix": "Task", "suffix": "days" }, { "value": 47, "label": 47, "prefix": "Task", "suffix": "days" }, { "value": 48, "label": 48, "prefix": "Task", "suffix": "days" }, { "value": 49, "label": 49, "prefix": "Task", "suffix": "days" },
//   { "value": 50, "label": 50, "prefix": "Task", "suffix": "days" }, { "value": 51, "label": 51, "prefix": "Task", "suffix": "days" }, { "value": 52, "label": 52, "prefix": "Task", "suffix": "days" }, { "value": 53, "label": 53, "prefix": "Task", "suffix": "days" }, { "value": 54, "label": 54, "prefix": "Task", "suffix": "days" }, { "value": 55, "label": 55, "prefix": "Task", "suffix": "days" }, { "value": 56, "label": 56, "prefix": "Task", "suffix": "days" }, { "value": 57, "label": 57, "prefix": "Task", "suffix": "days" }, { "value": 58, "label": 58, "prefix": "Task", "suffix": "days" }, { "value": 59, "label": 59, "prefix": "Task", "suffix": "days" },
//   { "value": 60, "label": 60, "prefix": "Task", "suffix": "days" }, { "value": 61, "label": 61, "prefix": "Task", "suffix": "days" }, { "value": 62, "label": 62, "prefix": "Task", "suffix": "days" }, { "value": 63, "label": 63, "prefix": "Task", "suffix": "days" }, { "value": 64, "label": 64, "prefix": "Task", "suffix": "days" }, { "value": 65, "label": 65, "prefix": "Task", "suffix": "days" }, { "value": 66, "label": 66, "prefix": "Task", "suffix": "days" }, { "value": 67, "label": 67, "prefix": "Task", "suffix": "days" }, { "value": 68, "label": 68, "prefix": "Task", "suffix": "days" }, { "value": 69, "label": 69, "prefix": "Task", "suffix": "days" },
//   { "value": 70, "label": 70, "prefix": "Task", "suffix": "days" }, { "value": 71, "label": 71, "prefix": "Task", "suffix": "days" }, { "value": 72, "label": 72, "prefix": "Task", "suffix": "days" }, { "value": 73, "label": 73, "prefix": "Task", "suffix": "days" }, { "value": 74, "label": 74, "prefix": "Task", "suffix": "days" }, { "value": 75, "label": 75, "prefix": "Task", "suffix": "days" }, { "value": 76, "label": 76, "prefix": "Task", "suffix": "days" }, { "value": 77, "label": 77, "prefix": "Task", "suffix": "days" }, { "value": 78, "label": 78, "prefix": "Task", "suffix": "days" }, { "value": 79, "label": 79, "prefix": "Task", "suffix": "days" },
//   { "value": 80, "label": 80, "prefix": "Task", "suffix": "days" }, { "value": 81, "label": 81, "prefix": "Task", "suffix": "days" }, { "value": 82, "label": 82, "prefix": "Task", "suffix": "days" }, { "value": 83, "label": 83, "prefix": "Task", "suffix": "days" }, { "value": 84, "label": 84, "prefix": "Task", "suffix": "days" }, { "value": 85, "label": 85, "prefix": "Task", "suffix": "days" }, { "value": 86, "label": 86, "prefix": "Task", "suffix": "days" }, { "value": 87, "label": 87, "prefix": "Task", "suffix": "days" }, { "value": 88, "label": 88, "prefix": "Task", "suffix": "days" }, { "value": 89, "label": 89, "prefix": "Task", "suffix": "days" },
//   { "value": 90, "label": 90, "prefix": "Task", "suffix": "days" }, { "value": 91, "label": 91, "prefix": "Task", "suffix": "days" }, { "value": 92, "label": 92, "prefix": "Task", "suffix": "days" }, { "value": 93, "label": 93, "prefix": "Task", "suffix": "days" }, { "value": 94, "label": 94, "prefix": "Task", "suffix": "days" }, { "value": 95, "label": 95, "prefix": "Task", "suffix": "days" }, { "value": 96, "label": 96, "prefix": "Task", "suffix": "days" }, { "value": 97, "label": 97, "prefix": "Task", "suffix": "days" }, { "value": 98, "label": 98, "prefix": "Task", "suffix": "days" }, { "value": 99, "label": 99, "prefix": "Task", "suffix": "days" }
// ]
 // }
  // prepareGrid() {
  //   this.columnDefinitions = [
  //     {
  //       id: 'title', name: 'Title', field: 'title',
  //       width: 70, minWidth: 50,
  //       cssClass: 'cell-title',
  //       filterable: true,
  //       sortable: true,
  //       grouping: {
  //         getter: 'title',
  //         formatter: (g) => `Title: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
  //         aggregators: [
  //           new Aggregators.Sum('cost')
  //         ],
  //         aggregateCollapsed: false,
  //         collapsed: false
  //       }
  //     },
  //     {
  //       id: 'duration', name: 'Duration', field: 'duration',
  //       width: 70,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.slider, operator: '>=' },
  //       type: FieldType.number,
  //       groupTotalsFormatter: GroupTotalFormatters.sumTotals,
  //       grouping: {
  //         getter: 'duration',
  //         formatter: (g) => `Duration: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
  //         comparer: (a, b) => {
  //           return this.durationOrderByCount ? (a.count - b.count) : Sorters.numeric(a.value, b.value, SortDirectionNumber.asc);
  //         },
  //         aggregators: [
  //           new Aggregators.Sum('cost')
  //         ],
  //         aggregateCollapsed: false,
  //         collapsed: false
  //       }
  //     },
  //     {
  //       id: 'percentComplete', name: '% Complete', field: 'percentComplete',
  //       minWidth: 70, width: 90,
  //       formatter: myCustomCheckmarkFormatter,
  //       type: FieldType.number,
  //       filterable: true,
  //       filter: { model: Filters.compoundSlider },
  //       sortable: true,
  //       groupTotalsFormatter: GroupTotalFormatters.avgTotalsPercentage,
  //       grouping: {
  //         getter: 'percentComplete',
  //         formatter: (g) => `% Complete:  ${g.value}  <span style="color:green">(${g.count} items)</span>`,
  //         aggregators: [
  //           new Aggregators.Sum('cost')
  //         ],
  //         aggregateCollapsed: false,
  //         collapsed: false
  //       },
  //       params: { groupFormatterPrefix: '<i>Avg</i>: ' }
  //     },
  //     {
  //       id: 'start', name: 'Start', field: 'start', minWidth: 60,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundDate },
  //       formatter: Formatters.dateIso,
  //       type: FieldType.dateUtc,
  //       outputType: FieldType.dateIso,
  //       exportWithFormatter: true,
  //       grouping: {
  //         getter: 'start',
  //         formatter: (g) => `Start: ${g.value}  <span style="color:green">(${g.count} items)</span>`,
  //         aggregators: [
  //           new Aggregators.Sum('cost')
  //         ],
  //         aggregateCollapsed: false,
  //         collapsed: false
  //       }
  //     },
  //     {
  //       id: 'finish', name: 'Finish', field: 'finish',
  //       minWidth: 60,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundDate },
  //       formatter: Formatters.dateIso,
  //       type: FieldType.dateUtc,
  //       outputType: FieldType.dateIso,
  //       exportWithFormatter: true,
  //       grouping: {
  //         getter: 'finish',
  //         formatter: (g) => `Finish: ${g.value} <span style="color:green">(${g.count} items)</span>`,
  //         aggregators: [
  //           new Aggregators.Sum('cost')
  //         ],
  //         aggregateCollapsed: false,
  //         collapsed: false
  //       }
  //     },
  //     {
  //       id: 'cost', name: 'Cost', field: 'cost',
  //       width: 90,
  //       sortable: true,
  //       filterable: true,
  //       filter: { model: Filters.compoundInput },
  //       formatter: Formatters.dollar,
  //       groupTotalsFormatter: GroupTotalFormatters.sumTotalsDollar,
  //       type: FieldType.number,
  //       grouping: {
  //         getter: 'cost',
  //         formatter: (g) => `Cost: ${g.value} <span style="color:green">(${g.count} items)</span>`,
  //         aggregators: [
  //           new Aggregators.Sum('cost')
  //         ],
  //         aggregateCollapsed: true,
  //         collapsed: true
  //       }
  //     },
  //     {
  //       id: 'effortDriven', name: 'Effort Driven', field: 'effortDriven',
  //       width: 80, minWidth: 20, maxWidth: 100,
  //       cssClass: 'cell-effort-driven',
  //       sortable: true,
  //       filterable: true,
  //       formatter: taskFormatter,
  //       type: FieldType.string,
  //       editor: {
  //         placeholder: 'choose option',
  //         collection: this.optionData,
  //         // OR a regular collection load
  //         // collection: Array.from(Array(100).keys()).map(k => ({ value: k, prefix: 'Task', label: k })),
  //         collectionSortBy: {
  //           property: 'label',
  //           sortDesc: true
  //         },
  //         customStructure: {
  //           label: 'label',
  //           value: 'value',
  //           labelPrefix: 'prefix',
  //         },
  //         collectionOptions: {
  //           separatorBetweenTextLabels: ' '
  //         },
  //         model: Editors.multipleSelect,
  //         required: true
  //       },
  //       filter: {
  //         collection: this.optionData,
  //         // OR a regular collection load
  //         // collection: Array.from(Array(100).keys()).map(k => ({ value: k, prefix: 'Task', label: k })),
  //         collectionSortBy: {
  //           property: 'label',
  //           sortDesc: true
  //         },
  //         customStructure: {
  //           label: 'label',
  //           value: 'value',
  //           labelPrefix: 'prefix',
  //         },
  //         collectionOptions: {
  //           separatorBetweenTextLabels: ' '
  //         },
  //         model: Filters.multipleSelect,
  //         operator: OperatorType.inContains,
  //       },
       
  //     },
  //     {
  //       id: 'Status', name: 'Delete', field: 'Delete',
  //       width: 10, minWidth: 20, maxWidth: 100,
  //       cssClass: 'cell-effort-driven',
  //       sortable: true,
  //       formatter: Formatters.deleteIcon,       
  //     }

  //   ];


  //   this.gridOptions = {
  //     autoResize: {
  //       containerId: 'demo-container',
  //       sidePadding: 10
  //     },
  //     enableDraggableGrouping: true,
  //     createPreHeaderPanel: true,
  //     showPreHeaderPanel: true,
  //     preHeaderPanelHeight: 40,
  //     enableFiltering: true,
  //     enableSorting: true,
  //     enableColumnReorder: true,
  //     autoEdit:false,
  //     editable: true,
  //     enableCellNavigation: true,
  //     enableColumnPicker: true,
  //     enableExcelCopyBuffer: true,
  //     exportOptions: {
  //       sanitizeDataExport: true
  //     },
  //     enablePagination: true,
  //     pagination: {
  //       pageSizes: [5, 10, 15, 20, 25, 30, 40, 50, 75, 100],
  //       pageSize: 5
  //     },
  //     gridMenu: {
  //       onCommand: (e, args) => {
  //         if (args.command === 'toggle-preheader') {
  //           // in addition to the grid menu pre-header toggling (internally), we will also clear grouping
  //           this.clearGrouping();
  //         }
  //       },
  //     },
  //     draggableGrouping: {
  //       dropPlaceHolderText: 'Drop a column header here to group by the column',
  //       // groupIconCssClass: 'fa fa-outdent',
  //       deleteIconCssClass: 'fa fa-times',
  //       onGroupChanged: (e, args) => this.onGroupChanged(args),
  //       onExtensionRegistered: (extension) => this.draggableGroupingPlugin = extension,
  //     }
  //   };

  //   // fill the dataset with your data
  //   this.dataset = [];
  //   for (let i = 0; i < 20; i++) {
  //     const randomYear = 2000 + Math.floor(Math.random() * 10);
  //     const randomMonth = Math.floor(Math.random() * 11);
  //     const randomDay = Math.floor((Math.random() * 28));
  //     const randomPercent = Math.round(Math.random() * 100);

  //     this.dataset[i] = {
  //       id: i + 1, // again VERY IMPORTANT to fill the "id" with unique values
  //       title: 'Task ' + (i + 1),
  //       //  title:["abc1","abc2","abc3"],
  //       duration: Math.round(Math.random() * 100) + '',
  //       percentComplete: randomPercent,
  //       start: `${randomMonth}/${randomDay}/${randomYear}`,
  //       finish: `${randomMonth}/${randomDay}/${randomYear}`,
  //       effortDriven: [],
        
  //     };
  //   }
  // }
  // deleteData(event) {
  //   alert(JSON.stringify(event))
  // }
  // SelectCellEditor() {

  // }
  // customRow(event,rw,st,rt) {
  //   debugger;
    
  //   let str = "";
  //   if (event % 2 == 0) {
  //     str = '<img src="./assets/img/cross.png" height=20 width=20>';
  //   }
  //   else {
      
  //     str = '<img src="./assets/img/tick.png" height=20 width=20>';
  //   }
  //   return str;
  // }

  // renderDifferentColspan(item: any) {
  //   if (item) {
  //     return {
  //       columns: {
  //         duration: {
  //           colspan: 3 // "duration" will span over 3 columns
  //         }
  //       }
  //     };
  //   }
  // }

  // onGroupChanged(change: { caller?: string; groupColumns: Grouping[] }) {
  //   debugger;
  //   // the "caller" property might not be in the SlickGrid core lib yet, reference PR https://github.com/6pac/SlickGrid/pull/303
  //   const caller = change && change.caller || [];
  //   const groups = change && change.groupColumns || [];

  //   if (Array.isArray(this.selectedGroupingFields) && Array.isArray(groups) && groups.length > 0) {
  //     // update all Group By select dropdown
  //     this.selectedGroupingFields.forEach((g, i) => this.selectedGroupingFields[i] = groups[i] && groups[i].getter || '');
  //   } else if (groups.length === 0 && caller === 'remove-group') {
  //     this.clearGroupingSelects();
  //   }
  // }

  // clearGrouping() {
  //   if (this.draggableGroupingPlugin && this.draggableGroupingPlugin.setDroppedGroups) {
  //     this.draggableGroupingPlugin.clearDroppedGroups();
  //   }
  //   this.gridObj.invalidate(); // invalidate all rows and re-render
  // }

  // clearGroupingSelects() {
  //   this.selectedGroupingFields.forEach((g, i) => this.selectedGroupingFields[i] = '');
  // }
  
//}
// const myCustomCheckmarkFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
//   let cellIcon;
//   if(dataContext.duration>=50){
//     cellIcon='<i style="color:green" class="fa fa-check" aria-hidden="true"></i>';
//   }
//   else{
//     cellIcon='<i style="color:red" class="fa fa-times" aria-hidden="true"></i>'
//   }
//   // you can return a string of a object (of type FormatterResultObject), the 2 types are shown below
//   return cellIcon;
// };

// const taskFormatter = (row, cell, value, columnDef, dataContext) => {
//   if (value && Array.isArray(value)) {
//     const taskValues = value.map((val) => `Task ${val}`);
//     const values = taskValues.join(', ');
//     return `<span title="${values}">${values}</span>`;
//   }
//   return '';
// };
