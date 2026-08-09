const formatPrice = (price) => `${Number(price).toLocaleString('vi-VN')} đ`;

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleString('vi-VN');
};

export { formatDate, formatPrice };
