import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Column, GridOption, AngularGridInstance, Editors ,Grouping} from 'angular-slickgrid';

@Component({
  selector: 'app-slick-grid',
  templateUrl: './slick-grid.component.html',
  styleUrls: ['./slick-grid.component.scss']
})
export class SlickGridComponent implements OnInit {
  dataView :any;
  @Input() columnDefinitions: Column[] = [];
  @Input() gridOptions: GridOption = {};
  @Input() dataset: any[] = [];
  @Output() deleteData = new EventEmitter();
  @Input() isSearchEnabled:boolean;
  @Input() isAddNewRow:boolean;
  angularGrid: AngularGridInstance;
  dataSource = [];
  constructor() { }

  ngOnInit(): void {

  }
  angularGridReady(_angularGrid: AngularGridInstance) {
    this.angularGrid = _angularGrid;
    this.dataSource = this.angularGrid.dataView.getItems();
  }
  onCellClicked(e, args) {
    debugger;
    //this.angularGrid = ins;
    const metadata = this.angularGrid.gridService.getColumnFromEventArguments(args);
    if (metadata.columnDef.field === "Delete") {
      //call delete function
      this.deleteRow(metadata.dataContext);
    }
    metadata.grid.editActiveCell();
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

  filterData(data) {
    debugger;
    this.dataset = data;
  }

  // sumTotalsFormatter(totals, columnDef) {
  //   var val = totals.sum && totals.sum[columnDef.field];
  //   if (val != null) {
  //     return "total: " + ((Math.round(parseFloat(val)*100)/100));
  //   }
  //   return "";
  // }

  // groupByDuration() {
  //   this.dataView.setGrouping({
  //     getter: "duration",
  //     formatter: function (g) {
  //       return "Duration:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
  //     },
 
  //     aggregateCollapsed: false,
  //     lazyTotalsCalculation: true
  //   });
  // }

}
