import {gql, GraphQLClient} from 'graphql-request';

export const getReport = async (code, fight, token) => {
  const url = 'https://www.warcraftlogs.com/api/v2/client';

  const query = gql`
  {
    reportData {
      report(code: "${code}") {
        code
        title
        fights (killType: Encounters) {
          id
          name
          difficulty
          kill
          fightPercentage
          startTime
          endTime
        }
      }
    }
  }`;

  const client = new GraphQLClient(url, {headers: {'Authorization': `Bearer ${token}`}})
  return client.request(query)
}

export const getReportEvents = async (code, startTime, endTime, token) => {
  const url = 'https://www.warcraftlogs.com/api/v2/client';
  const query = gql`
  {
    reportData {
      report(code: "${code}") {
        code
        title
        graph(startTime: ${startTime}, endTime: ${endTime}, dataType: DamageTaken, viewBy: Ability)
      }
    }
  }`;

  const client = new GraphQLClient(url, {headers: {'Authorization': `Bearer ${token}`}})
  return await client.request(query)
}
