import { Component } from '@angular/core';
import { ViewerStatus } from 'src/data/viewerStatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public viewerStatus: ViewerStatus = {
    modelStructureIsReady: false,
    cameraStatus: "unavailable"
  };

  newViewerStatus(newStatus: ViewerStatus) {
    this.viewerStatus = newStatus;
  }

}
