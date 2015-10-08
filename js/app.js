angular.module('themeeditor.demo', ['themeeditor'])
    .controller('MainCtrl', function($scope){
        $scope.theme = [
            { label: 'Color 1', variable: '@colorVar1', value: '#ff0000', type: 'color'},
            { label: 'Color 2', variable: '@colorVar2', value: '#00ff00', type: 'color', colorType: 'rgba'},
            { label: 'Header height', variable: '@headerHeight', value: '40px', type: 'size'}
        ];
    })
