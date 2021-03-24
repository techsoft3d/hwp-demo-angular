import { Component } from '@angular/core';
import { CameraStatus } from 'src/data/camera-status';
import { SelectOperator } from 'src/typescript/select_operator';
import { MeasureBetweenPointsOperator } from 'src/typescript/measure_operator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public modelStructureIsReady = false;
  public cameraStatus: CameraStatus | null = null;

  constructor() {
  }

  // When the WebViewer is ready
  newWebViewer(newHwv: Communicator.WebViewer) {
    newHwv.setCallbacks({
      sceneReady: () => {
        this.cameraStatus = newHwv.view.getCamera().toJson() as CameraStatus;
        console.log(this.cameraStatus);
      },
      modelStructureReady: () => {
        this.modelStructureIsReady = true;
      },
      camera: () => {
        this.cameraStatus = newHwv.view.getCamera().toJson() as CameraStatus;
      }
    });

    // Custom Select Operator
    let selectOperator = new SelectOperator(newHwv);
    let selectOperatorId = newHwv.registerCustomOperator(selectOperator);

    // Custom Messure Operator
    let measureOperator = new MeasureBetweenPointsOperator(newHwv);
    let measureOperatorId = newHwv.registerCustomOperator(measureOperator);

    var customOperatorSelect = document.getElementById("operatorType") as HTMLSelectElement;
    if (customOperatorSelect == null) {
      return;
    }

    customOperatorSelect.onchange = () => {
      newHwv.operatorManager.clear();
      newHwv.operatorManager.push(Communicator.OperatorId.Orbit);
      if (customOperatorSelect.value === "Area Select") {
        newHwv.operatorManager.push(Communicator.OperatorId.AreaSelect);
      } else if (customOperatorSelect.value === "Select") {
        newHwv.operatorManager.push(selectOperatorId);
      } else if (customOperatorSelect.value === "Measure") {
        newHwv.operatorManager.push(measureOperatorId);
      }
    }

    window.onresize = () => {
      newHwv.resizeCanvas();
    };
  }
}
