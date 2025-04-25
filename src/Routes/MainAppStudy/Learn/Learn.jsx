import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import CardMenu from './components/CardMenu.jsx';
import Sidebar from './components/Sidebar.jsx';
import './assets/style.css';
import MainLearn from './components/MainLearn.jsx';
import { Home, Languages, Trophy, User } from 'lucide-react';
import React, { useContext } from 'react';
import MainContentStudyApp from '../../common/components/MainContentStydyApp.jsx';
import { LanguageContext } from '../../../Routes/HomePage/Context/LanguageContext.jsx';

export default function Learn() {
    const { translations } = useContext(LanguageContext);

    return (
        <>
            <div className="left-content">
                <Tab.Container id="left-tabs" defaultActiveKey="learn">
                    <Row>
                        <Col sm={3}>
                            <div className="tab-content">
                                <div className="logo">
                                    <h4>DARUMA</h4>
                                </div>
                            </div>
                            <Nav variant="pills" className="flex-column menu">
                                <Nav.Item>
                                    <Nav.Link eventKey="learn">
                                        <Home className="w-5 h-5 mr-10" />
                                        {translations.learn.navigation.learn}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="characters">
                                        <Languages className="w-5 h-5  mr-10" />
                                        {translations.learn.navigation.characters}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="leaderboards">
                                        <Trophy className="w-5 h-5  mr-10" />
                                        {translations.learn.navigation.leaderboards}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="profile">
                                        <User className="w-5 h-5  mr-10" />
                                        {translations.learn.navigation.profile}
                                    </Nav.Link>
                                </Nav.Item>
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
                                    <MainLearn />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                        {/* end content*/}
                    </Row>
                </Tab.Container>
            </div>

            {/*<CardMenu />*/}
            {/*<MainLearn />*/}
            <Sidebar />
        </>
    );
}
