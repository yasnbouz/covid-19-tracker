import { useColorMode } from 'theme-ui';

import styled from '@emotion/styled';
import CountUp from 'react-countup';

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
                                <img src={cn.countryInfo.flag} alt={cn.country} />
                                <span> {cn.country}</span>
                            </td>
                            <td>
                                <CountUp duration={3.2} delay={0.5} start={0} end={cn.cases} separator="," />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </StyledTable>
    );
}
const StyledTable = styled.div`
    grid-area: Table;
    h3 {
        font-size: ${({ theme }) => theme.fontSizes[3]}px;
    }
    img {
        width: 22px;
        height: 11.61px;
        margin-right: 10px;
    }
    table {
        border-radius: 4px;
        overflow: hidden;
        width: 350px;
        border-collapse: collapse;
        font-size: 18px;
        tbody {
            display: block;
            width: 100%;
            height: 400px;
            overflow-y: auto;
            overflow-x: hidden;
            background-color: ${({ isDark, theme }: { isDark: boolean }) => (isDark ? theme.colors.dark : theme.colors.white)};
            ::-webkit-scrollbar-track {
                background-color: rgba(0, 0, 0, 0.4);
                border-radius: 10px;
            }
            tr {
                height: 40px;
                color: ${({ isDark, theme }: { isDark: boolean }) => (isDark ? theme.colors.white : theme.colors.dark)};
                :nth-of-type(even) {
                    background-color: ${({ theme }) => theme.colors.background};
                }
            }
        }
        th,
        td {
            text-align: left;
            padding: 0 10px;
        }
    }
`;
