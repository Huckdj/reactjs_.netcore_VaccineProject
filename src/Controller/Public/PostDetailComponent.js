/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-cond-assign */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import HeaderComponent from './Header/HeaderComponent';
import LoadingComponent from '../Additional/LoadingComponent';
import FooterComponent from './FooterComponent';

function PostDetailComponent() {
    const urlapi = process.env.REACT_APP_API_BASE_URL;
    const { LinkRoute } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        axios.post(`${urlapi}/api/PostPublics/GetByLinkRoute`, { LinkRoute })
        .then(res => {
            setData(res.data.data);
            setIsLoading(false);
            if(res.data.data[0].ErrorCode === 404){
                navigate('/404');
            }
        })
        .catch(err => {
            console.error('Error fetching post data:', err);
        });
    }, [LinkRoute]);

    return (
        <>
            <HeaderComponent/>
            <div className='container mx-auto grid p-1'>
                {Array.isArray(data) && data.map((e, index) => (
                    <div key={index} className='mt-2'>
                        <div
                            dangerouslySetInnerHTML={{ __html: e.FullContentDesktop }}
                            className='lg:block hidden'
                        />
                        <div
                            dangerouslySetInnerHTML={{ __html: e.FullContentMobile }}
                            className='lg:hidden block'
                        />
                    </div>
                ))}
            </div>
            {isLoading && <LoadingComponent/>}
            <FooterComponent/>
        </>
    );
}

export default PostDetailComponent;
