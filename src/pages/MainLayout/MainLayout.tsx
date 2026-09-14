import { Outlet } from 'react-router'
import NavBar from '../../navigation/NavBar'
import classes from './MainLayout.module.css'

const MainLayout = () => {
    return (
        <div className={classes.container}>
            <NavBar />
            <main className={classes.content}>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout
