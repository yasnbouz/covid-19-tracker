/** @jsx jsx */

import { jsx } from 'theme-ui';

import { useState, useMemo } from 'react';

import PageLayout from '@/layouts/PageLayout';
import Grid from 'components/Grid';
import LineGraph from 'components/LineChart';
import SelectCountry from 'components/SelectCountry';
import Stats from 'components/Stats';
import Table from 'components/Table';
import fetcher from 'lib/fetcher';
import { GetStaticProps } from 'next';
import useSWR from 'swr';
import { SortCases } from 'utils/SortCases';

export default function Home({ countries, historical }: { countries: Array<any>; historical: any[] }) {
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_COVID_API}/countries`, fetcher, { initialData: countries });
    const { data: chartData } = useSWR(`${process.env.NEXT_PUBLIC_COVID_API}/historical/all?lastdays=120`, fetcher, {
        initialData: historical,
    });
    const [country, setCountry] = useState('worldwide');
    const url =
        country === 'worldwide' ? `${process.env.NEXT_PUBLIC_COVID_API}/all` : `${process.env.NEXT_PUBLIC_COVID_API}/countries/${country}`;
    const { data: countryInfo } = useSWR(url, fetcher);
    const mapedCountries = useMemo(
        () =>
            data.reduce((countries, nextConntry) => {
                if (nextConntry.countryInfo.iso2 !== null) {
                    countries.push({ name: nextConntry.country, value: nextConntry.countryInfo.iso2, flag: nextConntry.countryInfo.flag });
                }
                return countries;
            }, []),
        [countries],
    );
    const sortedData = SortCases(data);
    return (
        <PageLayout sx={{ variant: 'containers.page' }}>
            <Grid>
                <SelectCountry countries={mapedCountries} selectedCountry={country} onCountryChange={setCountry} />
                <Stats data={countryInfo} />
                {/* Map */}
                <div sx={{ border: '1px solid red', height: '400px', gridArea: 'Map' }} className="Map"></div>
                {/* Table */}
                <Table countries={sortedData} />
                {/* Graph */}
                <LineGraph data={chartData} />
            </Grid>
        </PageLayout>
    );
}
export const getStaticProps: GetStaticProps = async () => {
    const countries = await fetcher(`${process.env.NEXT_PUBLIC_COVID_API}/countries`);
    const historical = await fetcher(`${process.env.NEXT_PUBLIC_COVID_API}/historical/all?lastdays=120`);
    return { props: { countries, historical }, revalidate: 1 };
};
