import React from 'react';

export default function PasswordRecovery() {
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                <div className="panel panel-info">
                    <div className="panel-heading">Password Recovery</div>
                    <div className="panel-body">
                        <form action="">
                            <div className="form-group">
                                <label>Enter Registered Email ID</label>
                                <input type="email" className='form-control' name='email' required />
                            </div>
                            <div className="form-group">
                                <label>Enter Registered Mobile Number</label>
                                <input type="text" className='form-control' name='mobile' required />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" className='form-control' name='newPassword' required />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" className='form-control' name='confirmPassword' required />
                            </div>
                            <button type="submit" className="btn btn-info">Change password</button>
                            <a href="/login">Login</a>  

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}
