import { useState } from "react";
import API from "../services/api";

export default function Search({ setItems }) {
  const [query, setQuery] = useState("");

  const search = async () => {
    const res = await API.get(`/items/search/name?name=${query}`);
    setItems(res.data);
  };

  return (
  <div className="input-group">
    <input className="form-control" placeholder="Search items..."
      onChange={e => setQuery(e.target.value)} />

    <button className="btn btn-primary" onClick={search}>
      Search
    </button>
  </div>
);
}