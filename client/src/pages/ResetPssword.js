import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { address, client } from '../config/server';
import { clientId } from '../config/google';
import GoogleLogin from 'react-google-login';
import Cookies from 'universal-cookie';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
const cookies = new Cookies();
const ResetPassword = ({location}) => {
    const [resetPasswrd, setResetPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [modal, setModal] = useState(false);
    const query = queryString.parse(location.search);
    const toggle = () => {
        setModal(!modal)
    }
    const onSubmit = () => {
        axios.post(`http://${address}/auth/resetPassword`, {
            code: query.key,
            password: resetPasswrd
        }).then(response => {
            setModal(true)
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        axios.get(`http://${address}/auth/check`, {
            headers: {"x-access-token": cookies.get('cookie')}
        }).then(response => {
            if(response.data.success === true) {
                if(response.data.info.isAdmin === true) {
                    window.location.replace(`http://${client}/admin`);
                } else {
                    window.location.replace(`http://${client}/user`);
                }
            }
        }).catch(err => {
            console.log(err)
        })
    },[])
    return (
        <React.Fragment>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-10 col-lg-12 col-md-9">
                        <div class="card o-hidden border-0 shadow-lg my-5">
                            <div class="card-body p-0">
                                <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-2">비밀번호 변경</h1>
                                        <p class="mb-4">We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <input type="email" onChange={(v) => setResetPassword(v.target.value)} value={resetPasswrd} class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="변경할 비밀번호"/>
                                        </div>
                                        <div class="form-group">
                                            <input type="email" onChange={(v) => setRepeatPassword(v.target.value)} value={repeatPassword} class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="비밀번호 재입력"/>
                                        </div>
                                        <div  onClick={() => onSubmit()} class="btn btn-primary btn-user btn-block">
                                            Reset Password
                                        </div>
                                    </form>
                                    <hr/>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MDBContainer>
                {/* MODAL */}
                <MDBModal isOpen={modal} toggle={toggle}   side  position="top-left">
                <MDBModalHeader toggle={toggle}>변경 완료</MDBModalHeader>
                <MDBModalBody>
                    비밀번호가 변경되었습니다.<br/>  
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={window.location.replace(`http://${client}/login`)}>닫기</MDBBtn>
                </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </React.Fragment>
    )
}

export default ResetPassword;