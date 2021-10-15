import { DoCheck } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ImageModel } from 'src/app/models/image.model';
import { PropertieModel } from 'src/app/models/propertie.model ';
import { ImageService } from 'src/app/services/image.service';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.css']
})
export class ImageCanvasComponent implements OnInit, DoCheck {

  imageSelect: ImageModel = new ImageModel();
  properties: PropertieModel[];
  loading: boolean = true;

  constructor(private imageService: ImageService, private propertiesService: PropertiesService) {
  }

  ngOnInit(): void {
    this.imageService.img.subscribe(img => {
      this.loading = true;
      this.imageSelect = img;
      this.propertiesService.props.subscribe(props => {
        this.properties = props;
        this.properties = this.propertiesService.DEFAULT_PROPS;
        this.setImageURL();
        this.loading = false;
      });
    });
  }
  
  setImageURL() {
    this.imageService.setImageURL(this.imageSelect, this.properties);
  }
  
  ngDoCheck() {
    this.setImageURL();
  }

}
