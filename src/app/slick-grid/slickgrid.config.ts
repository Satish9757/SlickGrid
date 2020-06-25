import { FindReplaceConfig } from '../FindReplace/find-replace/find-replace.config';
import { SearchConfig } from '../search/search.config';
import { CustomRowModel } from './customRowModel';

 export class SlickGridConfig{
constructor(){}
    downloadConfig:DownLoadConfig=new DownLoadConfig();
    isSearch:boolean=false;
    dataSource:any[];
    isFindReaplce:boolean=false;
    isCustomRowStyle:boolean=false;
    findReplaceConfig:FindReplaceConfig=new FindReplaceConfig();
    searchConfig:SearchConfig=new SearchConfig();
    customRowData:any;

}
export class DownLoadConfig{
    downloadFileName?:string="Download";
    isCustomDownload?:boolean=false;
}