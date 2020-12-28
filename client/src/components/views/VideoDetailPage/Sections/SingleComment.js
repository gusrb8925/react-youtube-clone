import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import LikeDislikes from './LikeDislikes';
const { TextArea } = Input;

function SingleComment(props) {

    // redux
    const user = useSelector(state => state.user);

    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");

    const OpenReplyHandle = () => {
        setOpenReply(!OpenReply);
    }
    const onChangeHandle = (e) => {
        setCommentValue(e.currentTarget.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();

        const variable = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }

        axios.post('/api/comment/saveComment', variable)
        .then(response => {
            if(response.data.success) {
                console.log(response.data.result);
                props.refreshFunction(response.data.result);
                setCommentValue('');
                setOpenReply(false);
            } else {
                alert(" 댓글 저장 실패");
            }
        })
    }

    const actions = [
        <span onClick={OpenReplyHandle} key="comment-basic-reply-to">Reply to </span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>

                {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onChangeHandle}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
                }
        </div>
    )
}

export default SingleComment
