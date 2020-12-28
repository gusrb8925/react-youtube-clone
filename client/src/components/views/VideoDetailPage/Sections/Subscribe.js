import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {

        // 게시글 작성자
        let variable = { userTo: props.userTo};

        // 구독자수 가져오기
        axios.post('/api/subscribe/subscriberNumber', variable)
        .then( response => {
            if(response.data.success) {
                setSubscribeNumber(response.data.subscribeNumber)
            } else {
                alert('구독자 수 정보를 받아오지 못했습니다.');
            }
        })

        let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId')}

        // 내가 구독자인지 
        axios.post('/api/subscribe/subscribed', subscribedVariable)
        .then(response => {
            if(response.data.success) {
                setSubscribed(response.data.subscribed);
            } else {
                alert('정보를 받아오지 못했습니다.');
            }
        })
    }, [])

    const onSubscribe = () => {

        let subscriberVariable={
            userTo: props.userTo,
            userFrom: localStorage.getItem('userId')
        }

        if(Subscribed) {
            axios.post('/api/subscribe/unSubscribe', subscriberVariable)
            .then(response => {
                if(response.data.success) {
                    setSubscribeNumber(SubscribeNumber - 1)
                    setSubscribed(!Subscribed)
                } else {
                    alert('구독 취소 실패');
                }
            })
        } else {
            axios.post('/api/subscribe/subscribe', subscriberVariable)
            .then(response => {
                if(response.data.success) {
                    setSubscribeNumber(SubscribeNumber + 1)
                    setSubscribed(!Subscribed)
                } else {
                    alert('구독 실패');
                }
            })
        }
    }

    return (
        <div>
            <button 
            onClick={onSubscribe}
            style={{
                backgroundColor:  `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                {SubscribeNumber} {Subscribed ? 'subscried' : 'subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
