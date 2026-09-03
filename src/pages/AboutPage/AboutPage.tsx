import { CONTACTLINKS } from '../../utils/consts'
import classes from './AboutPage.module.css'

const AboutPage = () => {
    return (
        <div className={classes.wrapper}>
            <div>
                <h1 className={classes.header}>
                    Powered by WeatherAPI
                </h1>
                <p className={classes.text}>
                    Our platform is fueled by WeatherAPI.com, a premier provider of global weather data.
                    By utilizing their high-performance automated systems, we deliver enterprise-grade accuracy,
                    multi-layered meteorological data directly to your screen.
                </p>
            </div>
            <div className={classes.imageContainer}>
                <img className={classes.image} src={`${import.meta.env.BASE_URL}images/about-image.png`} alt="Weather Image" width={'100%'} height={'100%'}/>
            </div>
            <div className={classes.linksContainer}>
                <ul className={classes.linksList}>
                    {CONTACTLINKS.map(con => 
                        <li className={classes.linkIcon} key={con.icon}><a href={con.link}><img src={`${import.meta.env.BASE_URL}${con.icon}`} alt={con.name} width={30} height={30}/></a></li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default AboutPage