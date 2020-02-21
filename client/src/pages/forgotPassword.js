import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import { address, client } from '../config/server';
import { clientId } from '../config/google';
import GoogleLogin from 'react-google-login';
import Cookies from 'universal-cookie';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
const cookies = new Cookies();
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal)
    }
    const onSubmit = () => {
        axios.post(`http://${address}/auth/forgotPassword`, {
            email: email
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
    const inputEmail = (v) => {
        setEmail(v.target.value);
    }
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
                                    <h1 class="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                    <p class="mb-4">We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
                                </div>
                                <form class="user">
                                    <div class="form-group">
                                    <input type="email" onChange={(v) => inputEmail(v)} value={email} class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..."/>
                                    </div>
                                    <div  onClick={() => onSubmit()} class="btn btn-primary btn-user btn-block">
                                    Reset Password
                                    </div>
                                </form>
                                <hr/>
                                <div class="text-center">
                                    <Link class="small" to="/register">Create an Account!</Link>
                                </div>
                                <div class="text-center">
                                    <Link class="small" to="/login">Already have an account? Login!</Link>
                                </div>
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
                <MDBModalHeader toggle={toggle}>이메일 전송</MDBModalHeader>
                <MDBModalBody>
                    이메일로 인증 주소를 보냈습니다.<br/>  
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggle}>닫기</MDBBtn>
                </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </React.Fragment>
    )
}

export default ForgotPassword;