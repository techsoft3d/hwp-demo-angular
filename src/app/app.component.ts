import { Component } from '@angular/core';
// import { SelectOperator } from 'src/operators/SelectOperator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public hwv: Communicator.WebViewer | null = null;
  public modelStructureIsReady = false;
  public cameraStatus = "unavailable";
  // public selectOperator: Communicator.Operator.Operator;

  constructor() {
  }

  newWebViewer(newHwv: Communicator.WebViewer) {
    this.hwv = newHwv;
    this.hwv.setCallbacks({
      sceneReady: () => {
        this.cameraStatus = JSON.stringify(newHwv.view.getCamera().toJson(), null, 4);
      },
      modelStructureReady: () => {
        this.modelStructureIsReady = true;
      },
      camera: () => {
        this.cameraStatus = JSON.stringify(newHwv.view.getCamera().toJson(), null, 4);
      }
    });
  }

}
