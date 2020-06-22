import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-row-details',
  templateUrl: './row-details.component.html',
  styleUrls: ['./row-details.component.scss']
})
export class RowDetailsComponent implements OnInit {
  model: {
    Category: string;
    ModelMaterial: string;
    InspireRecommendation:any[]
  };
  constructor() { }

  ngOnInit(): void {
  }

}
