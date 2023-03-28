import React from 'react';
import Home from "./pages/home";

function App() {
    fetchData()
    fetchOne()
    return (
        <Home/>
    );
}

async function fetchData() {
    // const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=inauthor:harry+inauthor:potter&maxResults=30&startIndex=0')
    const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:computers&maxResults=30&startIndex=0')
    const json = await response.json()
    console.log(json)
    console.log(json.items.map((i: any) => i.volumeInfo.authors))
}

async function fetchOne() {
    const response = await fetch('https://www.googleapis.com/books/v1/volumes/QFXgCgAAQBAJ')
    const json = await response.json()
    console.log('ID', json)
}

export default App;
