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
  ExcelExportService,
  SelectedRange
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
      { id: 'ScopeboxName', name: 'SCOPEBOX', field: 'ScopeboxName', sortable: true, minWidth: 90, filterable: true, exportWithFormatter: true },
      { id: 'Level', name: 'LEVEL', field: 'Level', sortable: true, minWidth: 100, filterable: true ,exportWithFormatter: true },
      { id: 'Area', name: 'AREA', field: 'Area', sortable: true, minWidth: 90, filterable: true,exportWithFormatter: true  },
      { id: 'UOM', name: 'UOM', field: 'UOM', sortable: true, minWidth: 90, filterable: true },
      { id: 'Qty', name: 'QTY', field: 'Qty', minWidth: 100, filterable: true, sortable: true, },
      { id: 'SkuDescription', name: 'SUPPLIER CATALOG DESCRIPTION', field: 'SkuDescription', minWidth: 100, filterable: true, sortable: true, }
      ,
      { id: 'bomvalue', name: 'EAN / UPC', field: 'bomvalue', minWidth: 100, filterable: true, sortable: true, }
    ];

    // ----- Grid otions show & hide function 
    this.gridOptions = {
       enableExcelExport: true,     
      enablePagination: true,
      pagination: {
        pageSizes: [20, 50, 100],
        pageSize: 20
      },
      enableFiltering: true,
      // //enableRowDetailView: true,
      // rowSelectionOptions: {
      //   selectActiveRow: true
      // },
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 10
      },
      enableAutoResize: true,
      enableCellNavigation: true,
      showCustomFooter: true, // display some metrics in the bottom custom footer
      customFooterOptions: {
        // optionally display some text on the left footer container
        leftFooterText: 'custom footer text',
        hideTotalItemCount: true,
        hideLastUpdateTimestamp: true
      },
      enableExcelCopyBuffer: true,
      excelCopyBufferOptions: {
        onCopyCells: (e, args: { ranges: SelectedRange[] }) => console.log('onCopyCells', args.ranges),
        onPasteCells: (e, args: { ranges: SelectedRange[] }) => console.log('onPasteCells', args.ranges),
        onCopyCancelled: (e, args: { ranges: SelectedRange[] }) => console.log('onCopyCancelled', args.ranges),
      },
      //datasetIdPropertyName: 'id', // optionally use a different "id"
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
