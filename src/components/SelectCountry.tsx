/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';

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
    const [colorMode] = useColorMode();
    return (
        <div
            sx={{
                gridArea: 'Select',
                justifySelf: 'center',
                '.ReactA11ySelect__button': {
                    color: 'text',
                    bg: colorMode === 'default' ? 'white' : 'dark',
                    borderColor: colorMode === 'default' ? 'white' : 'dark',
                    transition: 'background-color .3s ease-out, color 0.3s ease-in',
                },
                '.ReactA11ySelect__ul': {
                    bg: colorMode === 'default' ? 'white' : 'dark',
                    color: 'text',
                    transition: 'background-color .3s ease-out, color 0.3s ease-in',
                    '.ReactA11ySelect__ul__li:not(:hover)': {
                        color: 'text',
                        transition: 'background-color .3s ease-out, color 0.3s ease-in',
                    },
                },
                ul: {
                    borderTopRightRadius: 'unset',
                    borderBottomRightRadius: 'unset',
                    height: '400px',
                    overflow: 'auto',
                    scrollbarWidth: 'thin',
                    '::-webkit-scrollbar': {
                        width: '4px',
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
                            sx={{ width: '22px', height: '15px', objectFit: 'cover', verticalAlign: 'middle', borderRadius: 3, mr: '10px' }}
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
