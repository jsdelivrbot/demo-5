import _ from 'lodash';
import './style.css';
import Icon from './icon.png';//定义图片名称进行压缩
import Data from './data.xml';
import printMe from './print.js';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  // element.classList.add('hello');

  // var myIcon=new Image();
  // myIcon.src=Icon;

  // element.appendChild(myIcon);

  // console.log(Data);
  return element;
}

document.body.appendChild(component());