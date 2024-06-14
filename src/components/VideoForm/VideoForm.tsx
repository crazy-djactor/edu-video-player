import React, { useState } from 'react';
import axios from 'axios';
import './VideoForm.css';
import {API_URL, FAKE_ID} from "../../helpers/Const";

const VideoForm: React.FC<{ onVideoSubmit: () => void }> = ({ onVideoSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newVideo = {
            user_id: FAKE_ID, title, description, video_url: url
        };

        try {
            await axios.post(`${API_URL.API_BASE}/api/videos/`, newVideo);
            onVideoSubmit();
            setTitle('');
            setDescription('');
            setUrl('');
        } catch (error) {
            console.error('Error submitting video:', error);
        }
    };

    return (
        <form className="video-form" onSubmit={handleSubmit}>
            <h2>Add New Video</h2>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="url">Video URL</label>
                <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default VideoForm;
