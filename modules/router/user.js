import express from 'express';
import checkAuth from '../middleware/check-auth';
import userControllers from '../controllers/user';


const router = express.Router();



/**
 * user endpoint api
 */
router.post('/signup', userControllers.post_user);


/**
 * Login router
 */
router.post('/login', userControllers.login_router);



/**
 * GET user endpoint api
 */
router.get('/', checkAuth, userControllers.get_users);


/**
 * GET single user endpoint api
 */
router.get('/:id', checkAuth, userControllers.get_user);


/*
 * An API endpoint to patch user
 */
router.patch('/:id', checkAuth, userControllers.patch_user);

/*
 * An API endpoint to delete user
 */
router.delete('/:id', checkAuth, userControllers.delete_user);

module.exports = router;