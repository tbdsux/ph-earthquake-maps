import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function App() {
  return (
    <>
      <MapContainer
        style={{ height: 1024 }}
        center={[12.8797, 121.774]}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[12.8797, 121.774]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker position={[12, 119]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default App;
