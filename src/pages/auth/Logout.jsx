import axios from "axios";
import  { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Alert, } from "../../utils/alert";

const Logout = () => {
  useEffect(() => {
    const loginToken = JSON.parse(localStorage.getItem("loginToken"));
    axios
      .get("https://ecomadminapi.azhadev.ir/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${loginToken.token}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.removeItem("loginToken");
        } else {
            Alert("متاسفم...!", res.data.message, "error");
        }
      }).catch(error=>{
        Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    });
  }, []);
  
  return (
    <>

        <Navigate to="/auth/login" />

    </>
  );
};

export default Logout;