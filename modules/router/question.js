import express from 'express';
import questionControllers from '../controllers/question';
import checkAuth from '../middleware/check-auth';


const router = express.Router();


/**
 * users api to create question/comment
 */
router.post('/:meetupId', checkAuth, questionControllers.post_question);

/**
 * GET question api
 */
router.get('/', checkAuth, questionControllers.get_all_questions);

/**
 * Get a single question
 */
router.get('/:id', checkAuth, questionControllers.get_question);

/**
 * upvote question api
 */
router.post('/:questionId/:userId/upvote', checkAuth, questionControllers.upvote_question);


/**
 * downvote question api
 */
router.post('/:questionId/:userId/downvote', checkAuth, questionControllers.downvote_question);


module.exports = router;
