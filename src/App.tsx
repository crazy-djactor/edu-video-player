import React, {useEffect, useState} from 'react';
import './App.css';
import VideoList from './components/VideoList/VideoList';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import VideoForm from './components/VideoForm/VideoForm';
import {API_URL, FAKE_ID} from "./helpers/Const";
import Comments from "./components/Comment/Comments";
import axios from "axios";

const App: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<{
        created_at: string,
        video_url: string, user_id: string, description: string, title: string, num_comments: number, id: string
    } | null>(null);
    const [videoList, setVideoList] = useState([]);

    const handleVideoSubmit = async () => {
        await fetchVideos();
    };

    const fetchVideos = async () => {
        const params = {
            user_id: FAKE_ID
        };
        try {
            const response = await axios.get(`${API_URL.API_BASE}/api/videos`, { params });
            setVideoList(response.data.videos);
            setSelectedVideo(response.data.videos[0]); // Select the first video by default
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className="app">
            {/*<h1>Educational VideoForm Player</h1>*/}
            <div className="sidebar">
                <VideoList videoList={videoList} onSelectVideo={setSelectedVideo}/>
                <VideoForm onVideoSubmit={handleVideoSubmit} />
            </div>
            <div className="main-content">
                {selectedVideo && <VideoPlayer videoUrl={selectedVideo.video_url} />}
                {selectedVideo && (
                    <div className="video-details">
                        <h2>{selectedVideo.title}</h2>
                        <p>{selectedVideo.description}</p>
                    </div>
                )}
                {selectedVideo && <Comments videoId={selectedVideo.id} />}

            </div>
        </div>
    );
};

export default App;
