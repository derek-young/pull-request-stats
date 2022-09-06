const { fetchPullRequests } = require('../fetchers');
const { parsePullRequest } = require('../parsers');

const filterNullAuthor = ({ node }) => !!node.author;

const ownerFilter = ({ org, repos }) => {
  if (org) return `org:${org}`;
  return (repos || []).map((r) => `repo:${r}`).join(' ');
};

const buildQuery = ({ org, repos, startDate }) => {
  const dateFilter = `created:>=${'2021-08-01T06:00:00.000Z'}`;
  return `type:pr -review:none sort:author-date ${ownerFilter({ org, repos })} ${dateFilter}`;
};

const getPullRequests = async (params, users) => {
  const { limit } = params;
  const data = await fetchPullRequests(params);
  const results = data.search.edges
    .filter(filterNullAuthor)
    .map((pr) => parsePullRequest(pr, users));

  if (results.length < limit) return results;

  const last = results[results.length - 1].cursor;
  return results.concat(await getPullRequests({ ...params, after: last }, users));
};

module.exports = ({
  octokit, org, repos, startDate, itemsPerPage = 100, users,
}) => {
  const search = buildQuery({ org, repos, startDate });
  return getPullRequests(
    {
      octokit,
      search,
      limit: itemsPerPage,
    },
    users,
  );
};
