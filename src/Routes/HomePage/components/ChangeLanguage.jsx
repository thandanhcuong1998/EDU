import Vietnam from '../assets/img/vietnam.png';
import Japan from '../assets/img/japan.png';
import { useContext } from 'react';
import { LanguageContext } from '../Context/LanguageContext.jsx';

export default function ChangeLanguage() {
  const { changeLanguage } = useContext(LanguageContext);
  return (
    <div className="" id="languages-list">
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link text-primary"
                  href="#"
                  onClick={() => changeLanguage('vi')}
                >
                  <img src={Vietnam} width="23px" /> Tiếng việt
                </a>
              </li>
            </div>
            <div className="col-md-6">
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link  text-primary"
                  href="#"
                  onClick={() => {
                    changeLanguage('ja');
                  }}
                >
                  <img src={Japan} width="23px" /> Japanese
                </a>
              </li>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
}
