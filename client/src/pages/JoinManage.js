import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {Link, Redirect} from 'react-router-dom';
import { address, client } from '../config/server';
import axios from 'axios';
import moment from 'moment';
import Cookies from 'universal-cookie';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
const cookies = new Cookies();
const JoinManage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [notJoinUsers, setNotJoinUsers] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const acceptJoin = (email) => {
        console.log(email)
        axios.post(`http://${address}/admin/accept`, {
            email: email
        },{ headers: {"x-access-token": cookies.get('cookie')}})
        .then(response => {
            window.location.reload(); 
        }).catch(err => {
            console.log(err)
        })
    }
    const refuseJoin = (email) => {
        axios.post(`http://${address}/admin/refuse`, {
            email: email
        },{ headers: {"x-access-token": cookies.get('cookie')}})
        .then(response => {
            window.location.reload(); 
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        function getUserInfo() {
            return new Promise((resolve, reject) => {
                axios.get(`http://${address}/auth/check`, {
                    headers: {"x-access-token": cookies.get('cookie')}
                }).then(response => {
                    if(response.data.success === true) {
                        setIsLogin(true)
                        if(response.data.info.isAdmin === true) {
                            setUserInfo(response.data.info);
                            resolve(response);
                        } else {
                            window.location.replace(`http://${client}/user`);
                        }
                    } else {
                        window.location.replace(`http://${client}/login`);
                    }
                }).catch(err => {
                    window.location.replace(`http://${client}/login`);
                })
            })
        }
        function getNotJoinUsers(userInfo) {
            return new Promise((resolve, reject) => {
                axios.get(`http://${address}/admin/requestJoin`,{
                    params: { "companyCode": userInfo.companyCode}
                }).then(response => {
                    setNotJoinUsers(response.data)
                }).catch(err => {
                    console.log(err)
                })
            })
        }
        getUserInfo().then((response) => {
            getNotJoinUsers(response.data.info)
        })
    },[])
    return (
    <React.Fragment>
        <div id="wrapper">
            <ul
                class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                id="accordionSidebar">
                <Link
                    class="sidebar-brand d-flex align-items-center justify-content-center"
                    to="/admin">
                    <div class="sidebar-brand-icon rotate-n-15">
                        <i class="fas fa-laugh-wink"></i>
                    </div>
                    <div class="sidebar-brand-text mx-3">관리자
                    </div>
                </Link>
                <hr class="sidebar-divider my-0"/>
                <li class="nav-item ">
                    <Link class="nav-link" to="/admin">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>메인</span>
                    </Link>
                </li>
                <hr class="sidebar-divider"/>
                <div class="sidebar-heading">
                    Menu
                </div>
                <li class="nav-item active">
                    <a
                        class="nav-link collapsed"
                        href="#"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo">
                        <i class="fas fa-fw fa-cog"></i>
                        <span>직원 관리</span>
                    </a>
                    <div
                        id="collapseTwo"
                        class="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">직원 관리</h6>
                            <Link class="collapse-item" to="/joinManage">직원 가입 요청</Link>
                            <Link class="collapse-item" to="/userList">직원 리스트</Link>
                            <a class="collapse-item" href="cards.html">근로계약서</a>
                            <a class="collapse-item" href="cards.html">인사</a>
                        </div>
                    </div>
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link collapsed"
                        href="#"
                        data-toggle="collapse"
                        data-target="#collapseUtilities"
                        aria-expanded="true"
                        aria-controls="collapseUtilities">
                        <i class="fas fa-fw fa-wrench"></i>
                        <span>받은요청/보낸요청</span>
                    </a>
                    <div
                        id="collapseUtilities"
                        class="collapse"
                        aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">받은요청/보낸요청</h6>
                            <Link class="collapse-item" to="/joinManage">직원 가입 관리</Link>
                        </div>
                    </div>
                </li>
            </ul>
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <nav
                        class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                        <button
                            id="sidebarToggleTop"
                            class="btn btn-link d-md-none rounded-circle mr-3">
                            <i class="fa fa-bars"></i>
                        </button>
                        <form
                            class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div class="input-group">
                                <input
                                    type="text"
                                    class="form-control bg-light border-0 small"
                                    placeholder="Search for..."
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"/>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button">
                                        <i class="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item dropdown no-arrow d-sm-none">
                                <a
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    id="searchDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <i class="fas fa-search fa-fw"></i>
                                </a>
                                <div
                                    class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                    aria-labelledby="searchDropdown">
                                    <form class="form-inline mr-auto w-100 navbar-search">
                                        <div class="input-group">
                                            <input
                                                type="text"
                                                class="form-control bg-light border-0 small"
                                                placeholder="Search for..."
                                                aria-label="Search"
                                                aria-describedby="basic-addon2"/>>
                                            <div class="input-group-append">
                                                <button class="btn btn-primary" type="button">
                                                    <i class="fas fa-search fa-sm"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </li>
                            <li class="nav-item dropdown no-arrow mx-1">
                                <a
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    id="alertsDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <i class="fas fa-bell fa-fw"></i>

                                    <span class="badge badge-danger badge-counter">3+</span>
                                </a>
                                <div
                                    class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="alertsDropdown">
                                    <h6 class="dropdown-header">
                                        Alerts Center
                                    </h6>
                                </div>
                            </li>
                            <li class="nav-item dropdown no-arrow mx-1">
                                <a
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    id="messagesDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <i class="fas fa-envelope fa-fw"></i>
                                    <span class="badge badge-danger badge-counter">7</span>
                                </a>
                                <div
                                    class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="messagesDropdown">
                                    <h6 class="dropdown-header">
                                        Message Center
                                    </h6>
                                    <a class="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                                </div>
                            </li>
                            <div class="topbar-divider d-none d-sm-block"></div>
                            <li class="nav-item dropdown no-arrow">
                                <a
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    id="userDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">{userInfo.name}</span>
                                    <img
                                        class="img-profile rounded-circle"
                                        src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>
                                </a>
                                <div
                                    class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="userDropdown">
                                    <Link class="dropdown-item" to="/admin/mypage">
                                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                    </Link>
                                    <a class="dropdown-item" href="#">
                                        <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Settings
                                    </a>
                                    <a class="dropdown-item" href="#">
                                        <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Activity Log
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a
                                        class="dropdown-item"
                                        href="#"
                                        data-toggle="modal"
                                        data-target="#logoutModal">
                                        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <div class="container-fluid">
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800">직원 가입 요청</h1>
                            <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                <i class="fas fa-download fa-sm text-white-50"></i>
                                Generate Report</a>
                        </div>
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">직원 가입 요청</h6>
                            </div>
                            <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                    <th>이름</th>
                                    <th>전화번호</th>
                                    <th>이메일</th>
                                    <th>신청일</th>
                                    <th>태어난 연도</th>
                                    <th>승인/거부</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                    <th>이름</th>
                                    <th>전화번호</th>
                                    <th>이메일</th>
                                    <th>신청일</th>
                                    <th>태어난 연도</th>
                                    <th>승인/거부</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        notJoinUsers.map((v,i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{v.name}</td>
                                                    <td>{v.phoneNumber}</td>
                                                    <td>{v.email}</td>
                                                    <td>{moment(v.createdAt).format("YYYY-MM-DD")}</td>
                                                    <td>{moment(v.dateOfBirth).format("YYYY-MM-DD")}</td>
                                                    <td>
                                                        <a href="#" onClick={() => acceptJoin(v.email)} class="btn btn-success btn-circle btn-sm">
                                                            <i class="fas fa-check"></i>
                                                        </a>
                                                        <a href="#" onClick={() => refuseJoin(v.emial)} class="ml-3 btn btn-danger btn-circle btn-sm">
                                                            <i class="fas fa-trash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer class="sticky-footer bg-white">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Copyright &copy; 2020 (주)프라임제이이앤씨</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

        <div
            class="modal fade"
            id="logoutModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">로그아웃 하시겠습니까?</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">로그아웃 버튼 클릭 시 로그아웃 됩니다.</div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">취소</button>
                        <a class="btn btn-primary" href="/login" onClick={() => cookies.remove('cookie')}>로그아웃</a>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
    )
}

export default JoinManage;