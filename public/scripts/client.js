/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  $(".compose-tweet").submit(function(event){
    event.preventDefault();
    let tweetMsg = $('.compose-tweet').serialize();
    if(!$('#tweet-text').val()) {
      alert('Empty Tweet! Please Try Again!');
    } else if ($('#tweet-text').val().length > 140) {
      alert('Please type less than 140 characters!')
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: tweetMsg,
      })
      .then(loadTweets);
    }
  });

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let newTweets = createTweetElement(tweet);
      $('.tweet-container').prepend(newTweets);
    }
  }

  const loadTweets = function() {
    $.get("/tweets", function(res) {
      renderTweets(res);
    })
  }

  const createTweetElement = function(tweet) {
    const $tweet = (`
    <article class="tweet">
    <header class="names1">
      <div class="pic-name">
        <img class="tweet-img" src="${tweet.user.avatars}" alt="">
        <h4 class="tweet-username">${tweet.user.name}</h4>
      </div>
      <h4 class="tweet-handle">${tweet.user.handle}</h4>
    </header>
    <span class="tweet-body">${tweet.content.text}</span>
    <footer class="tweet-footer">
      <h4 class="tweet-timestamp">${tweet.created_at}</h4>
      <div class="tweet-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
    </article>
    `);
    return $tweet;
  }
});

