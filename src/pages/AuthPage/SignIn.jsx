import FormCustom from '@/features/authentication/components/FormCustom.jsx';
import { SIGNIN } from '@/shared/lib/Const.jsx';

const SignIn = () => {
    return (
        <FormCustom
            type={SIGNIN.TYPE}
            title={SIGNIN.TITLE}
            sub_title={SIGNIN.SUB_TITLE}
            title_login_navigate={SIGNIN.TITLE_LOGIN_NAVIGATE}
            title_button_submit={SIGNIN.TITLE_BUTTON_SUBMIT}
            pragraph_line={SIGNIN.PRAGRAPH_LINE}
            url_type="/auth/signup"
        />
    );
};

export default SignIn;
