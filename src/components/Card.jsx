import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavbarComponent } from './Navbar'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export const CardItem = () => {

    const [post, setpost] = useState([])
    const [titlee, setChangeTitle] = useState("")
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(res => {
                setpost(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <NavbarComponent setChangeTitle={setChangeTitle} />
            {loading ? (<h1>Loading...</h1>) :(
            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto", margin: "50px" }}>
                {post.filter((value) => {
                    if (titlee === "" ) {
                        return value
                    }
                    else if(titlee.length >= 3 && value.title.toLowerCase().includes(titlee.toLowerCase())){
                        return value
                    }
                })
                    .map((e) => {
                        return (
                            <div key={e.id} >
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{e.title}</Card.Title>
                                        <Card.Text>{e.body}</Card.Text>
                                        <Link to={`/user/${e.id}`}><Button variant="primary">View User</Button></Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })}
            </div>)}
        </div>
    )

}


