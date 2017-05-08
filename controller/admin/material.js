controllers.controller('AdminMaterialController', function (
  $scope, $localStorage, $state, $stateParams, $modal, $rootScope, md5,
  jwtHelper, DataFactory, TokenService, toastr) {

  var GetData = function () {
    DataFactory.Get('?action=all_material', 'admin').success(function (response) {
      if (response.status == "OK") {
        $scope.content = response.data;
      }
    })
  }

  $scope.addModal = function () {
    $scope.$modalInstance = $modal.open({
      scope: $scope,
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'button-add-modal.html',
      controller: 'AdminMaterialController',
      size: 'lg'
    })
    $scope.cancel = function () {
      $scope.$modalInstance.dismiss('cancel');
    };
  }

  $scope.save = function (input) {
    var json = JSON.stringify(input);
    DataFactory.Post(json, '?action=add_material', 'admin').success(function (response) {
      if (response.status == "OK") {
        $scope.$modalInstance.dismiss('cancel');
        toastr.success(response.message);
        GetData();
      }
    });
  }

  $scope.editModal = function (id) {
    $scope.id_detail = id;
    DataFactory.Get('?action=detail_material&id=' + $scope.id_detail, 'admin').success(function (response) {
      if (response.status == "OK") {
        $scope.detail = response.data;
        $scope.$modalInstance = $modal.open({
          scope: $scope,
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'button-edit-modal.html',
          controller: 'AdminMaterialController',
          size: 'lg'
        })
        $scope.cancel = function () {
          $scope.$modalInstance.dismiss('cancel');
        };

      }
    })
  }

  $scope.edit = function (input) {
    var data = { "name": input.name, "total": input.total, "id": $scope.id_detail };
    var json = JSON.stringify(data);
    DataFactory.Put(json, '?action=update_material', 'admin').success(function (response) {
      if (response.status == "OK") {
        $scope.$modalInstance.dismiss('cancel');
        toastr.success(response.message);
        GetData();
      }
    });
  }

  $scope.deleteModal = function (id) {
    $scope.id_delete = id;
    $scope.$modalInstance = $modal.open({
      scope: $scope,
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'button-delete-modal.html',
      controller: 'AdminMaterialController',
      size: 'lg'
    })
    $scope.cancel = function () {
      $scope.$modalInstance.dismiss('cancel');
    };

  }

  $scope.delete = function () {
    DataFactory.Get('?action=delete_material&id=' + $scope.id_delete, 'admin').success(function (response) {
      if (response.status == "OK") {
        $scope.$modalInstance.dismiss('cancel');
        GetData();
        toastr.success(response.message);
      }
    })
  }

  if ($state.current.name === "admin.material") {
    
    GetData();
  }

})
