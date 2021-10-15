import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PropertieModel } from '../models/propertie.model ';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  
  OPTIONS = [
    {
      name: 'rotation',
      properties: [
        { name: 'flip', value: null, longname: 'Flip Axis', ph: 'h, v, or, hv' },
        { name: 'orient', value: null, longname: 'Orientation', ph: '[0 - 8], 90, 180, or 270' },
        { name: 'rot', value: null, longname: 'Rotation', ph: 'A number (e.g. 42)' },
      ]
    },
    {
      name: 'adjustment',
      properties: [
        { name: 'bri', value: null, longname: 'Brightness', ph: 'An integer (e.g. 3)' },
        { name: 'con', value: null, longname: 'Contrast', ph: 'An integer (e.g. 3)' },
        { name: 'exp', value: null, longname: 'Exposure', ph: 'An integer (e.g. 3)' },
        { name: 'gam', value: null, longname: 'Gamma', ph: 'An integer (e.g. 3)' },
        { name: 'high', value: null, longname: 'Highlight', ph: 'An integer (e.g. 3)' },
        { name: 'hue', value: null, longname: 'Hue Shift', ph: 'An integer (e.g. 3)' },
        { name: 'invert', value: null, longname: 'Invert', ph: 'True or false' },
        { name: 'sat', value: null, longname: 'Saturation', ph: 'An integer (e.g. 3)' },
        { name: 'shad', value: null, longname: 'Shadow', ph: 'A number (e.g. 42)' },
        { name: 'sharp', value: null, longname: 'Sharpen', ph: 'An integer (e.g. 3)' },
        { name: 'usm', value: null, longname: 'Unsharp Mask', ph: 'An integer (e.g. 3)' },
        { name: 'usmrad', value: null, longname: 'Unsharp Mask Radius', ph: 'A number (e.g. 42)' },
        { name: 'vib', value: null, longname: 'Vibrance', ph: 'An integer (e.g. 3)' },
      ]
    },
  ];
  DEFAULT_PROPS = [
    {
      name: 'fit',
      value: 'crop',
      longname: 'Resize Fit Mode',
      ph: null,
    },
    {
      name: 'h',
      value: 400,
      longname: 'Image Height',
      ph: null,
    },
    {
      name: 'max-w',
      value: 1000,
      longname: 'Maximum Width',
      ph: null,
    },
  ];

  private propSelected = new BehaviorSubject<PropertieModel>(new PropertieModel);
  prop: Observable<PropertieModel> = this.propSelected.asObservable();

  private properties = new BehaviorSubject<PropertieModel[]>([]);
  props: Observable<PropertieModel[]> = this.properties.asObservable();

  constructor() {
  }

  updateProperties(props: PropertieModel[]) {
    this.properties.next(props);
    this.props.subscribe(pp => {
      console.log(pp);
    });
  }

  // updatePropSelected(prop: PropertieModel) {
  //   this.propSelected.next(prop);
  //   this.props.subscribe(pp => {
  //     console.log(pp);
  //   });
  // }

  // updateProperties(props: PropertieModel[]) {
  //   this.properties.next({...props});
  //   this.props.subscribe(pp => {
  //     console.log(pp);
  //   });
  // }

}
