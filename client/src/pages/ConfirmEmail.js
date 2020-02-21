import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { address, client } from '../config/server';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

const ConfirmEmail = ({location}) => {  
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal)
    }
    const query = queryString.parse(location.search);
    console.log(query);
    useEffect(() => {
        axios.get(`http://${address}/auth/confirmEmail`,{
            params: {
                key: query.key
            }
        }).then(response => {
            console.log(response)
            if(response.data.success === true) {
                setModal(true)
            }
        }).catch(err => {
            console.log(err)
        })
    })  
    return (
        <div class="container">
           <MDBContainer>
                {/* MODAL */}
                <MDBModal isOpen={modal} toggle={toggle}   side  position="top-left">
                <MDBModalHeader toggle={toggle}>인증 성공</MDBModalHeader>
                <MDBModalBody>
                   인증에 성공하였습니다.<br/>  
                   회사 관리자가 회원가입을 승낙해주면<br/>
                   가입이 완료됩니다.
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={() => window.location.replace(`http://${client}/login`)}>닫기</MDBBtn>
                </MDBModalFooter>
                </MDBModal>
                <MDBModal isOpen={!modal} toggle={toggle}   side  position="top-left">
                <MDBModalHeader toggle={toggle}>인증 실패</MDBModalHeader>
                <MDBModalBody>
                   인증에 실패하였습니다.<br/>  
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={() => window.location.replace(`http://${client}/login`)}>닫기</MDBBtn>
                </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </div>
    )
}

export default ConfirmEmail;