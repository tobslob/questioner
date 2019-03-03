import express from 'express';
import questionControllers from '../controllers/question';
import checkAuth from '../middleware/check-auth';


const router = express.Router();


/**
 * users api to create question/comment
 */
router.post('/', checkAuth, questionControllers.post_question);

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
router.patch('/:questionId/upvote', checkAuth, questionControllers.upvote_question);


/**
 * downvote question api
 */
router.patch('/:questionId/downvote', checkAuth, questionControllers.downvote_question);


module.exports = router;
