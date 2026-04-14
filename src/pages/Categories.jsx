import React from 'react';
import axios from "../config/axios"
import { useEffect , useState } from 'react'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState([]);

    useEffect(() => {
     const fetchCategories = async () => {
        try{
    const response = await axios.get('/category/list',{ headers: {Authorization: localStorage.getItem('token')}});
    console.log(response.data)
    setCategories(response.data)
        }catch(err){
            console.log(err)
        }
     }
     fetchCategories();
    },[])

const handleEdit = (category) => {
    setName(category.name)
}


  return (
    <div>Listing Categories-{categories.length}
    <ul>
        {categories.map((e,i) => {
      return  <li key={i}>{e.name}<button onClick={handleEdit}>Edit</button></li>
        })}
    </ul>
    </div>
    
  )
}

export default Categories