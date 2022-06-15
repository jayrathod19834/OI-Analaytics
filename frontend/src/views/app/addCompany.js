import React, { useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Alert } from "reactstrap";
import axios from '../../api/axios'

      const AddCompany = () => {

        const str1 = localStorage.getItem('gogo_current_user');
        const str2 = JSON.parse(str1);
        const token = str2.access_token;
        // const [users, setUsers] = useState([]);
        // eslint-disable-next-line no-unused-vars
        const [errorMessages, setErrorMessages] = useState({});
        // const [isUser, setIsUser] = useState(true);
        // const [req, setReq] = useState(true);
        const [error,setError] = useState(false);
        // eslint-disable-next-line no-unused-vars
        const [success, setSuccess] = useState(false);

        const validationSchemas = yup.object({
          CompanyName: yup  
            .string('CompanyName is required')
            .min(3, 'CompanyName should be of minimum 3 characters length')
            .required('CompanyName is required'),
          Country: yup
            .string('Country is required')
            .min(4, 'Country should be of minimum 4 characters length')
            .required('Country cant be empty'),
          State: yup
            .string('State cant be Empty')
            .min(3, 'State should be of minimum 3 characters length')
            .required('State cant be Empty'),
          City: yup
            .string('Enter your City')
            .min(3, 'City should be of minimum 3 characters length')
            .required('City cant be Empty'),
          Pincode: yup 
          .string('Enter your pincode')
          .min(6, 'Pincode should be of minimum 6 characters length')
          .max(6, 'Pincode should be of maximum 6 characters length')
          .required('Pincode is required'),
          Department: yup
            .string('Enter your Department')
            .min(3, 'CompanyName should be of minimum 3 characters length')
            .required('Department is required'),
          Branch: yup
           .string('Enter a Branch')
           .min(3, 'Branch should be of minimum 3 characters length')
           .required('Branch cant be Empty'),
          Addess: yup
           .string('Enter Address')
           .min(10, 'Addess should be of minimum 10 characters length')
           .required('Address cant be Empty'),
        });

        const formik = useFormik({
          initialValues: {
            CompanyName: '',
            Country: '',
            State: '',
            City: '',
            Pincode: "",
            Department: '',
            Branch: '',
            Addess: '',
          },
          validationSchema: validationSchemas,
          onSubmit: (values) => {(
            axios.post('/company',{
            "company_name": values.CompanyName,
            "country": values.Country,
            "state": values.State,
            'city': values.City,
            "pincode": values.Pincode,
            "department": values.Department,
            "branch": values.Branch,
            "address": values.Addess,
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

  return (
     <div>
      <form onSubmit={formik.handleSubmit}>
      <TextField
          fullWidth
          id="CompanyName"
          name="CompanyName"
          label="CompanyName"
          type="string"
          value={formik.values.CompanyName}
          onChange={formik.handleChange}
          error={formik.touched.CompanyName && Boolean(formik.errors.CompanyName)}
          helperText={formik.touched.CompanyName && formik.errors.CompanyName}
        />
        <div> &nbsp; </div>
        <TextField
          fullWidth
          id="Country"
          name="Country"
          label="Country"
          type="string"
          value={formik.values.Country}
          onChange={formik.handleChange}
          error={formik.touched.Country && Boolean(formik.errors.Country)}
          helperText={formik.touched.Country && formik.errors.Country}
        />
        <div> &nbsp; </div>
        <TextField
          fullWidth
          id="State"
          name="State"
          label="State"
          type="string"
          value={formik.values.State}
          onChange={formik.handleChange}
          error={formik.touched.State && Boolean(formik.errors.State)}
          helperText={formik.touched.State && formik.errors.State}
        />
        <div> &nbsp; </div>
        <TextField
          fullWidth
          id="City"
          name="City"
          label="City"
          type="string"
          value={formik.values.City}
          onChange={formik.handleChange}
          error={formik.touched.City && Boolean(formik.errors.City)}
          helperText={formik.touched.City && formik.errors.City}
        />
        <div> &nbsp; </div>
        <TextField
          fullWidth
          id="Pincode"
          name="Pincode"
          label="Pincode"
          type="string"
          value={formik.values.Pincode}
          onChange={formik.handleChange}
          error={formik.touched.Pincode && Boolean(formik.errors.Pincode)}
          helperText={formik.touched.Pincode && formik.errors.Pincode}
        />
        <div> &nbsp; </div>
        <TextField
          fullWidth
          id="Department"
          name="Department"
          label="Department" 
          type="string"
          value={formik.values.Department}
          onChange={formik.handleChange}
          error={formik.touched.Department && Boolean(formik.errors.Department)}
          helperText={formik.touched.Department && formik.errors.Department}
        />
        <div> &nbsp; </div>
        <TextField
          fullWidth
          id="Branch"
          name="Branch"
          label="Branch" 
          type="string"
          value={formik.values.Branch}
          onChange={formik.handleChange}
          error={formik.touched.Branch && Boolean(formik.errors.Branch)}
          helperText={formik.touched.Branch && formik.errors.Branch}
        />
        <div> &nbsp; </div>
        <TextField
          fullWidth
          id="Addess"
          name="Addess"
          label="Addess" 
          type="string"
          value={formik.values.Addess}
          onChange={formik.handleChange}
          error={formik.touched.Addess && Boolean(formik.errors.Addess)}
          helperText={formik.touched.Addess && formik.errors.Addess}
        />
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

export default AddCompany