import React, { useEffect,useState } from 'react';
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from '../../../api/axios';

function ListCompany() {

    const str1 = localStorage.getItem('gogo_current_user');
    const str2 = JSON.parse(str1);
    const token = str2.access_token;
    // eslint-disable-next-line no-unused-vars
    const [companys,setCompanys] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [errorMessages,setErrorMessages] = useState([])

    useEffect(() => {
        const fetchCompany = async () => {
    
          try {
            const response = await axios.get('/company', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setCompanys(response.data);
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
      }, []);
    

    return (
    <div>
        <Table striped="columns">
            <thead>
            <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Pincode</th>
                <th>Department</th>
                <th>Branch</th>
                <th>Address</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {companys.map((company) => {
                    return (
                        <tr key={company.company_id}> 
                            <td>{company.company_id}</td>
                            <td>{company.company_name}</td>
                            <td>{company.country}</td>
                            <td>{company.state}</td>
                            <td>{company.city}</td>
                            <td>{company.pincode}</td>
                            <td>{company.department}</td>
                            <td>{company.branch}</td>
                            <td>{company.address}</td>
                            <td><Link  to={`update/${company.company_id}`}>
                              <span className="update">update</span>
                              </Link>
                            </td>
                        </tr>
                     )
                })}
            </tbody>
        </Table>
      </div>
    );
  }
  
  export default ListCompany;