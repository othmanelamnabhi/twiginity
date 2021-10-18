const postTweetDialog = document.querySelector(".postTweet");
const deleteTweetsDialog = document.querySelector(".deleteTweets");

postTweetDialog.addEventListener("submit", async (e) => {
  e.preventDefault();
  const tweetContent = e.target[0].value;

  try {
    await axios.post("/api/tweets", { data: { tweetContent } });
  } catch (error) {
    console.log(error);
  }
});

deleteTweetsDialog.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const {
      data: { tweetsIDs, numberOfTweets },
    } = await axios.delete("/api/tweets");
    console.log(tweetsIDs, numberOfTweets);
  } catch (error) {
    console.log(error);
  }
});
