//const _axios = axios.create();

import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

// let client = null;

const configure = () => {
  /*client = new ApolloClient({
    uri: 'https://www.warcraftlogs.com/api/client',
    cache: new InMemoryCache()
  });*/
}

const getClient = (token) => {
  const httpLink = createHttpLink({
    uri: 'https://www.warcraftlogs.com/api/client',
  });

  const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
};

export default {
  configure,
  getClient
}