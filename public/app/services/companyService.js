angular.module('companyService', [])

.factory('Company', function ($http) {
  // create factory object
  var companyFactory = {};

  companyFactory.get = function (id) {
    return $http.get('/api/companies/' + id);
  };

  companyFactory.all = function () {
    return $http.get('/api/companies/');
  };

  companyFactory.create = function () {
    return $http.post('/api/companies');
  };

  companyFactory.update = function (id, companyData) {
    return $http.put('/api/companies/' + id, companyData);
  };

  companyFactory.delete = function (id) {
    return $http.delete('/api/companies/' + id);
  };

  return companyFactory;
});