
import { Component, Injectable, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http';
// import { TranslateService } from '@ngx-translate/core';
import {
  AngularGridInstance,
  AutocompleteOption,
  Column,
  Editors,
  EditorArgs,
  EditorValidator,
  FieldType,
  Filters,
  FlatpickrOption,
  Formatters,
  GridOption,
  OnEventArgs,
  OperatorType,
  Sorters,
}  from 'angular-slickgrid';
// import { CustomInputEditor } from './custom-inputEditor';
// import { CustomInputFilter } from './custom-inputFilter';
import { Subject } from 'rxjs';
import { SlickGridConfig } from '../slick-grid/slickgrid.config';

// using external non-typed js libraries
declare const Slick: any;
declare const $: any;

const NB_ITEMS = 100;
const URL_SAMPLE_COLLECTION_DATA = 'assets/data/collection_100_numbers.json';
const URL_COUNTRIES_COLLECTION = 'assets/data/countries.json';
const URL_COUNTRY_NAMES = 'assets/data/country_names.json';

// you can create custom validator to pass to an inline editor
const myCustomTitleValidator: EditorValidator = (value: any, args: EditorArgs) => {
  // you can get the Editor Args which can be helpful, e.g. we can get the Translate Service from it
  const grid = args && args.grid;
  const gridOptions = (grid && grid.getOptions) ? grid.getOptions() : {};

  // to get the editor object, you'll need to use "internalColumnEditor"
  // don't use "editor" property since that one is what SlickGrid uses internally by it's editor factory
  const columnEditor = args && args.column && args.column.internalColumnEditor;

  if (value === null || value === undefined || !value.length) {
    return { valid: false, msg: 'This is a required field' };
  } else if (!/^Task\s\d+$/.test(value)) {
    return { valid: false, msg: 'Your title is invalid, it must start with "Task" followed by a number' };
    // OR use the Translate Service with your custom message
    // return { valid: false, msg: translate.instant('YOUR_ERROR', { x: value }) };
  }
  return { valid: true, msg: '' };
};

// create a custom Formatter to show the Task + value
const taskFormatter = (row, cell, value, columnDef, dataContext) => {
  debugger
  if (value && Array.isArray(value)) {
    const taskValues = value.map((val) => `Task ${val}`);
    const values = taskValues.join(', ');
    return `<span title="${values}">${values}</span>`;
  }
  return '';
};
@Component({
  selector:'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  
  slickGridConfig: SlickGridConfig;
  private _commandQueue = [];
  angularGrid: AngularGridInstance;
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];
  gridObj: any;
  isAutoEdit = true;
  alertWarning: any;
  updatedObject: any;
  selectedLanguage = 'en';
  duplicateTitleHeaderCount = 1;
  dataViewObj:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    
    this.slickGridConfig = new SlickGridConfig();
    this.prepareGrid();
    this.setSlickConfig();
    //private translate: TranslateService
  }

  private setSlickConfig() {

  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
    this.dataViewObj = angularGrid.dataView;
  }

  prepareGrid() {
    this.columnDefinitions = [
 {
        id: 'title',
        name: 'Title',
        field: 'title',
        minWidth: 100,
        filterable: true,
        sortable: true,
        type: FieldType.string,
        queryFieldSorter: 'id',
        formatter: Formatters.tree,
        editor: {
          model: Editors.text,
          required: true,
          validator: myCustomTitleValidator, // use a custom validator
        },
        onCellChange: (e: Event, args: OnEventArgs) => {
          console.log(args);
          this.alertWarning = `Updated Title: ${args.dataContext.title}`;
        }
      }, {
        id: 'title2',
        name: 'Title, Custom Editor',
        field: 'title',
        minWidth: 70,
        filterable: true,
        sortable: true,
        type: FieldType.string,
        editor: {
          model: Editors.text,
          required: true,
          validator: myCustomTitleValidator, // use a custom validator
        },
      }, {
        id: 'duration',
        name: 'Duration (days)',
        field: 'duration',
        minWidth: 100,
        filterable: true,
        sortable: true,
        type: FieldType.float,
        exportWithFormatter: true,
        editor: {
          model: Editors.float,
          minValue: 0,
          maxValue: 100,
          // params: { hideSliderNumber: true },
        },

      }, {
        id: 'start',
        name: 'Start',
        field: 'start',
        minWidth: 100,
        filterable: true,
        filter: { model: Filters.compoundDate },
        formatter: Formatters.multiple,
        params: {
          formatters: [Formatters.complexObject, Formatters.dateIso]
        },
        exportWithFormatter: true,
        sortable: true,
        type: FieldType.date,
        editor: {
          model: Editors.date
        },
      }, {
        id: 'finish',
        name: 'Finish',
        field: 'finish',
        minWidth: 100,
        filterable: true,
        sortable: true,
        filter: { model: Filters.compoundDate },
        formatter: Formatters.dateIso,
        exportWithFormatter: true,
        type: FieldType.date,
        editor: {
          model: Editors.date,
          // override any of the Flatpickr options through "editorOptions"
          // please note that there's no TSlint on this property since it's generic for any filter, so make sure you entered the correct filter option(s)
          editorOptions: { minDate: 'today' } as FlatpickrOption
        },
      }, 
       {
        id: 'countryOfOrigin', name: 'Country of Origin', field: 'countryOfOrigin',
        formatter: Formatters.complexObject,
        exportWithFormatter: true,
        dataKey: 'code',
        labelKey: 'name',
        type: FieldType.object,
        sorter: Sorters.objectString, // this sorter requires the dataKey and assume that obj1[dataKey] will be a string so it can sort it that way
        filterable: true,
        sortable: true,
        minWidth: 100,
        editor: {
          model: Editors.autoComplete,
          customStructure: { label: 'name', value: 'code' },
          collectionAsync: this.http.get(URL_COUNTRIES_COLLECTION),
        },
        filter: {
          model: Filters.autoComplete,
          customStructure: { label: 'name', value: 'code' },
          collectionAsync: this.http.get(URL_COUNTRIES_COLLECTION),
        }
      }, {
        id: 'countryOfOriginName', name: 'Country of Origin Name', field: 'countryOfOriginName',
        filterable: true,
        sortable: true,
        minWidth: 100,
        type: FieldType.string,
        editor: {
          placeholder: 'Choose Country',
         model: Editors.singleSelect,
          collectionAsync: this.http.get<{ value: string; label: string;}[]>(URL_COUNTRY_NAMES),        
          required: true
        },
        filter: {
          model: Filters.autoComplete,
          collectionAsync: this.http.get(URL_COUNTRY_NAMES),
        }
      },  {
        id: 'prerequisites',
        name: 'Prerequisites',
        field: 'prerequisites',
        minWidth: 100,
        filterable: true,
        formatter: taskFormatter,
        exportWithFormatter: true,
        sanitizeDataExport: true,
        sortable: true,
        type: FieldType.string,
        editor: {
          placeholder: 'choose option',
          collectionAsync: this.http.get<{ value: string; label: string; }[]>(URL_SAMPLE_COLLECTION_DATA),
          // OR a regular collection load
          // collection: Array.from(Array(100).keys()).map(k => ({ value: k, prefix: 'Task', label: k })),
          collectionSortBy: {
            property: 'label',
            sortDesc: true
          },
          customStructure: {
            label: 'label',
            value: 'value',
            labelPrefix: 'prefix',
          },
          collectionOptions: {
            separatorBetweenTextLabels: ' '
          },
          model: Editors.multipleSelect,
          required: true
        },
        filter: {
          collectionAsync: this.http.get<{ value: string; label: string; }[]>(URL_SAMPLE_COLLECTION_DATA),
          // OR a regular collection load
          // collection: Array.from(Array(100).keys()).map(k => ({ value: k, prefix: 'Task', label: k })),
          collectionSortBy: {
            property: 'label',
            sortDesc: true
          },
          customStructure: {
            label: 'label',
            value: 'value',
            labelPrefix: 'prefix',
          },
          collectionOptions: {
            separatorBetweenTextLabels: ' '
          },
          model: Filters.multipleSelect,
          operator: OperatorType.inContains,
        }
      }
    ];

    this.gridOptions = {
      asyncEditorLoading: false,
      autoEdit: this.isAutoEdit,
      autoCommitEdit: false,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 10
      },
      editable: true,
      enableCellNavigation: true,
      enableColumnPicker: true,
      enableExcelCopyBuffer: true,
      enableFiltering: true,
      alwaysShowVerticalScroll: false,
      frozenColumn: 0,
     frozenRow: -1,
      editCommandHandler: (item, column, editCommand) => {
        this._commandQueue.push(editCommand);
        editCommand.execute();
      },
      enableAutoSizeColumns: true,
      enableAutoResize: true,     
      enableTreeData: true,
      treeDataOptions: {
        columnId: 'title',
        levelPropName: 'indent',
        parentPropName: 'parentId'
      },
      headerRowHeight: 45,
      rowHeight: 40,
      
    };

    this.slickGridConfig.dataSource =  this.mockData(NB_ITEMS);
  }


  mockData(itemCount, startingIndex = 0) {
    let indent = 0;
    const parents = [];
    const data = [];
    // mock a dataset
    const tempDataset = [];
    for (let i = startingIndex; i < (startingIndex + itemCount); i++) {
      const randomYear = 2000 + Math.floor(Math.random() * 10);
      const randomFinishYear = (new Date().getFullYear() - 3) + Math.floor(Math.random() * 10); // use only years not lower than 3 years ago
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomPercent = Math.round(Math.random() * 100);
      const randomFinish = new Date(randomFinishYear, (randomMonth + 1), randomDay);
      let parentId;
      // for implementing filtering/sorting, don't go over indent of 2
      if (Math.random() > 0.8 && i > 0 && indent < 3) {
        indent++;
        parents.push(i - 1);
      } else if (Math.random() < 0.3 && indent > 0) {
        indent--;
        parents.pop();
      }

      if (parents.length > 0) {
        parentId = parents[parents.length - 1];
      } else {
        parentId = null;
      }

      tempDataset.push({
        id: i,
        indent:indent,
        parentId:parentId,
        title: 'Task ' + i,
        duration: (i % 33 === 0) ? null : Math.round(Math.random() * 100) + '',
        start: new Date(randomYear, randomMonth, randomDay),
        percentComplete: randomPercent,
        percentCompleteNumber: randomPercent,
        finish: randomFinish < new Date() ? '' : randomFinish, // make sure the random date is earlier than today
        effortDriven: (i % 5 === 0),
        prerequisites: (i % 2 === 0) && i !== 0 && i < 12 ? [i, i - 1] : [],
        countryOfOrigin: (i % 2) ? { code: 'CA', name: 'Canada' } : { code: 'US', name: 'United States' },
        countryOfOriginName: (i % 2) ? 'Canada' : 'United States',
        cityOfOrigin: (i % 2) ? 'Vancouver, BC, Canada' : 'Boston, MA, United States',
      });
    }
    return tempDataset;
  }

  onCellChanged(e, args) {
    this.updatedObject = args.item;
  }

  onCellClicked(e, args) {
    const metadata = this.angularGrid.gridService.getColumnFromEventArguments(args);
    console.log(metadata);

    if (metadata.columnDef.id === 'edit') {
      this.alertWarning = `open a modal window to edit: ${metadata.dataContext.title}`;

      // highlight the row, to customize the color, you can change the SASS variable $row-highlight-background-color
      this.angularGrid.gridService.highlightRow(args.row, 1500);

      // you could also select the row, when using "enableCellNavigation: true", it automatically selects the row
      // this.angularGrid.gridService.setSelectedRow(args.row);
    } else if (metadata.columnDef.id === 'delete') {
      if (confirm('Are you sure?')) {
        this.angularGrid.gridService.deleteItemById(metadata.dataContext.id);
      }
    }
  }

  onValidationError(e, args) {
    alert(args.validationResults.msg);
  }

  changeAutoCommit() {
    this.gridOptions.autoCommitEdit = !this.gridOptions.autoCommitEdit;
    this.gridObj.setOptions({
      autoCommitEdit: this.gridOptions.autoCommitEdit
    });
    return true;
  }

  dynamicallyAddTitleHeader() {
    const newCol = {
      id: `title${this.duplicateTitleHeaderCount++}`,
      name: 'Title',
      field: 'title',
      editor: {
        model: Editors.text,
        required: true,
        validator: myCustomTitleValidator, // use a custom validator
      },
      sortable: true, minWidth: 100, filterable: true, params: { useFormatterOuputToFilter: true }
    };

    // you can dynamically add your column to your column definitions
    // and then use the spread operator [...cols] OR slice to force Angular to review the changes
    this.columnDefinitions.push(newCol);
    this.columnDefinitions = this.columnDefinitions.slice(); // or use spread operator [...cols]

    // NOTE if you use an Extensions (Checkbox Selector, Row Detail, ...) that modifies the column definitions in any way
    // you MUST use "getAllColumnDefinitions()" from the GridService, using this will be ALL columns including the 1st column that is created internally
    // for example if you use the Checkbox Selector (row selection), you MUST use the code below
    /*
    const allColumns = this.angularGrid.gridService.getAllColumnDefinitions();
    allColumns.push(newCol);
    this.columnDefinitions = [...allColumns]; // (or use slice) reassign to column definitions for Angular to do dirty checking
    */
  }

  dynamicallyRemoveLastColumn() {
    this.columnDefinitions.pop();
    this.columnDefinitions = this.columnDefinitions.slice();

    // NOTE if you use an Extensions (Checkbox Selector, Row Detail, ...) that modifies the column definitions in any way
    // you MUST use the code below, first you must reassign the Editor facade (from the internalColumnEditor back to the editor)
    // in other words, SlickGrid is not using the same as Angular-Slickgrid uses (editor with a "model" and other properties are a facade, SlickGrid only uses what is inside the model)
    /*
    const allColumns = this.angularGrid.gridService.getAllColumnDefinitions();
    const allOriginalColumns = allColumns.map((column) => {
      column.editor = column.internalColumnEditor;
      return column;
    });

    // remove your column the full set of columns
    // and use slice or spread [...] to trigger an Angular dirty change
    allOriginalColumns.pop();
    this.columnDefinitions = allOriginalColumns.slice();
    */
  }

  setAutoEdit(isAutoEdit) {
    this.isAutoEdit = isAutoEdit;
    this.gridObj.setOptions({ autoEdit: isAutoEdit }); // change the grid option dynamically
    return true;
  }

  undo() {
    const command = this._commandQueue.pop();
    const item = this.angularGrid.dataView.getItem(command.row);
    if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
      command.undo();
      this.gridObj.gotoCell(command.row, command.cell, false);
    }
  }
}
