var React = require('react');

var Error = React.createClass({

    render : function(){
        return (
            <section id="error">
                <h2>Oups</h2>
                An error has occurred,<br/>
                please check your input and try again.
            </section>
        );
    }
});

module.exports = Error;