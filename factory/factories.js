factories.factory('DataFactory', function ($http, api, $rootScope, $localStorage) {
  var data = {};
  var setHeader = function () {
    var text = $localStorage.app_token;
    var headers = {
      headers: {
        'app_token': text
      }
    };
    return headers;
  }

  data.Post = function (datas, url, role) {
    if (role == undefined) {
      return $http.post(api + url, datas);
    } else {
      if (role == 'admin') {
        return $http.post(api + url, datas, setHeader());
      }
    }
  };
  data.Get = function (url, role) {
    if (role == undefined) {
      return $http.get(api + url);
    } else {
      if (role == 'admin') {
        return $http.get(api + url, setHeader());
      }
    }
  };

  data.Put = function (datas, url, role) {
    if (role == undefined) {
      return $http.put(api + url, datas);
    } else {
      if (role == 'admin') {
        return $http.put(api + url, datas, setHeader());
      }
    }
  };

  data.Delete = function (url, role) {
    if (role == undefined) {
      return $http.delete(api + url);
    } else {
      if (role == 'admin') {
        return $http.delete(api + url, setHeader());
      }
    }
  };

  return data;

})
