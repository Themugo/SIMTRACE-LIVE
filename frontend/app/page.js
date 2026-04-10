"use client";

import dynamic from "next/dynamic";

const LiveMap = dynamic(() => import("../components/LiveMap"), {
  ssr: false,
});

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>SimTrace Live Tracking</h1>
      <LiveMap />
    </div>
  );
}
