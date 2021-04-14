import { Component, Input, OnInit } from '@angular/core';
import { ModelTreeItemComponent } from '../model-tree-item/model-tree-item.component';

@Component({
  selector: 'app-model-tree',
  templateUrl: './model-tree.component.html',
  styleUrls: ['./model-tree.component.scss']
})
export class ModelTreeComponent implements OnInit {
  @Input() hwv: Communicator.WebViewer | null = null;

  public rootNodeId: Communicator.NodeId | null = null;
  private itemList: {[nodeId: number]: ModelTreeItemComponent} = [];

  constructor() { }

  ngOnInit(): void {
    if (!this.hwv) {
      throw new Error("hwv Missing");
    }
    this.rootNodeId = this.hwv.model.getAbsoluteRootNode();
    this.hwv.setCallbacks({
      // Selection event from the web viewer
      selectionArray: (selectionEvents: Communicator.Event.NodeSelectionEvent[]) => {
        for (var key in this.itemList) {
          this.itemList[key].setSelect(false);
        }
        if (selectionEvents.length > 0) {
          // Select all the child items
          selectionEvents.forEach(event => {
            const nodeId = event.getSelection().getNodeId();
            this.itemList[nodeId!].setSelect(true);
          });
        }
      },
    });
  }

  // Managing child list
  public addItem(nodeId: Communicator.NodeId, component: ModelTreeItemComponent) {
    this.itemList[nodeId] = component;
  }
}
