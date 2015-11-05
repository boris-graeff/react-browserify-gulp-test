var React = require('react'),
    ReactDOM = require('react-dom'),
    Route = require('react-router').Route,
    Router = require('react-router').Router,
    Home = require('./Home/Home'),
    Result = require('./Result/Result'),
    Error = require('./Error/Error');

ReactDOM.render(
    <Router>
        <Route path="/" component={Home} />
        <Route path="result/:city" component={Result} />
        <Route path="error" component={Error} />
    </Router>,
    document.getElementById('content')
);