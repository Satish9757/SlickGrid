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
  Formatter,
  ExcelExportService
} from 'angular-slickgrid';
import { HttpClient } from '@angular/common/http';
import { SlickGridConfig } from 'src/app/slick-grid/slickgrid.config';
import { SlickGridService } from 'src/app/slick-grid/slick-grid.service';

@Component({
  selector: 'app-supplier-bom',
  templateUrl: './supplier-bom.component.html',
  styleUrls: ['./supplier-bom.component.scss']
})
export class SupplierBOMComponent implements OnInit {
  slickGridConfig: SlickGridConfig;
  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  ELEMENT_DATA: any[] = [];

  constructor(private _httpClient: HttpClient,private slickGridService: SlickGridService) { }

  ngOnInit(): void {
    this.slickGridConfig = new SlickGridConfig();
    this.prepareGrid();
    this.generateGridData();
  }

  prepareGrid() {
    this.columnDefinitions = [
      { id: 'Description', name: 'ITEM', field: 'Description', sortable: true, width: 70, filterable: false,  },
      { id: 'ScopeboxName', name: 'SCOPEBOX', field: 'ScopeboxName', sortable: true, minWidth: 90, filterable: true, },
      { id: 'Level', name: 'LEVEL', field: 'Level', sortable: true, minWidth: 100, filterable: true },
      { id: 'Area', name: 'AREA', field: 'Area', sortable: true, minWidth: 90, filterable: true },
      { id: 'UOM', name: 'UOM', field: 'UOM', sortable: true, minWidth: 90, filterable: true },
      { id: 'Qty', name: 'QTY', field: 'Qty', minWidth: 100, filterable: true, sortable: true, },
      { id: 'SkuDescription', name: 'SUPPLIER CATALOG DESCRIPTION', field: 'SkuDescription', minWidth: 100, filterable: true, sortable: true, }
      ,
      { id: 'bomvalue', name: 'EAN / UPC', field: 'bomvalue', minWidth: 100, filterable: true, sortable: true, }
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
      //enableRowDetailView: true,
      rowSelectionOptions: {
        selectActiveRow: true
      },
      datasetIdPropertyName: 'id', // optionally use a different "id"
      // rowDetailView: {
      //   process: (item) => this.simulateServerAsyncCall(item),
      //   loadOnce: true,
      //   singleRowExpand: false,
      //   useRowClick: true,
      //   panelRows: this.detailViewRowCount,
      //   viewComponent: RowDetailsComponent,
      //   parent: this
      // },
    };
  }
  private generateGridData() {
    debugger
    this._httpClient.get("assets/SupplierData.json").subscribe((dt: any[]) => {
      let id = 0;
      dt.forEach(element => {
        this.ELEMENT_DATA.push({
          id: id++,          
          Description: element.Description,
          ScopeboxName: element.ScopeboxName,
          Level: element.Level,
          Area:element.Area,
          UOM:element.UOM,
          Qty:element.Qty !='0' ? element.Qty : ' ',
          SanveoPartId:element.SanveoPartId,
          SkuDescription:element.SkuDescription,        
          
        })
      });
      this.slickGridConfig.dataSource = this.ELEMENT_DATA;
      this.slickGridConfig.searchConfig.dataSource = this.ELEMENT_DATA;
      this.slickGridConfig.findReplaceConfig.dataSource = this.ELEMENT_DATA;

    })
  }
  

}
