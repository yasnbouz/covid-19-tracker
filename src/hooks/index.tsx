import { useEffect, useMemo } from 'react';

import { fetcher } from 'lib/fetcher';
import useSWR, { mutate } from 'swr';
import { SortCases } from 'utils/SortCases';

export const useCountries = ({ initialData }) => {
    const { data: allCountries, ...rest } = useSWR(`${process.env.NEXT_PUBLIC_COVID_API}/countries`, fetcher, {
        initialData,
        revalidateOnFocus: false,
    });
    return { allCountries, ...rest };
};
export const useChartData = ({ initialData }) => {
    const { data: chartData, ...rest } = useSWR(`${process.env.NEXT_PUBLIC_COVID_API}/historical/all?lastdays=120`, fetcher, {
        initialData,
    });

    return { chartData, ...rest };
};
export const useCountryData = ({ url, initialData }) => {
    const { data: countryInfo, ...rest } = useSWR(url, fetcher, { initialData });
    useEffect(() => {
        mutate(url);
    }, [initialData]);
    return { countryInfo, ...rest };
};

export const useURL = ({ country }) => {
    return useMemo(() => `${process.env.NEXT_PUBLIC_COVID_API}/${country === 'worldwide' ? `all` : `countries/${country}`}`, [country]);
};
export const useSelectCountries = ({ allCountries }) => {
    return useMemo(
        () =>
            allCountries.reduce((countries, nextConntry) => {
                if (nextConntry.countryInfo.iso2 !== null) {
                    countries.push({
                        name: nextConntry.country,
                        value: nextConntry.countryInfo.iso2,
                        flag: nextConntry.countryInfo.flag,
                    });
                }
                return countries;
            }, []),
        [allCountries],
    );
};
export const useTableData = ({ countries }) => {
    return useMemo(() => {
        return SortCases(countries);
    }, [countries]);
};
