import React, {Component} from 'react'
import styles from './Forecast.styl'

export default class Forecast extends Component {

    constructor() {
        super()
    }

    render() {
        const {locationName, tempC, tempFeelslikeC} = this.props
        return (
            <React.Fragment>
                <div className={styles.blockLocation}>
                    <img src="http://cdn.onlinewebfonts.com/svg/download_66526.png" className={styles.locationIcon}/>
                    <div className={styles.locationName}>{locationName}</div>
                </div>
                <div className={styles.temps}>
                    <div className={styles.realTemp + " " + (tempC <= 0 ? styles.cold : styles.hot)}>{tempC}°С</div>
                    <div className={styles.feelsTemp + " " + (tempC <= 0 ? styles.cold : styles.hot)}> feels like {tempFeelslikeC}°С</div>
                </div>
            </React.Fragment>
        )
    }
}