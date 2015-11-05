var React = require('react'),
    config = require('../config'),
    History = require('react-router').History;

var Result = React.createClass({

    mixins: [ History ],

    getInitialState: function() {
        return {
            city: '',
            weather : {
                description : '',
                key : ''
            },
            sunrise : '',
            sunset : '',
            temperature : '',
            humidity : ''
        }
    },

    buildUrl : function(){
        return config.openWeatherMapAPI.url
            +this.props.params.city
            +'&units='+config.openWeatherMapAPI.units
            +'&APPID='+config.openWeatherMapAPI.apiKey;
    },

    parseAPIResponse : function (response) {
        var sunrise = new Date(response.sys.sunrise*1000);
        var sunset = new Date(response.sys.sunrise*1000);

        return {
            city: response.name,
            weather : {
                description : response.weather[0].description,
                key : response.weather[0].main.toLowerCase()
            },
            sunrise : sunrise.getHours()+':'+sunrise.getMinutes(),
            sunset : sunset.getHours()+':'+sunset.getMinutes(),
            temperature : response.main.temp,
            humidity : response.main.humidity
        };
    },

    componentDidMount : function(){
        $.get(this.buildUrl(), function(response) {
            if(response.cod === 200){
                this.setState(this.parseAPIResponse(response));
            }
            else {
                this.history.pushState(null, '/error');
            }

        }.bind(this));
    },

    render : function(){
        var state = this.state;
        return (
            <section id="result" className={state.weather.key}>
                <h2>{state.city}</h2>
                <div className="picto">

                </div>
                <h3>{state.weather.description}</h3>

                <div>
                    <section className="sunrise">
                        Sunrise
                        <span className="picto-sunrise"></span>
                        {state.sunrise}
                    </section>
                    <section className="sunset">
                        {state.sunset}<span className="picto-sunset"></span>Sunset
                    </section>
                </div>
                <div>
                    <section className="temperature">
                        <div>Temperature</div>
                        {state.temperature}
                    </section>
                    <section className="humidity">
                        <div>Humidity</div>
                        {state.humidity}
                    </section>
                </div>
            </section>
        );
    }
});

module.exports = Result;