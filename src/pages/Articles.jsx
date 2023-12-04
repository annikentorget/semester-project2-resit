import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import WordPressAPI from '../components/WordPressAPI';
import Search from '../components/Search';
import NavBar from '../components/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsTurnRight } from '@fortawesome/free-solid-svg-icons';
import DeletePost from '../components/DeletePost';
import EditPost from './EditPost';

function Articles() {
    const [editingId, setEditingId] = useState(null);

    const handleEdit = id => {
        setEditingId(id);
    };

    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get ('query');
    const [article, setArticle] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data;
                
                if (searchQuery) {
                    data = await WordPressAPI.fetchPosts(searchQuery);
                } else {
                    data = await WordPressAPI.fetchPosts('');
                }

                const extractedArticles = await Promise.all(
                    data.map(async post => {
                        const featuredMediaLinks = post._links['wp:featuredmedia'];

                        if (featuredMediaLinks && featuredMediaLinks.length > 0) {
                            const featuredMediaResponse = await fetch(featuredMediaLinks[0].href);
                            const featuredMediaData = await featuredMediaResponse.json();

                            return {
                                id: post.id,
                                title: post.title.rendered,
                                image_url: featuredMediaData.source_url,
                                excerpt: post.excerpt.rendered,
                            };
                        }

                        return {
                            id: post.id,
                            title: post.title.rendered,
                            image_url: post.acf.image_url,
                            excerpt: post.excerpt.rendered,
                        };
                    })
                );

                setArticle(extractedArticles);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [searchQuery]);

    const handleDelete = (id) => {
        setArticle((prevArticle) => 
            prevArticle.filter((article) => article.id !== id)
        );
    };


    return (
        <div>
            <NavBar />
            <div className="articles">
            <div className="articles__search">
                <h2 className="articles__header">Articles</h2>
                <Search />
            </div>
            <div className="cards">
                {article.map(articles => (
                    <div key={articles.id} className="card" id={articles.id}>
                        {articles.image_url && (
                            <img className="card__image" src={articles.image_url} alt={articles.title} />
                        )}
                        <h2 className="card__title" dangerouslySetInnerHTML={{ __html: articles.title}} />
                        <p className="card__excerpt" dangerouslySetInnerHTML={{ __html: articles.excerpt }} />
                        <a className="card__read-more" href= {`/article/${articles.id}`}>
                            <FontAwesomeIcon icon={faArrowsTurnRight} />   
                            Read more
                        </a>
                        <DeletePost id={articles.id} onDelete={handleDelete} onEdit={handleEdit}/>
                    </div>
                ))}
            </div>
                {editingId && (
                    <EditPost 
                        id={editingId}
                        onEdit={handleEdit}
                        onClose={() => setEditingId(null)}
                    />
                )}
            </div>
        </div>
    );
}

export default Articles;