 import printMe from './print'
 import './style.css';
 import './1.png';
 function getComponent() {
   return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
     var element = document.createElement('div');

     element.innerHTML = _.join(['Hello', 'webpack'], ' ');

     return element;

   }).catch(error => 'An error occurred while loading the component');
  }

 getComponent().then(component => {
   document.body.appendChild(component);
 })