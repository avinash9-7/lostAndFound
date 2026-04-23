import { useEffect, useState } from "react";
import API from "../services/api";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
  <div className="container mt-4">

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Dashboard</h2>
      <button className="btn btn-danger" onClick={logout}>Logout</button>
    </div>

    <div className="mb-3">
      <Search setItems={setItems} />
    </div>

    <div className="row g-3">
      <div className="col-md-4">
        <div className="card p-3 shadow-sm">
          <ItemForm fetchItems={fetchItems} />
        </div>
      </div>

      <div className="col-md-8">
        <ItemList items={items} fetchItems={fetchItems} />
      </div>
    </div>
  </div>
);
}