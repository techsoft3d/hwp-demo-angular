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

  private selectedNodeComponent: ModelTreeItemComponent | null = null;

  constructor() { }

  ngOnInit(): void {
    if (!this.hwv) {
      throw new Error("hwv Missing");
    }
    this.rootNodeId = this.hwv.model.getAbsoluteRootNode();
  }

  // Node Selection
  public selectNode(node: ModelTreeItemComponent) {
    if (node.isSelected) {
      this.hwv?.selectPart(null);
      this.selectedNodeComponent = null;
      node.isSelected = false;
      return;
    }
    
    if (this.selectedNodeComponent != null) {
      this.selectedNodeComponent.isSelected = false;
    }
    this.hwv?.selectPart(node.nodeId);
    node.isSelected = true;
    this.selectedNodeComponent = node;
  }

  public disSelectNode(node: ModelTreeItemComponent) {

  }
}
