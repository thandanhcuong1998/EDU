import { useEffect } from 'react';
import FormCustom from './components/FormCustom.jsx';
import { SIGNUP } from '../../Helpers/Const.jsx';

const SignUp = () => {
  useEffect(() => {
    import('./assets/css/signup.css');
  }, []);

  return (
    <div className="signup">
      <FormCustom
        type={SIGNUP.TYPE}
        title={SIGNUP.TITLE}
        sub_title={SIGNUP.SUB_TITLE}
        title_login_navigate={SIGNUP.TITLE_LOGIN_NAVIGATE}
        title_button_submit={SIGNUP.TITLE_BUTTON_SUBMIT}
        pragraph_line={SIGNUP.PRAGRAPH_LINE}
        url_type="/signin"
      />
    </div>
  );
};

export default SignUp;
