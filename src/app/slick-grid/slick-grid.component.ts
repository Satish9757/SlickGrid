import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
} from 'angular-slickgrid';
import { SlickGridConfig } from './slickgrid.config';

@Component({
  selector: 'app-slick-grid',
  templateUrl: './slick-grid.component.html',
  styleUrls: ['./slick-grid.component.scss']
})
export class SlickGridComponent implements OnInit {
  dataView: any;
  @Input() columnDefinitions: Column[] = [];
  @Input() gridOptions: GridOption = {};
  @Output() deleteData = new EventEmitter();
  @Input() isSearchEnabled: boolean;
  @Input() isAddNewRow: boolean;
  @Input() slickGridConfig: SlickGridConfig;
  angularGrid: AngularGridInstance;
  dataSource = [];
  gridObj;
  dataviewObj;
  gridOptionLocal: GridOption = {};
  draggableGroupingPlugin: any;
  selectedGroupingFields: Array<string | GroupingGetterFunction> = ['', '', ''];
  constructor() { }

  ngOnInit(): void {

    this.gridOptions.enableExcelExport=true;
    this.gridOptionLocal = this.gridOptions;

  }


  angularGridReady(_angularGrid: AngularGridInstance) {
    const obj1 = {
      onCommand: (e, args) => {
        if (args.command === 'toggle-preheader') {
          // in addition to the grid menu pre-header toggling (internally), we will also clear grouping
          this.clearGrouping();
        }
      },
    }
    const obj2 = {
      dropPlaceHolderText: 'Drop a column header here to group by the column',
      // groupIconCssClass: 'fa fa-outdent',
      deleteIconCssClass: 'fa fa-times',
      onGroupChanged: (e, args) => this.onGroupChanged(args),
      onExtensionRegistered: (extension) => this.draggableGroupingPlugin = extension,

    }
    this.gridOptionLocal["gridMenu"] = obj1;
    this.gridOptionLocal["draggableGrouping"] = obj2;
    this.angularGrid = _angularGrid;
    this.dataSource = this.angularGrid.dataView.getItems();
    this.gridObj = _angularGrid.slickGrid;
    this.dataviewObj = _angularGrid.dataView;
   

  }
  onCellClicked(e, args) {
    //this.angularGrid = ins;
    const metadata = this.angularGrid.gridService.getColumnFromEventArguments(args);
    if (metadata.columnDef.field === "Delete") {
      //call delete function
      this.deleteRow(metadata.dataContext);
    }
    this.angularGrid.gridService.highlightRow(args.row, 1500);

  }

  AddNewRow() {
    let data = this.angularGrid.gridService.getAllColumnDefinitions();
    var obj = {};
    data.map(m => m.name).forEach(element => {
      obj[element] = undefined;
    });
    obj["id"] = this.angularGrid.dataView.getItems().length + 1;
    this.angularGrid.gridService.addItem(obj);
  }

  deleteRow(data) {
    if (confirm("are you sure want to delete??")) {
      this.deleteData.emit(data)
      this.angularGrid.gridService.deleteItemById(data.id);

    }

  }

  exportToExcel(){
    debugger;
    this.angularGrid.excelExportService.exportToExcel({ filename: this.slickGridConfig.downloadFileName+Date.now });
  }

  filterData(data) {
    this.slickGridConfig.dataSource = data;
  }
  findReplace(data) {
    this.slickGridConfig.dataSource = data;

  }

  clearGrouping() {

  }

  public renderGrid() {
    this.angularGrid.gridService.renderGrid();
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

  clearGroupingSelects() {
    this.selectedGroupingFields.forEach((g, i) => this.selectedGroupingFields[i] = '');
  }

  groupByFieldName(fieldName) {
    debugger;
    this.clearGrouping();
    if (this.draggableGroupingPlugin && this.draggableGroupingPlugin.setDroppedGroups) {
      // get the field names from Group By select(s) dropdown, but filter out any empty fields
      const groupedFields = [];// = this.selectedGroupingFields.filter((g) => g !== '');
      groupedFields.push(fieldName);
      this.showPreHeader();
      this.draggableGroupingPlugin.setDroppedGroups(groupedFields);
      // this.gridObj.invalidate(); // invalidate all rows and re-render
    }
  }

  showPreHeader() {
    this.gridObj.setPreHeaderPanelVisibility(true);
  }
}
