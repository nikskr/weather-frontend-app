import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import classes from './DataWrapper.module.css'
import Loader from "../Loader/Loader";

interface DataWrapperProps<T> {
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
    dailyForecast: T | undefined;
    children: React.ReactNode
}

function DataWrapper<T>({ isLoading, error, dailyForecast, children }: DataWrapperProps<T>) {

    if (isLoading) {
        return (
            <div className={classes.loader}>
                <Loader />
            </div>
        )
    }

    if (error || !dailyForecast) {
        return (
            <h1>Forecast data loading Error</h1>
        )
    }

    if (!dailyForecast) {
        return (
            <h1>No forecast data</h1>
        )
    }

    if (dailyForecast) {
        return (
            <>{children}</>
        )
    }
}

export default DataWrapper
