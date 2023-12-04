import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

function ArticleDetails() {
    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(true)
    const url = "https://anniken.nordloutvikling.no/wp-json/wp/v2/posts/";
    const { id } = useParams();
    const newUrl = url + id;

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(newUrl);
                const json = await res.json();
                setArticle(json);
                console.log(json);
            } 
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [newUrl]);

    if (loading) {
        return <div>Loading..</div>
    }

    return (
        <div>
            <NavBar />
            <h1 className="article__title">{article.title.rendered}</h1>
            <img className="article__image" src={article.acf.image_url} alt="" />
            <p className="article__content">{article.content.rendered}</p>
        </div>
    )
}

export default ArticleDetails;