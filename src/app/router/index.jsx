import { createBrowserRouter } from 'react-router-dom';
import Index from '@/pages/HomePage/index.jsx';
import SignUp from '@/pages/AuthPage/SignUp.jsx';
import SignIn from '@/pages/AuthPage/SignIn.jsx';
import Welcome from '@/pages/WelcomePage/index.jsx';
import WelcomeOne from '@/features/welcome/components/WelcomeOne.jsx';
import QuestionWelcome from '@/features/welcome/components/QuestionWelcome.jsx';
import { ListQuestionsSet } from '@/features/welcome/data/ListQuestionSetWelcome.jsx';
import MainApp from '@/pages/LearnPage/MainApp.jsx';
import Lession from '@/features/learn/components/Lession.jsx';
import UserProfile from '@/features/user-profile/components/UserProfile.jsx';
import Leaderboard from '@/features/leaderboard/components/Leaderboard.jsx';
import JapaneseAlphabet from '@/features/japanese-alphabet/components/JapaneseAlphabet.jsx';
import ProtectedRoute from '@/shared/components/ProtectedRoute.jsx';
import MainStudyApp from '@/pages/LearnPage/MainStudyApp.jsx';
import DashboardPage from '@/pages/DashboardPage/index.jsx';
import ReviewPage from '@/pages/ReviewPage/index.jsx';
import SRSReview from '@/features/srs/components/SRSReview.jsx';

const PATHS = {
   ROOT: '/',
   AUTH: '/auth',
   SIGNUP: '/auth/signup',
   SIGNIN: '/auth/signin',
   WELCOME: '/welcome',
   LEARN: '/learn',
   LEARN_PATH: 'path',
   LESSON: '/lession',
   CHARACTERS: 'characters',
   PROFILE: '/profile',
   LEADERBOARD: '/leaderboard',
   STEP_TWO: 'step=two',
   STEP_PROFICIENCY: 'step=proficiency',
   STEP_DAILY_GOAL: 'step=dailyGoal',
   REVIEW: '/review',
   SRS_REVIEW: '/srs-review',
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
      element: <ProtectedRoute />,
      children: [
         {
            path: PATHS.LEARN,
            element: <MainStudyApp />,
            children: [
                {
                    path: '',
                    element: <DashboardPage />,
                },
                {
                    path: PATHS.LEARN_PATH,
                    element: <MainApp />,
                },
                {
                    path: PATHS.CHARACTERS,
                    element: <JapaneseAlphabet />,
                },
            ],
         },
         {
            path: PATHS.LESSON,
            element: (
               <div className="lession-root">
                  <Lession />
               </div>
            ),
         },
         {
            path: PATHS.PROFILE,
            element: (
               <div className="profile-root">
                  <UserProfile />
               </div>
            ),
         },
         {
            path: PATHS.LEADERBOARD,
            element: (
               <div className="leaderboard-root">
                  <Leaderboard />
               </div>
            ),
         },
      ],
   },
   {
      path: PATHS.REVIEW,
      element: (
         <div className="review-root">
            <ReviewPage />
         </div>
      ),
   },
   {
      path: PATHS.SRS_REVIEW,
      element: (
         <div className="srs-review-root">
            <SRSReview />
         </div>
      ),
   },
]);

export default router;