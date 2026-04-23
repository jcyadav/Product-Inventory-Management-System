import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
  ];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name) return toast.error("Name required"), false;
    if (!form.category) return toast.error("Category required"), false;
    if (!form.price) return toast.error("Price required"), false;
    if (!form.quantity) return toast.error("Quantity required"), false;
    if (!form.description) return toast.error("Description required"), false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await api.post("/products", form);
    toast.success("Product added successfully");
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
         <h2 className="font-bold text-2xl text-blue-700 bg-blue-100 px-3 py-1 rounded-md inline-block">
          Add Product
        </h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Product Name" onChange={handleChange} style={styles.input} />

          <select name="category" onChange={handleChange} style={styles.input}>
            <option value="">Select Category</option>
            {categories.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>

          <input name="price" type="number" placeholder="Price" onChange={handleChange} style={styles.input} />

          <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} style={styles.input} />

          <textarea name="description" placeholder="Description" onChange={handleChange} style={styles.input} />

          <button style={styles.btn}>Save</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: 20, background: "#f4f6f8", minHeight: "100vh" },
  card: { background: "#fff", padding: 20, borderRadius: 10, maxWidth: '100%' },
  input: { width: "100%", margin: "10px 0", padding: 10 },
  btn: {width: "100px", background: "#3760AA", color: "#fff", padding: 10, border: "none" },
};