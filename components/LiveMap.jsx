"use client";
import {useEffect,useRef} from "react";
import io from "socket.io-client";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken="YOUR_MAPBOX_TOKEN";

export default function LiveMap(){
 const mapRef=useRef(null);

 useEffect(()=>{
  const map=new mapboxgl.Map({
    container: mapRef.current,
    style:"mapbox://styles/mapbox/streets-v11",
    center:[36.82,-1.29],
    zoom:10
  });

  const socket=io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000");

  socket.on("location_update",(d)=>{
    new mapboxgl.Marker().setLngLat([d.lng,d.lat]).addTo(map);
  });

 },[]);

 return <div ref={mapRef} style={{height:"500px"}}/>;
}
