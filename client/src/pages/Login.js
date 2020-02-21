import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import { address, client } from '../config/server';
import { clientId } from '../config/google';
import GoogleLogin from 'react-google-login';
import Cookies from 'universal-cookie';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
const cookies = new Cookies();
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal)
    }
    const onSubmit = () => {
        axios.post(`http://${address}/auth/login`, {
            email: email,
            password: password,
        }).then(response => {
            cookies.set('cookie', response.data.token, {path: '/'});
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
                setModal(true)
            })
            console.log(response)
        }).catch(err => {
            setModal(true)
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
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-10 col-lg-12 col-md-9">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">환영합니다!</h1>
                                        </div>
                                        <form class="user">
                                            <div class="form-group">
                                                <input
                                                    type="email"
                                                    class="form-control form-control-user"
                                                    id="exampleInputEmail"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    aria-describedby="emailHelp"
                                                    placeholder="이메일"/></div>
                                            <div class="form-group">
                                                <input
                                                    type="password"
                                                    class="form-control form-control-user"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    id="exampleInputPassword"
                                                    placeholder="비밀번호"/></div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox small">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck"/>
                                                    <label class="custom-control-label" for="customCheck">Remember Me</label>
                                                </div>
                                            </div>
                                            <div onClick={onSubmit} class="btn btn-primary btn-user btn-block">
                                                Login
                                            </div>
                                            <hr/>
                                            <GoogleLogin
                                                    style={{widht: "200px"}}
                                                    clientId={clientId}
                                                    buttonText="Google"
                                                    render={renderProps => (
                                                        <div onClick={renderProps.onClick} class="btn btn-google btn-user btn-block">
                                                            <i class="fab fa-google fa-fw"></i>
                                                            Login with Google
                                                        </div>
                                                    )}
                                                    onSuccess={result => console.log(result.profileObj)}
                                                    onFailure={result => console.log(result)}
                                            />
                                            <Link to="/" class="btn btn-facebook btn-user btn-block">
                                                <i class="fab fa-facebook-f fa-fw"></i>
                                                Login with Facebook
                                            </Link>
                                        </form>
                                        <hr/>
                                        <div class="text-center">
                                            <Link class="small" to="/forgotPassword">Forgot Password?</Link>
                                        </div>
                                        <div class="text-center">
                                            <Link class="small" to="/register">Create an Account!</Link>
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
                <MDBModalHeader toggle={toggle}>로그인 실패</MDBModalHeader>
                <MDBModalBody>
                    아이디 또는 비밀번호가 맞지 않습니다.<br/>  
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggle}>닫기</MDBBtn>
                </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </div>
    )
}

export default Login;