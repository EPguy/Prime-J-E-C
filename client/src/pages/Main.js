import React, {useState, useEffect} from 'react';

import {Helmet} from 'react-helmet';
import {Link, Redirect} from 'react-router-dom';
import { address, client } from '../config/server';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
const cookies = new Cookies();
const Main = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        axios.get(`http://${address}/auth/check`, {
            headers: {"x-access-token": cookies.get('cookie')}
        }).then(response => {
            if(response.data.success === true) {
                setIsLogin(true)
                if(response.data.info.isAdmin === true) {
                    window.location.replace(`http://${client}/admin`);
                } else {
                    window.location.replace(`http://${client}/user`);
                }
            } else {
                window.location.replace(`http://${client}/login`);
            }
        }).catch(err => {
            window.location.replace(`http://${client}/login`);
            console.log(err)
        })
    }, [])
    return (
    <React.Fragment>
        <div id="wrapper">
        </div>
    </React.Fragment>
    )
}

export default Main;