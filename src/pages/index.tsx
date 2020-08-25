/** @jsx jsx */

import { jsx } from 'theme-ui';

import { useState } from 'react';

import PageLayout from '@/layouts/PageLayout';
import Grid from 'components/Grid';
import SelectCountry from 'components/SelectCountry';
import Stats from 'components/Stats';
import fetcher from 'lib/fetcher';
import { GetStaticProps } from 'next';
import useSWR from 'swr';

export default function Home({ countries }: { countries: Array<any> }) {
    const { data } = useSWR('https://disease.sh/v3/covid-19/countries', fetcher, { initialData: countries });
    const [country, setCountry] = useState('worldwide');
    const url = country === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${country}`;
    const { data: countryInfo } = useSWR(url, fetcher);
    const mapedCountries = data.reduce((countries, nextConntry) => {
        if (nextConntry.countryInfo.iso2 !== null) {
            countries.push({ name: nextConntry.country, value: nextConntry.countryInfo.iso2, flag: nextConntry.countryInfo.flag });
        }
        return countries;
    }, []);

    return (
        <PageLayout sx={{ variant: 'containers.page' }}>
            <Grid>
                <SelectCountry countries={mapedCountries} selectedCountry={country} onCountryChange={setCountry} />
                <Stats data={countryInfo} />
                {/* Map */}
                <div sx={{ border: '1px solid red', height: '400px', gridArea: 'Map' }} className="Map"></div>
                {/* Table */}
                <div sx={{ border: '1px solid blue', height: '400px', minWidth: '200px', gridArea: 'Table' }} className="table"></div>
                {/* Graph */}
                <div sx={{ border: '1px solid yellow', height: '200px', minWidth: '200px', gridArea: 'Graph' }} className="graph"></div>
            </Grid>
        </PageLayout>
    );
}
export const getStaticProps: GetStaticProps = async () => {
    const countries = await fetcher(`${process.env.NEXT_PUBLIC_COVID_API}/countries`);
    return { props: { countries } };
};
