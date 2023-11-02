import React from "react";

export default function Card({
  name,
  code,
  city,
  space,
  type,
  cluster,
  live,
  register,
}) {
  return (
    <div className="card">
      <div className="container">
        <h4>
          <b>{name}</b>
        </h4>
        {live ? <span className="live">Live</span> : ""}
        <div>Code: {code}</div>
        <div>City: {city}</div>
        <div>Space Available: {space}</div>
        <div>Type: {type}</div>
        <div>Cluster: {cluster}</div>
      </div>
    </div>
  );
}
