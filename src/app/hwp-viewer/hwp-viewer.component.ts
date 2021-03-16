import { Component, OnInit } from '@angular/core';
// import { Communicator } from '../../hoops-communicator-2020/hoops_web_viewer';

@Component({
  selector: 'app-hwp-viewer',
  templateUrl: './hwp-viewer.component.html',
  styleUrls: ['./hwp-viewer.component.scss']
})
export class HwpViewerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let hwv = new Communicator.WebViewer({
      containerId: "hwp-canvas",
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
