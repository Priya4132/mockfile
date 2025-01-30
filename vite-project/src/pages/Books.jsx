import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react'
import axios from 'axios'
import '../styles/books.css'
//  import {Navigate} from 'react-router-dom'

const iniitalbook={
    name:"",
    category:"",
    price:"",
    author:""
}

const Books = () => {
    const[books,setBooks]=useState([]);
    //state for managing buttin to open add book form
    const[addbook,setAddBook]=useState(false);
    //state for amanging add bok form
    const[formData,setFormData]=useState([]);
    const[isLoading,setIsLoading]=useState(false);
    const[error,setError]=useState("");
    // const navigate=useNavigate();


    //setting state of category filter
    const[category,setCategory]=useState("");
    //setting state of sort 
    const[sort,setSort]=useState("");
    //settings state for paginantion
    const[page,setPage]=useState(1);
    const[limit]=useState(5);
    //setting state of total pages
    const[totalPages,setTotalPages]=useState(1);
   
    // mounting phase
    useEffect(()=>{
//function for fetching the books
const fetchBooks=async()=>{
    try{
        let response=await axios.get(`https://prairie-excited-garage.glitch.me/books/?category=${category}&sort=${sort}&page=${page}&limit=${limit}`);
        console.log(response.data)
        const{books,totalPages,currentPage}=response.data;

            setBooks(books);
            setPage(currentPage)
            setTotalPages(totalPages)
            setIsLoading(false);

    }catch(error){
        setError(error)
        

    }

}
 fetchBooks();

    },[category,sort,page])
    //prev button
   
        const handlePrev=()=>{
            if(page>1){
                setPage((prev)=>prev-1)
            }

        }
        const handleNext=()=>{
            if(page<totalPages){

           
            setPage((prev)=>prev+1)
        }
        }

        //add new book function
const handleAddBook=()=>{
setAddBook(!addbook);
}
//handle change
const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value})

}


//handle submit
const handleSubmit=async(e)=>{
    e.preventDefault();
    try{

       
        await axios.post("https://prairie-excited-garage.glitch.me/books", formData)
       alert("book added successfully")
        fetchBooks();
    }catch(err){
        setError(err);
    }


}
    
        //delete book function

        const handleDelete=async(id)=>{
            try{
                if(confirm("Are you sure to delete the book")){
                    await axios.delete(`https://prairie-excited-garage.glitch.me/books/${id}`)
               setBooks(books.filter((book)=>book.id !=id));
                }

            }catch(err){
                console.log(err);
                alert("failed to delete books")
            }
        }

        // //edit book 
        // const handleEdit=(id)=>{
        //     // setAddBook(!addbook);
        //     useEffect(()=>{
        //         try{
        //             let response=  axios.get(`https://prairie-excited-garage.glitch.me/books/${id}`);
        //             console.log(response.data);
        //             setFormData(response.data)

        //         }catch{
        //             alert("failed to edit the book")
        //         }
        //     },[id])
        // }

  return (
    <>
    {isLoading && <p>Loading....</p>}
    {error && <p>{error}</p>}
    <div>
         <h1 style={{textAlign:"center"}}>List of Books</h1>
         {/* Add new Book */}
         <button onClick={handleAddBook}>Add New book</button>
         {addbook && (<div id="form">
            <h1>Add New book</h1>
         <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='Book Name' name="name"  value={formData.name} onChange={handleChange}/>
            <input type="text" placeholder='Book Category' name="category"  value={formData.category} onChange={handleChange}/>
            <input type="number" placeholder='Book Price' name="price"  value={formData.price} onChange={handleChange}/>
            <input type="text" placeholder='Book Author' name="author"  value={formData.author} onChange={handleChange}/>
<input type="submit" value="Add Book" />
            </form></div>
        )}

         
        {/* //book filtering */}
        <select name="category" onChange={(e)=>setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="Fiction">Fiction</option>
            
            <option value="Self-Help">Self-Help</option>
            <option value="Productivity">Productivity</option>
            <option value="Technology">Technology</option>
            <option value="History">History</option>
            <option value="Finance">Finance</option>
            <option value="Business">Business</option>
            <option value="Psychology">Psychology</option>
            <option value="History">History</option>

        </select>
        <select name="sort" onChange={(e)=>setSort(e.target.value)}>
            
            <option value="name_asc">Sort by Name Ascending</option>
            <option value="price_asc">Sort by Price Ascending</option>
            <option value="price_desc">Sort by Price Descending</option>

        </select>
     
      <div className='books-list'>
        {books.map((book)=>{
            return (
                <div className='books' key={book.id}>
                    <h1>Book Name:{book.name}</h1>
                    <p>Category:{book.category}</p>
                    <p>Price:{book.price}</p>
                    <p>Author:{book.author}</p>
                    <button onClick={()=>handleEdit(book.id)}>Edit</button>
                    <button className='delete' onClick={()=>handleDelete(book.id)}>Delete</button>
                    {/* <button onClick={()=>navigate(`/books/${book.id}`)}>View Book</button> */}
                </div>
            )
        })}
      </div>
      <div style={{textAlign:"center"}}>
      <button className='prenext' disabled ={page==1}onClick={handlePrev}>  Prev</button> Page {page} of {totalPages}
      <button className='prenext' disabled ={page>totalPages} onClick={handleNext}> Next</button>
    
      </div></div>
      </>
  )
}

export default Books
