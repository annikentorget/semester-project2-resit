import React from "react";
import WordPressAPI from "./WordPressAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const DeletePost = ({ id, onDelete, onEdit }) => {
    const handleDelete = async () => {
        try {
            await WordPressAPI.deleteArticle(id);
            onDelete(id);
        } catch (error) {
            console.error(error);
            alert('Failed to delete post');
        }
    };

    const isUserSignedIn = localStorage.getItem('user') !== null;

    return (
        <>
            {isUserSignedIn && (
                <div className="card__actions">
                    <Link to={`/edit/${id}`}>
                        <button className="card__edit-button" onClick={() => onEdit(id)}>
                            <FontAwesomeIcon icon={faEdit} />
                            Edit
                        </button>
                    </Link>
                        <button className="card__delete-button" onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash} />
                            Delete
                        </button>
                </div>
            )}
        </>
   );
};

export default DeletePost;