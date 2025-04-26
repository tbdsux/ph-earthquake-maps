import L, { LatLngExpression } from "leaflet";
import { Marker, Popup } from "react-leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default icon path issues with Vite
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function EQPositionMarker(props: {
  data: {
    parsedDateTime: Date | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}) {
  const calcPosition = [
    Number(props.data["Latitude (ºN)"]),
    Number(props.data["Longitude (ºE)"]),
  ] as LatLngExpression;

  return (
    <Marker position={calcPosition}>
      <Popup>
        <h3 className="text-sm font-semibold">
          <a
            href={props.data["Link"]}
            target="_blank"
            rel="noreferer noopener"
            className="hover:underline"
          >
            {props.data["Mag"]} Magnitude
          </a>
        </h3>
        <div className="flex flex-col space-y-0">
          <p className="text-xs text-gray-500">
            {props.data["Location"]}
            <br />
            {props.data["Depth (km)"]} km Depth
          </p>

          <p className="text-xs text-gray-500 !m-0">
            {props.data["Date - Time(Philippine Time)"]}
          </p>

          <p className="text-xs text-gray-500">
            Latitude: {props.data["Latitude (ºN)"]} (ºN) <br />
            Longitude: {props.data["Longitude (ºE)"]} (ºE)
          </p>
        </div>
      </Popup>
    </Marker>
  );
}
