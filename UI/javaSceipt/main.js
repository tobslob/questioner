/* Toggle functionality for user profile */
function userToggle() {
  const userlists = document.querySelector('.userlist');
  const panelusers = document.querySelectorAll('.paneluser');
  if (userlists) {
    userlists.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        const targetUserPanel = document.querySelector(e.target.dataset.target);

        panelusers.forEach((paneluser) => {
          if (paneluser === targetUserPanel) {
            paneluser.classList.add('activerUserPanel');
          } else {
            paneluser.classList.remove('activerUserPanel');
          }
        });
      }
    });
  }
}


/* Toggle functionality for admin panel */
function adminToggle() {
  const lists = document.querySelector('.list');
  const panels = document.querySelectorAll('.panel');
  if (lists) {
    lists.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        const targetPanel = document.querySelector(e.target.dataset.target);


        panels.forEach((panel) => {
          if (panel === targetPanel) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      }
    });
  }
}


/* User registration */
function registration() {
  const regform = document.querySelectorAll('regform');
  if (regform) {
    regform.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullname = regform.querySelector('input[type="text"]')[1].value;
      const username = regform.querySelector('input[type="text"]')[0].value;
      const email = regform.querySelector('input[type="email"]').value;

      // create element
      const hFullname = document.createElement('h3');
      const pUsername = document.createElement('P');
      const pEmail = document.createElement('P');

      // add document
      hFullname.textContent = fullname;
      pUsername.textContent = username;
      pEmail.textContent = email;
      // append to div
      const myname = document.querySelector('.myprofil');
      myname.appendChild(hFullname);
      myname.appendChild(pUsername);
      myname.appendChild(pEmail);
    });
  }
}

/* Create a meetup record function */

function createMeetUp() {
  const createMeet = document.forms['reused_form Meetupform'];
  if (createMeet) {
    createMeet.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = createMeet.querySelector('#post-title meetup-title').value;
      const time = createMeet.querySelector('#meetup-time').value;
      const location = createMeet.querySelector('#post-location').value;
      const post = createMeet.querySelector('#desc meetupdesc').value;
      const tags = createMeet.querySelector('#post-tags').value;
      const image = createMeet.querySelector('post-input').value;
      // create element
      const hTitle = document.createElement('h2');
      const hLocation = document.createElement('h3');
      const dateTime = document.createElement('h3');
      const meetupPost = document.createElement('p');
      const tag = document.createElement('p');
      const imgs = document.createElement('img');

      // add document
      hTitle.textContent = title;
      hLocation.textContent = location;
      dateTime.textContent = time;
      meetupPost.textContent = post;
      tag.textContent = tags;
      imgs.src = image;
    });
  }
}


// User Question/comment function
function question() {
  const questform = document.forms.questionform;

  if (questform) {
    questform.addEventListener('submit', (e) => {
      e.preventDefault();

      const questionn = questform.querySelector('input[type="textare"]').value;

      const quest = document.createElement('p');

      quest.textContent = questionn;

      document.querySelector('.questiondiv').appendChild(quest);
    });
  }
}

userToggle();
question();
createMeetUp();
registration();
adminToggle();
