// utils/generateShopId.js
import { v4 as uuidv4 } from 'uuid';

export const generateShopId = (shopName) => {
  const slug = shopName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  const uniqueSuffix = uuidv4().slice(0, 6); // or use Date.now().toString().slice(-5)
  return `${slug}-${uniqueSuffix}`; // e.g., "alpha-stores-A1B2C3"
};
