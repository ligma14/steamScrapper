import { useQuery } from 'react-query';
import axios from 'axios';

interface Product {
  steam_id: string;
  quality: string;
  name: string;
  sell_price: number;
  buy_price: number;
  description: string;
  image_url: string;
  item_link: string;
  updated_at: string;
}

interface ProductsResponse {
  products: Product[];
  totalCount: number;
  page: number;
  limit: number;
}

const fetchProducts = async (page: number = 1, limit: number = 20): Promise<ProductsResponse> => {
  const { data } = await axios.get(`/api/products?page=${page}&limit=${limit}`);
  return data;
};

export function useProducts(page: number = 1, limit: number = 20) {
  return useQuery<ProductsResponse, Error>(
    ['products', page, limit],
    () => fetchProducts(page, limit),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}