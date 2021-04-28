import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-hwp-viewer',
  templateUrl: './hwp-viewer.component.html',
  styleUrls: ['./hwp-viewer.component.scss']
})
export class HwpViewerComponent implements OnInit {
  @Input() modelPath: string;
  @Input() operator: Communicator.OperatorId;
  @Output() webViewerEvent = new EventEmitter<Communicator.WebViewer>();

  public viewerId = uuidv4();

  constructor() {
    this.modelPath = "";
    this.operator = Communicator.OperatorId.Orbit;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    let hwv = new Communicator.WebViewer({
      containerId: this.viewerId,
      endpointUri: this.modelPath,
    });

    hwv.setCallbacks({
      sceneReady: () => {
        hwv.view.setBackgroundColor(Communicator.Color.white(), Communicator.Color.white());
      },
    });

    this.webViewerEvent.emit(hwv);
    hwv.start();

  }
}
