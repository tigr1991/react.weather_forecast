import React, {Component} from 'react'
import styles from './App.styl'
import Forecast from '../../components/Forecast/Forecast'

export default class App extends Component {

    state = {
        locationName: "Moscow",
        tempC: 0,
        tempFeelslikeC: 0,
        inputValue: 'Moscow',
        status: 'ready'
    }

    async componentDidMount() {
        const response = JSON.parse(await this.makeAnAPICall('Moscow'))
        this.saveResponse(response)
    }

    saveResponse(response) {
        const locationName = response.location.name
        const tempC = response.current.temp_c
        const tempFeelslikeC = response.current.feelslike_c
        this.setState({
            locationName,
            tempC,
            tempFeelslikeC,
            status: "ready"
        });
    }

    makeAnAPICall = (city) => {
        const url = 'http://forecast.totome.ru'
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onload = function () {
                if (this.status == 200) {
                    resolve(this.response);
                } else {
                    var error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            xhr.onerror = function () {
                reject(new Error("Network Error"));
            };

            xhr.send("city=" + city);
        });
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleSearchClick()
        }
    }

    handleSearchClick = async () => {
        this.setState({status: "loading"})
        const response = JSON.parse(await this.makeAnAPICall(this.state.inputValue))
        this.saveResponse(response)
    }

    handleChange = (event) => {
        this.setState({inputValue: event.target.value})
    }

    render() {
        const {locationName, tempC, tempFeelslikeC, status} = this.state
        return (
            <div className={styles.app + " " + (tempC <= 0 ? styles.cold : styles.hot)}>
                <div className={styles.window}>
                    <div className={styles.header}>
                        <input className={styles.input} onChange={this.handleChange}
                               onKeyPress={this.handleKeyPress.bind(this)} value={this.state.inputValue}/>
                        <button className={styles.btn} onClick={this.handleSearchClick}> 🔍 Search</button>
                        <div className={styles.logo + " " + (status === 'loading' ? styles.loading : '')}/>
                    </div>
                    <Forecast locationName={locationName} tempC={tempC} tempFeelslikeC={tempFeelslikeC}/>
                </div>
                <div className={styles.footer}/>
            </div>
        )
    }
}