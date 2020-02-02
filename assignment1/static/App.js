'use strict';

var contentNode1 = document.getElementById('name');
var component1 = React.createElement(
  'h3',
  null,
  'Muktha Shivakumar Gowdara'
);

var contentNode2 = document.getElementById('image');
var component2 = React.createElement('img', { src: '../mee.jpg', alt: 'My picture' });

var contentNode3 = document.getElementById('desc');
var component3 = React.createElement(
  'p',
  null,
  'Master\'s student at San Diego State University'
);

var contentNode4 = document.getElementById('link');
var component4 = React.createElement(
  'form',
  { action: 'https://github.com/mukthagowdara' },
  React.createElement(
    'button',
    { type: 'submit' },
    'VIEW MY GITHUB REPO'
  )
);

ReactDOM.render(component1, contentNode1);
ReactDOM.render(component2, contentNode2);
ReactDOM.render(component3, contentNode3);
ReactDOM.render(component4, contentNode4);