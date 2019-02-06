const meetupdb = {

    user: [{
        id: 1,
        firstname: 'Kazeem',
        lastname: 'Odutola',
        othername: 'Oluwatobi',
        email: 'kazmobilemap@gmail.com',
        phoneNumber: '+2347039387595',
        username: 'tobslob',
        password: '/^[a-f0-9]{32}$/',
        registered: 'Dec 31 2018',
        isAdmin: false,
    }],

    meetuppost: [{
        id: 1,
        createdOn: '2019-01-25T11:34:58.517Z',
        location: 'Awolowo Ikeja',
        images: ['', ''], // OPTIONAL: URL to the image location
        topic: 'The best programming lang to learn in 2019',
        body: 'This is description on the best programming lang to learn in 2019',
        happeningOn: 'Jan 21 2019', // when the meetup is holding
        Tags: ['programming', 'code', 'JavaScript', 'python', 'Java'],
    }, {
        id: 2,
        createdon: '2019-01-25T11:34:58.517Z',
        location: 'Ikeja',
        images: ['', ''], // OPTIONAL: URL to the image location
        topic: 'The best programming lang to learn in 2020',
        body: 'This is description on the best programming lang to learn in 2019',
        happeningOn: 'Jan 21 2019', // when the meetup is holding
        Tags: ['programming', 'code', 'python', 'java'],
    }, {
        id: 3,
        createdon: '2020-01-25T11:34:58.517Z',
        location: 'Ikeja-Lagos',
        images: ['', ''], // OPTIONAL: URL to the image location
        topic: 'The best programming lang to learn in 2020',
        body: 'This is description on the best programming lang to learn in 2019',
        happeningOn: 'Jan 25 2019', // when the meetup is holding
        Tags: ['programming', 'code', 'python', 'java'],
    }],

    questions: [{
        id: 1,
        createdOn: '2019-01-25T11:34:58.517Z',
        createdBy: 1002, // represents the user asking the question
        meetup: 1, // represents the meetup the question is for
        title: 'learn many but be very proficient in 1',
        body: 'I will love to learn more than 3, but be proficient in 2',
        votes: 0,
    }, {
        id: 2,
        createdOn: '2020-01-25T11:34:58.517Z',
        createdBy: 1002, // represents the user asking the question
        meetup: 2, // represents the meetup the question is for
        title: 'new question',
        body: 'I will love to learn more than 3, but be proficient in 2',
        votes: 3,
    }],

    rsvp: [{
        id: 1,
        meetup: 1, // primary key
        topic: 'The best programming lang to learn in 2019',
        user: 1, // represents the user
        response: 'maybe', // [yes, no, or maybe]
    }],
};

module.exports = meetupdb;
