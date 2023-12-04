import React, { useState } from 'react';
import WordPressAPI from '../components/WordPressAPI';
import NavBar from '../components/NavBar';

function AddArticle({ onArticleAdded }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [image_url, setImage_Url] = useState('');
    

    const handleAddArticle = async () => {
        try {
            if (!title || !content || !excerpt || !image_url) {
                alert('Please fill in all fields');
                return;
            }

            const newArticle = await WordPressAPI.createPost({
                title,
                content,
                excerpt,
                acf: {
                    image_url
                }
            }, 'j2oVsEkXkgMwSBgXwP7owFal' );

            onArticleAdded && onArticleAdded(newArticle);

            setTitle('');
            setContent('');
            setExcerpt('');
            setImage_Url('');
            
        } catch (error) {
            console.error('Error adding article', error);
            alert('Failed to add article');
        }

        
    };

    return (
        <div>
            <NavBar />
            <h2 className="new-article__header">Create Article</h2>
            <div className="new-article">
                <div className="new-article__container-left">
                    <label className="new-article__label">Article*</label>
                    <textarea className="new-article__textarea" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="new-article__containter-right">
                    <div className="new-article__form">
                        <label className="new-article__label">Title*</label>
                        <input className="new-article__input" placeholder="Article title..." type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label className="new-article__label">Image url*</label>
                        <input className="new-article__input" placeholder="www.yourimage.com/file.png" type="text" value={image_url} onChange={(e) => setImage_Url(e.target.value)} />
                        <label className="new-article__label">Excerpt*</label>
                        <input className="new-article__input" placeholder="Short description of the article..." type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
                        <button className="new-article__button" onClick={handleAddArticle}>Upload</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddArticle;