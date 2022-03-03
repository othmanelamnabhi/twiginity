export const deletionState = {
  processing: "processing",
  deleting: "deleting",
  queuing: "queuing",
  error: "error",
  noResults: "no results",
  ready: "ready",
};

export function reducer(
  state,
  { type, tweetCount, message, deleteError, tweetId, username, increment, numberOfTweets }
) {
  switch (type) {
    case deletionState.ready:
      return { ready: true };
    case deletionState.processing:
      return { processing: true, tweetCount };
    case deletionState.deleting:
      let arrayOfErrors = state.deleteError !== undefined ? [...state.deleteError] : [];

      if (deleteError !== undefined)
        arrayOfErrors.push({ tweetId, deleteError, username });

      return {
        deleting: true,
        increment: (state.increment ?? 0) + increment,
        numberOfTweets,
        deleteError: arrayOfErrors,
      };
    case deletionState.error:
      return { error: true, message };
    case deletionState.noResults:
      return {
        noResults: true,
      };

    default:
      throw new Error();
  }
}
