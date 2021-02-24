/** @jsx jsx */
import { jsx } from 'theme-ui';

import { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import PageLayout from '@/layouts/PageLayout';
import Grid from 'components/Grid';
import LineChart from 'components/LineChart';
import Loader from 'components/Loader';
import SelectCountry from 'components/SelectCountry';
import Stats from 'components/Stats';
import Table from 'components/Table';
import { useSelectCountries } from 'hooks';
import { fetcher } from 'lib/fetcher';
import { GetStaticPaths, GetStaticProps } from 'next';
import { StyledMap } from 'styles';

const Map = dynamic(() => import('components/Map'), { ssr: false, loading: Loader });
type CasesTypes = 'cases' | 'recovered' | 'deaths';

export default function Home({ countries, historical, countryData }: { countries: [object]; historical: any; countryData: any }) {
    const router = useRouter();
    if (router.isFallback) {
        return <Loader />;
    }
    const [country, setCountry] = useState(router.query?.country?.[0] ?? 'worldwide');

    const handleCountryChange = (country) => {
        setCountry(country);
        country === 'worldwide' ? router.push('/') : router.push(`/${country}`);
    };
    const mapedCountries = useSelectCountries({ allCountries: countries });
    const [mapPosition, setMapPosition] = useState({ lat: 40.7143528, lng: -74.0059731 });
    const [mapZoom, setMapZoom] = useState(3);
    const [casesType, setCasesType] = useState<CasesTypes>('deaths');

    useEffect(() => {
        if (countryData?.countryInfo) {
            const { lat, long: lng } = countryData.countryInfo;
            setMapPosition({ lat, lng });
            setMapZoom(6);
        } else {
            setMapPosition({ lat: 40.7143528, lng: -74.0059731 });
            setMapZoom(3);
        }
    }, []);
    return (
        <PageLayout sx={{ variant: [null, 'containers.page'] }} country={country}>
            <Grid>
                <SelectCountry countries={mapedCountries} selectedCountry={country} onCountryChange={handleCountryChange} />
                <Stats data={countryData} onClick={setCasesType} />
                {/* Map */}
                <StyledMap>
                    <Map position={mapPosition} zoom={mapZoom} countries={countries} casesType={casesType} />
                </StyledMap>
                {/* Table */}
                <Table countries={countries} />
                {/* Graph */}
                <LineChart data={historical} casesType={casesType} />
            </Grid>
        </PageLayout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const countries: any[] = await fetcher(`${process.env.NEXT_PUBLIC_COVID_API}/countries`);
    const paths = countries.map((cn) => ({ params: { country: [`${cn.countryInfo.iso2}`] } }));
    return {
        paths: [{ params: { country: [] } }, ...paths],
        fallback: true,
    };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
    const countries = await fetcher(`${process.env.NEXT_PUBLIC_COVID_API}/countries`);
    const historical = await fetcher(`${process.env.NEXT_PUBLIC_COVID_API}/historical/all?lastdays=120`);
    const country = ctx.params?.country?.[0] ?? 'worldwide';
    const url = `${process.env.NEXT_PUBLIC_COVID_API}/${
        country === 'worldwide' ? `all` : `countries/${country}`
    }?yesterday=true&strict=true`;
    const countryData = await fetcher(url);
    return { revalidate: 60 * 60 * 12, props: { countries, historical, countryData } };
};
