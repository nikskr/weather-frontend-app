import { Routes, Route, Navigate } from "react-router"
import { routes } from "../routes"
import { getRedirectPath } from "../utils/redirect"

const AppRouter = () => {
    const redirectPath = getRedirectPath()
    return (
        <Routes>
            {routes.map(({path, element}) => 
                <Route key={path} path={path} element={element} />
            )}
            {redirectPath && <Navigate to={redirectPath} replace/>}
            <Route path='*' element={<Navigate to='/' replace/>} />
        </Routes>
    )
}

export default AppRouter