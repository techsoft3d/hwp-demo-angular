import { Component, OnInit, Input } from '@angular/core';
import { ModelTreeComponent } from '../model-tree/model-tree.component';

@Component({
  selector: 'app-model-tree-item',
  templateUrl: './model-tree-item.component.html',
  styleUrls: ['./model-tree-item.component.scss']
})
export class ModelTreeItemComponent implements OnInit {
  @Input() nodeId: Communicator.NodeId | null = null;
  @Input() level: number = 0;
  @Input() hwv: Communicator.WebViewer | null = null;
  @Input() modelTree: ModelTreeComponent | null = null;

  public nodeName: String | null = null;
  public children: Communicator.NodeId[] | null = null;
  public isCollapsed: boolean = false;
  public isSelected: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.hwv == null) {
      throw new Error("hwv missing");
    }
    if (this.nodeId == null) {
      throw new Error("nodeId missing");
    }
    switch (this.hwv.model.getNodeType(this.nodeId)) {
      case Communicator.NodeType.Part:
      case Communicator.NodeType.PartInstance:
      case Communicator.NodeType.BodyInstance:
      case Communicator.NodeType.AssemblyNode: {
        this.nodeName = this.hwv.model.getNodeName(this.nodeId);
        this.children = this.hwv.model.getNodeChildren(this.nodeId);
        this.modelTree?.addItem(this.nodeId, this);
        break;
      }
      default:
        break;
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  selectModel() {
    this.modelTree?.selectSingleNode(this.nodeId!);
  }

  // Styles
  getCaretClass() {
    return {
      'caret': this.children != null && this.children.length > 0,
      'caret-down': !this.isCollapsed,
    }
  }

  getSelectionClass() {
    return {
      'bg-primary': this.isSelected,
      'text-white': this.isSelected,
    }
  }

}
