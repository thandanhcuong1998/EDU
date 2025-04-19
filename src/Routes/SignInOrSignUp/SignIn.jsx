import { useEffect } from 'react';
import FormCustom from './components/FormCustom.jsx';
import { SIGNIN } from '../../Helpers/Const.jsx';

const SignIn = () => {
    useEffect(() => {
        import('./assets/css/signup.css');
    }, []);

    return (
        <div className="signin">
            <FormCustom
                type={SIGNIN.TYPE}
                title={SIGNIN.TITLE}
                sub_title={SIGNIN.SUB_TITLE}
                title_login_navigate={SIGNIN.TITLE_LOGIN_NAVIGATE}
                title_button_submit={SIGNIN.TITLE_BUTTON_SUBMIT}
                pragraph_line={SIGNIN.PRAGRAPH_LINE}
                url_type="/signup"
            />
        </div>
    );
};

export default SignIn;
