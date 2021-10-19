import { Component, Input, OnInit } from '@angular/core';
import { PropertieModel } from 'src/app/models/propertie.model ';
import { HistoryService } from 'src/app/services/history.service';
import { PropertiesService } from 'src/app/services/properties.service';

interface Option {
  name,
  properties: PropertieModel[];
  id;
};

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidepanelComponent implements OnInit {

  options: Option[];
  propertieSelect: PropertieModel = new PropertieModel();
  properties: PropertieModel[] = [];
  history: PropertieModel[];
  @Input() side: string;

  constructor(private propertiesService: PropertiesService, private historyService: HistoryService) { }

  ngOnInit(): void {
    this.options = this.propertiesService.OPTIONS;
    this.propertiesService.props.subscribe(props => {
      this.properties = props;
      this.properties = this.propertiesService.DEFAULT_PROPS;
    });
    this.historyService.history.subscribe(h => this.history = h);
  }

  addPropertie(propertie: PropertieModel, value: any) {
    this.propertieSelect = propertie;
    this.propertieSelect.value = value;
    let props: PropertieModel[] = [...this.properties, this.propertieSelect];
    this.propertiesService.updateProperties(props);
    this.properties.push(this.propertieSelect);
    this.historyService.updateHistory(this.properties);
  }

}
