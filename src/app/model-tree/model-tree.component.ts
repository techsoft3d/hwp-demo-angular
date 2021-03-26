import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-tree',
  templateUrl: './model-tree.component.html',
  styleUrls: ['./model-tree.component.scss']
})
export class ModelTreeComponent implements OnInit {
  @Input() nodeId: Communicator.NodeId | null = null;
  @Input() level: number = 0;
  @Input() hwv: Communicator.WebViewer | null = null;

  public nodeName: String | null = null;
  public children: Communicator.NodeId[] | null = null;
  public isCollapsed: boolean = false;

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
    console.log("selectModel");
  }

  // Styles
  getCaretClass() {
    return {
      'caret': this.children != null && this.children.length > 0,
      'caret-down': !this.isCollapsed,
    }
  }
}
