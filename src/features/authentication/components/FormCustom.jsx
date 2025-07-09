import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure, registerSuccess, registerFailure, setLoading, logout } from '../state/authSlice.js';
import { SIGNIN, SIGNUP } from '@/shared/lib/Const.jsx';
import '@/pages/AuthPage/AuthPage.css'; // Import the new AuthPage CSS

const FormCustom = ({
    type,
    title,
    sub_title,
    title_login_navigate,
    title_button_submit,
    pragraph_line,
    url_type,
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); // For signup
    const [localError, setLocalError] = useState(null);

    const dispatch = useDispatch();
    const { loading, error, isLoggedIn } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        // Empty to avoid navigation race condition
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);
        dispatch(setLoading(true));

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (type === SIGNUP.TYPE) {
            // Register logic
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(u => u.email === email);

            if (userExists) {
                setLocalError('Email already registered.');
                dispatch(registerFailure('Email already registered.'));
            } else {
                const newUser = { username, email, password };
                localStorage.setItem('users', JSON.stringify([...users, newUser]));
                localStorage.setItem('currentUser', JSON.stringify(newUser));
                dispatch(registerSuccess(newUser));
                navigate('/welcome');
            }
        } else { // SIGNIN.TYPE
            // Login logic
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const foundUser = users.find(u => u.email === email && u.password === password);

            if (foundUser) {
                localStorage.setItem('currentUser', JSON.stringify(foundUser));
                dispatch(loginSuccess(foundUser));
                navigate('/learn');
            } else {
                setLocalError('Invalid email or password.');
                dispatch(loginFailure('Invalid email or password.'));
            }
        }
        dispatch(setLoading(false));
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-card__title">{title}</h2>
                <p className="auth-card__subtitle">
                    {sub_title}{' '}
                    <Link to={url_type}>{title_login_navigate}</Link>
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {type === SIGNUP.TYPE && (
                        <div className="form-group">
                            <label htmlFor="username">Tên người dùng</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Nhập tên người dùng của bạn"
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu của bạn"
                            required
                        />
                    </div>

                    {type === SIGNUP.TYPE && (
                        <div className="form-group">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms" style={{ display: 'inline', marginLeft: '0.5rem' }}>
                                Tôi đồng ý với <a href="#">Điều khoản & điều kiện</a>
                            </label>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-form__button"
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : title_button_submit}
                    </button>

                    {localError && <p className="auth-error-message">{localError}</p>}
                    {error && <p className="auth-error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default FormCustom;