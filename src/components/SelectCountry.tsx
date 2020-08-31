/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Select, Option } from 'react-a11y-select';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-a11y-select/src/styles.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
                        sx={{ width: '22px', height: '15px', verticalAlign: 'middle', mr: '10px' }}
                        src="/assets/svg/earth.svg"
                        role="presentation"
                        alt="Worldwide"
                    />
                    Worldwide
                </Option>

                {countries.map((country) => (
                    <Option value={country.value} key={country.value}>
                        <LazyLoadImage
                            sx={{ width: '22px', height: '15px', verticalAlign: 'middle', mr: '10px' }}
                            alt={country.name}
                            src={country.flag}
                            effect="blur"
                        />
                        {country.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
}
