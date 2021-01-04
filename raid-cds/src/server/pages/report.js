import {getToken} from '../api/auth';
import {gql, GraphQLClient} from 'graphql-request';

export const getReport = async (code) => {

  return getToken()
    .then(response => {
      let token = response.access_token;

      const url = 'https://www.warcraftlogs.com/api/v2/client';

      const query = gql`
      {
        reportData {
          report(code: "${code}") {
            code,
            title
            fights (killType: Encounters) {
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

      const client = new GraphQLClient(url, {headers: {"Authorization": `Bearer ${token}`}})
      return client.request(query);
    });
}
