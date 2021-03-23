(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/jingsong/Documents/hwp-demo-angular-microengine/src/main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "L/PV":
/*!********************************************!*\
  !*** ./src/typescript/measure_operator.ts ***!
  \********************************************/
/*! exports provided: MeasureBetweenPointsOperator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeasureBetweenPointsOperator", function() { return MeasureBetweenPointsOperator; });
class MeasureBetweenPointsOperator extends Communicator.Operator.Operator {
    constructor(hwv) {
        super();
        this._hwv = hwv;
        this._activeIndication = null;
    }
    onMouseDown(event) {
        var config = new Communicator.PickConfig(Communicator.SelectionMask.Face | Communicator.SelectionMask.Line);
        this._hwv.selectionManager.clear();
        this._hwv.view.pickFromPoint(event.getPosition(), config).then((selectionItem) => {
            if (selectionItem.getNodeId() !== null) {
                var position = selectionItem.getPosition();
                var markupManager = this._hwv.markupManager;
                if (this._activeIndication === null) {
                    this._activeIndication = new DistanceMarkup(this._hwv, position, this._hwv.model.getNodeUnitMultiplier(selectionItem.getNodeId()));
                    markupManager.registerMarkup(this._activeIndication);
                }
                else {
                    this._activeIndication.point2 = position;
                    this._activeIndication.finalize();
                    this._activeIndication = null;
                }
            }
        });
    }
    onMouseMove(event) {
        if (this._activeIndication === null) {
            return;
        }
        var config = new Communicator.PickConfig(Communicator.SelectionMask.Face | Communicator.SelectionMask.Line);
        this._hwv.selectionManager.clear();
        this._hwv.view.pickFromPoint(event.getPosition(), config).then((selectionItem) => {
            if (selectionItem.getNodeId() !== null) {
                var position = selectionItem.getPosition();
                this._activeIndication.point2 = position;
                this._hwv.markupManager.refreshMarkup();
            }
        });
        super.onMouseMove(event);
    }
}
class DistanceMarkup extends Communicator.Markup.MarkupItem {
    constructor(hwv, point, unit) {
        super();
        this._hwv = hwv;
        this.point1 = point;
        this.point2 = null;
        this._unit = unit;
        this._isFinalized = false;
    }
    draw() {
        // Draw at the 'click' locations
        var view = this._hwv.view;
        if (this.point1 !== null) {
            // draw the first point
            var circle = new Communicator.Markup.Shape.Circle();
            var point3d = view.projectPoint(this.point1);
            circle.set(Communicator.Point2.fromPoint3(point3d), 2.0);
            this._hwv.markupManager.getRenderer().drawCircle(circle);
            if (this.point2 !== null) {
                // draw the second point
                point3d = view.projectPoint(this.point2);
                circle.set(Communicator.Point2.fromPoint3(point3d), 2.0);
                this._hwv.markupManager.getRenderer().drawCircle(circle);
                // draw a line between the points
                var line = new Communicator.Markup.Shape.Line();
                var point3d1 = view.projectPoint(this.point1);
                var point3d2 = view.projectPoint(this.point2);
                line.setP1(Communicator.Point2.fromPoint3(point3d1));
                line.setP2(Communicator.Point2.fromPoint3(point3d2));
                if (!this._isFinalized) {
                    line.setStrokeWidth(5);
                }
                this._hwv.markupManager.getRenderer().drawLine(line);
                // add a label
                var midpoint = new Communicator.Point3((point3d1.x + point3d2.x) / 2, (point3d1.y + point3d2.y) / 2, (point3d1.z + point3d2.z) / 2);
                var length = Communicator.Point3.subtract(this.point2, this.point1).length() * this._unit;
                var text = new Communicator.Markup.Shape.Text(length.toFixed(2) + "mm", Communicator.Point2.fromPoint3(midpoint));
                text.setFillColor(Communicator.Color.red());
                this._hwv.markupManager.getRenderer().drawText(text);
            }
        }
    }
    finalize() {
        this._isFinalized = true;
        this._hwv.markupManager.refreshMarkup();
    }
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var src_typescript_select_operator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/typescript/select_operator */ "c2c7");
/* harmony import */ var src_typescript_measure_operator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/typescript/measure_operator */ "L/PV");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _hwp_viewer_hwp_viewer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hwp-viewer/hwp-viewer.component */ "sTnE");




class AppComponent {
    constructor() {
        this.modelStructureIsReady = false;
        this.cameraStatus = "unavailable";
    }
    // When the WebViewer is ready
    newWebViewer(newHwv) {
        newHwv.setCallbacks({
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
        // Custom Select Operator
        let selectOperator = new src_typescript_select_operator__WEBPACK_IMPORTED_MODULE_0__["SelectOperator"](newHwv);
        let selectOperatorId = newHwv.registerCustomOperator(selectOperator);
        // Custom Messure Operator
        let measureOperator = new src_typescript_measure_operator__WEBPACK_IMPORTED_MODULE_1__["MeasureBetweenPointsOperator"](newHwv);
        let measureOperatorId = newHwv.registerCustomOperator(measureOperator);
        var customOperatorSelect = document.getElementById("operatorType");
        if (customOperatorSelect == null) {
            return;
        }
        customOperatorSelect.onchange = () => {
            newHwv.operatorManager.clear();
            newHwv.operatorManager.push(Communicator.OperatorId.Orbit);
            if (customOperatorSelect.value === "Area Select") {
                newHwv.operatorManager.push(Communicator.OperatorId.AreaSelect);
            }
            else if (customOperatorSelect.value === "Select") {
                newHwv.operatorManager.push(selectOperatorId);
            }
            else if (customOperatorSelect.value === "Measure") {
                newHwv.operatorManager.push(measureOperatorId);
            }
        };
        window.onresize = () => {
            newHwv.resizeCanvas();
        };
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 28, vars: 2, consts: [[1, "container-fluid", "p-0", "m-0"], [1, "row", "p-0", "m-0", 2, "height", "100vh"], [1, "col-6", "p-0", "m-0"], ["modelPath", "/assets/microengine.scs", 3, "webViewerEvent"], [1, "col-6", "p-0", "m-0", "overflow-scroll", 2, "height", "100vh"], [1, "navbar", "navbar-light", "bg-light", "m-0", "p-3"], [1, "navbar-brand", "m-0", "p-0"], ["src", "/assets/ts3d_logo.png", "alt", "TechSoft 3D LOGO", 1, "img-fluid"], [1, "p-3"], ["id", "operatorType", 1, "form-select", "mb-3"], ["value", "Orbit"], ["value", "Area Select"], ["value", "Select"], ["value", "Measure"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "app-hwp-viewer", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("webViewerEvent", function AppComponent_Template_app_hwp_viewer_webViewerEvent_3_listener($event) { return ctx.newWebViewer($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "nav", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Model Structure");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Operator");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "select", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "option", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Orbit");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "option", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Area Select");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "option", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Select");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "option", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "Measure");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "Camera Status");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.modelStructureIsReady ? "Model structure is ready" : "Model structure is not ready");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.cameraStatus);
    } }, directives: [_hwp_viewer_hwp_viewer_component__WEBPACK_IMPORTED_MODULE_3__["HwpViewerComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _hwp_viewer_hwp_viewer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hwp-viewer/hwp-viewer.component */ "sTnE");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _hwp_viewer_hwp_viewer_component__WEBPACK_IMPORTED_MODULE_3__["HwpViewerComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"]] }); })();


/***/ }),

/***/ "c2c7":
/*!*******************************************!*\
  !*** ./src/typescript/select_operator.ts ***!
  \*******************************************/
/*! exports provided: SelectOperator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectOperator", function() { return SelectOperator; });
class SelectOperator extends Communicator.Operator.Operator {
    constructor(hwv) {
        super();
        this._hwv = hwv;
    }
    onMouseDown(event) {
        var config = new Communicator.PickConfig(Communicator.SelectionMask.Face | Communicator.SelectionMask.Line);
        this._hwv.selectionManager.clear();
        this._hwv.view.pickFromPoint(event.getPosition(), config).then((selection) => {
            if (selection.getNodeId() != null) {
                this._hwv.selectionManager.set(selection);
            }
        });
        super.onMouseDown(event);
    }
}


/***/ }),

/***/ "sTnE":
/*!****************************************************!*\
  !*** ./src/app/hwp-viewer/hwp-viewer.component.ts ***!
  \****************************************************/
/*! exports provided: HwpViewerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HwpViewerComponent", function() { return HwpViewerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "4USb");



class HwpViewerComponent {
    constructor() {
        this.webViewerEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.viewerId = Object(uuid__WEBPACK_IMPORTED_MODULE_1__["v4"])();
        this.modelPath = "";
        this.operator = Communicator.OperatorId.Orbit;
    }
    ngOnInit() { }
    ngAfterViewInit() {
        console.log(this.viewerId);
        console.log(this.modelPath);
        let hwv = new Communicator.WebViewer({
            containerId: this.viewerId,
            endpointUri: this.modelPath,
        });
        hwv.setCallbacks({
            sceneReady: () => {
                hwv.view.setBackgroundColor(Communicator.Color.blue(), Communicator.Color.white());
            },
        });
        this.webViewerEvent.emit(hwv);
        hwv.start();
    }
}
HwpViewerComponent.ɵfac = function HwpViewerComponent_Factory(t) { return new (t || HwpViewerComponent)(); };
HwpViewerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HwpViewerComponent, selectors: [["app-hwp-viewer"]], inputs: { modelPath: "modelPath", operator: "operator" }, outputs: { webViewerEvent: "webViewerEvent" }, decls: 1, vars: 1, consts: [[1, "bg-primary", "w-100", "h-100", "position-relative", 3, "id"]], template: function HwpViewerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx.viewerId);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJod3Atdmlld2VyLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map