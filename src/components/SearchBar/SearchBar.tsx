import { useState } from 'react'
import classes from './SearchBar.module.css'
import { weatherAPI } from '../../service/WeatherService'
import { citiesSlice } from '../../store/reducers/CitiesSlice'
import { useAppDispatch } from '../../hooks/redux'
import { useNavigate } from 'react-router'
import Loader from '../UI/Loader/Loader'

const SearchBar = () => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState<string>('')

    const [ triggerFetchCurrentWeatherByLocation, {isLoading, error}] = weatherAPI.useLazyFetchCurrentWeatherByLocationQuery()
    const dispatch = useAppDispatch()
    const { bringToTop } = citiesSlice.actions

    async function handleSearchBtnClick(e: React.MouseEvent) {
        e.preventDefault()

        if (!searchText.trim()) {
            return;
        }

        const formattedLocation = searchText.trim().charAt(0).toLocaleUpperCase() + searchText.trim().slice(1).toLocaleLowerCase()

        try {
            const data = await triggerFetchCurrentWeatherByLocation(formattedLocation).unwrap()
            dispatch(bringToTop(data.location))
            setSearchText('')
            navigate('/')
        } catch (error) {
            console.log('Failed to fetch weather: ', error)
        }

    }

    return (
        <form className={classes.form}>
            <input className={classes.input} type='text' placeholder='Enter location name...' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <button className={classes.btn} onClick={handleSearchBtnClick} disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>
            <div>{isLoading && <Loader/>}</div>
            <div>{error && 'Location not found'}</div>
        </form>
    )
}

export default SearchBar