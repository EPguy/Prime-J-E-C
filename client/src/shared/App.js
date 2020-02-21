import React,{ Component, useEffect} from 'react';
import {Route} from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Main from '../pages/Main';
import Admin from '../pages/Admin';
import User from '../pages/User';
import ConfirmEmail from '../pages/ConfirmEmail';
import JoinManage from '../pages/JoinManage';
import UserList from '../pages/UserList';
import EditUser from '../pages/EditUser';
import MyPageUser from '../pages/MyPageUser';
import MyPageAdmin from '../pages/MyPageAdmin';
import UserListEmployee from '../pages/UserListEmployee';
import forgotPassword from '../pages/forgotPassword';
import ResetPassword from '../pages/ResetPssword';
function App() {
  return (
    <div className="App">
        <Route exact path="/" component={Main}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/user" component={User}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/confirmEmail" component={ConfirmEmail}/>
        <Route exact path="/joinManage" component={JoinManage}/>
        <Route exact path="/userList" component={UserList}/>
        <Route exact path="/editUser" component={EditUser}/>
        <Route exact path="/user/list" component={UserListEmployee}/>
        <Route exact path="/user/myPage" component={MyPageUser}/>
        <Route exact path="/admin/myPage" component={MyPageAdmin}/>
        <Route exact path="/forgotPassword" component={forgotPassword}/>
        <Route exact path="/resetPassword" component={ResetPassword}/>
    </div>
  );
}

export default App;
