import { Component, OnChanges, OnInit } from '@angular/core';
import { ImageModel } from 'src/app/models/image.model';
import { PropertieModel } from 'src/app/models/propertie.model ';
import { ImageService } from 'src/app/services/image.service';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-history-control',
  templateUrl: './history-control.component.html',
  styleUrls: ['./history-control.component.css']
})
export class HistoryControlComponent implements OnInit, OnChanges {

  properties: PropertieModel[];
  _properties: PropertieModel[];
  imageSelect: ImageModel;

  constructor(private imageService: ImageService, private propertiesService: PropertiesService) { }

  ngOnInit(): void {
    this.imageService.img.subscribe(img => this.imageSelect = img);
    this.propertiesService.props.subscribe(props => {
      this.properties = props;
      this.properties = this.propertiesService.DEFAULT_PROPS;
    });
  }

  undoPropertie() {
    this._properties = this.properties;
    if (this.properties.length > 3) { // 3 = DEFAULT_PROPS.length;
      this._properties.pop();
    };
    this.imageService.setImageURL(this.imageSelect, this._properties);
    this.properties = this._properties;
  }

  redoPropertie() {

  }

  ngOnChanges() {

  }

}
