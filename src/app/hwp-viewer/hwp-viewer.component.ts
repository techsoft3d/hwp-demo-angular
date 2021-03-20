import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ViewerStatus } from 'src/data/viewerStatus';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-hwp-viewer',
  templateUrl: './hwp-viewer.component.html',
  styleUrls: ['./hwp-viewer.component.scss']
})
export class HwpViewerComponent implements OnInit {
  @Input() modelPath: string;
  @Output() viewerStatusEvent = new EventEmitter<ViewerStatus>();

  private viewerStatus: ViewerStatus = {
    modelStructureIsReady: false,
    cameraStatus: "unavailable"
  };

  public viewerId = uuidv4();

  constructor() {
    this.modelPath = "";
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.viewerId);
    console.log(this.modelPath);

    this.viewerStatusEvent.emit(this.viewerStatus);

    let hwv = new Communicator.WebViewer({
      containerId: this.viewerId,
      endpointUri: this.modelPath,
    });

    hwv.setCallbacks({
      sceneReady: () => {
        hwv.view.setBackgroundColor(Communicator.Color.blue(), Communicator.Color.white());
        this.viewerStatus.cameraStatus = JSON.stringify(hwv.view.getCamera().toJson(), null, 4);
        this.viewerStatusEvent.emit(this.viewerStatus);
      },
      modelStructureReady: () => {
        this.viewerStatus.modelStructureIsReady = true;
        this.viewerStatusEvent.emit(this.viewerStatus);
        // document.getElementById('ModelStructureReady').innerHTML = 'Model Structure Ready';
      },
      camera: () => {
        this.viewerStatus.cameraStatus = JSON.stringify(hwv.view.getCamera().toJson(), null, 4);
        this.viewerStatusEvent.emit(this.viewerStatus);
        // document.getElementById('CameraData').innerHTML = JSON.stringify(hwv.view.getCamera().toJson(), null, 4);
      },
    });

    hwv.start();
  }

  // ngOnInit(): void {}

}
