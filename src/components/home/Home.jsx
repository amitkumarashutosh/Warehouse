import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Home.css";
import data from "../../../data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWarehouses } from "../../app/features/warehouseSlice";

export default function Home() {
  const dispatch = useDispatch();
  const globalData = useSelector((state) => state.warehouses);

  useEffect(() => {
    if (globalData.length == 0) {
      dispatch(setWarehouses(data));
    } else {
      dispatch(setWarehouses(globalData));
    }
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    cluster: "",
    spaceLimit: "",
  });

  const filteredWarehouses = useSelector((state) => state.warehouses).filter(
    (warehouse) => {
      return (
        warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (warehouse.city === filters.city || filters.city === "") &&
        (warehouse.cluster === filters.cluster || filters.cluster === "") &&
        (warehouse.space_available >= parseInt(filters.spaceLimit) ||
          filters.spaceLimit === "")
      );
    }
  );

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const uniqueCities = Array.from(
    new Set(data.map((warehouse) => warehouse.city))
  );
  const allCities = uniqueCities.map((item) => {
    return (
      <option value={item} key={item}>
        {item}
      </option>
    );
  });

  const uniqueCluster = Array.from(
    new Set(data.map((warehouse) => warehouse.cluster))
  );
  const allCluster = uniqueCluster.map((item) => {
    return (
      <option value={item} key={item}>
        {item}
      </option>
    );
  });

  const warehousesElements = filteredWarehouses.map((item) => {
    return (
      <Link to={`/details/${item.id}`} key={item.id}>
        <Card
          name={item.name}
          code={item.code}
          city={item.city}
          space={item.space_available}
          type={item.type}
          cluster={item.cluster}
          live={item.is_live}
          register={item.is_registered}
        />
      </Link>
    );
  });
  return (
    <div className="home">
      <h2>List of warehouses</h2>
      <input
        className="home--filter"
        type="text"
        placeholder="Warehouse Name..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <select
        name="city"
        value={filters.city}
        onChange={handleFilterChange}
        className="home--filter"
      >
        <option value="">All Cities</option>
        {allCities}
      </select>
      <select
        name="cluster"
        className="home--filter"
        value={filters.cluster}
        onChange={handleFilterChange}
      >
        <option value="">All Clusters</option>
        {allCluster}
      </select>
      <input
        type="number"
        className="home--filter"
        name="spaceLimit"
        placeholder="Space Availability"
        value={filters.spaceLimit}
        onChange={handleFilterChange}
      />
      <div className="home--items">{warehousesElements}</div>
    </div>
  );
}
