export const formatRequest = {
  methods: {
    formatRequest(query) {
      var params = {};

      for (let field in query) {

        if (Array.isArray(query[field])) {
          if (query[field].length > 0) {
            params[field] = query[field].join(",");
          } else {
            params[field] = null;
          }
        } else {
          params[field] = query[field];
        }
      }

      var request = {
        ...params
      };

      return {
        params: request,
      };
    }
  },
}