import { FindReplaceConfig } from '../FindReplace/find-replace/find-replace.config';
import { SearchConfig } from '../search/search.config';

 export class SlickGridConfig{
constructor(){}
    isSearch:boolean=false;
    dataSource:any[];
    isFindReaplce:boolean=false;
    findReplaceConfig:FindReplaceConfig=new FindReplaceConfig();
    searchConfig:SearchConfig=new SearchConfig();
}