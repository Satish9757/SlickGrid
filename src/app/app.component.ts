import { Component } from '@angular/core';
import { Column, GridOption, Editors, Formatters, GroupTotalFormatters, FieldType } from 'angular-slickgrid';
import { LongTextEditor } from 'angular-slickgrid/app/modules/angular-slickgrid/editors/longTextEditor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SlickGridPOC';
  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  dataset: any[] = [];
  isSearch:boolean=true;
  isAddNewRoq:boolean=true;


  constructor() {
    this.prepareGrid();
  }
  prepareGrid() {
    this.columnDefinitions = [

      { id: 'title', name: 'Title', field: 'title', sortable: true, editor: this.SelectCellEditor,filterable:true },
      { id: 'duration', name: 'Duration (days)', field: 'duration', sortable: true, editor: { model: Editors.integer },filterable:true,},
      { id: '%', name: '% Complete', field: 'percentComplete', sortable: true, editor: { model: Editors.integer },filterable:true },
      { id: 'start', name: 'Start', field: 'start', editor: { model: Editors.date },filterable:true ,type: FieldType.date },
      { id: 'finish', name: 'Finish', field: 'finish', editor: { model: Editors.date },filterable:true },
      { id: 'action', name: '', field: 'Edit', formatter: Formatters.editIcon, width: 10 },
      { id: 'deleteAction', name: '', field: 'Delete', formatter: Formatters.deleteIcon, width: 10 },
    ];

    this.gridOptions = {
      editable: true,
      enableAddRow: true,
      enableCellNavigation: true,
      asyncEditorLoading: false,
      autoEdit: false,
      enableFiltering:true,
    //  enableGrouping: true,
    //  exportOptions: {
    //   sanitizeDataExport: true ,
    //  // you can also sanitize the exported data (it will remove any HTML tags)
    // }
    };

    // fill the dataset with your data
    this.dataset = [];
    for (let i = 0; i < 20; i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 28));
      const randomPercent = Math.round(Math.random() * 100);

      this.dataset[i] = {
        id: i + 1, // again VERY IMPORTANT to fill the "id" with unique values
        title: 'Task ' + (i + 1),
        duration: Math.round(Math.random() * 100) + '',
        percentComplete: randomPercent,
        start: `${randomMonth}/${randomDay}/${randomYear}`,
        finish: `${randomMonth}/${randomDay}/${randomYear}`,
        effortDriven: (i % 5 === 0)
      };
    }
  }
  deleteData(event) {
    alert(JSON.stringify(event))
  }
  SelectCellEditor(){

  }
}
