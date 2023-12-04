import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WordPressAPI from "../components/WordPressAPI";
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const editPost = async () => {
            try {
                const postDetails = await WordPressAPI.editPost(id);
                console.log('Post details:', postDetails);

                setTitle(postDetails.title);
                setContent(postDetails.content);
                setExcerpt(postDetails.excerpt);
                setImageUrl(postDetails.image_url);
            } catch (error) {
                console.error('Error fetching post details', error);
            }
        };

        editPost();
    }, [id]);

    const handleEdit = async () => {
        try {
            await WordPressAPI.editPost(id, { title, content, excerpt, imageUrl });
            alert("Edited!")
            navigate('/articles');
        } catch (error) {
            console.error('Error editing post', error);
            alert('Failed to edit post');
        }
    };

    return (
        <div>
        <NavBar />
        <h2 className="new-article__header">Edit post</h2>
        <div className="new-article">
            <div className="new-article__container-left">
                <label className="new-article__label">Article</label>
                <textarea className="new-article__textarea" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className="new-article__containter-right">
                <div className="new-article__form">
                    <label className="new-article__label">Title</label>
                    <input className="new-article__input" placeholder="Article title..." type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label className="new-article__label">Image url</label>
                    <input className="new-article__input" placeholder="www.yourimage.com/file.png" type="text" value={imageUrl || ''} onChange={(e) => setImageUrl(e.target.value)} />
                    <label className="new-article__label">Excerpt</label>
                    <input className="new-article__input" placeholder="Short description of the article..." type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
                    <button className="new-article__button" onClick={handleEdit}>Save Changes</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default EditPost;