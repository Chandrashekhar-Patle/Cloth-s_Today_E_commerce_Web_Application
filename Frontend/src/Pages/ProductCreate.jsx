import { useState } from "react";
import { createProduct } from "../services/products";
import "./ProductCreate.css";

const initialForm = {
  name: "",
  slug: "",
  description: "",
  price: "",
  stock: "0",
  sku: "",
  category_id: "",
  is_active: true,
};

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ProductCreate() {
  const [form, setForm] = useState(initialForm);
  const [slugEdited, setSlugEdited] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setError("");
    setSuccess("");

    if (name === "name" && !slugEdited) {
      setForm((previous) => ({
        ...previous,
        name: value,
        slug: createSlug(value),
      }));
      return;
    }

    if (name === "slug") setSlugEdited(true);
    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateNestedRow = (setRows, index, field, value) => {
    setRows((rows) => rows.map((row, rowIndex) => (
      rowIndex === index
        ? { ...row, [field]: value }
        : row
    )));
    setError("");
    setSuccess("");
  };

  const resetForm = () => {
    setForm(initialForm);
    setImages([]);
    setVariants([]);
    setSlugEdited(false);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const product = await createProduct({
        ...form,
        slug: form.slug || createSlug(form.name),
        price: Number(form.price),
        stock: Number(form.stock),
        category_id: Number(form.category_id),
        images: images.map((image, index) => ({
          ...image,
          sort_order: image.sort_order === "" ? index : Number(image.sort_order),
        })),
        variants: variants.map((variant) => ({
          ...variant,
          stock: variant.stock === "" ? 0 : Number(variant.stock),
          price: variant.price === "" ? null : Number(variant.price),
        })),
      });
      setSuccess(
        product.id
          ? `Product created successfully (ID ${product.id}).`
          : "Product created successfully.",
      );
      resetForm();
    } catch (requestError) {
      setError(requestError.message || "Could not create product.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="product-create-page">
      <header className="product-create-heading">
        <p className="product-create-kicker">CATALOG MANAGEMENT</p>
        <h1>Create product</h1>
        <p>Add a product to the store catalog.</p>
      </header>

      <form className="product-create-form" onSubmit={handleSubmit}>
        <div className="product-create-grid">
          <label className="product-create-field product-create-field-wide">
            <span>Product name</span>
            <input
              name="name"
              value={form.name}
              onChange={updateField}
              autoComplete="off"
              maxLength={255}
              required
            />
          </label>

          <label className="product-create-field product-create-field-wide">
            <span>Slug</span>
            <input
              name="slug"
              value={form.slug}
              onChange={updateField}
              autoComplete="off"
              maxLength={255}
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              title="Use lowercase letters, numbers, and hyphens."
              required
            />
          </label>

          <label className="product-create-field product-create-field-wide">
            <span>Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              rows={5}
            />
          </label>

          <label className="product-create-field">
            <span>Price</span>
            <div className="product-create-input-prefix">
              <span>$</span>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={updateField}
                min="0"
                step="0.01"
                required
              />
            </div>
          </label>

          <label className="product-create-field">
            <span>Stock quantity</span>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={updateField}
              min="0"
              step="1"
              required
            />
          </label>

          <label className="product-create-field product-create-field-wide">
            <span>Stock Keeping Unit(SKU)</span>
            <input
              name="sku"
              value={form.sku}
              onChange={updateField}
              autoComplete="off"
              maxLength={255}
              required
            />
          </label>

          <label className="product-create-field product-create-field-wide">
            <span>Category ID</span>
            <input
              name="category_id"
              type="number"
              value={form.category_id}
              onChange={updateField}
              min="1"
              step="1"
              required
            />
            <small>Enter an existing ID from the categories table.</small>
          </label>
        </div>

        <section className="product-create-section" aria-labelledby="product-images-title">
          <div className="product-create-section-heading">
            <div>
              <h2 id="product-images-title">Images</h2>
              <p>Upload JPG, PNG, or WebP images up to 5 MB each.</p>
            </div>
            <button
              type="button"
              className="product-create-add-button"
              onClick={() => setImages((rows) => [...rows, {
                image: null,
                alt_text: "",
                sort_order: String(rows.length),
                is_primary: rows.length === 0,
              }])}
            >
              Add image
            </button>
          </div>
          {images.map((image, index) => (
            <div className="product-create-repeat-row" key={`image-${index}`}>
              <label className="product-create-field product-create-field-wide">
                <span>Image file</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) => updateNestedRow(setImages, index, "image", event.target.files?.[0] ?? null)}
                  required
                />
                <small>{image.image?.name ?? "No image selected"}</small>
              </label>
              <label className="product-create-field">
                <span>Alt text</span>
                <input
                  value={image.alt_text}
                  onChange={(event) => updateNestedRow(setImages, index, "alt_text", event.target.value)}
                  maxLength={255}
                />
              </label>
              <label className="product-create-field">
                <span>Sort order</span>
                <input
                  type="number"
                  value={image.sort_order}
                  onChange={(event) => updateNestedRow(setImages, index, "sort_order", event.target.value)}
                  min="0"
                  step="1"
                />
              </label>
              <label className="product-create-active">
                <input
                  type="checkbox"
                  checked={image.is_primary}
                  onChange={(event) => updateNestedRow(setImages, index, "is_primary", event.target.checked)}
                />
                <span>Primary image</span>
              </label>
              <button
                type="button"
                className="product-create-remove-button"
                onClick={() => setImages((rows) => rows.filter((_, rowIndex) => rowIndex !== index))}
              >
                Remove image
              </button>
            </div>
          ))}
        </section>

        <section className="product-create-section" aria-labelledby="product-variants-title">
          <div className="product-create-section-heading">
            <div>
              <h2 id="product-variants-title">Variants</h2>
              <p>Optional size/color stock and SKU records.</p>
            </div>
            <button
              type="button"
              className="product-create-add-button"
              onClick={() => setVariants((rows) => [...rows, {
                sku: "",
                size: "",
                color: "",
                stock: "0",
                price: "",
              }])}
            >
              Add variant
            </button>
          </div>
          {variants.map((variant, index) => (
            <div className="product-create-repeat-row" key={`variant-${index}`}>
              <label className="product-create-field">
                <span>Variant SKU</span>
                <input
                  value={variant.sku}
                  onChange={(event) => updateNestedRow(setVariants, index, "sku", event.target.value)}
                  maxLength={255}
                  required
                />
              </label>
              <label className="product-create-field">
                <span>Size</span>
                <input
                  value={variant.size}
                  onChange={(event) => updateNestedRow(setVariants, index, "size", event.target.value)}
                  maxLength={30}
                />
              </label>
              <label className="product-create-field">
                <span>Color</span>
                <input
                  value={variant.color}
                  onChange={(event) => updateNestedRow(setVariants, index, "color", event.target.value)}
                  maxLength={50}
                />
              </label>
              <label className="product-create-field">
                <span>Variant stock</span>
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(event) => updateNestedRow(setVariants, index, "stock", event.target.value)}
                  min="0"
                  step="1"
                />
              </label>
              <label className="product-create-field">
                <span>Price override</span>
                <input
                  type="number"
                  value={variant.price}
                  onChange={(event) => updateNestedRow(setVariants, index, "price", event.target.value)}
                  min="0"
                  step="0.01"
                  placeholder="Use product price"
                />
              </label>
              <button
                type="button"
                className="product-create-remove-button"
                onClick={() => setVariants((rows) => rows.filter((_, rowIndex) => rowIndex !== index))}
              >
                Remove variant
              </button>
            </div>
          ))}
        </section>

        <label className="product-create-active">
          <input
            name="is_active"
            type="checkbox"
            checked={form.is_active}
            onChange={updateField}
          />
          <span>Publish product</span>
        </label>

        {error && <p className="product-create-message is-error" role="alert">{error}</p>}
        {success && <p className="product-create-message is-success" role="status">{success}</p>}

        <div className="product-create-actions">
          <button type="button" onClick={resetForm}>
            Clear form
          </button>
          <button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Create product"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default ProductCreate;