import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PropertieModel } from '../models/propertie.model ';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  parameters;

  OPTIONS = [
    {
      name: 'rotation',
      properties: [
        { name: 'flip', value: null, longname: 'Flip Axis', ph: 'h, v, or, hv' },
        { name: 'orient', value: null, longname: 'Orientation', ph: '[0 - 8], 90, 180, or 270' },
        { name: 'rot', value: null, longname: 'Rotation', ph: 'A number (e.g. 42)' },
      ],
      id: null
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
      ],
      id: null
    },
  ];
  DEFAULT_PROPS = [
    {
      name: 'fit',
      value: 'crop',
      longname: 'Resize Fit Mode',
      ph: null,
      id: null,
      category: null,
    },
    {
      name: 'h',
      value: 400,
      longname: 'Image Height',
      ph: null,
      id: null,
      category: null,
    },
    {
      name: 'max-w',
      value: 1000,
      longname: 'Maximum Width',
      ph: null,
      id: null,
      category: null,
    },
  ];

  private propSelected = new BehaviorSubject<PropertieModel>(new PropertieModel);
  prop: Observable<PropertieModel> = this.propSelected.asObservable();

  private properties = new BehaviorSubject<PropertieModel[]>([]);
  props: Observable<PropertieModel[]> = this.properties.asObservable();

  constructor(private http: HttpClient) { }

  updateProperties(props: PropertieModel[]) {
    this.properties.next(props);
  }

  fetchParameters() {
    return this.http.get('https://raw.githubusercontent.com/imgix/imgix-url-params/master/dist/parameters.json');
  }

  /**
   * This method does not work.
   * Try to build the array of to show all the editing options that exist in Imgix.
   */
  buildOptions() {
    this.fetchParameters().subscribe(params => {
      this.OPTIONS = [];
      let _params = { ...params }
      let _categories = { ...params }
      for (let category of Object.values(_categories['categoryValues'])) {
        let parameters = [];
        let option_id;
        for (let param of Object.values(_params['parameters'])) {
          let possible_values;
          Object.values(param['expects']).map(expect => {
            possible_values = expect['possible_values'] ? [...expect['possible_values']] : 'A number';
          });
          let ppvv;
          for (let pv of possible_values) {
            if (typeof (pv) == 'string') {
              ppvv = possible_values;
            } else {
              ppvv += possible_values.length > 1 ? pv + ' | ' : pv
            }
          }
          if (param['category'] == category) {
            option_id = category;
            parameters.push({
              name: null,
              value: null,
              longname: param['display_name'].charAt(0).toUpperCase() + param['display_name'].slice(1),
              ph: ppvv,
              category: category
            })
          }
        }
        this.options.push({
          name: category,
          properties: parameters,
          id: option_id,
        });
      }
      // let count = 0;
      // let obj: any;
      // for (let param of Object.values(_params)) {
      //   count++;
      //   if (count == 2) {
      //     obj = Object.values(Object.getOwnPropertyDescriptors(param));
      //     console.log(obj[1])
      //     let _count = 0;
      //     obj.map(o => {
      //       for (let opt of this.options) {
      //         _count++;
      //         if (opt.id == o.value.category) {
      //           if (count == 2) {
      //             for (let prop of Object.values(Object.values(opt['properties']))) {
      //               if (prop['category'] == o.value.category) {
      //                 // prop['name'] = Object.values(param);
      //               }
      //             }
      //           }
      //         }
      //       }
      //     })
      //   }
      // }
    });
  }

}