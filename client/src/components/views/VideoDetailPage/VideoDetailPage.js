import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';

function DetailVideoPage(props) {

    const videoId = props.match.params.videoId;
    const videoVariable = {
        videoId: videoId
    };

    const [videoDetail, setvideoDetail] = useState([]);
    
    useEffect(() => {
        axios.post('/api/video/getVideoDetail', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.video)
                    setvideoDetail(response.data.videoDetail)
                } else {
                    alert('Failed to get video Info')
                }
            })
    }, [])

    if(videoDetail.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${videoDetail.filePath}`} controls></video>

                        <List.Item
                            actions={[<Subscribe userTo={videoDetail.writer._id}/>]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={videoDetail.writer.images}/>}
                                title={<a href="https://ant.design">{videoDetail.title}</a>}
                                description={videoDetail.description}
                            />
                            <div></div>
                        </List.Item>
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return (
            <div>...loading</div>
        )
    }
        

}

export default DetailVideoPage