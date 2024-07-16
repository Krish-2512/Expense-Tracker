import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategoryApi, listCategoriesApi } from "../../services/categories/categoryServices";

const CategoriesList = () => {

  //fetching
  const{data,isError,isFetched,error,refetch}=useQuery({
    queryFn:listCategoriesApi,
    queryKey:['list-categories']
  });

  //deleting

  const navigate = useNavigate();
  const [isSuccess,setIsSuccess]=useState(false);
  const { mutateAsync, isLoading, error:categoryError } = useMutation({                 //refetch is used to avoid refreshing of page
    
    mutationFn: deleteCategoryApi,
    mutationKey: ['login'],
    onSuccess: (data) => {                                                       //default property used in react-query
      if (data.message && data.message.toLowerCase().includes('invalid')) {
        setIsSuccess(false);
       
      } else {
        setIsSuccess(true);
        refetch();
        
      }
    }});

  console.log(data)

  const handleDelete=(id)=>{
    mutateAsync(id).then((data)=>{}).catch(err=>console.log(err))
  }
  return (
    <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Categories</h2>
      <ul className="space-y-4">
        {data?.map((category) => (
          <li
            key={category?._id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
          >
            <div>
              <span className="text-gray-800">{category?.name}</span>
              <span
                className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  category.type === "income"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {category?.type?.charAt(0).toUpperCase() +
                  category?.type?.slice(1)}
              </span>
            </div>
            <div className="flex space-x-3">
              <Link to={`/update-category/${category._id}`}>
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(category?._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;