import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {API_URL } from "../../helpers/Const";


interface Video {
    created_at: string,
    video_url: string,
    user_id: string,
    description: string,
    title: string,
    num_comments: number,
    id: string
}

const VideoList: React.FC<{ videoList: Video[], onSelectVideo: (video: Video) => void }> = ({ videoList, onSelectVideo }) => {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        setVideos(videoList)
    }, [videoList]);

    return (
        <div>
            <h2>Video List</h2>
            <ul>
                {videos.map(video => (
                    <li key={video.id} onClick={() => onSelectVideo(video)}>
                        {video.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideoList;