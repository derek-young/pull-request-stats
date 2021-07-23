const get = require('lodash.get');
const parseUser = require('./parseUser');
const parseReview = require('./parseReview');

const filterNullAuthor = ({ author }) => !!author;

const getFilteredReviews = (data, users) => {
  const reviews = get(data, 'node.reviews.nodes', []).filter(filterNullAuthor);

  return users
    ? reviews.filter((review) => review.author && users.includes(review.author.login))
    : reviews;
};

module.exports = (data = {}, users) => {
  const author = parseUser(get(data, 'node.author'));
  const publishedAt = new Date(get(data, 'node.publishedAt'));
  const handleReviews = (review) => parseReview(review, { publishedAt, authorLogin: author.login });

  return {
    author,
    publishedAt,
    cursor: data.cursor,
    id: get(data, 'node.id'),
    reviews: getFilteredReviews(data, users).map(handleReviews),
  };
};
