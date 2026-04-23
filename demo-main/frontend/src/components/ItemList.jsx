import API from "../services/api";

export default function ItemList({ items, fetchItems }) {

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  return (
  <div className="row g-3">
    {items.map(item => (
      <div className="col-md-6" key={item._id}>
        <div className="card shadow-sm h-100">
          <div className="card-body d-flex flex-column">

            <h5 className="mb-2">{item.itemName}</h5>
            <p className="text-muted small">{item.description}</p>

            <span className={`badge mb-2 ${
              item.type === "Lost" ? "bg-danger" : "bg-success"
            }`}>
              {item.type}
            </span>

            <p className="mb-1"><strong>Location:</strong> {item.location}</p>

            <button
              className="btn btn-sm btn-outline-danger mt-auto"
              onClick={() => deleteItem(item._id)}
            >
              Delete
            </button>

          </div>
        </div>
      </div>
    ))}
  </div>
);
}