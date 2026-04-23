import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const res = await api.get(`/products?search=${search}`);
      setProducts(res.data);
    } catch {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    getProducts();
  }, [search]);

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");
      getProducts();
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 className="font-bold text-2xl text-blue-700 bg-blue-100 px-3 py-1 rounded-md inline-block">
          Product List
        </h2>

        <div style={styles.actions}>
          <input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          <button style={styles.addBtn} onClick={() => navigate("/products/add")}>
            + Add Product
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div style={styles.card}>
       <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((p, index) => (
              <tr key={p.id} style={styles.tr}>
                <td style={styles.td}>{indexOfFirstItem + index + 1}</td>
                <td style={styles.td}>{p.name}</td>
                <td style={styles.td}>{p.category}</td>
                <td style={styles.td}>₹{p.price}</td>
                <td style={styles.td}>{p.quantity}</td>
                <td style={styles.td}>{p.description?.slice(0, 20)}</td>
                <td style={styles.td}>
                  <button style={styles.editBtn} onClick={() => navigate(`/products/edit/${p.id}`)}>
                    Edit
                  </button>
                  <button style={styles.deleteBtn} onClick={() => deleteProduct(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          <div style={styles.pagination}>
      
              <button
                style={{
                  ...styles.pageBtn,
                  opacity: currentPage === 1 ? 0.5 : 1,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ⬅ Prev
              </button>

              <div style={styles.pageInfo}>
                Page <b>{currentPage}</b> of <b>{totalPages}</b>
              </div>

              <button
                style={{
                  ...styles.pageBtn,
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                }}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next ➡
              </button>

            </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: 20, background: "#f4f6f8", minHeight: "100vh" },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },

  actions: { display: "flex", gap: 10 },

  input: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 6,
    width: 200,
  },

  addBtn: {
    background: "#3760AA",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: 6,
    cursor: "pointer",
  },

  card: {
    background: "#fff",
    padding: 15,
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  editBtn: {
    background: "orange",
    border: "none",
    padding: "5px 10px",
    marginRight: 5,
    cursor: "pointer",
  },

  deleteBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },

  th: {
    padding: "12px",
    background: "#3760AA",
    color: "#fff",
    border: "1px solid #ddd",
    textAlign: "center",
  },

  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
    verticalAlign: "middle",
  },

  tr: {
    background: "#fff",
  },

  editBtn: {
    background: "orange",
    border: "none",
    padding: "5px 10px",
    marginRight: 5,
    cursor: "pointer",
    color: "#fff",
  },

  deleteBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
   pagination: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },

  pageBtn: {
    padding: "8px 15px",
    border: "none",
    background: "#3760AA",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s",
  },

  pageInfo: {
    fontSize: "14px",
    color: "#333",
    padding: "5px 10px",
    background: "#f1f1f1",
    borderRadius: "6px",
  },
};