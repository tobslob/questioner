import express from 'express';
import path from 'path';

const router = express.Router();


router.use(express.static(path.join(__dirname, '../UI')));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../UI', './index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../UI', 'sign-in.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../UI', 'sign-up.html'));
});

router.get('/meetup-post', (req, res) => {
    res.sendFile(path.join(__dirname, '../UI', 'meetup-post.html'));
});

router.get('/meetuppostpage', (req, res) => {
    res.sendFile(path.join(__dirname, '../UI', 'meetuppostpage.html'));
});

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../UI', 'admin.html'));
});

router.get('/userprofile', (req, res) => {
    res.sendFile(path.join(__dirname, '../UI', 'userprofile.html'));
});

router.get('/password-reset', (req, res) => {
    res.sendFile(path.join(__dirname, '../UI', 'password-reset.html'));
});


module.exports = router;
