import React, { useState } from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;

function Comment(props) {

    // redux
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState('');

    const hadleClick = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const onSubmit= (e) => {
        e.preventDefault();

        const variable = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId
        }

        axios.post('/api/comment/saveComment', variable)
        .then(response => {
            if(response.data.success) {
                // console.log(response.data.result);
                props.refreshFunction(response.data.result);
                setCommentValue('');
            } else {
                alert(" 댓글 저장 실패");
            }
        })
    }

    return (
        <div>
            <br />
            <p> Replies</p>
            <hr />

            {/* Comment Lists  */}
            {/* {console.log(props.commentList)} */}
            {props.commentList && props.commentList.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment parentCommentId={comment._id} postId={props.postId} commentList={props.commentList} refreshFunction={props.refreshFunction}/>
                    </React.Fragment>
                )
            ))}


            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={hadleClick}
                    value={CommentValue}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default Comment