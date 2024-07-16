// import { Base_Url } from "../../utils/url";
// import axios from 'axios';

// export const loginApi = async({email,password})=>{
//     const response= await axios.post(`${Base_Url}/users/login`,{
//         email,
//         password
//     });
//     return(response.data)
// }






//!Add


import getUserFromStorage from "../../utils/getUserFromStorage";
import { Base_Url } from "../../utils/url";
import axios from 'axios';
const token = getUserFromStorage()

export const addCategoryApi = async ({ name, type }) => {
  
  try {
    const response = await axios.post(`${Base_Url}/categories/create`, {
      name,
      type,
    },{headers:{
       authorization:`Bearer ${token}`
    }})
    // Check for invalid login message
    
    return response.data;
  } catch (error) {
    // Ensure that errors from axios are thrown
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'adding failed');
    }
    throw new Error(error.message || 'adding failed');
  }
};

//!lists

export const listCategoriesApi = async () => {
  try {
    const response = await axios.get(`${Base_Url}/categories/lists`,{
      headers:{
        authorization:`Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // Ensure that errors from axios are thrown
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'listing failed');
    }
    throw new Error(error.message || 'listing failed');
  }
};

//!update
export const updateCategoryApi = async ({ name, type,id }) => {
  
  try {
    const response = await axios.put(`${Base_Url}/categories/update/${id}`, {
      name,
      type,
    },{headers:{
       authorization:`Bearer ${token}`
    }})
    // Check for invalid login message
    
    return response.data;
  } catch (error) {
    // Ensure that errors from axios are thrown
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'adding failed');
    }
    throw new Error(error.message || 'adding failed');
  }
};



//!delete
export const deleteCategoryApi = async (id) => {
  
  try {
    const response = await axios.delete(`${Base_Url}/categories/delete/${id}`,{headers:{
       authorization:`Bearer ${token}`
    }})
    // Check for invalid login message
    
    return response.data;
  } catch (error) {
    // Ensure that errors from axios are thrown
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'deleting failed');
    }
    throw new Error(error.message || 'deleting failed');
  }
};