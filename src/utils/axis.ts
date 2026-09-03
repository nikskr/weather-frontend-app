export const calcAxisTitle = (type: string, metricName: string) => {
    if (type === 'date') {
        if (metricName === 'Temperature') {
            return `Avg. temperature`
        }
        if (metricName === 'Humidity') {
            return `Avg. humidity`
        }
        if (metricName === 'Wind speed') {
            return `Max. wind speed`
        }
    } else if (type === 'hour') {
        return metricName
    }
}

export const calcAxisTitleWithUnits = (type: string, metricName: string) => {
    if (type === 'date') {
        if (metricName === 'Temperature') {
            return `Avg. temperature, °C`
        }
        if (metricName === 'Humidity') {
            return `Avg. humidity, %`
        }
        if (metricName === 'Wind speed') {
            return `Max. wind speed, kph`
        }
    } else if (type === 'hour') {
        if (metricName === 'Temperature') {
            return `${metricName}, °C`
        }
        if (metricName === 'Humidity') {
            return `${metricName}, %`
        }
        if (metricName === 'Wind speed') {
            return `${metricName}, kph`
        }
    }
}