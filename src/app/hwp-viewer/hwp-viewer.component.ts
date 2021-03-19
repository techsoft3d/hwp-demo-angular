import { Component, OnInit } from '@angular/core';
// import { Communicator } from '../../hoops-communicator-2020/hoops_web_viewer';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-hwp-viewer',
  templateUrl: './hwp-viewer.component.html',
  styleUrls: ['./hwp-viewer.component.scss']
})
export class HwpViewerComponent implements OnInit {
  public viewerId = uuidv4();

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.viewerId);
    let hwv = new Communicator.WebViewer({
      containerId: this.viewerId,
      endpointUri: "/assets/microengine.scs",
    });

    hwv.setCallbacks({
      sceneReady: () => {
        hwv.view.setBackgroundColor(Communicator.Color.blue(), Communicator.Color.white());
      },
      modelStructureReady: () => {
        // document.getElementById('ModelStructureReady').innerHTML = 'Model Structure Ready';
      },
      camera: () => {
        // document.getElementById('CameraData').innerHTML = JSON.stringify(hwv.view.getCamera().toJson(), null, 4);
      },
    });

    hwv.start();
  }

  // ngOnInit(): void {}

}
