export default () => ({
  nodes: {
    list: [
      {
        url: 'https://thawing-springs-53971.herokuapp.com',
        online: false,
        name: 'Node 1',
        loading: false
      },
      {
        url: 'https://secret-lowlands-62331.herokuapp.com',
        online: false,
        name: 'Node 2',
        loading: false
      },
      {
        url: 'https://calm-anchorage-82141.herokuapp.com',
        online: false,
        name: 'Node 3',
        loading: false
      },
      {
        url: 'http://localhost:3002',
        online: false,
        name: 'Node 4',
        loading: false
      }
    ]
  },
  blocks: {
    "https://thawing-springs-53971.herokuapp.com": {
      loading: false,
      error: false,
      list: [],
    },
    "https://secret-lowlands-62331.herokuapp.com": {
      loading: false,
      error: false,
      list: [],
    },
    "https://calm-anchorage-82141.herokuapp.com": {
      loading: false,
      error: false,
      list: [],
    },
    "http://localhost:3002": {
      loading: false,
      error: false,
      list: [],
    },
  },
});
