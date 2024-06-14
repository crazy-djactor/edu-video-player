import React, { useEffect, useState } from 'react';
import './Comments.css';
import axios from 'axios';
import {API_URL, FAKE_ID} from "../../helpers/Const";

interface Comment {
    id: string;
    user_id: string;
    content: string;
    video_id: string;
}

const Comments: React.FC<{ videoId: string }> = ({ videoId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');

    const fetchComments = async () => {
        const params = {
            video_id: videoId
        }
        try {
            const response = await axios.get(`${API_URL.API_BASE}/api/videos/comments`,
                { params });
            setComments(response.data.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [videoId]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newCommentObj = {
            user_id: FAKE_ID, // Replace with actual user ID
            content: newComment,
            video_id: videoId
        };

        try {
            const response = await axios.post(`${API_URL.API_BASE}/api/videos/comments`,
                newCommentObj);
            await fetchComments();
            setNewComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <div className="comments-section">
            <h3>Comments</h3>
            <ul className="comments-list">
                {comments.map(comment => (
                    <li key={comment.id} className="comment-item">
                        <p><strong>{comment.user_id}</strong>: {comment.content}</p>
                    </li>
                ))}
            </ul>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
        <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a public comment..."
            required
        ></textarea>
                <button type="submit">Comment</button>
            </form>
        </div>
    );
};

export default Comments;
