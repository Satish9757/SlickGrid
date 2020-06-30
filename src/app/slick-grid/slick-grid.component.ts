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
import { CustomRowModel } from './customRowModel';
import { SlickGridService } from './slick-grid.service';

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
  @Output() downloadExcel = new EventEmitter();
  @Output() customRowStyle = new EventEmitter();
  customRowModel: CustomRowModel = new CustomRowModel();
  angularGrid: AngularGridInstance;
  dataSource = [];
  gridObj;
  dataviewObj;
  gridOptionLocal: GridOption = {};
  draggableGroupingPlugin: any;
  selectedGroupingFields: Array<string | GroupingGetterFunction> = ['', '', ''];
  constructor(private slickGridService: SlickGridService) { }

  ngOnInit(): void {

    this.gridOptions.enableExcelExport = true;
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
    // setTimeout(() => {
    debugger;
    this.dataviewObj.getItemMetadata = this.updateItemMetadataForDurationOver50(this.dataviewObj.getItemMetadata);
    //  }, 5000);
this.setCopyPaste();
  }

  onCellClicked(e, args) {
   
    //this.angularGrid = ins;
    const metadata = this.angularGrid.gridService.getColumnFromEventArguments(args);
    if(this.slickGridConfig.isOnClickCellAlert){
      this.slickGridService.changeAlert(metadata.dataContext);
    }
    
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

  exportToExcel() {
    if (this.slickGridConfig.downloadConfig && this.slickGridConfig.downloadConfig.isCustomDownload) {
      this.downloadExcel.emit();
    }
    else {
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + '_' + time;
      this.angularGrid.excelExportService.exportToExcel({ filename: this.slickGridConfig.downloadConfig.downloadFileName + dateTime.toString() });
    }
  }

  filterData(data) {
    this.slickGridConfig.dataSource = data;
  }

  replacedData(data) {
    debugger;
    this.slickGridConfig.dataSource = data;
    this.angularGrid.gridService.renderGrid();

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

  updateItemMetadataForDurationOver50(previousItemMetadata: any) {
    const newCssClass = 'duration-bg';

    return (rowNumber: number) => {
      this.customRowModel.dataView = this.dataviewObj;
      this.customRowModel.metaData = previousItemMetadata;
      this.customRowModel.rowNumber = rowNumber;
      this.customRowStyle.emit(this.customRowModel);
      let a = this.slickGridService.custRowRule;
      debugger;
      return a;
      // debugger;
      // const item = this.dataviewObj.getItem(rowNumber);
      // let meta = (previousItemMetadata(rowNumber) || {});
      // if (meta && item) {
      //   debugger;
      //   // convert to number
      //   if (item.Category === "Conduit Elbow") {
      //     meta.cssClasses = (meta.cssClasses || '') + ' ' + newCssClass;
      //   }
      //   else {
      //     meta.cssClasses = (meta.cssClasses || '');
      //   }
      // }
      // return meta;

    };

  }

  setCopyPaste(){
   let newRowIds = 0;
   let pluginOptions = {
    clipboardCommandHandler: function(editCommand){ this.undoRedoBuffer.queueAndExecuteCommand.call(this.undoRedoBuffer,editCommand); },
    readOnlyMode : false,
    includeHeaderWhenCopying : false,
    newRowCreator: function(count) {
      for (var i = 0; i < count; i++) {
        var item = {
          id: "newRow_" + this.newRowIds++
        }
        this.angularGrid.gridService.getData().addItem(item);
      }
    }
  };
  let undoRedoBuffer = {
    commandQueue : [],
    commandCtr : 0,

    queueAndExecuteCommand : function(editCommand) {
      this.commandQueue[this.commandCtr] = editCommand;
      this.commandCtr++;
      editCommand.execute();
    },

    undo : function() {
      if (this.commandCtr == 0) { return; }

      this.commandCtr--;
      var command = this.commandQueue[this.commandCtr];

      if (command && this.angularGrid.gridService.GlobalEditorLock.cancelCurrentEdit()) {
        command.undo();
      }
    },
    redo : function() {
      if (this.commandCtr >= this.commandQueue.length) { return; }
      var command = this.commandQueue[this.commandCtr];
      this.commandCtr++;
      if (command && this.angularGrid.gridService.GlobalEditorLock.cancelCurrentEdit()) {
        command.execute();
      }
    }
}
  }

}

