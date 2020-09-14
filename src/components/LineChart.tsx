/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';

import { useCallback, useMemo } from 'react';

import numeral from 'numeral';
import { Line } from 'react-chartjs-2';

import Loader from './Loader';
import { CasesTypes } from './Map';

const casesTypeColors = {
    cases: {
        color: 'RGB(251,120,0)',
        color_op: 'RGB(251 120 0/40%)',
        label: 'Cases',
    },
    recovered: {
        color: 'RGB(5, 181, 132)',
        color_op: 'rgb(5 181 132/40%)',
        label: 'Recovered',
    },
    deaths: {
        color: 'RGB(253, 0, 14)',
        color_op: 'RGB(253 0 14/40%)',
        label: 'Deaths',
    },
};
type Props = {
    data: any;
    casesType: CasesTypes;
};
export default function LineChart({ data, casesType }: Props) {
    const [colorMode] = useColorMode();
    const buildChartData = useCallback(
        (data, casesType) => {
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
        <aside sx={{ gridArea: 'Graph', position: 'relative', justifySelf: 'center' }} className="graph">
            <h3 sx={{ fontVariationSettings: "'wght' 350" }}>Worldwide new {casesType}</h3>
            {!data ? (
                <Loader />
            ) : (
                <div sx={{ height: ['280px', '200px', '230px'], width: ['350px', '400px'] }}>
                    <Line
                        options={options}
                        data={{
                            datasets: [
                                {
                                    label: casesTypeColors[casesType].label,
                                    fill: true,
                                    data: buildChartData(data, casesType),
                                    borderColor: casesTypeColors[casesType].color,
                                    backgroundColor: casesTypeColors[casesType].color_op,
                                    borderWidth: 1.5,
                                },
                            ],
                        }}
                    />
                </div>
            )}
        </aside>
    );
}
