import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import LikeDislikes from './Sections/LikeDislikes';

function DetailVideoPage(props) {

    const videoId = props.match.params.videoId;
    const videoVariable = {
        videoId: videoId
    };
    const [videoDetail, setvideoDetail] = useState([]);
    const [Comments, setComments] = useState([]);
    
    useEffect(() => {
        axios.post('/api/video/getVideoDetail', videoVariable)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data.video);
                    setvideoDetail(response.data.videoDetail)
                } else {
                    alert('Failed to get video Info')
                }
            })

         axios.post('/api/comment/getComments', videoVariable)
         .then(response => {
             if(response.data.success) {
                setComments(response.data.comments)
             } else {
                 alert("Failed to get commnet info");
             }
         })   
    }, [])

    const refreshFunction = (newComments) => {
        setComments(Comments.concat(newComments));
    }

    if(videoDetail.writer) {

        const subscribeButton = videoDetail.writer._id !== localStorage.getItem("userId") && <Subscribe userTo={videoDetail.writer._id}/>

        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${videoDetail.filePath}`} controls></video>

                        <List.Item
                            actions={[<LikeDislikes video videoId={videoId} />, subscribeButton]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={videoDetail.writer.image}/>}
                                title={<a href="https://ant.design">{videoDetail.title}</a>}
                                description={videoDetail.description}
                            />
                            <div></div>
                        </List.Item>

                        {/* comment */}
                        <Comment commentList={Comments} postId={videoId} refreshFunction={refreshFunction}/>
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