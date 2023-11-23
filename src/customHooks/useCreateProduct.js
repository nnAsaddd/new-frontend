import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const createProduct = async ({sku, name, sold, onHold, toCome, accessToken}) => {
  console.log(sku, name, sold, onHold, toCome);
  const { data } = await axios.post(
    "https://inventory-manager-fglv.onrender.com/api/v1/products",
      {
        sku,
        name,
        sold,
        onHold,
        toCome
      },
    {
      headers: {
        "authorization" : `Bearer ${accessToken}`,
      },
      withCredentials: true }
  );
  return data;
};

const useCreateProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully!!!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    },
  });
};

export default useCreateProduct;
