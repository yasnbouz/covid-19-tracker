import { useColorMode } from 'theme-ui';

import MyCircle from 'components/MyCircle';
import { Icon, LatLngLiteral } from 'leaflet';
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const skater = new Icon({
    iconUrl: '/assets/svg/marker.svg',
    iconSize: [32, 32],
});
type CasesTypes = 'cases' | 'recovered' | 'deaths';
type Props = {
    position: LatLngLiteral;
    zoom: number;
    countries: any;
    casesType: CasesTypes;
};
export default function Map({ position, zoom, countries, casesType }: Props) {
    const [colorMode] = useColorMode();
    const style_url = colorMode === 'default' ? process.env.NEXT_PUBLIC_MAP_LIGHT! : process.env.NEXT_PUBLIC_MAP_DARK!;
    const mapUrl = process.env.NEXT_PUBLIC_MAPBOX_API!.replace('STYLE_URL', style_url);
    return (
        <LeafletMap center={position} zoom={zoom}>
            <TileLayer
                url={mapUrl}
                attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' rel='noopener' target='_blank'>Improve this map</a></strong>"
            />
            <Marker position={position} icon={skater} />
            <MyCircle countries={countries} casesType={casesType} />
        </LeafletMap>
    );
}
