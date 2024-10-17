import express from "express";
import registerRoutes from './registerRoutes.js'
import loginRoutes from './loginRoutes.js'
import usersRoutes from './usersRoutes.js';
import rolesRoutes from './rolesRoutes.js';
import modulesRoutes from './modulesRoutes.js';
import menusRoutes from './menusRoutes.js';
import calendarRoutes from './calendarRoutes.js';

const router = express.Router();

router.use('/register', registerRoutes);

router.use('/login', loginRoutes);

router.use('/users', usersRoutes);

router.use('/roles', rolesRoutes);

router.use('/modules', modulesRoutes);

router.use('/menus', menusRoutes);

router.use('/calendar', calendarRoutes);

export default router