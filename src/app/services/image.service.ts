import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageModel } from '../models/image.model';
import { ImgixSamples } from '../../assets/imgix-samples-list';
import { PropertieModel } from '../models/propertie.model ';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  images: ImageModel[] = ImgixSamples;
  DEFAULT_IMAGE: ImageModel = this.images[Math.floor(Math.random() * this.images.length-1)];

  private imgSelected = new BehaviorSubject<ImageModel>(new ImageModel);
  img: Observable<ImageModel> = this.imgSelected.asObservable();

  constructor() {
    this.updateImgSelected(this.DEFAULT_IMAGE);
  }

  updateImgSelected(img: ImageModel) {
    this.imgSelected.next(img);
  }
  
  setImageURL(img: ImageModel, props: PropertieModel[]) {
    img.url = `${img.url}?`
    for (let prop of props) {
      img.url += `${prop.name}=${prop.value}&`
    }
  }
  
}
