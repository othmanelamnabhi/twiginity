const twitter = require("twitter-text");

const str = `@otechman je t'aime`;

twitter.autoLink("lgfjdkgjdg https://google.com #otechman @anytime");

console.log(
  twitter.extractHashtags("lgfjdkgjdg https://google.com #otechman @anytime")
);

console.log(
  twitter.extractUrlsWithIndices("lgfjdkgjdg google.com #otechman @anytime", {
    extractUrlsWithoutProtocol: false,
  })
);

const name = "@otechman_ok";
console.log(twitter.isValidUsername(name));

console.log(twitter.parseTweet(str).valid);

console.log(
  twitter.isInvalidTweet(`test tweet link in tweet and see if it affects character count.
https://twitter.com/thewannabedev/status/1444389316273266695

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.`)
);
