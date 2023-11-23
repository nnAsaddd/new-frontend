import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const deleteProduct = async ({productID, accessToken}) => {
  return await axios.delete(
    `https://inventory-manager-fglv.onrender.com/api/v1/products/${productID}`,
    {
      headers: {
        "authorization" : `Bearer ${accessToken}`,
      },
      withCredentials: true
    }
  );
};

const useDeleteProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully!!!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.msg?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    },
  });
};

export default useDeleteProduct;
