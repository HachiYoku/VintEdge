export const normalizeProduct = (product) => {
  if (!product) return product;
  return {
    ...product,
    id: product.id || product._id,
    rating: product.rating || { count: product.quantity ?? 0 },
  };
};

export const normalizeProducts = (products = []) =>
  products.map(normalizeProduct);
