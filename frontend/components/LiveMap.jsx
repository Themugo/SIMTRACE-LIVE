"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// FIX MARKER ICONS
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function LiveMap() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

    socket.on("location_update", (data) => {
      setLocations((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <MapContainer
      center={[-1.29, 36.82]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {locations.map((loc, i) => (
        <Marker key={i} position={[loc.lat, loc.lng]}>
          <Popup>{loc.device_id}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
