/** @jsx jsx */
import { jsx } from 'theme-ui';

import { useState, useMemo, useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import PageLayout from '@/layouts/PageLayout';
import Grid from 'components/Grid';
import LineChart from 'components/LineChart';
import { CasesTypes } from 'components/Map';
import SelectCountry from 'components/SelectCountry';
import Stats from 'components/Stats';
import Table from 'components/Table';
import { fetcher } from 'lib/fetcher';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import { SortCases } from 'utils/SortCases';

const Map = dynamic(() => import('components/Map'), { ssr: false });

export default function Home({ countries, historical, countryData }: { countries: [object]; historical: any; countryData: any }) {
    const router = useRouter();
    const { name } = router.query;
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_COVID_API}/countries`, fetcher, { initialData: countries });
    const { data: chartData } = useSWR(`${process.env.NEXT_PUBLIC_COVID_API}/historical/all?lastdays=120`, fetcher, {
        initialData: historical,
    });
    const [country] = useState(name as string);
    const handleCountryChange = (country) => {
        router.replace(`/countries/${country}`);
    };
    const url = useMemo(() => {
        return country === 'worldwide'
            ? `${process.env.NEXT_PUBLIC_COVID_API}/all`
            : `${process.env.NEXT_PUBLIC_COVID_API}/countries/${country}`;
    }, [country]);

    const { data: countryInfo } = useSWR(url, fetcher, { initialData: countryData });
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
    const sortedData = useMemo(() => {
        return SortCases(data);
    }, [data]);
    const [mapPosition, setMapPosition] = useState({ lat: 40.7143528, lng: -74.0059731 });
    const [mapZoom, setMapZoom] = useState(3);
    const [casesType, setCasesType] = useState<CasesTypes>('cases');
    return (
        <PageLayout sx={{ variant: [null, 'containers.page'] }} country={country}>
            <Grid>
                <SelectCountry countries={mapedCountries} selectedCountry={country} onCountryChange={handleCountryChange} />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const countries = await fetcher(`${process.env.NEXT_PUBLIC_COVID_API}/countries`);
    const historical = await fetcher(`${process.env.NEXT_PUBLIC_COVID_API}/historical/all?lastdays=120`);
    const country = ctx?.params?.name;
    const url =
        country === 'worldwide' ? `${process.env.NEXT_PUBLIC_COVID_API}/all` : `${process.env.NEXT_PUBLIC_COVID_API}/countries/${country}`;
    const countryData = await fetcher(url);
    return { props: { countries, historical, countryData } };
};
