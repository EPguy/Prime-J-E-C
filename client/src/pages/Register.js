import React, {useState} from 'react';
import '../css/register.css';
import {Link} from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
import axios from 'axios';
import { address, client } from '../config/server';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState();
    const [visibleCalendar, setVisibleCalendar] = useState(false);
    const [companyCode, setCompanyCode] = useState('');
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal)
    }
    const DateChange = (date) => {
        setDateOfBirth(moment(date).format("YYYY-MM-DD"))
    }
    const onSubmit = () => {
        axios.post(`http://${address}/auth/signup`, {
            userEmail: email,
            password: password,
            userName: firstName+lastName,
            dateOfBirth: dateOfBirth,
            phoneNumber: phoneNumber,
            companyCode: companyCode,
        }).then(response => {
            setModal(true)
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }
    return(
        <div class="container">
            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                    <div class="row">
                        <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div class="col-lg-7">
                            <div class="p-5">
                                <div class="text-center">
                                    <h1 class="h4 text-gray-900 mb-4">회원가입</h1>
                                </div>
                                <form class="user">
                                    <div class="form-group row">
                                        <div class="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="text"
                                                class="form-control form-control-user"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                id="firstName"
                                                placeholder="성"/>
                                        </div>
                                        <div class="col-sm-6">
                                            <input
                                                type="text"
                                                class="form-control form-control-user"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                id="lastName"
                                                placeholder="이름"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <input
                                            type="email"
                                            class="form-control form-control-user"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            id="email"
                                            placeholder="이메일 주소"/>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="password"
                                                class="form-control form-control-user"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                id="password"
                                                placeholder="패스워드"/>
                                        </div>
                                        <div class="col-sm-6">
                                            <input
                                                type="password"
                                                class="form-control form-control-user"
                                                value={repeatPassword}
                                                onChange={(e) => setRepeatPassword(e.target.value)}
                                                id="repeatPassword"
                                                placeholder="패스워드 재입력"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <input
                                            type="tel"
                                            class="form-control form-control-user"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            id="phoneNumber"
                                            placeholder="전화번호"/>
                                    </div>
                                    <div class="form-group">
                                        <input
                                            type="text"
                                            class="form-control form-control-user"
                                            value={companyCode}
                                            onChange={(e) => setCompanyCode(e.target.value)}
                                            id="companyCode"
                                            placeholder="회사코드"/>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="text"
                                                class="form-control form-control-user"
                                                id="phoneNumber"
                                                placeholder="생년월일"
                                                value={dateOfBirth}
                                                readOnly 
                                                onClick={() => {
                                                    setVisibleCalendar(!visibleCalendar)
                                                }}
                                                />  
                                            { visibleCalendar ? <Calendar onChange={(date) => {
                                                                                    DateChange(date)
                                                                                    setVisibleCalendar(false)
                                                                                    }
                                                                                } 
                                                                   className={['c1']} /> : null }
                                        </div>
                                    </div>
                                    <div onClick={onSubmit} class="btn btn-primary btn-user btn-block">
                                        Register Account
                                    </div>
                                    <hr/>
                                    <Link href="/" class="btn btn-google btn-user btn-block">
                                        <i class="fab fa-google fa-fw"></i>
                                        Register with Google
                                    </Link>
                                    <Link href="/" class="btn btn-facebook btn-user btn-block">
                                        <i class="fab fa-facebook-f fa-fw"></i>
                                        Register with Facebook
                                    </Link>
                                </form>
                                <hr/>
                                <div class="text-center">
                                    <Link class="small" to="/forgot-password">Forgot Password?</Link>
                                </div>
                                <div class="text-center">
                                    <Link class="small" to="/login">Already have an account? Login!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MDBContainer>
                {/* MODAL */}
                <MDBModal isOpen={modal} toggle={toggle}   side  position="top-left">
                <MDBModalHeader toggle={toggle}>회원가입 성공</MDBModalHeader>
                <MDBModalBody>
                   회원가입에 성공하였습니다.<br/>  
                   이메일로 인증코드를 발송하였으니 확인 후<br/>
                   인증 부탁드립니다.
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={() => window.location.replace(`http://${client}/login`)}>닫기</MDBBtn>
                </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </div>
    )
}

export default Register;