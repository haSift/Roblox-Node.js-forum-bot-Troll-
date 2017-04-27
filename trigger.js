var rbx = require('roblox-js');
var subforum = 35; //LMAD
var username = 'username';
var password = 'password';
var arrai = []

var LineByLineReader = require('line-by-line'),
	lr = new LineByLineReader('response.txt', {skipEmptyLines: true })

  lr.on('line', function (line) {
     arrai.push(line)
  });

function login () {
  return rbx.login(username, password);
}

// Bypass duplicate post blocking
function clear () {
  var str = '';
  for (var i = 0; i < 20; i++) {
    if (Math.random() < 0.5) {
      str += '\u200B';
    } else {
      str += ' ';
    }
  }
  return str;
}

login()
.then(function () {
  var evt = rbx.onForumPost(subforum);
  evt.on('data', function (post) {
    console.log(post);
    var response;
    /*
    response = [
         'Do not post this here kid',
         'Please be nice kid!',
         'I disagree',
         'Disagreed',
         'pls dont ban me kid',
         'ik your into him..',
         'do you like roblox?',
         'why do you play roblox?',
         'I agree',
         'your a loser',
         'I despise you!',
         'your a skid',
         'follow alexcrowns!',
         'follow alexvalentinocrowns!',
         'real men needs skills',
         'just cuz you have limiteds doesnt mean your rich?',
         'your poor',
         'no, no, no',
         'halt die fresse',
         'hdf',
         'iceland is hot',
         'optimal said so too...',
         'im not a bot what are you on about???'
       }
       */
   var randomNumber = Math.floor(Math.random()*arrai.length);
   var response1 = arrai[randomNumber];
   console.log(response1);
    rbx.forumPost({postId: post.id, body: response1 + clear()});
  });
  evt.on('error', function (err) {
    console.error('Event error: ' + err.stack);
  });
});


setInterval(login, 40000);
