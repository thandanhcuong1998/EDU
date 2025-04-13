import { createBrowserRouter } from 'react-router-dom';
import Index from './HomePage/index.jsx';
import SignUp from './SignInOrSignUp/SignUp.jsx';
import SignIn from './SignInOrSignUp/SignIn.jsx';
import Welcome from './QuestionChoiceWelcome/Welcome.jsx';
import WelcomeOne from './QuestionChoiceWelcome/components/layouts/Layout-Welcome/WelcomeOne.jsx';
import QuestionWelcome from './QuestionChoiceWelcome/components/layouts/Layout-Welcome/QuestionWelcome.jsx';
import { ListQuestionsSet } from '../Helpers/ListQuestionSetWelcome.jsx';
import MainApp from './MainAppStudy/MainApp.jsx';

const PATHS = {
  ROOT: '/',
  AUTH: '/auth',
  SIGNUP: '/auth/signup',
  SIGNIN: '/auth/signin',
  WELCOME: '/welcome',
  LEARN: '/learn',
  LESSON: '/lession',
  CHARACTERS: '/characters',
  STEP_TWO: 'step=two',
  STEP_PROFICIENCY: 'step=proficiency',
  STEP_DAILY_GOAL: 'step=dailyGoal',
};

const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <Index />,
  },
  {
    path: PATHS.AUTH,
    children: [
      {
        path: PATHS.SIGNUP,
        element: (
          <div className="signup-root">
            <SignUp />
          </div>
        ),
      },
      {
        path: PATHS.SIGNIN,
        element: (
          <div className="signin-root">
            <SignIn />
          </div>
        ),
      },
    ],
  },
  {
    path: PATHS.WELCOME,
    element: (
      <div className="welcome-root">
        <Welcome stepWelcome="two" />
      </div>
    ),
    children: [
      {
        path: '',
        element: (
          <WelcomeOne
            title="Chào bạn! Mình cùng cố gắng nhé!"
            resourceAnimation="https://lottie.host/ee348ad4-c40b-4922-8efc-8397fd3019c1/eZVHwk0knJ.json"
          />
        ),
      },
      {
        path: PATHS.STEP_TWO,
        element: (
          <WelcomeOne
            title="Cùng bắt đầu buổi tiệc ngôn ngữ nào!"
            resourceAnimation="https://lottie.host/11bb064d-3b67-436f-bb3b-f3e9509acc0a/WUtr7agxex.json"
            step="proficiency"
          />
        ),
      },
      {
        path: PATHS.STEP_PROFICIENCY,
        element: (
          <QuestionWelcome
            IDQuestionSet="proficiency"
            title="Trình độ tiếng nhật của bạn ở mức nào?"
            listQuestionSet={ListQuestionsSet.proficiency}
          />
        ),
      },
      {
        path: PATHS.STEP_DAILY_GOAL,
        element: (
          <QuestionWelcome
            IDQuestionSet="dailyGoal"
            title="Mục tiêu học hằng ngày của bạn là gì?"
            listQuestionSet={ListQuestionsSet.dailyGoal}
          />
        ),
      },
    ],
  },
  {
    path: PATHS.LEARN,
    element: (
      <div className="learn-root">
        <MainApp />
      </div>
    ),
  },
  // {
  //   path: PATHS.LESSON,
  //   element: (
  //     <div className="lession-root">
  //       <Lession />
  //     </div>
  //   ),
  // },
  // {
  //   path: PATHS.CHARACTERS,
  //   element: (
  //     <div className="learn-root">
  //       <Characters />
  //     </div>
  //   ),
  // },
]);

export default router;
