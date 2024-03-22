import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import img from "./img/book.jpg";

const Book = () => {
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const nameRef = useRef();
    const priceRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("http://localhost:3001/post").then((res) => {
            setData(res.data);
        });
    };

    const handleSubmit = () => {
        const Data = {
            name: nameRef.current.value,
            price: priceRef.current.value,
        };

        axios.post("http://localhost:3001/post", Data).then((res) => {
            setData([...data, res.data]);
        });
    };

    const deleteData = (id) => {
        axios.delete(`http://localhost:3001/post/${id}`).then(() => {
            setData(data.filter((val) => val.id !== id));
        }).catch(error => {
            console.error("Error deleting data:", error);
        });
    };

    const filteredData = data.filter((item) => {
        return item.name.startsWith(inputValue.toLowerCase());
    });

    return (
        <>
        <label className='mx-2'>Book Name :-</label>
            <input type="text" ref={nameRef} />
            <label className='mx-2'>Price :-</label>
            <input type="number" ref={priceRef} />
            <button onClick={handleSubmit} className="btn btn-success mx-3">Add New Card</button><br/>
            <label className='m-2'>choose Your Book Name :-</label>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

            <div className="row">
                {filteredData.map((val) => (
                    <div key={val.id} className='col-md-3'>
                        <div className="card mt-3 shadow">
                            <img src={img} className="card-img-top" alt={val.name} style={{ objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">ID :- {val.id}</h5>
                                <h5 className="card-title">Book Name :- {val.name}</h5>
                                <h5 className="card-title">Price :- {val.price}</h5>
                                <p><b>Description :- </b>A description summarizes a book's content to give readers a glimpse into what the book is about.</p>
                                <button onClick={() => deleteData(val.id)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Book;
