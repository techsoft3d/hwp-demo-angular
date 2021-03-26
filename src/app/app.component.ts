import { Component } from '@angular/core';
import { CameraStatus } from 'src/data/camera-status';
import { SelectOperator } from 'src/typescript/select_operator';
import { MeasureBetweenPointsOperator } from 'src/typescript/measure_operator';

enum Tab {
  home,
  modelStructure
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Model Info
  public modelStructureIsReady = false;
  public cameraStatus: CameraStatus | null = null;
  public hwv: Communicator.WebViewer | null = null;
  public rootNodeId: Communicator.NodeId | null = null;
  // Tab Control
  public currentTab = Tab.modelStructure;
  public Tab = Tab;

  constructor() {
  }

  // When the WebViewer is ready
  newWebViewer(newHwv: Communicator.WebViewer) {
    this.hwv = newHwv;
    console.log(newHwv.model);
    newHwv.setCallbacks({
      sceneReady: () => {
        this.cameraStatus = newHwv.view.getCamera().toJson() as CameraStatus;
        console.log(this.cameraStatus);
      },
      modelStructureReady: () => {
        this.modelStructureIsReady = true;
        this.rootNodeId = newHwv.model.getAbsoluteRootNode();
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

    this.changeOperator = (event: Event) => {
      newHwv.operatorManager.clear();
      newHwv.operatorManager.push(Communicator.OperatorId.Orbit);
      let newOperator = (event.target as HTMLSelectElement).value;
      if (newOperator === "Area Select") {
        newHwv.operatorManager.push(Communicator.OperatorId.AreaSelect);
      } else if (newOperator === "Select") {
        newHwv.operatorManager.push(selectOperatorId);
      } else if (newOperator === "Measure") {
        newHwv.operatorManager.push(measureOperatorId);
      }
    }

    window.onresize = () => {
      newHwv.resizeCanvas();
    };
  }

  // Change tab
  changeTab(newTab: Tab) {
    this.currentTab = newTab;
  }

  // Change operator
  changeOperator(event: Event) { }
}
