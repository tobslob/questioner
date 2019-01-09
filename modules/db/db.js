const meetupdb = {

  user: [{
    id: 1001,
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
    createdOn: ' ',
    location: 'Awolowo Ikeja',
    images: ['', ''], // OPTIONAL: URL to the image location
    topic: 'The best programming lang to learn in 2019',
    body: 'This is description on the best programming lang to learn in 2019',
    happeningOn: 'Jan 21 2019', // when the meetup is holding
    Tags: ['programming', 'code', 'JavaScript', 'python', 'Java'],
  }, {
    id: 2,
    createdon: ' ',
    location: 'Ikeja',
    images: ['', ''], // OPTIONAL: URL to the image location
    topic: 'The best programming lang to learn in 2020',
    body: 'This is description on the best programming lang to learn in 2019',
    happeningOn: 'Jan 21 2019', // when the meetup is holding
    Tags: ['programming', 'code', 'python', 'Java'],
  }],

  questions: [{
    id: 1,
    createdOn: 'Jan 31 2018',
    createdBy: 1002, // represents the user asking the question
    meetup: 1, // represents the meetup the question is for
    title: 'learn many but be very proficient in 1',
    body: 'I will love to learn more than 3, but be proficient in 2',
    votes: 'thumb up',
  }],

  rsvp: [{
    id: 11001,
    topic: '',
    user: 1002, // represents the user
    status: 'maybe', // [yes, no, or maybe]
  }],
};

module.exports = meetupdb;
