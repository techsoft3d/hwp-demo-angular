# HWP Demo Angular

This is a demo for integrating [Hoops Web Platform](https://www.techsoft3d.com/products/hoops/web-platform/) (HWP) with Angular framework.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## Live Demo

A live demo is running with GitHub Pages at:
https://techsoft3d.github.io/hwp-demo-angular/

## Development server

To get started, please make sure NodeJS, npm, and Angular CLI are installed. Run:

### `npm install`

Install all the node_module dependencies.

### `ng serve`

Starting a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Steps to Integrate HWP with Angular

1. Include the `hoops_web_viewer.js` with a script tag in the header of `index.html`. They can be located under the `/web_viewer/src/js/` folder of your local installation.

2. Copy the type definition files `hoops_web_viewer.d.ts` and `tcc.d.ts into` to the `src/` folder. They can be found under `/web_viewer/typescript/` folder of your local installation.

Note: 
- Please make sure the type definition and the web_viewer script have the same version. 
- Use `new Communicator.WebViewer()` only when the view is initiated. For example, inside `ngAfterViewInit()`.
