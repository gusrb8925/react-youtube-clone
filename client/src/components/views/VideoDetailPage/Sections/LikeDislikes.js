import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import axios from 'axios';

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [Dislikes, setDislikes] = useState(0);
    const [DislikeAction, setDislikeAction] = useState(null);
    let variable= {}

    if(props.video) {
        variable = { videoId: props.videoId, userId: localStorage.getItem('userId')}
    } else {
        variable = { commentId: props.commentId, userId: localStorage.getItem('userId')}
    }

    useEffect(() => {
        
        axios.post('/api/like/getLikes', variable)
        .then(response => {
            if(response.data.success) {
                // 좋아요 수
                setLikes(response.data.likes.length);
                // 좋아요를 눌렀는지
                response.data.likes.map(like => {
                    if(like.userId === localStorage.getItem('userId')) {
                        setLikeAction('liked');
                    }
                })
            } else {
                alert('Likes 정보를 가져오지 못했습니다.');
            }
        })

        axios.post('/api/like/getDislikes', variable)
        .then(response => {
            if(response.data.success) {
                // 싫어요 수
                setDislikes(response.data.dislikes.length);
                // 싫어요 눌렀는지
                response.data.dislikes.map(dislike => {
                    if(dislike.userId ===  localStorage.getItem('userId')) {
                        setDislikeAction('disliked');
                    }
                })
            } else {
                alert('Dislikes 정보를 가져오지 못했습니다.');
            }
        })

    }, []);

    const onLike = () => {
        if (LikeAction === null) {
            axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        //If dislike button is already clicked
                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('Failed to increase the like')
                    }
                })
        } else {
            axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('Failed to decrease the like')
                    }
                })
        }
    }

    const onDisLike = () => {
        if (DislikeAction !== null) {
            axios.post('/api/like/unDisLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)
                    } else {
                        alert('Failed to decrease dislike')
                    }
                })
        } else {
            axios.post('/api/like/upDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        //If dislike button is already clicked
                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } else {
                        alert('Failed to increase dislike')
                    }
                })
        }
    }

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDisLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislikes
