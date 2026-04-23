import { useState } from "react";
import API from "../services/api";

export default function ItemForm({ fetchItems }) {
  const [item, setItem] = useState({
    itemName: "",
    description: "",
    type: "Lost",
    location: "",
    contactInfo: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/items", item);
    fetchItems();
  };

  return (
    <div>
      <h5 className="mb-3">Add Item</h5>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Item Name"
          onChange={e => setItem({...item, itemName: e.target.value})} />

        <textarea className="form-control mb-2" placeholder="Description"
          onChange={e => setItem({...item, description: e.target.value})} />

        <select className="form-select mb-2"
          onChange={e => setItem({...item, type: e.target.value})}>
          <option>Lost</option>
          <option>Found</option>
        </select>

        <input className="form-control mb-2" placeholder="Location"
          onChange={e => setItem({...item, location: e.target.value})} />

        <input className="form-control mb-3" placeholder="Contact Info"
          onChange={e => setItem({...item, contactInfo: e.target.value})} />

        <button className="btn btn-primary w-100">Add Item</button>
      </form>
    </div>
  );
}