import React, { useEffect,useState } from 'react';
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from '../../../api/axios';

function ListTable() {

    const str1 = localStorage.getItem('gogo_current_user');
    const str2 = JSON.parse(str1);
    const token = str2.access_token;
    // eslint-disable-next-line no-unused-vars
    const [user,setUsers] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [errorMessages,setErrorMessages] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
    
          try {
            const response = await axios.get('/user', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setUsers(response.data);
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
      }, []);

    return (
    <div>
        <Table striped="columns">
            <thead>
            <tr>
                <th>#</th>
                <th>CompanyID</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>ContactNo</th>
                <th>DOB</th>
                <th>Working Under</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
            </thead>
              {user.map((users) => {
                  return (
                    <tr key={users.id}> 
                      <td>{users.id}</td>
                      <td>{users.c_id}</td>
                      <td>{users.fullname}</td>
                      <td>{users.email}</td>
                      <td>{users.contact_no}</td>
                      <td>{users.dob}</td>
                      <td>{users.working_under}</td>
                      <td>{users.role_id}</td>
                      <td><Link  to={`update/${users.id}`}>
                          <span className="update">update</span>
                          </Link>
                      </td>
                    </tr>
                     )
                })}
            
        </Table>
      </div>
    );
  }
  
  export default ListTable;