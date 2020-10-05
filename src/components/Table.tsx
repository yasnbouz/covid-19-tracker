import { useColorMode } from 'theme-ui';

import styled from '@emotion/styled';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Table({ countries }: { countries: Array<any> }) {
    const [colorMode] = useColorMode();
    return (
        <StyledTable isDark={colorMode === 'dark'}>
            <h3>Live cases by country</h3>
            <table>
                <tbody>
                    {countries.map((cn) => (
                        <tr key={cn.country}>
                            <td>
                                <LazyLoadImage
                                    wrapperClassName="img-wrapper"
                                    height="15px"
                                    width="22px"
                                    alt={cn.country}
                                    src={cn.countryInfo.flag}
                                    effect="blur"
                                />
                                <span className="country">{cn.country}</span>
                            </td>
                            <td>{numeral(cn.cases).format('0,0')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </StyledTable>
    );
}
const StyledTable = styled.aside`
    grid-area: Table;
    justify-self: center;
    @media screen and (min-width: 742px) {
        justify-self: start;
        align-items: start;
    }
    h3 {
        font-family: 'CrimsonPro-Roman-VF';
        font-variation-settings: 'wght' 350;
    }
    .img-wrapper {
        margin-right: 10px;
    }
    img {
        width: 22px;
        height: 15px;
        vertical-align: middle;
        object-fit: cover;
    }
    table {
        table-layout: fixed;
        border-radius: 3px;
        overflow: hidden;
        border-collapse: collapse;
        tbody {
            display: block;
            width: 100%;
            height: 400px;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: thin;
            ::-webkit-scrollbar-track {
                background-color: rgba(0, 0, 0, 0.4);
                border-radius: 10px;
            }
            tr {
                height: 40px;
                color: ${({ isDark, theme }: { isDark: boolean; theme: any }) => (isDark ? theme.colors.white : theme.colors.dark)};
                :nth-of-type(odd) {
                    background-color: ${({ isDark, theme }: { isDark: boolean; theme: any }) =>
                        isDark ? theme.colors.dark : theme.colors.white};
                }
                transition: background-color 0.3s ease-out, color 0.3s ease-in;
            }
        }
        th,
        td {
            text-align: left;
            padding: 0 10px;
        }
    }
`;
