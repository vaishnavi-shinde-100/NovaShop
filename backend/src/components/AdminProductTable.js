import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(products.filter((p) => p._id !== deleteId));

      toast.success("Product deleted successfully");

      setDeleteId(null);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      {
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          Admin Product Dashboard
        </h2>
      }
      <div className="container" style={{ textAlign: "center" }}>
        <table
          className="table table-bordered table-hover mt-3"
          style={{ alignItems: "center", alignContent: "center" }}
        >
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Category</th>
              <th width="180">Actions</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products?.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.brand}</td>
                <td>{p.description}</td>
                <td>
                  <img src={p.image} alt={p.name} width={"60"} />
                </td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    style={{ marginTop: "5px" }}
                    onClick={() => navigate(`/edit/${p._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setDeleteId(p._id)}
                    style={{ marginTop: "5px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {deleteId && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                </div>

                <div className="modal-body">
                  Are you sure you want to delete this product?
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setDeleteId(null)}
                  >
                    Cancel
                  </button>

                  <button className="btn btn-danger" onClick={confirmDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
