/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];



$(document).ready(function() {

  let $form = $('.new-tweet-form');
  // console.log('beta', $form.serialize())
    $form.on('submit', function (event) {
      event.preventDefault();
        let input = $(this).find('textarea').val();
          if (input.length > 140) {
            $(".tweet-error")
            .prepend($("<div>")
            .addClass("error")
            .text("⚠️ Too long. Keep your tweet within 140 characteres ⚠️").slideDown("fast"));
            return;
          }
          if (input === '' || input === null) {
            $(".tweet-error").prepend($("<div>").addClass("error").text("⚠️ We cannot post an empty tweet. Please, write it first 🐥").slideDown("fast"));;
            return;
          }
      console.log('Button clicked, performing ajax call...');
      let data = $form.serialize();
      console.log(data);
      
      return $.ajax('/tweets', { method: 'POST', data: $form.serialize()},)
      .then(function () {
        loadTweets () 
        $(".tweet-error").slideUp();
        console.log('Success!');
      })
    }); 
    
$(".new-tweet").hide();
$(".compose").click(function() {
  $(".new-tweet").slideToggle();
});
  });


const escape =  function(str) {
  let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
      return div.innerHTML;
  }
  {/* <script>alert('uh oh');</script> */}

const renderTweets = function(tweets) {
  // console.log("All tweets", tweets);
  // TODO: delete all old tweets
  $('.tweets-container').empty();
  for (let post of tweets) {
    // console.log("tweet: ", post);
    const $tweet = createTweetElement(post);
    $('.tweets-container').prepend($tweet);
  }
}

const loadTweets = function () {
  $.ajax({
    url:"/tweets"

  }).then(renderTweets)
}

loadTweets();


const createTweetElement = function(tweet) {
  let $tweet = $("<article>").addClass("tweet");
  $tweet.append(
    `<header class = "header">
    <img class="avatar" src="${tweet.user.avatars}">
    <p class="name"> ${tweet.user.name} </p>
    <p class = "user">${tweet.user.handle}</p>
    </header>
    
    <div>
    <p>${escape(tweet.content.text)}</p>
    </div>
    
    <footer class = "footer">    
    <div class="time">
      <span class="createdAt">
      ${tweet.created_at} 
      </span>
    </div>
    <div class="icons">
      <span class="fas fa-flag"></span>
      <span class="fas fa-retweet"></span>
      <span class="fas fa-heart"></span>
    </div>
  </footer>`
  );
  return $tweet
}


