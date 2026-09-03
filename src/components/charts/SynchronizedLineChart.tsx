import { Area, CartesianGrid, createHorizontalChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import type { IForecastDateWeather, IForecastHourWeather } from '../../models/IWeather';
import classes from './SynchronizedLineChart.module.css'
import { calcAxisTitleWithUnits, calcAxisTitle } from '../../utils/axis';

type DataType = IForecastDateWeather | IForecastHourWeather

const Typed = createHorizontalChart<DataType, string, number>()({ Area, XAxis, YAxis, Tooltip, Line });

const renderCommon = (type: string) => {
    return (metricName: string) => (
        <>
            <CartesianGrid />
            {type === 'date' ?
                <Typed.XAxis
                    dataKey={(v) => ('date' in v ? v.date : '')}
                    tickFormatter={(date) => {
                        const parts = date.split('-');
                        return `${parts[2]}.${parts[1]}`;
                    }}
                    label={{ position: 'insideBottomRight', value: 'Date', offset: -15 }}
                />
                :
                <Typed.XAxis
                    dataKey={(v) => ('time' in v ? v.time : '')}
                    tickFormatter={(time) => {
                        const parts = time.split(' ');
                        return `${parts[1]}`;
                    }}
                    label={{ position: 'insideBottomRight', value: 'Time', offset: -15 }}
                />
            }

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

export default function SynchronizedLineChart({ data, type }: { data: DataType[], type: string }) {
    return (
        <div className={classes.lineChartContainer}>
            <div className={classes.lineChartItem}>
                <h3>Temperature</h3>
                <Typed.LineChart
                    style={{ width: '100%', maxWidth: '700px', maxHeight: '30vh', aspectRatio: 1.618 }}
                    responsive
                    data={data}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 20,
                    }}
                >
                    {renderCommon(type)('Temperature')}
                    <Typed.Line type="monotone" dataKey={(v) => {

                        if (type === 'date') {
                            return ('day' in v ? v.day.avgtemp_c : 0);
                        }

                        if (type === 'hour') {
                            return ('temp_c' in v ? v.temp_c : 0);
                        }

                        return 0;
                    }}
                    />
                </Typed.LineChart>
            </div>

            <div className={classes.lineChartItem}>
                <h3>Wind speed</h3>
                <Typed.LineChart
                    style={{ width: '100%', maxWidth: '700px', maxHeight: '30vh', aspectRatio: 1.618 }}
                    responsive
                    data={data}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 20,
                    }}
                >
                    {renderCommon(type)('Wind speed')}

                    <Typed.Line type="monotone" dataKey={(v) => {

                        if (type === 'date') {
                            return ('day' in v ? v.day.maxwind_kph : 0)
                        }

                        if (type === 'hour') {
                            return ('wind_kph' in v ? v.wind_kph : 0)
                        }

                        return 0;
                    }}
                    />
                    {/* <Brush stroke="var(--color-border-1)" fill="var(--color-surface-base)" /> */}
                </Typed.LineChart>
            </div>

            <div className={classes.lineChartItem}>
                <h3>Humidity</h3>
                <Typed.AreaChart
                    style={{ width: '100%', maxWidth: '700px', maxHeight: '30vh', aspectRatio: 1.618 }}
                    responsive
                    data={data}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 20,
                    }}
                >
                    {renderCommon(type)('Humidity')}

                    <Typed.Area type="monotone" dataKey={(v) => {
                        if (type === 'date') {
                            return ('day' in v ? v.day.avghumidity : 0);
                        }

                        if (type === 'hour') {
                            return ('humidity' in v ? v.humidity : 0);
                        }

                        return 0;
                    }}
                    />
                </Typed.AreaChart>
            </div>





        </div>
    );
}