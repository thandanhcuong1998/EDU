/*services*/
import React, { useState } from 'react';

/*styles*/
import '../assest/style.css';

/*icons*/
import { Home, Languages, Trophy, User } from 'lucide-react';

/*components*/
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Sidebar from '../../Routes/MainAppStudy/Learn/components/Sidebar.jsx';
import MainContentStudyApp from '../../common/components/MainContentStydyApp.jsx';
import MainLearn from '../../Routes/MainAppStudy/Learn/components/MainLearn.jsx';
import Logo from './Logo.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import JapaneseAlphabet from '../../Routes/MainAppStudy/JapaneseAlphabets/JapaneseAlphabet.jsx';

export default function MainStudyApp() {
   const [listMenu, setListMenu] = useState([
      { menu: 'learn', icon: <Home className="w-5 h-5 mr-10" /> },
      { menu: 'characters', icon: <Languages className="w-5 h-5 mr-10" /> },
      { menu: 'leaderboards', icon: <Trophy className="w-5 h-5 mr-10" /> },
      { menu: 'profile', icon: <User className="w-5 h-5 mr-10" /> },
   ]);
   return (
      <>
         <div className="left-content">
            <Tab.Container id="left-tabs" defaultActiveKey={listMenu[0]?.menu}>
               <Row>
                  <Col sm={3}>
                     <Logo />
                     <div className="theme-toggle-container">
                        <ThemeToggle />
                     </div>
                     <Nav variant="pills" className="flex-column menu">
                        {listMenu.length > 0 &&
                           listMenu.map((menuItem, index) => (
                              <Nav.Item key={index}>
                                 <Nav.Link eventKey={menuItem.menu}>
                                    {menuItem.icon}
                                    {menuItem.menu}
                                 </Nav.Link>
                              </Nav.Item>
                           ))}
                     </Nav>
                  </Col>

                  {/* start content */}
                  <Col sm={9}>
                     <Tab.Content>
                        <Tab.Pane eventKey="learn">
                           <MainContentStudyApp id="main-learn">
                              <MainLearn />
                           </MainContentStudyApp>
                        </Tab.Pane>
                        <Tab.Pane eventKey="characters">
                           <MainContentStudyApp id="characters">
                              <JapaneseAlphabet />
                           </MainContentStudyApp>
                        </Tab.Pane>
                     </Tab.Content>
                  </Col>
                  {/* end content*/}
               </Row>
            </Tab.Container>
         </div>
         <Sidebar />
      </>
   );
}
