import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './User/Pages/Homepage/Homepage';
import Registerpage from './User/Pages/Registerpage/Registerpage';
import Loginpage from './User/Pages/Loginpage/Loginpage';
import Adminpage from './User/Pages/Adminpage/AdminRegister';
import PasswordRecovery from './User/Pages/user-forgot-password/UserForgotPassword';
import UserDashboard from './User/Pages/UserDashboard/UserDashboard';
import IssuedBooks from './User/Pages/IssuedBooks/IssuedBooks';
import AdminDashboard from './Admin/Pages/AdminDashboard/AdminDashboard';
import AddCategory from './Admin/Pages/AddCategory/AddCategory';
import ManageCategories from './Admin/Pages/ManageCategory/ManageCategory';
import AddAuthor from './Admin/Pages/AddAuthors/AddAuthor';
import ManageAuthors from './Admin/Pages/ManageAuthors/ManageAuthors';
import AddBookForm from './Admin/Pages/AddBooks/AddBooks';
import IssueBookForm from './Admin/Pages/IssueBook/IssueBook';
import MyProfile from './User/Pages/Myprofile/Myprofile';
import ManageBooks from './Admin/Pages/ManageBook/ManageBook';
import ManageIssueBook from './Admin/Pages/ManageIssuedBooks/ManageIssuedBooks';
import Logout from './User/Pages/Logout/logout';
import RegisteredStudents from './Admin/Pages/RegisteredStud/RegisteredStud';
import LoginForm from './User/Pages/Adminpage/AdminLogin';
import EditAuthorForm from './Admin/Pages/ManageAuthors/EditAuthor';
import StudentDetails from './Admin/Pages/StudentDetails/StudentDetails';
import PasswordChangeForm from './User/Pages/ChangePassword/ChangePassword';
import ChangePasswords from './Admin/Pages/ChangePassword/ChangePassword';
import BooksListed from './User/Pages/ListedBooks/ListedBooks';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/login' element={<Loginpage />} />
        <Route path='/admin' element={<Adminpage />} />
        <Route path='/admin/login' element={<LoginForm />} />
        <Route path='/register' element={<Registerpage />} />
        <Route path='/issuedBooks' element={<IssuedBooks />} />
        <Route path='/userDashboard' element={<UserDashboard />} />
        <Route path='/forgotPassword' element={<PasswordRecovery />} />
        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path='/addCategory' element={<AddCategory />} />
        <Route path='/manageCategory' element={<ManageCategories />} />
        <Route path='/addAuthor' element={<AddAuthor />} />
        <Route path='/manageAuthor' element={<ManageAuthors />} />
        <Route path='/addBook' element={<AddBookForm />} />
        <Route path='/issueBooks' element={<IssueBookForm />} />
        <Route path='/myProfile' element={<MyProfile />}/>
        <Route path='/manageBook' element={<ManageBooks/>}/>
        <Route path='/manageIssuedBook' element={<ManageIssueBook/>}/>
        <Route path='/registeredstudents' element={<RegisteredStudents/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/editAuthor' element={<EditAuthorForm/>}/>
        <Route path="/authors/:authorId" element={<ManageAuthors />} /> 
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path='/password' element={<PasswordChangeForm/>}/>
        <Route path='/changePassword' element={<ChangePasswords/>}/>
        <Route path='/listedBook' element={<BooksListed/>}/>

      </Routes>
    </div>
  );
};

export default App;
