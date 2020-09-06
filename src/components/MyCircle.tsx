/** @jsx jsx */

import { jsx } from 'theme-ui';

import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

import { CasesTypes } from './Map';

type Props = {
    countries: any;
    casesType: CasesTypes;
};
const casesTypeColors = {
    cases: {
        hex: '#FB7800',
        multiplier: 800,
    },
    recovered: {
        hex: '#05b584',
        multiplier: 1200,
    },
    deaths: {
        hex: '#FD000E',
        multiplier: 2000,
    },
};

export default function showDataOnMap({ countries, casesType }: Props) {
    return countries.map((cn) => (
        <Circle
            key={cn.country}
            center={[cn.countryInfo.lat, cn.countryInfo.long]}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            fillOpacity={0.15}
            radius={Math.sqrt(cn[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup>
                <div
                    sx={{
                        p: {
                            m: '0px !important',
                            py: 2,
                            ':not(:last-child)': {
                                borderBottom: '1px solid #ddd',
                            },
                        },
                    }}
                >
                    <p>
                        <strong>{`  ${cn.continent}, ${cn.country}  `}</strong>
                        <img
                            sx={{ width: 24, height: 16, verticalAlign: 'middle', borderRadius: 3 }}
                            src={cn.countryInfo.flag}
                            alt={cn.country}
                            title={cn.country}
                        />
                    </p>
                    <p>
                        Cases: <strong sx={{ color: 'warning' }}>{numeral(cn.cases).format('0,0')}</strong>
                    </p>
                    <p>
                        Recovered: <strong sx={{ color: 'success' }}>{numeral(cn.recovered).format('0,0')}</strong>
                    </p>
                    <p>
                        Deaths: <strong sx={{ color: 'error' }}>{numeral(cn.deaths).format('0,0')}</strong>
                    </p>
                </div>
            </Popup>
        </Circle>
    ));
}
