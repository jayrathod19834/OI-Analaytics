import React, { useState,useEffect } from "react";
import axios from '../../../api/axios'
import UpdateUser from "./UpdateUser";

const GetUser = (id) => {
    const str1 = localStorage.getItem('gogo_current_user');
    const str2 = JSON.parse(str1);
    const token = str2.access_token;
    // eslint-disable-next-line no-unused-vars
    const [errorMessages,setErrorMessages] = useState({});
    const [user,setUser] = useState(null);
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get(`/user/${id.id}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setUser(response.data);
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
        
        fetchUsers();
      },[]);
      return user ? <UpdateUser preloadedvalues={user} /> : <div> loading ...</div>;
    }

export default GetUser;