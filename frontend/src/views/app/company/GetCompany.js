import React, { useState,useEffect } from "react";
import axios from '../../../api/axios'
import UpdateCompany from "./UpdateCompany";

const GetCompany = (id) => {
    const str1 = localStorage.getItem('gogo_current_user');
    const str2 = JSON.parse(str1);
    const token = str2.access_token;
    // eslint-disable-next-line no-unused-vars
    const [errorMessages,setErrorMessages] = useState({});
    const [company,setCompany] = useState(null);
    useEffect(() => {
        const fetchCompany = async () => {
          try {
            const response = await axios.get(`/company/${id.id}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setCompany(response.data);
          } catch (err) {
            if (!err?.response) {
              setErrorMessages('No server Response');
            } else if (err.response?.status === 401) {
              setErrorMessages('Unable to Fetch');
            } else {
              setErrorMessages('Failed');
            }
            console.error(err);
          }
        };
        
        fetchCompany();
      },[]);
      return company ? <UpdateCompany preloadedvalues={company} /> : <div> loading...</div>;
    }

export default GetCompany;