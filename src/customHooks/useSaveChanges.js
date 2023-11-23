import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const saveChanges = async ({ productID, details, accessToken }) => {
  const { data } = await axios.patch(
    `https://inventory-manager-fglv.onrender.com/api/v1/products/${productID}`,
    details,
    {
      headers: {
        "authorization" : `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );
  return data;
};

const useSaveChanges = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: saveChanges,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Changes Saved Successfully!!!", {
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

export default useSaveChanges;
