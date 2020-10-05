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
                    borderTopRightRadius: 'unset',
                    borderBottomRightRadius: 'unset',
                    borderRadius: '3px',
                    maxWidth: '330px',
                    height: '360px',
                    boxShadow: `0 0 16px ${colorMode === 'default' ? 'hsl(0 0% 90% / 1)' : 'hsl(217 28% 15% / 1)'}`,
                    mr: ['20px', null],
                    overflow: 'auto',
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb,::-webkit-scrollbar-track': {
                        borderRadius: '0 3px 3px 0',
                    },
                    '.ReactA11ySelect__ul__li': {
                        ':not(:hover)': {
                            color: 'text',
                            transition: 'background-color .3s ease-out, color 0.3s ease-in',
                        },
                    },
                },
                '.img-wrapper': {
                    marginRight: '10px',
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
                            sx={{
                                width: '22px',
                                height: '15px',
                                objectFit: 'cover',
                                verticalAlign: 'middle',
                                borderRadius: 3,
                            }}
                            wrapperClassName="img-wrapper"
                            width="22px"
                            height="15px"
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
