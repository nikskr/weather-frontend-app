import { Routes, Route } from "react-router"
import { routes } from "../routes"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(({path, element}) => 
                <Route key={path} path={path} element={element} />
            )}
            <Route path='*' element={<NotFoundPage />} />    
        </Routes>
    )
}

export default AppRouter