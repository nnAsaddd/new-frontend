import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {useProductsContext} from "../context/ProductsProvider.jsx";

const fetchProducts = async (accessToken) => {
  console.log("IS IT WORKING ? : " + accessToken);
  const { data } = await axios.get(`https://inventory-manager-fglv.onrender.com/api/v1/products`, {
    headers: {
      "authorization" : `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  console.log(data);
  return data;
};

const useFetchProducts = (accessToken) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return fetchProducts(accessToken);
    } ,
  });
};

export default useFetchProducts;
