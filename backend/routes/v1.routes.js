import express from 'express';
import passport from 'passport';
import * as v1Ctrl from '../controller/v1.controller'

const router = express();
const passportAuth = passport.authenticate("v1", { session: false }); //you set authentication in router call this
router.route('/student-login').post(v1Ctrl.studentlogin);
router.route('/trainer-login').post(v1Ctrl.trainerlogin);
router.route('/trainer-list').get(v1Ctrl.gettrainerlist);
router.route('/sample').post(passportAuth,v1Ctrl.sample);
router.route('/register-student').post(v1Ctrl.registerstudent);
router.route('/set-student-scroe').post(v1Ctrl.setstudentscore);
router.route('/claim-rewards').post(v1Ctrl.claimRewards);
router.route('/get-score').post(v1Ctrl.getscore);
router.route('/student-test-history').post(v1Ctrl.getstudenthistory);



export default router;
