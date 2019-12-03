import React from 'react';
import { FirebaseContext } from '../../firebase';

function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = React.useState('');
  const [isPasswordReset, setIsPasswordReset] = React.useState(false);
  const [passwordResetError, setPasswrodResetError] = React.useState(null);

  async function handleResetPassword() {
    try {
      await firebase.resetPasswordEmail(resetPasswordEmail);

      setIsPasswordReset(true);
      setPasswrodResetError(null);
    } catch (error) {
      console.error('Error sending email', error);

      setPasswrodResetError(error.message);
      setIsPasswordReset(false);
    }
  }

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide yout account email"
        onChange={(event) => setResetPasswordEmail(event.target.value)}
      />
      <div>
        <button className="button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
      {isPasswordReset && <p>Check email to reset password</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  );
}

export { ForgotPassword };
