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
                    bg: 'background2',
                    borderColor: 'transparent',
                    height: '44px',
                    minWidth: 'max-content',
                },
                '.ReactA11ySelect__ul': {
                    bg: 'background2',
                    color: 'text',
                    borderTopRightRadius: 'unset',
                    borderBottomRightRadius: 'unset',
                    borderRadius: '3px',
                    maxWidth: '330px',
                    height: '360px',
                    boxShadow: (theme) => `0 0 16px ${colorMode === 'default' ? 'hsl(0 0% 90% / 1)' : theme.colors.modes.dark.background}`,
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
                        },
                        ':focus': {
                            backgroundColor: (theme) => theme.colors.text,
                            color: (theme) => theme.colors.background,
                            outline: 'none',
                        },
                    },
                },
                '.ReactA11ySelect__button__arrow-indicator:after': {
                    verticalAlign: 'middle',
                },
                '.ReactA11ySelect__ul__li__selected-indicator:after': {
                    float: 'left',
                    position: 'relative',
                    left: '-4px',
                },
                '.ReactA11ySelect__ul__li:not([aria-checked=true])': {
                    pl: '1.53rem',
                },
                '.img-wrapper': {
                    marginRight: '10px',
                    verticalAlign: 'top',
                },
            }}
        >
            <Select onChange={onCountryChange} initialValue={selectedCountry} label="select country">
                <Option value="worldwide">
                    <img
                        width="22px"
                        height="15px"
                        sx={{ verticalAlign: 'middle', mr: '10px' }}
                        src="/assets/svg/earth.svg"
                        role="presentation"
                        alt="Worldwide"
                    />
                    <p
                        sx={{
                            maxWidth: '220px',
                            display: 'inline-block',
                            overflow: 'hidden',
                            verticalAlign: 'middle',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            m: 0,
                        }}
                    >
                        worldwide
                    </p>
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
                        <p
                            sx={{
                                maxWidth: '220px',
                                display: 'inline-block',
                                overflow: 'hidden',
                                verticalAlign: 'middle',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                m: 0,
                            }}
                        >
                            {country.name}
                        </p>
                    </Option>
                ))}
            </Select>
        </div>
    );
}
