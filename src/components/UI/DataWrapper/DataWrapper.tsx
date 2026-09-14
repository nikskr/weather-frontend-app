import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import classes from './DataWrapper.module.css'
import Loader from "../Loader/Loader";

interface DataWrapperProps<T> {
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
    data: T | undefined;
    children: React.ReactNode
}

function DataWrapper<T>({ isLoading, error, data, children }: DataWrapperProps<T>) {

    if (isLoading) {

        return (
            <div className={classes.container}>
                <div className={classes.loader}>
                    <Loader />
                </div>
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className={classes.container}>
                <h1>Forecast data loading Error</h1>
            </div>
        )
    }

    if (!data) {
        return (
            <div className={classes.container}>
                <h1>No forecast data</h1>
            </div>
        )
    }

    if (data) {
        return (
            <>{children}</>
        )
    }
}

export default DataWrapper
