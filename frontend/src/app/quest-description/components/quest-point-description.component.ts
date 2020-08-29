import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { BasePointModel, QuestPointModel } from '../../app.config';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-quest-point-description',
  templateUrl: './quest-point-description.component.html',
})
export class QuestPointDescriptionComponent implements AfterViewInit {
    @Input()
    public points: QuestPointModel[];

    @ViewChild(MapComponent, {static: true}) map: MapComponent;
    
    ngAfterViewInit() {
        this.map.AddRangeMarkers(this.points, false, this.onPointClicked);
    }

    private onPointClicked(point: BasePointModel) {
      console.log(point)
    }

}
