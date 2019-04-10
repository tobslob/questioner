import express from 'express';
import checkAuth from '../middleware/check-auth';
import rsvpControllers from '../controllers/rsvp';

const router = express.Router();


/**
 *  Rsvp endpoint
 */
router.post('/:meetupId/:userId', checkAuth, rsvpControllers.post_rsvp);


/**
 * GET all rsvp api endpoint
 */
router.get('/', checkAuth, rsvpControllers.get_all_rsvp);


/**
 * GET single rsvp
 */
router.get('/:id', checkAuth, rsvpControllers.get_rsvp);


/*
 *delete rsvp
 */
router.delete('/:id', checkAuth, rsvpControllers.delete_rsvp);

module.exports = router;
