import React, { useState,useEffect } from 'react';
import { InputLabel,MenuItem,FormHelperText,Select,FormControl } from '@material-ui/core';
import axios from '../../../api/axios'

export default function SelectLabels() {

  const str1 = localStorage.getItem('gogo_current_user');
  const str2 = JSON.parse(str1);
  const token = str2.access_token;
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const response = await axios.get('/supervisor', {
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

  const [Supervisor, setSupervisor] = useState('');

  const handleChange = (event) => {
    setSupervisor(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Supervisor</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={Supervisor}
          label="Supervisor"
          onChange={handleChange}
        >
          {users.map((userss) => (
              <MenuItem value={userss.id} key={userss.id}>{userss.fullname}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Please Select A Supervisor</FormHelperText>
      </FormControl>
    </div>
  );
}