/** @jsx jsx */
import { jsx } from 'theme-ui';

import { useState, useMemo, useEffect } from 'react';

import dynamic from 'next/dynamic';

import PageLayout from '@/layouts/PageLayout';
import Grid from 'components/Grid';
import { CasesTypes } from 'components/Map';
import { fetcher } from 'lib/fetcher';
import { GetStaticProps } from 'next';
import useSWR from 'swr';
import { SortCases } from 'utils/SortCases';

const SelectCountry = dynamic(() => import('components/SelectCountry'), { ssr: false });
const Stats = dynamic(() => import('components/Stats'), { ssr: false });
const Table = dynamic(() => import('components/Table'), { ssr: false });
const LineChart = dynamic(() => import('components/LineChart'), { ssr: false });
const Map = dynamic(() => import('components/Map'), { ssr: false });

export default function Home({ countries, historical }: { countries: [object]; historical: any }) {
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

    useEffect(() => {
        if (countryInfo?.countryInfo) {
            const { lat, long: lng } = countryInfo.countryInfo;
            setMapPosition({ lat, lng });
            setMapZoom(6);
        } else {
            setMapPosition({ lat: 40.7143528, lng: -74.0059731 });
            setMapZoom(3);
        }
    }, [countryInfo, country]);
    const sortedData = SortCases(data);
    const [mapPosition, setMapPosition] = useState({ lat: 40.7143528, lng: -74.0059731 });
    const [mapZoom, setMapZoom] = useState(3);
    const [casesType, setCasesType] = useState<CasesTypes>('cases');
    return (
        <PageLayout sx={{ variant: [null, 'containers.page'] }}>
            <Grid>
                <SelectCountry countries={mapedCountries} selectedCountry={country} onCountryChange={setCountry} />
                <Stats data={countryInfo} onClick={setCasesType} />
                {/* Map */}
                <Map position={mapPosition} zoom={mapZoom} countries={data} casesType={casesType} />
                {/* Table */}
                <Table countries={sortedData} />
                {/* Graph */}
                <LineChart data={chartData} casesType={casesType} />
            </Grid>
        </PageLayout>
    );
}
export const getStaticProps: GetStaticProps = async () => {
    const countries = await fetcher(`${process.env.NEXT_PUBLIC_COVID_API}/countries`);
    const historical = await fetcher(`${process.env.NEXT_PUBLIC_COVID_API}/historical/all?lastdays=120`);
    return { props: { countries, historical }, revalidate: 1 };
};
