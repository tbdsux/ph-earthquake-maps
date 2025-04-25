import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { toast } from "sonner";
import EQPositionMarker from "./components/eq-position-marker";
import FloatingDialog from "./components/floating-dialog";
import { useFDSettings } from "./hooks/use-fd-settings";
import { parseInputDatetime } from "./lib/dates";
import { EQData } from "./lib/types";

function App() {
  const { data, isPending } = useQuery({
    queryKey: ["earthquakes"],
    queryFn: async () => {
      const res = await fetch(import.meta.env.VITE_EQ_PHIVOLCS_API + "/latest");
      const data = (await res.json()) as EQData;

      return {
        ...data,
        data: data.data.map(
          (item) =>
            ({
              ...item,
              Magnitude: Number(item["Magnitude"]),
              "Depth (km)": Number(item["Depth (km)"]),
              "Latitude (ºN)": Number(item["Latitude (ºN)"]),
              "Longitude (ºE)": Number(item["Longitude (ºE)"]),
              parsedDateTime: item["Date - Time(Philippine Time)"]
                ? parseInputDatetime(item["Date - Time(Philippine Time)"])
                : null,
            } as {
              parsedDateTime: Date | null;
              [key: string]: unknown;
            })
        ),
      };
    },
  });

  const date = useFDSettings((state) => state.date);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const t = toast.loading("Loading data...");

    if (!isPending) {
      toast.success("Data loaded successfully", { id: t });
    }
  }, [isPending]);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        className="z-0"
        style={{ height: "100vh" }}
        center={[12.8797, 121.774]}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data?.data
          .filter((item) => {
            if (date && item.parsedDateTime != null) {
              return (
                item.parsedDateTime.getFullYear() === date.getFullYear() &&
                item.parsedDateTime.getMonth() === date.getMonth() &&
                item.parsedDateTime.getDate() === date.getDate()
              );
            }

            return true;
          })
          .map((item, index) => (
            <EQPositionMarker data={item} key={index} />
          ))}
      </MapContainer>

      <FloatingDialog />
    </div>
  );
}

export default App;
