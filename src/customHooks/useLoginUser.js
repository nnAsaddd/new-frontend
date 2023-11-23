import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import  {useProductsContext} from "../context/ProductsProvider.jsx";

const loginUser = async (user) => {
  const { data } = await axios.post(
    "https://inventory-manager-fglv.onrender.com/api/v1/auth/login",
    user,
    {
      withCredentials: true,
    }
  );
  console.log(data);
  console.log(data.user);
  console.log("Access token asad bhau : " + data.accessToken);
  return data;
};

const useLoginUser = () => {
  const {handleUser, handleAccessToken} = useProductsContext();
  const navigate = useNavigate();

  return useMutation({

    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      const userData = {
        userID : data.user._id,
        userName : data.user.name,
        userRole : data.user.role,
      }
      console.log(userData);
      handleUser(userData);
      handleAccessToken(data.accessToken);
      toast.success("User Logged in successfully!!!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("Navigate");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/login");
    },
  });
};

export default useLoginUser;
