const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api"
).replace(/\/$/, "");

const API_ORIGIN = new URL(API_BASE_URL).origin;

async function getJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }

  return response.json();
}

function getXsrfToken() {
  const cookie = document.cookie
    .split("; ")
    .find((value) => value.startsWith("XSRF-TOKEN="));

  return cookie ? decodeURIComponent(cookie.slice("XSRF-TOKEN=".length)) : null;
}

export async function createProduct(product) {
  await fetch(`${API_ORIGIN}//products`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  const xsrfToken = getXsrfToken();
  const formData = new FormData();
  const { images = [], variants = [], ...fields } = product;

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, key === "is_active" ? (value ? "1" : "0") : String(value));
  });

  images.forEach((image, index) => {
    formData.append(`images[${index}][image]`, image.image);
    formData.append(`images[${index}][alt_text]`, image.alt_text ?? "");
    formData.append(`images[${index}][sort_order]`, String(image.sort_order));
    formData.append(`images[${index}][is_primary]`, image.is_primary ? "1" : "0");
  });

  variants.forEach((variant, index) => {
    Object.entries(variant).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(`variants[${index}][${key}]`, String(value));
      }
    });
  });

  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(xsrfToken ? { "X-XSRF-TOKEN": xsrfToken } : {}),
    },
    body: formData,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const validationMessages = result.errors
      ? Object.values(result.errors).flat().join(" ")
      : null;
    const authMessage =
      response.status === 401
        ? "Sign in with an authorized account before creating products."
        : response.status === 403
          ? "Your account is not allowed to create products."
          : response.status === 419
            ? "Your session expired. Sign in again and retry."
            : null;
    throw new Error(
      validationMessages || authMessage || result.message || `Request failed (${response.status})`,
    );
  }

  return result.data ?? result;
}

function toProduct(product) {
  const imageUrl = product.image_url
    ? new URL(product.image_url, API_ORIGIN).href
    : "";

  return {
    id: Number(product.id),
    name: product.name,
    description: product.description ?? "",
    category:
      typeof product.category === "object"
        ? product.category?.name ?? ""
        : product.category ?? "",
    newPrice: Number(product.price),
    oldPrice:
      product.compare_at_price == null
        ? null
        : Number(product.compare_at_price),
    image: imageUrl,
  };
}

export async function fetchProducts() {
  const result = await getJson("/products");
  const products = Array.isArray(result) ? result : result.data;

  if (!Array.isArray(products)) {
    throw new Error("The products API did not return a product list.");
  }

  return products.map(toProduct);
}