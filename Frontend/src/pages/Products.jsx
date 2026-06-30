import { useEffect, useState } from "react";
import api from "../api.js";
import Field from "../components/Field.jsx";

const emptyForm = {
  ProductID: "",
  Name: "",
  Price: "",
  Company: "",
  Rating: "",
  Featured: false,
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data.products || []);
    } catch (err) {
      setServerError(err.response?.data?.message || "Failed to load products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const next = {};
    if (!form.ProductID.trim()) next.ProductID = "Product ID is required";
    if (!form.Name.trim()) next.Name = "Name is required";

    if (form.Price === "") next.Price = "Price is required";
    else if (!/^\d+(\.\d+)?$/.test(form.Price))
      next.Price = "Price should contain digits only";

    if (!form.Company.trim()) next.Company = "Company is required";

    if (form.Rating !== "" && (Number(form.Rating) < 0 || Number(form.Rating) > 5))
      next.Rating = "Rating must be between 0 and 5";

    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    setLoading(true);
    try {
      await api.post("/products", {
        ...form,
        Price: Number(form.Price),
        Rating: form.Rating === "" ? undefined : Number(form.Rating),
      });
      setForm(emptyForm);
      loadProducts();
    } catch (err) {
      setServerError(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Add product form */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-100">
            <h2 className="mb-4 text-lg font-bold text-slate-800">Add Product</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <Field
                label="Product ID"
                name="ProductID"
                placeholder="P123"
                value={form.ProductID}
                onChange={handleChange}
                error={errors.ProductID}
              />
              <Field
                label="Name"
                name="Name"
                placeholder="iPhone 15"
                value={form.Name}
                onChange={handleChange}
                error={errors.Name}
              />
              <Field
                label="Price"
                name="Price"
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder="999"
                value={form.Price}
                onChange={handleChange}
                error={errors.Price}
              />
              <Field
                label="Company"
                name="Company"
                placeholder="Apple"
                value={form.Company}
                onChange={handleChange}
                error={errors.Company}
              />
              <Field
                label="Rating (0-5)"
                name="Rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="4.5"
                value={form.Rating}
                onChange={handleChange}
                error={errors.Rating}
              />
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  name="Featured"
                  type="checkbox"
                  checked={form.Featured}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                />
                Featured product
              </label>
              {serverError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {serverError}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-indigo-600 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
            </form>
          </div>
        </div>

        {/* Product list */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-100">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">All Products</h2>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
                {products.length} items
              </span>
            </div>
            {products.length === 0 ? (
              <p className="py-10 text-center text-sm text-slate-400">
                No products yet. Add one using the form.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
                      <th className="py-2 pr-3">Name</th>
                      <th className="py-2 pr-3">Price</th>
                      <th className="py-2 pr-3">Company</th>
                      <th className="py-2 pr-3">Rating</th>
                      <th className="py-2">Featured</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr
                        key={p._id || p.ProductID}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                      >
                        <td className="py-3 pr-3 font-medium text-slate-800">
                          {p.Name}
                          <div className="text-xs text-slate-400">{p.ProductID}</div>
                        </td>
                        <td className="py-3 pr-3 text-slate-600">${p.Price}</td>
                        <td className="py-3 pr-3 text-slate-600">{p.Company}</td>
                        <td className="py-3 pr-3 text-slate-600">{p.Rating ?? "-"}</td>
                        <td className="py-3">
                          {p.Featured ? (
                            <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-600">
                              Featured
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">No</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
