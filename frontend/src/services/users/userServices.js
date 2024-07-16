// import { Base_Url } from "../../utils/url";
// import axios from 'axios';

// export const loginApi = async({email,password})=>{
//     const response= await axios.post(`${Base_Url}/users/login`,{
//         email,
//         password
//     });
//     return(response.data)
// }






//!login


import getUserFromStorage from "../../utils/getUserFromStorage";
import { Base_Url } from "../../utils/url";
import axios from 'axios';
const token = getUserFromStorage()
export const loginApi = async ({ email, password }) => {
  try {
    const response = await axios.post(`${Base_Url}/users/login`, {
      email,
      password,
    });
    // Check for invalid login message
    if (response.data.message && response.data.message.toLowerCase().includes('invalid')) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    // Ensure that errors from axios are thrown
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error(error.message || 'Login failed');
  }
};

//!register

export const registerApi = async ({ email, password,username }) => {
  try {
    const response = await axios.post(`${Base_Url}/users/register`, {
      email,
      password,
      username
    });
    return response.data;
  } catch (error) {
    // Ensure that errors from axios are thrown
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'register failed');
    }
    throw new Error(error.message || 'registration failed');
  }
};

//!password update
export const updatePasswordApi = async (newPassword) => {
  try {
    const response = await axios.put(`${Base_Url}/users/change-password`, {
     
      newPassword,
    
    },{headers:{
      authorization:`Bearer ${token}`
   }});
    return response.data;
  } catch (error) {
    // Ensure that errors from axios are thrown
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'register failed');
    }
    throw new Error(error.message || 'registration failed');
  }
};
//!profile update
export const updateProfileApi = async ({email,username}) => {
  try {
    const response = await axios.put(`${Base_Url}/users/update-profile`, {
     
      email,username
    
    },{headers:{
      authorization:`Bearer ${token}`
   }});
    return response.data;
  } catch (error) {
    // Ensure that errors from axios are thrown
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'update failed');
    }
    throw new Error(error.message || 'update failed');
  }
};
