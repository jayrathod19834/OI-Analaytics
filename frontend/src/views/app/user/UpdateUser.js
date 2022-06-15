import React,{useState,useEffect} from "react";
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { InputLabel,MenuItem,FormHelperText,Select,FormControl } from '@material-ui/core';
import { Alert } from "reactstrap";
import { useFormik } from 'formik';
import axios from "../../../api/axios";

const UpdateUser = ({preloadedvalues}) => {

  const str1 = localStorage.getItem('gogo_current_user');
  const str2 = JSON.parse(str1);
  const token = str2.access_token;
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [errorMessages, setErrorMessages] = useState({});
  const [success, setSuccess] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [req, setReq] = useState(true);
  const [error,setError] = useState(false);

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

  const validationSchemas = yup.object({
    companyid: yup  
      .string('Company is required')
      .required('Company is required'),
    fullname: yup
      .string('fullname is required')
      .required('fullname cant be empty'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    contactno: yup 
    .string('Enter your Contact no')
    .required('Conatact no. is required'),
    dob: yup
      .string('Enter your Date of Birth')
      .required('Date of Birth is required'),
    Supervisorselect: req ? yup.string().required('Required') : yup.string(''),
    Roleselect: yup
     .string('Select a Role')
     .required('Select a Role'),
  });

  const formik = useFormik({
    initialValues: {
      companyid: preloadedvalues.c_id,
      fullname: preloadedvalues.fullname,
      email: preloadedvalues.email,
      contactno: preloadedvalues.contact_no,
      dob: preloadedvalues.dob,
      Supervisorselect: preloadedvalues.working_under,
      Roleselect: preloadedvalues.role_id,
    },
    validationSchema: validationSchemas,
    onSubmit: (values) => {console.log(values)(
      axios.put(`/user/${preloadedvalues.id}`,{
      "working_under": parseInt(values.Supervisorselect,10),
      "role_id": parseInt(values.Roleselect,10),
      'fullname': values.fullname,
      "email": values.email,
      "dob": values.dob,
      "contact_no": values.contactno,
      "c_id": parseInt(values.companyid,10),
    }
      ,{headers:{
        'Authorization':`bearer ${token}`
      }}
      )
      .then(response => {setSuccess(response.data.detail)})
      .catch(err => {
        setError(err.response.data.detail)}));
      
    }, 
  });
      
    return(
      <div>
        <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="companyid"
          name="companyid"
          label="companyid"
          value={formik.values.companyid}
          onChange={formik.handleChange}
          error={formik.touched.companyid && Boolean(formik.errors.companyid)}
          helperText={formik.touched.companyid && formik.errors.companyid}
        />
        <div> &nbsp; </div>
        <TextField
          fullWidth
          id="fullname"
          name="fullname"
          label="fullname"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          error={formik.touched.fullname && Boolean(formik.errors.fullname)}
          helperText={formik.touched.fullname && formik.errors.fullname}
        />
        <div> &nbsp; </div>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <div> &nbsp; </div>
        <TextField
          fullWidth
          id="contactno"
          name="contactno"
          label="Contact No."
          type="string"
          value={formik.values.contactno}
          onChange={formik.handleChange}
          error={formik.touched.contactno && Boolean(formik.errors.contactno)}
          helperText={formik.touched.contactno && formik.errors.contactno}
        />
        <div> &nbsp; </div>
        <TextField
          fullWidth
          id="dob"
          name="dob"
          label="Date Of Birth" 
          type="date"
          value={formik.values.dob}
          onChange={formik.handleChange}
          error={formik.touched.dob && Boolean(formik.errors.dob)}
          helperText={formik.touched.dob && formik.errors.dob}
        />
        <div> &nbsp; </div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label1">Role</InputLabel>
        <Select 
          labelId="demo-simple-select-helper-label1"
          id="Roleselect"
          name = 'Role'
          value= {formik.values.Roleselect}
          label="Role"
          onChange={(event) => {
          formik.setFieldValue(formik.values.Roleselect = parseInt(event.target.value,10));
            if (event.target.value === '3'){
              setIsUser(false);
              setReq(true);
            }else{
              setIsUser(true);
              setReq(false);
              formik.values.Supervisorselect = '1';
            }
          }}
          error={formik.touched.Roleselect && Boolean(formik.errors.Roleselect)}
          helperText={formik.touched.Roleselect && formik.errors.Roleselect}
          >
          <MenuItem value = '1' >Admin</MenuItem>
          <MenuItem value = '2' >Supervisor</MenuItem>
          <MenuItem value = '3' >User</MenuItem>
        </Select>
            <FormHelperText>Please Select A Role</FormHelperText>
           </FormControl>
        <div> &nbsp; </div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Supervisor</InputLabel>
        <Select disabled={isUser}
          labelId="demo-simple-select-helper-label"
          id="Supervisorselect"
          name = 'Supervisorselect'
          value= {formik.values.Supervisorselect}
          label="Supervisor"
          onChange={(e) =>{
            formik.setFieldValue(formik.values.Supervisorselect = e.target.value);}}
          error={formik.touched.Supervisorselect && Boolean(formik.errors.Supervisorselect)}
          helperText={formik.touched.Supervisorselect && formik.errors.Supervisorselect}
        > 
          {users.map((userss) => (
              <MenuItem value={userss.id} key={userss.id}>{userss.fullname}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Please Select A Supervisor</FormHelperText>
      </FormControl>
        <div> &nbsp; </div>
        <div hidden = {!error} or {...!success} > 
        <>
        <Alert variant='danger' onClose={() => setError(false)} dismissible>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setError(false)} variant="outline-success">Close</Button>
          </div>
        </Alert>
        </>
       </div> 
       <div hidden = {!success} > 
        <>
        <Alert variant="danger" onClose={() => setError(false)} dismissible>
          <p>{success} </p>
          <div className="d-flex justify-content-end">
            <Button onClick={() => setSuccess(false)} variant="outline-success">Close</Button>
          </div>
        </Alert>
        </>
       </div> 
        <div> &nbsp; </div>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
        </form>
      </div>
    );
  }

export default UpdateUser