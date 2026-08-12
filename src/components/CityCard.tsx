import { useAppDispatch } from "../hooks/redux"
import type { ICity } from "../models/ICommon"
import { citiesSlice } from "../store/reducers/CitiesSlice"

interface CityCardProps {
    city: ICity
}

const CityCard = ({ city }: CityCardProps) => {
    const { bringToTop, toggleFavorite } = citiesSlice.actions
    const dispatch = useAppDispatch()

    function handleFavoriteBtnClick(e: React.MouseEvent, city: ICity) {
        e.stopPropagation()
        dispatch(toggleFavorite(city))
    }

    return (
        <>
            <div onClick={() => dispatch(bringToTop(city))} className="city__item">
                <h3>{city.name}</h3>
                <button onClick={e => handleFavoriteBtnClick(e, city)}>{city.isFavorite ? 'Remove from favorites' : 'Add to favorites'}</button>
            </div>
        </>
    )
}

export default CityCard