import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ProductForm.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setFormData(res.data);
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product updated successfully");

      navigate("/");
    } catch (error) {
      toast.error("Update failed");
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <input
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />

        <input
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
