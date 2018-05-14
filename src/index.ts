import * as firebase from "firebase"; // imported library
import { Hi } from "./test"; // import local class

// notice no need to have elem("testImage") -> testImage.src just works
declare let testImage: HTMLImageElement;
import dogImageUrl from './images/dog.jpg';
testImage.src = dogImageUrl;

// libraries without typescript types
declare var CodeMirror: any;
declare var Firepad: any;
declare var firebaseui: any;
declare var Split: any;

// using class from somewhere else
console.log(Hi.world());

