var React = require('react');
var ReactDOM = require('react-dom');
var AppContainer = require('./components/app-container.jsx');

require('./scss/main.scss');

ReactDOM.render(

    <AppContainer />,
    document.getElementsByClassName("container")[0]
);
