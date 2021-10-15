import { Component, OnInit } from '@angular/core';
import { PropertieModel } from 'src/app/models/propertie.model ';
import { ImageService } from 'src/app/services/image.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { ImageModel } from '../../models/image.model';

@Component({
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.css']
})
export class BottompanelComponent implements OnInit {

  images: ImageModel[];
  imageSelect: ImageModel;
  properties: PropertieModel[];

  constructor(private imageService: ImageService, private propertiesService: PropertiesService) { }

  ngOnInit(): void {
    this.images = this.imageService.images;
    this.imageService.img.subscribe(img => this.imageSelect = img);
    this.propertiesService.props.subscribe(props => this.properties = props);
  }
  
  selectImage(img: ImageModel) {
    this.imageService.updateImgSelected(img);
    this.imageService.img.subscribe(imgSelected => {
      this.properties = this.propertiesService.DEFAULT_PROPS;
      this.imageSelect = imgSelected;
    });
  }

}
