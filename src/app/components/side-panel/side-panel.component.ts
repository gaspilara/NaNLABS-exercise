import { Component, Input, OnInit } from '@angular/core';
import { PropertieModel } from 'src/app/models/propertie.model ';
import { PropertiesService } from 'src/app/services/properties.service';

interface Option {
  name: string,
  properties: PropertieModel[];
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
  @Input() side: string;

  constructor(private propertiesService: PropertiesService) { }

  ngOnInit(): void {
    this.options = this.propertiesService.OPTIONS;
    this.propertiesService.props.subscribe(props => {
      this.properties = props;
      this.properties = this.propertiesService.DEFAULT_PROPS;
    });
  }

  addPropertie(propertie: PropertieModel, value: any) {
    this.propertieSelect = propertie;
    this.propertieSelect.value = value;

    let props: PropertieModel[] = [...this.properties, this.propertieSelect];
    this.propertiesService.updateProperties(props);
    
    this.properties.push(this.propertieSelect);
  }

}
