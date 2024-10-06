import React from 'react';
import './AboutPage.css'; // Import your CSS file
import Footer from '../../Components/Footer/Footer';
function AboutPage() {
  
  return (
    <div className="about-container11">
      <div className="about-container1">
        <h1 className='aboutHeadings'>WELCOME TO THE SRINIVAS LIBRARY MANAGEMENT SYSTEM</h1>
        <p className='about'>The academic library is an integral part of a university, which exists<br /> to meet the information needs of students, staff, researchers and other users in the community.<br/> Srinivas University library is to serve as an auxiliary to its parent institution in carrying out its objectives. <br />Library is an important intellectual resource of an academic community,<br /> as it helps the university to fulfill the curriculum requirements and promote studies and research.<br/> Relevant books both print and Online resources of information materials are provided by stressing that academic<br /> library is a learning center for the students, as it function to providing materials that are needed for learning all courses.<br/> Library is a place of great interest to the undergraduates as it provides relevant, adequate<br /> and up to-date information materials that are needed for learning all potential courses that may be offered.<br/> This is why all academic library collections, are setup to meet the information and research needs of any academic program offered by<br/>   the institution.</p>
      </div>
      <div className='LibraryTimings'>
        <p className='aboutContact'><b>Library Hours</b></p>
        <p className='about'>8.30 A.M to 7.00 P.M Monday to Friday</p>
        <p className='about'>8.30A.M to 5.30 P.M Saturday</p>
        <p className='about'>Srinivas University Library, Pandeshwara, Mangalore.</p>
        <p className='about'>Tel : +91-9481017100 (Librarian)</p>
        <p className='about'>Email: librarys@srinivasuniversity.edu.in</p>
      </div>
      <div className='contactUs'>
        <p className='aboutContact'>CONTACT US</p>
        <p className='about'>Chandra </p>
        <p className='about'>Chief Librarian</p>
        <p className='about'>Srinivas University</p>
        <p className='about'>Mangalore</p>

        <p className='about'>0824-2441000</p>
        <p className='about'><b>Mobile :</b> 9481017100</p>

        <p className='about'><b>E-mail :</b> librarians@srinivasuniversity.edu.in</p>
      </div>
      <hr /><Footer/>
    </div>
  );
}

export default AboutPage;
