// import { useEffect } from "react"
// import { useAppDispatch, useAppSelector } from "./hooks/redux"
// import { fetchCurrentWeatherByLocation } from "./store/reducers/ActionCreators"
// import { DEFAULT_CITIES } from "./variables/consts"

// import CurrentWeatherContainer from "./components/CurrentWeatherContainer"
import CityContainer from "./components/CityContainer"
// import { useAppSelector } from "./hooks/redux" 

function App() {
  // const dispatch = useAppDispatch()
  // const { locs, isLoading, error } = useAppSelector(state => state.currentWeatherReducer)

  // useEffect(() => {
  //   DEFAULT_CITIES.forEach(city => {
  //     dispatch(fetchCurrentWeatherByLocation(city))
  //   })
  // }, [])

  // console.log(locs)

  return (
    <div>
      <CityContainer />
      {/* <CurrentWeatherContainer /> */}
      {/* {isLoading && <h1>Loading weather data...</h1>}
      {error && <h1>{error}</h1>}
      {JSON.stringify(locs, null, 2)} */}
    </div>
  )
}

export default App
