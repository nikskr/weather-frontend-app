import { RouterProvider, createBrowserRouter } from "react-router"
import { routes } from "../routes"

const router = createBrowserRouter(routes, {
    basename: import.meta.env.BASE_URL
})

const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter