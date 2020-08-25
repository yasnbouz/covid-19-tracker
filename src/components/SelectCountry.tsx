/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Select, Option } from 'react-a11y-select';

import 'react-a11y-select/src/styles.css';

interface ICountry {
    name: string;
    value: string;
    flag: string;
}

export default function SelectCountry({
    countries,
    selectedCountry,
    onCountryChange,
}: {
    countries: ICountry[];
    selectedCountry: string;
    onCountryChange: (value: string) => void;
}) {
    return (
        <div
            sx={{
                gridArea: 'Select',
                justifySelf: 'center',
                ul: {
                    borderTopRightRadius: 'unset',
                    borderBottomRightRadius: 'unset',
                    height: '400px',
                    overflow: 'auto',
                    '::-webkit-scrollbar': {
                        width: '3px',
                        height: '3px',
                    },
                },
            }}
        >
            <Select onChange={onCountryChange} initialValue={selectedCountry} label="select country">
                <Option value="worldwide">
                    <img
                        sx={{ width: '18px', height: '18px', verticalAlign: 'middle', mr: '10px' }}
                        src="/assets/svg/earth.svg"
                        role="presentation"
                        alt="Worldwide"
                    />
                    Worldwide
                </Option>

                {countries.map((country) => (
                    <Option value={country.value} key={country.value}>
                        <img sx={{ width: '18px', height: '18px', mr: '10px' }} src={country.flag} role="presentation" alt={country.name} />
                        {country.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
}
