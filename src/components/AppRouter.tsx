import { Routes, Route, Navigate } from "react-router"
import { routes } from "../routes"

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(({path, element}) => 
                <Route key={path} path={path} element={element} />
            )}
            <Route path='*' element={<Navigate to='/' replace/>} />
        </Routes>
    )
}

export default AppRouter