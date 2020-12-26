import FetchQL from 'fetchql'

const getReport = (code, token) => {
  let url = 'https://www.warcraftlogs.com/api/client';

  console.log(url)

  const Query = new FetchQL({
    url: url, // GraphQL server address
    interceptors: [],
    headers: {}, // customized headers of all requests,
    onStart: function (requestQueueLength) {}, // callback of a new request queue
    onEnd: function (requestQueueLength) {}, // callback of a request queue finished
    omitEmptyVariables: false, // remove null props(null or '') from the variables
  });

  console.log(Query)

  Query.query({
    operationName: 'report',
    query: `{
      reportData {
        report(code: "v4k9A8PgNR2C6FDT") {
          title
          fights {
            name,
            difficulty,
            startTime,
            fightPercentage
          }
        }
      }
  }`
  }).then(r => console.log(r))
    .catch(err => console.log(err));
}

export {
  getReport
}