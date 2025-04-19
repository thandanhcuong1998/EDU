import { useContext } from 'react';
import { LanguageContext } from './Context/LanguageContext.jsx';
import './assets/style.min.css';
import './assets/style.css';
import './assets/responsive.css';
import Image from './assets/img/client11.png';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ChevronDownOutline } from 'react-ionicons';
import ChangeLanguage from './components/ChangeLanguage.jsx';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const { translations } = useContext(LanguageContext);
    const { language } = useContext(LanguageContext);
    const navigate = useNavigate();

    const redirectSignUp = () => {
        navigate('/welcome');
    };

    return (
        <>
            <nav
                className="navbar navbar-light colorCajasBlancas"
                id={`${language}`}
            >
                <div className="container-fluid justify-content-space-around">
                    <a className="navbar-brand" href="#">
                        <img src="https://omolds.github.io/assets/images/sitom/omolds/logoOmolds544x348.png" />
                    </a>
                    <button className="change-language" type="button">
                        Ngôn ngữ hiển thị :{' '}
                        {`${language === 'ja' ? 'japanese' : 'Tiếng việt'}`}
                        <ChevronDownOutline
                            color={'#afafaf'}
                            height="14px"
                            width="14px"
                        />
                        <ChangeLanguage />
                    </button>
                </div>
            </nav>
            <section
                className="justify-content-center align-items-center section-1 banner d-flex"
                id={`${language}`}
            >
                <div className="container-fluid justify-content-center align-items-center d-flex section-div-1">
                    <div className="dh-highlight-text">
                        <div className="justify-content-center text-center">
                            <h1 className="fw-bold title">
                                <span>{translations.welcome}</span>
                            </h1>
                        </div>
                        <p>
                            <span className="subtitle">
                                {translations.subWelcome}
                            </span>
                        </p>
                        <button
                            className="btn btn-primary text-uppercase fw-bold text-center"
                            type="button"
                            onClick={redirectSignUp}
                        >
                            {translations.buttonStart}
                        </button>
                    </div>
                </div>
            </section>
            <section className="section-2" id={`${language}`}>
                <div className="container">
                    <div className="justify-content-center text-center">
                        <h2 className="fw-bold title">
                            <span>{translations.titleSection1}</span>
                        </h2>
                    </div>
                    <section className="customer-logos slider">
                        <div className="col-sm-4 col-md-3 col-lg-2 col-xl-2 slide">
                            <img src={Image} />
                        </div>
                        <div className="col-sm-4 col-md-3 col-lg-2 col-xl-2 slide">
                            <img src={Image} />
                        </div>
                        <div className="col-sm-4 col-md-3 col-lg-2 col-xl-2 slide">
                            <img src={Image} />
                        </div>
                        <div className="col-sm-4 col-md-3 col-lg-2 col-xl-2 slide">
                            <img src={Image} />
                        </div>
                        <div className="col-sm-4 col-md-3 col-lg-2 col-xl-2 slide">
                            <img src={Image} />
                        </div>
                        <div className="col-sm-4 col-md-3 col-lg-2 col-xl-2 slide">
                            <img src={Image} />
                        </div>
                    </section>
                </div>
            </section>
            <section className="section-3" id={`${language}`}>
                <div className="container-fluid flex-column justify-content-center align-items-center d-flex">
                    <div className="justify-content-center text-center div-title">
                        <h2 className="fw-bold title">
                            <span>{translations.titleSection2}</span>
                        </h2>
                        <p className=" subtitle">
                            <span>{translations.subTitleSection2}</span>
                        </p>
                    </div>
                    <div className="card-group justify-content-around align-content-center align-items-xxl-end">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <DotLottieReact
                                        src="https://lottie.host/aa8937d2-3952-4ffc-999a-5275395f3948/QobFy8dnPO.json"
                                        loop
                                        autoplay
                                    />
                                </div>
                                <h4 className="text-center card-title">
                                    {translations.lorem}
                                </h4>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <DotLottieReact
                                        src="https://lottie.host/aa8937d2-3952-4ffc-999a-5275395f3948/QobFy8dnPO.json"
                                        loop
                                        autoplay
                                    />
                                </div>
                                <h4 className="text-center card-title">
                                    {translations.lorem}
                                </h4>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <DotLottieReact
                                        src="https://lottie.host/aa8937d2-3952-4ffc-999a-5275395f3948/QobFy8dnPO.json"
                                        loop
                                        autoplay
                                    />
                                </div>
                                <h4 className="text-center card-title">
                                    {translations.lorem}
                                </h4>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <DotLottieReact
                                        src="https://lottie.host/aa8937d2-3952-4ffc-999a-5275395f3948/QobFy8dnPO.json"
                                        loop
                                        autoplay
                                    />
                                </div>
                                <h4 className="text-center card-title">
                                    {translations.lorem}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-4" id={`${language}`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 position-sticky fixed-top text-lg-start">
                            <h1>
                                <span>{translations.titleSection3}</span>
                            </h1>
                            <button
                                className="btn btn-link border-pretty"
                                type="button"
                            >
                                {translations.buttonSection3}
                                <i className="icon ion-android-arrow-forward"></i>
                            </button>
                        </div>
                        <div className="col-md-6 text-lg-start">
                            <h2 className=" title">
                                <span>{translations.headingSection31}</span>
                            </h2>
                            <p className=" subtitle">
                                <span>{translations.subHeadingSection31}</span>
                            </p>
                            <div className="card float-end">
                                <div className="card-body">
                                    <div>
                                        <DotLottieReact
                                            src="https://lottie.host/aa8937d2-3952-4ffc-999a-5275395f3948/QobFy8dnPO.json"
                                            loop
                                            autoplay
                                            style={{
                                                width: '280px',
                                                height: '270px',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6"></div>
                        <div className="col-md-6 text-lg-start">
                            <h2 className=" title">
                                <span>{translations.headingSection32}</span>
                            </h2>
                            <p className=" subtitle">
                                <span>{translations.subHeadingSection32}</span>
                            </p>
                            <div className="card float-end">
                                <div className="card-body">
                                    <div>
                                        <DotLottieReact
                                            src="https://lottie.host/aa8937d2-3952-4ffc-999a-5275395f3948/QobFy8dnPO.json"
                                            loop
                                            autoplay
                                            style={{
                                                width: '280px',
                                                height: '270px',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6"></div>
                        <div className="col-md-6 text-lg-start">
                            <h2 className=" title">
                                <span>{translations.headingSection33}</span>
                            </h2>
                            <p className=" subtitle">
                                <span>{translations.subHeadingSection33}</span>
                            </p>
                            <div className="card float-end">
                                <div className="card-body">
                                    <div>
                                        <DotLottieReact
                                            src="https://lottie.host/aa8937d2-3952-4ffc-999a-5275395f3948/QobFy8dnPO.json"
                                            loop
                                            autoplay
                                            style={{
                                                width: '280px',
                                                height: '270px',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6"></div>
                        <div className="col-md-6 text-lg-start">
                            <h2 className=" title">
                                <span>{translations.headingSection34}</span>
                            </h2>
                            <p className=" subtitle">
                                <span>{translations.subHeadingSection34}</span>
                            </p>
                            <div className="card float-end">
                                <div className="card-body">
                                    <div>
                                        <DotLottieReact
                                            src="https://lottie.host/aa8937d2-3952-4ffc-999a-5275395f3948/QobFy8dnPO.json"
                                            loop
                                            autoplay
                                            style={{
                                                width: '280px',
                                                height: '270px',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-5" id={`${language}`}>
                <div className="container-fluid">
                    <h1 className="text-center title">
                        <span>{translations.titleSection4}</span>
                    </h1>
                </div>
                <div className="container-fluid py-4 py-xl-5">
                    <div className="row">
                        <div className="col-md-8 col-xl-8 mx-auto p-4">
                            <div className="d-flex justify-content-around align-items-md-start align-items-xl-center card-group-section-5">
                                <div className="d-flex flex-shrink-0 justify-content-center align-items-center order-2 me-4 d-inline-block bs-icon xl image-card">
                                    <div>
                                        <DotLottieReact
                                            src="https://lottie.host/aa8937d2-3952-4ffc-999a-5275395f3948/QobFy8dnPO.json"
                                            loop
                                            autoplay
                                            style={{
                                                width: '280px',
                                                height: '280px',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="card-section-5 text-lg-start">
                                    <h4 className="title">
                                        {translations.headingSection41}
                                    </h4>
                                    <p className="subtitle">
                                        <span>
                                            {translations.subHeadingSection41}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <hr className="my-5" />
                            <div className="d-flex justify-content-around align-items-center align-items-md-start align-items-xl-center card-group-section-5">
                                <div className="order-2 card-section-5 text-lg-start">
                                    <h4 className="title">
                                        {translations.headingSection42}
                                    </h4>
                                    <p className="subtitle">
                                        <span>
                                            {translations.subHeadingSection42}
                                        </span>
                                    </p>
                                </div>
                                <div className="d-flex flex-shrink-0 justify-content-center align-items-center order-1 me-4 d-inline-block bs-icon xl image-card">
                                    <div>
                                        <DotLottieReact
                                            src="https://lottie.host/aa8937d2-3952-4ffc-999a-5275395f3948/QobFy8dnPO.json"
                                            loop
                                            autoplay
                                            style={{
                                                width: '280px',
                                                height: '280px',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr className="my-5" />
                            <div className="d-flex justify-content-around align-items-md-start align-items-xl-center card-group-section-5">
                                <div className="d-flex flex-shrink-0 justify-content-center align-items-center order-2 me-4 d-inline-block bs-icon xl image-card">
                                    <div>
                                        <DotLottieReact
                                            src="https://lottie.host/aa8937d2-3952-4ffc-999a-5275395f3948/QobFy8dnPO.json"
                                            loop
                                            autoplay
                                            style={{
                                                width: '280px',
                                                height: '280px',
                                                backgroundColor: '#fafafa',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="card-section-5 text-lg-start">
                                    <h4 className="title">
                                        {translations.headingSection43}
                                    </h4>
                                    <p className="subtitle">
                                        <span>
                                            {translations.subHeadingSection43}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-6" id={`${language}`}>
                <div className="example-box">
                    <div className="background-shapes"></div>
                    <h1 className="title">
                        <strong>Học ngay thôi nào!!!</strong>
                    </h1>
                    <button
                        className="btn btn-link border-pretty"
                        type="button"
                    >
                        Bắt Đầu
                    </button>
                    <div>
                        <DotLottieReact
                            src="https://lottie.host/012e54f0-0b69-4cda-b4f3-8e196d025cc8/Ue5vQyiYa7.json"
                            loop
                            autoplay
                            style={{
                                width: '350px',
                                height: '350px',
                            }}
                        />
                    </div>
                </div>
            </section>
            {/*<footer style="background: #ffbf42; color: #ffffff">*/}
            {/*    <div className="container py-4 py-lg-5">*/}
            {/*        <div*/}
            {/*                className="row justify-content-center"*/}
            {/*                style="color: rgb(255, 255, 255)"*/}
            {/*        >*/}
            {/*            <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column item">*/}
            {/*                <h3 className="fs-6">Services</h3>*/}
            {/*                <ul className="list-unstyled">*/}
            {/*                    <li>*/}
            {/*                        <a className="link-secondary" href="#">*/}
            {/*                            Web design*/}
            {/*                        </a>*/}
            {/*                    </li>*/}
            {/*                    <li>*/}
            {/*                        <a className="link-secondary" href="#">*/}
            {/*                            Development*/}
            {/*                        </a>*/}
            {/*                    </li>*/}
            {/*                    <li>*/}
            {/*                        <a className="link-secondary" href="#">*/}
            {/*                            Hosting*/}
            {/*                        </a>*/}
            {/*                    </li>*/}
            {/*                </ul>*/}
            {/*            </div>*/}
            {/*            <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column item">*/}
            {/*                <h3 className="fs-6">About</h3>*/}
            {/*                <ul className="list-unstyled">*/}
            {/*                    <li>*/}
            {/*                        <a className="link-secondary" href="#">*/}
            {/*                            Company*/}
            {/*                        </a>*/}
            {/*                    </li>*/}
            {/*                    <li>*/}
            {/*                        <a className="link-secondary" href="#">*/}
            {/*                            Team*/}
            {/*                        </a>*/}
            {/*                    </li>*/}
            {/*                    <li>*/}
            {/*                        <a className="link-secondary" href="#">*/}
            {/*                            Legacy*/}
            {/*                        </a>*/}
            {/*                    </li>*/}
            {/*                </ul>*/}
            {/*            </div>*/}
            {/*            <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column item">*/}
            {/*                <h3 className="fs-6">Careers</h3>*/}
            {/*                <ul className="list-unstyled">*/}
            {/*                    <li>*/}
            {/*                        <a className="link-secondary" href="#">*/}
            {/*                            Job openings*/}
            {/*                        </a>*/}
            {/*                    </li>*/}
            {/*                    <li>*/}
            {/*                        <a className="link-secondary" href="#">*/}
            {/*                            Employee success*/}
            {/*                        </a>*/}
            {/*                    </li>*/}
            {/*                    <li>*/}
            {/*                        <a className="link-secondary" href="#">*/}
            {/*                            Benefits*/}
            {/*                        </a>*/}
            {/*                    </li>*/}
            {/*                </ul>*/}
            {/*            </div>*/}
            {/*            <div className="col-lg-3 text-center text-lg-start d-flex flex-column align-items-center order-first align-items-lg-start order-lg-last item social">*/}
            {/*                <div className="fw-bold d-flex align-items-center mb-2">*/}
            {/*        <span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center bs-icon me-2">*/}
            {/*          <svg*/}
            {/*                  xmlns="http://www.w3.org/2000/svg"*/}
            {/*                  width="1em"*/}
            {/*                  height="1em"*/}
            {/*                  fill="currentColor"*/}
            {/*                  viewBox="0 0 16 16"*/}
            {/*                  className="bi bi-bezier"*/}
            {/*          >*/}
            {/*            <path*/}
            {/*                    fill-rule="evenodd"*/}
            {/*                    d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"*/}
            {/*            ></path>*/}
            {/*            <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>*/}
            {/*          </svg>*/}
            {/*        </span>*/}
            {/*                    <span>Brand</span>*/}
            {/*                </div>*/}
            {/*                <p className="text-muted copyright">*/}
            {/*                    Sem eleifend donec molestie, integer quisque orci aliquam.*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <hr />*/}
            {/*        <div className="d-flex justify-content-between align-items-center pt-3">*/}
            {/*            <p className="text-muted mb-0">Copyright © 2024 Brand</p>*/}
            {/*            <ul className="list-inline mb-0">*/}
            {/*                <li className="list-inline-item">*/}
            {/*                    <svg*/}
            {/*                            xmlns="http://www.w3.org/2000/svg"*/}
            {/*                            width="1em"*/}
            {/*                            height="1em"*/}
            {/*                            fill="currentColor"*/}
            {/*                            viewBox="0 0 16 16"*/}
            {/*                            className="bi bi-facebook"*/}
            {/*                    >*/}
            {/*                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"></path>*/}
            {/*                    </svg>*/}
            {/*                </li>*/}
            {/*                <li className="list-inline-item">*/}
            {/*                    <svg*/}
            {/*                            xmlns="http://www.w3.org/2000/svg"*/}
            {/*                            width="1em"*/}
            {/*                            height="1em"*/}
            {/*                            fill="currentColor"*/}
            {/*                            viewBox="0 0 16 16"*/}
            {/*                            className="bi bi-twitter"*/}
            {/*                    >*/}
            {/*                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15"></path>*/}
            {/*                    </svg>*/}
            {/*                </li>*/}
            {/*                <li className="list-inline-item">*/}
            {/*                    <svg*/}
            {/*                            xmlns="http://www.w3.org/2000/svg"*/}
            {/*                            width="1em"*/}
            {/*                            height="1em"*/}
            {/*                            fill="currentColor"*/}
            {/*                            viewBox="0 0 16 16"*/}
            {/*                            className="bi bi-instagram"*/}
            {/*                    >*/}
            {/*                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"></path>*/}
            {/*                    </svg>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</footer>*/}
        </>
    );
};

export default Index;
