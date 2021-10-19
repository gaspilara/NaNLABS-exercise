import { Component, OnInit } from '@angular/core';
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

  constructor(private imageService: ImageService, private propertiesService: PropertiesService) {
    this.images = this.imageService.images;
    this.imageService.img.subscribe(img => this.imageSelect = img);
  }

  ngOnInit(): void {
  }
  
  selectImage(img: ImageModel) {
    this.imageService.updateImgSelected(img);
    this.propertiesService.updateProperties(this.propertiesService.DEFAULT_PROPS);
    this.imageService.buildURL(img, this.propertiesService.DEFAULT_PROPS);
  }

}
