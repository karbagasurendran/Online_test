import express from 'express';
import passport from 'passport';
import * as v2Ctrl from "../controller/v2.controller";

const router = express();
const passportAuth = passport.authenticate("v2", { session: false }); //you set authentication in router call this


router.route('/admin-login').post(v2Ctrl.adminlogin);
router.route('/trainer-list').get(v2Ctrl.gettrainerlist);
router.route('/register-trainer').post(v2Ctrl.registerTrainer);
router.route('/get-tree').get(v2Ctrl.gettree);

export default router;
