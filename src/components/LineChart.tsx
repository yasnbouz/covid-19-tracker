/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';

import { useCallback, useMemo } from 'react';

import numeral from 'numeral';
import { Line } from 'react-chartjs-2';

import Loader from './Loader';

export default function LineChart({ data }) {
    const [colorMode] = useColorMode();
    const buildChartData = useCallback(
        (data, casesType = 'cases') => {
            const chartData: object[] = [];
            let lastDataPoint;
            for (let date in data[casesType]) /*eslint-disable-line prefer-const*/ {
                if (lastDataPoint) {
                    const newDataPoint = { x: date, y: data[casesType][date] - lastDataPoint };
                    chartData.push(newDataPoint);
                }
                lastDataPoint = data[casesType][date];
            }
            return chartData;
        },
        [data],
    );
    const options = useMemo(
        () => ({
            legend: {
                display: true,
                labels: {
                    fontColor: colorMode === 'default' ? '#666' : '#F7F7F7',
                },
            },
            maintainAspectRatio: false,
            elements: { point: { radius: 1 } },
            tooltips: {
                mode: 'index',
                intersect: true,
                callbacks: {
                    label: function (tooltipItem) {
                        return numeral(tooltipItem.value).format('+0,0');
                    },
                },
            },
            scales: {
                xAxes: [
                    {
                        type: 'time',
                        time: {
                            parser: 'MM/DD/YY',
                            tooltipFormat: 'll',
                        },
                        ticks: { fontColor: colorMode === 'default' ? '#666' : '#F7F7F7' },
                        gridLines: { display: false, color: colorMode === 'default' ? 'rgba(0,0,0,.1)' : 'rgba(255,255,255,.2)' },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            fontColor: colorMode === 'default' ? '#666' : '#F7F7F7',
                            callback: function (value) {
                                return numeral(value).format('0a');
                            },
                        },
                        gridLines: { color: colorMode === 'default' ? 'rgba(0,0,0,.1)' : 'rgba(255,255,255,.2)' },
                    },
                ],
            },
        }),
        [colorMode],
    );

    return (
        <div sx={{ height: '200px', minWidth: '200px', gridArea: 'Graph', position: 'relative' }} className="graph">
            <h3 sx={{ fontSize: 3 }}>Worldwide statistics</h3>
            {!data ? (
                <Loader />
            ) : (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                label: 'Cases',
                                fill: false,
                                data: buildChartData(data),
                                backgroundColor: 'rgb(251 120 0/40%)',
                                borderColor: 'rgb(251 120 0)',
                                borderWidth: 1.5,
                            },
                            {
                                label: 'Deaths',
                                fill: false,
                                data: buildChartData(data, 'deaths'),
                                backgroundColor: 'rgb(253 0 14/40%)',
                                borderColor: 'rgb(253 0 14)',
                                borderWidth: 1.5,
                            },
                            {
                                label: 'Recovered',
                                fill: false,
                                data: buildChartData(data, 'recovered'),
                                backgroundColor: 'rgb(5 181 132/40%)',
                                borderColor: 'rgb(5 181 132)',
                                borderWidth: 1.5,
                            },
                        ],
                    }}
                />
            )}
        </div>
    );
}
