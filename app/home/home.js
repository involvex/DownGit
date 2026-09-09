/***********************************************************
 * Developer: Minhas Kamal (minhaskamal024@gmail.com)       *
 * Website: https://involvex.github.io/DownGit              *
 * License: MIT License                                     *
 ***********************************************************/

var homeModule = angular.module("homeModule", ["ngRoute", "downGitModule"]);

homeModule.config([
  "$routeProvider",

  function ($routeProvider) {
    $routeProvider.when("/home", {
      templateUrl: "app/home/home.html",
      controller: [
        "$scope",
        "$routeParams",
        "$location",
        "toastr",
        "downGitService",

        function ($scope, $routeParams, $location, toastr, downGitService) {
          $scope.downUrl = "";
          $scope.url = "";
          $scope.isProcessing = { val: false };
          $scope.downloadedFiles = { val: 0 };
          $scope.totalFiles = { val: 0 };

          var templateUrl = "https?://github.com/.+/.+";
          var downloadUrlInfix = "#/home?url=";
          var downloadUrlPrefix =
            "https://involvex.github.io/DownGit/" + downloadUrlInfix;

          if ($routeParams.url) {
            $scope.url = $routeParams.url;
          }

          if ($scope.url.match(templateUrl)) {
            var parameter = {
              url: $routeParams.url,
              fileName: $routeParams.fileName,
              rootDirectory: $routeParams.rootDirectory,
            };
            var progress = {
              isProcessing: $scope.isProcessing,
              downloadedFiles: $scope.downloadedFiles,
              totalFiles: $scope.totalFiles,
            };
            downGitService.downloadZippedFiles(parameter, progress, toastr);
          } else if ($scope.url != "") {
            toastr.warning("Invalid URL!", { iconClass: "toast-down" });
          }

          $scope.catchEnter = function (keyEvent) {
            if (keyEvent.which == 13) {
              $scope.download();
            }
          };

          $scope.createDownLink = function () {
            $scope.downUrl = "";

            if (!$scope.url) {
              return;
            }

            if ($scope.url.match(templateUrl)) {
              $scope.downUrl = downloadUrlPrefix + $scope.url;
            } else {
              toastr.warning("Invalid URL!", { iconClass: "toast-down" });
            }
          };

          $scope.download = function () {
            window.location = downloadUrlInfix + $scope.url;
          };

          $scope.githubToken = localStorage.getItem("githubToken") || "";
          $scope.tokenHidden = true;

          $scope.toggleTokenVisibility = function () {
            $scope.tokenHidden = !$scope.tokenHidden;
          };

          $scope.saveToken = function () {
            localStorage.setItem("githubToken", $scope.githubToken);
          };

          $scope.clearCache = function () {
            localStorage.clear();
            sessionStorage.clear();

            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
              var cookie = cookies[i];
              var eqPos = cookie.indexOf("=");
              var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
              name = name.trim();
              document.cookie =
                name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            }

            $scope.url = "";
            $scope.downUrl = "";
            $scope.githubToken = "";

            toastr.success("Cache and cookies cleared.", {
              iconClass: "toast-down",
            });
          };
        },
      ],
    });
  },
]);
