import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PropertieModel } from '../models/propertie.model ';
import { PropertiesService } from './properties.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private historySub = new BehaviorSubject<PropertieModel[]>([]);
  history: Observable<PropertieModel[]> = this.historySub.asObservable();

  constructor(private propertiesService: PropertiesService) {
    this.propertiesService.props.subscribe(props => this.updateHistory(props))
  }

  updateHistory(props: PropertieModel[]) {
    this.historySub.next(props);
  }
  
}
