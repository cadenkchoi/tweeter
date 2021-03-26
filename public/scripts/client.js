/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {
  $(".compose-tweet").submit(function(event) {
    event.preventDefault();
    let tweetMsg = $('.compose-tweet').serialize();
    if (!$('#tweet-text').val()) {
      $('#error-message-container').html('&#9888; Empty Tweet! Please Try Again! &#9888;').slideDown().delay(3000).fadeOut();
    } else if ($('#tweet-text').val().length > 140) {
      $('#error-message-container').html('&#9888; Please type less than 140 characters! &#9888;').slideDown().delay(3000).fadeOut();
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: tweetMsg,
      })
        .then(() => {
          $('.tweet-container').empty();
          //location.reload();
          loadTweets();
        })
        .then(() => {
          this.reset();
        });
    }
  });

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const loadTweets = function() {
    $.get("/tweets", function(res) {
      renderTweets(res);
    });
  };
  loadTweets();

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let newTweets = createTweetElement(tweet);
      $('.tweet-container').prepend(newTweets);
    }
  };

  const timeSinceTweet = (unix) => {
    return moment(unix).fromNow();
  };

  const createTweetElement = function(tweet) {
    const $tweet = (`
    <article class="tweet">
    <header class="names1">
      <div class="pic-name">
        <img class="tweet-img" src="${tweet.user.avatars}" alt="">
        <h4 class="tweet-username">${escape(tweet.user.name)}</h4>
      </div>
      <h4 class="tweet-handle">${escape(tweet.user.handle)}</h4>
    </header>
    <span class="tweet-body">${escape(tweet.content.text)}</span>
    <footer class="tweet-footer">
      <h4 class="tweet-timestamp">${timeSinceTweet(tweet.created_at)}</h4>
      <div class="tweet-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
    </article>
    `);
    return $tweet;
  };
});

