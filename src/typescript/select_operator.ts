export class SelectOperator extends Communicator.Operator.Operator {
    private _hwv: Communicator.WebViewer;

    constructor(hwv: Communicator.WebViewer) {
        super();
        this._hwv = hwv;
    }

    onMouseDown(event: Communicator.Event.MouseInputEvent) {
        var config = new Communicator.PickConfig(Communicator.SelectionMask.Face | Communicator.SelectionMask.Line);
        this._hwv.selectionManager.clear();
        this._hwv.view.pickFromPoint(event.getPosition(), config).then((selection) => {
            if (selection.getNodeId() != null) {
                this._hwv.selectionManager.set(selection as Communicator.Selection.NodeSelectionItem);
            }
        });
        super.onMouseDown(event);
    }
}