import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();

    await api.put(`/products/${id}`, form);
    toast.success("Updated successfully");
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
         <h2 className="font-bold text-2xl text-blue-700 bg-blue-100 px-3 py-1 rounded-md inline-block">
          Edit Product
        </h2>

        <form onSubmit={handleUpdate}>
          <input name="name" value={form.name} onChange={handleChange} style={styles.input} />
          <input name="category" value={form.category} onChange={handleChange} style={styles.input} />
          <input name="price" value={form.price} onChange={handleChange} style={styles.input} />
          <input name="quantity" value={form.quantity} onChange={handleChange} style={styles.input} />
          <textarea name="description" value={form.description} onChange={handleChange} style={styles.input} />

          <button style={styles.btn}>Update</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: 20, background: "#f4f6f8", minHeight: "100vh" },
  card: { background: "#fff", padding: 20, borderRadius: 10, maxWidth: '100%' },
  input: { width: "100%", margin: "10px 0", padding: 10 },
  btn: {width: "100px", background: "green", color: "#fff", padding: 10, border: "none" },
};