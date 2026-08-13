import CityContainer from "../components/CityContainer/CityContainer"

const MainPage = () => {
    return (
        <>
            <CityContainer isFavorites={true} />
            <hr />
            <CityContainer isFavorites={false} />
        </>

    )
}

export default MainPage