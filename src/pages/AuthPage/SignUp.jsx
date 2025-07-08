import FormCustom from '@/features/authentication/components/FormCustom.jsx';
import { SIGNUP } from '@/shared/lib/Const.jsx';

const SignUp = () => {
    return (
        <FormCustom
            type={SIGNUP.TYPE}
            title={SIGNUP.TITLE}
            sub_title={SIGNUP.SUB_TITLE}
            title_login_navigate={SIGNUP.TITLE_LOGIN_NAVIGATE}
            title_button_submit={SIGNUP.TITLE_BUTTON_SUBMIT}
            pragraph_line={SIGNUP.PRAGRAPH_LINE}
            url_type="/auth/signin"
        />
    );
};

export default SignUp;
