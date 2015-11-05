var React = require('react'),
    History = require('react-router').History;

var Home = React.createClass({

    mixins: [ History ],

    handleSubmit : function(e) {
        e.preventDefault();
        var city = this.refs.city.value.trim();

        if(city){
            this.history.pushState(null, '/result/'+city);
        }

        return;
    },

    render : function(){
        return (
            <section id="home">
                <h2>City name</h2>
                <div>And eventually the country</div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="city" ref="city"/>
                    <input type="submit" value="Go !" />
                </form>
            </section>
        );
    }
});

module.exports = Home;