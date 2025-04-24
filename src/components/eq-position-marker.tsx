import { LatLngExpression } from "leaflet";
import { Marker, Popup } from "react-leaflet";

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
        <h3 className="text-sm font-semibold">{props.data["Mag"]} Magnitude</h3>
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
