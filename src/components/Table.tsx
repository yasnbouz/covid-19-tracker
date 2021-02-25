/** @jsx jsx */
import { jsx } from 'theme-ui';

import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { StyledTable } from 'styles';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Table({ countries }: { countries: Array<any> }) {
    return (
        <StyledTable>
            <h3>Live cases by country</h3>
            <table>
                <tbody>
                    {countries.map((cn) => (
                        <tr key={cn.country} sx={{ bg: 'background', ':nth-of-type(odd)': { bg: 'background2' } }}>
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
