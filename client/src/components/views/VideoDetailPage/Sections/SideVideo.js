import React, { useEffect, useState} from 'react';
import axios from 'axios';

function SideVideo() {

    const [sideVideos, setsideVideos] = useState([]);

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setsideVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])

    const rederSideVideo = sideVideos.map((video,index) => {

        var min = Math.floor(video.duration / 60);
        var sec = Math.floor(video.duration - min * 60);

        return (
            <div key={index} style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
                <div style={{ width:'50%', marginRight:'1rem' }}>
                    <a href  style={{ color:'gray' }}>
                        <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                    </a>
                </div>

                <div style={{ width:'50%' }}>
                    <a href style={{ color:'gray' }}>
                        <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}</span><br />
                        <span>{video.writer.name}</span><br />
                        <span>{video.views} views</span><br />
                        <span>{min} : {sec}</span><br />
                    </a>
                </div>
            </div>
        )
    })

    return (
        <React.Fragment>
            <div style={{ marginTop:'3rem' }}></div>
            {rederSideVideo}
        </React.Fragment>
    )
}

export default SideVideo
