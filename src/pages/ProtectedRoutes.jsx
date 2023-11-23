import React, {useEffect} from "react";
import { Outlet, Navigate } from "react-router-dom";
import {useProductsContext} from "../context/ProductsProvider.jsx";
import { jwtDecode } from "jwt-decode"
import {useCookies} from "react-cookie";

const ProtectedRoutes = () => {
  const {user, handleUser, accessToken} = useProductsContext();
  let user2 = null;
  try {
    const decodedToken = jwtDecode(accessToken);
    user2 = decodedToken?.userInfo;
    console.log("AFTER DECODE : " + JSON.stringify(user2));
  }catch(err)
  {
    console.log("ERROR : " + err);
  }
  console.log("CONTEXT API USER : " + user);
  useEffect(() => {
    if(!user) {
      handleUser(user2);
    }
  },[user]);
  return accessToken !== "" ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
