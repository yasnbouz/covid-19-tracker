/** @jsx jsx */
import { jsx } from 'theme-ui';

import { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import PageLayout from '@/layouts/PageLayout';
import Grid from 'components/Grid';
import LineChart from 'components/LineChart';
import { CasesTypes } from 'components/Map';
import SelectCountry from 'components/SelectCountry';
import Stats from 'components/Stats';
import Table from 'components/Table';
import { useChartData, useCountries, useCountryData, useSelectCountries, useTableData, useURL } from 'hooks';
import { fetcher } from 'lib/fetcher';
import { GetServerSideProps } from 'next';

const Map = dynamic(() => import('components/Map'), { ssr: false });

export default function Home({ countries, historical, countryData }: { countries: [object]; historical: any; countryData: any }) {
    const router = useRouter();
    const { allCountries } = useCountries({ initialData: countries });
    const { chartData } = useChartData({ initialData: historical });
    const [country, setCountry] = useState(router.query?.country?.[0] ?? 'worldwide');
    const url = useURL({ country });
    const { countryInfo } = useCountryData({ url, initialData: countryData });

    const handleCountryChange = (country) => {
        setCountry(country);
        router.push(`/${country}`);
    };
    const mapedCountries = useSelectCountries({ allCountries });
    const sortedData = useTableData({ allCountries });
    const [mapPosition, setMapPosition] = useState({ lat: 40.7143528, lng: -74.0059731 });
    const [mapZoom, setMapZoom] = useState(3);
    const [casesType, setCasesType] = useState<CasesTypes>('cases');

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
    return (
        <PageLayout sx={{ variant: [null, 'containers.page'] }} country={country}>
            <Grid>
                <SelectCountry countries={mapedCountries} selectedCountry={country} onCountryChange={handleCountryChange} />
                <Stats data={countryInfo} onClick={setCasesType} />
                {/* Map */}
                <Map position={mapPosition} zoom={mapZoom} countries={allCountries} casesType={casesType} />
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
    const country = ctx.params?.country?.[0] ?? 'worldwide';
    const url = `${process.env.NEXT_PUBLIC_COVID_API}/${country === 'worldwide' ? `all` : `countries/${country}`}`;
    const countryData = await fetcher(url);
    return { props: { countries, historical, countryData } };
};
