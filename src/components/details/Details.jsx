import React from "react";
import "./Details.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateWarehouse } from "../../app/features/warehouseSlice";

export default function Details() {
  const { id } = useParams();
  const warehouseId = parseInt(id);
  const data = useSelector((state) => state.warehouses);
  const warehouse = data.find((warehouse) => warehouse.id === warehouseId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({
    name: warehouse.name,
    code: warehouse.code,
    city: warehouse.city,
    space_available: warehouse.space_available,
    cluster: warehouse.cluster,
    is_live: warehouse.is_live,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSave = () => {
    dispatch(updateWarehouse({ id: warehouseId, ...formData }));
    navigate("/");
  };

  return (
    <div className="details">
      <h2>Warehouse Details</h2>
      <div className="details--items">
        <label>
          Warehouse Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="details--items">
        <label>
          Warehouse Code
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="details--items">
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="details--items">
        <label>
          Space Available
          <input
            type="number"
            name="space_available"
            value={formData.space_available}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="details--items">
        <label>
          Cluster
          <input
            type="text"
            name="cluster"
            value={formData.cluster}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="details--checked">
        <label>
          Live
          <input
            type="checkbox"
            name="is_live"
            checked={formData.is_live}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <button className="details--button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
