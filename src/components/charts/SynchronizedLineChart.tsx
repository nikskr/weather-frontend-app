import { Area, CartesianGrid, createHorizontalChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import type { IForecastDateWeather, IForecastHourWeather } from '../../models/IWeather';
import classes from './SynchronizedLineChart.module.css'
import { calcAxisTitleWithUnits, calcAxisTitle } from '../../utils/axis';
import type { ChartKind } from '../../models/ICommon';

type DataType = IForecastDateWeather | IForecastHourWeather

interface IChartItem {
    label: string;
    temperature: number;
    windSpeed: number;
    humidity: number;
}

function mapWeatherData(data: (IForecastDateWeather | IForecastHourWeather)[], type: ChartKind): IChartItem[] {
    if (type === 'date') {
        return (data as IForecastDateWeather[]).map(v => ({
            label: v.date,
            temperature: v.day?.avgtemp_c ?? 0,
            windSpeed: v.day?.maxwind_kph ?? 0,
            humidity: v.day?.avghumidity ?? 0,
        }));
    }

    return (data as IForecastHourWeather[]).map(v => ({
        label: v.time,
        temperature: v.temp_c ?? 0,
        windSpeed: v.wind_kph ?? 0,
        humidity: v.humidity ?? 0,
    }));
}

const Typed = createHorizontalChart<IChartItem, string, number>()({ Area, XAxis, YAxis, Tooltip, Line });

const renderCommonWrapper = (type: ChartKind) => {
    return (metricName: string) => (
        <>
            <CartesianGrid />
            <Typed.XAxis
                dataKey="label"
                tickFormatter={(label) => {
                    if (type === 'date') {
                        const parts = label.split('-');
                        return `${parts[2]}.${parts[1]}`;
                    }
                    return label.split(' ')[1] ?? label;
                }}
                label={{ position: 'insideBottomRight', value: type === 'date' ? 'Date' : 'Time', offset: -15 }}
            />
            <Typed.YAxis
                label={{
                    value: calcAxisTitleWithUnits(type, metricName),
                    angle: -90,
                    position: 'insideLeft',
                    dy: 70,
                    dx: 10
                }}
            />
            <Tooltip
                labelFormatter={(labelValue) => {
                    if (typeof (labelValue) === 'string' && type === 'date')
                        return `Date: ${labelValue?.split('-')?.reverse().join('.')}`
                    if (typeof (labelValue) === 'string' && type === 'hour')
                        return `Time: ${labelValue?.split(' ')[1]}`
                }}
                formatter={(value, name) => {
                    name = metricName
                    let unit = '';
                    if (name === 'Temperature') unit = '°C';
                    if (name === 'Wind speed') unit = 'kph';
                    if (name === 'Humidity') unit = '%';

                    return [`${value} ${unit}`, calcAxisTitle(type, name)];
                }}
            />
        </>
    );
}

export default function SynchronizedLineChart({ data, type }: { data: DataType[], type: ChartKind }) {
    const chartData = mapWeatherData(data, type);
    const renderCommon = renderCommonWrapper(type)
    return (
        <div className={classes.lineChartContainer}>
            <div className={classes.lineChartItem}>
                <h3>Temperature</h3>
                <Typed.LineChart
                    className={classes.chartBlock}
                    style={{ width: '100%', maxWidth: '700px', maxHeight: '30vh', aspectRatio: 1.618 }}
                    responsive
                    data={chartData}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 20,
                    }}
                >
                    {renderCommon('Temperature')}
                    <Typed.Line type="monotone" dataKey="temperature" />
                </Typed.LineChart>
            </div>

            <div className={classes.lineChartItem}>
                <h3>Wind speed</h3>
                <Typed.LineChart
                    className={classes.chartBlock}
                    style={{ width: '100%', maxWidth: '700px', maxHeight: '30vh', aspectRatio: 1.618 }}
                    responsive
                    data={chartData}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 20,
                    }}
                >
                    {renderCommon('Wind speed')}

                    <Typed.Line type="monotone" dataKey="windSpeed" />
                    {/* <Brush stroke="var(--color-border-1)" fill="var(--color-surface-base)" /> */}
                </Typed.LineChart>
            </div>

            <div className={classes.lineChartItem}>
                <h3>Humidity</h3>
                <Typed.AreaChart
                    className={classes.chartBlock}
                    style={{ width: '100%', maxWidth: '700px', maxHeight: '30vh', aspectRatio: 1.618 }}
                    responsive
                    data={chartData}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 20,
                    }}
                >
                    {renderCommon('Humidity')}

                    <Typed.Area type="monotone" dataKey="humidity" />
                </Typed.AreaChart>
            </div>
        </div>
    );
}