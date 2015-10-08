angular.module('themeeditor', ['colorpicker.module']);

angular.module('themeeditor').directive('pixelSizePicker', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elt, attrs, ctrl){
            ctrl.$parsers.push(function(v){
                return v + 'px';
            });
            ctrl.$formatters.push(function(v){
                if (v && v.substring(v.length - 2) === 'px') {
                    return parseInt(v.substring(0, v.length - 2));
                }
                return v;
            });
        }
    }

});


angular.module('themeeditor').directive('themeEditor', function($log) {
    return {
        restrict: 'EA',
        scope: {
            theme: '='
        },
        template: '<div class="theme-editor">' +
        '<div ng-repeat="prop in theme" class="row">' +
        '   <div class="col-lg-4">{{ prop.label }}</div>' +
        '   <div class="col-lg-6">' +
        '       <div class="input-group" ng-if="prop.type === \'color\'">' +
        '           <input colorpicker="{{prop.colorType}}" class="form-control" ng-model="prop.value" type="text"/>' +
        '           <span class="input-group-addon" ng-style="{\'background-color\': prop.value}">&nbsp;</span>' +
        '       </div>' +
        '       <div class="input-group" ng-if="prop.type === \'size\'">' +
        '           <input pixel-size-picker ng-model="prop.value" type="number" class="form-control" />' +
        '           <span class="input-group-addon">px</span>' +
        '       </div>' +
        '   </div>' +
        '</div>' +
        '<div class="actions"><a class="btn btn-primary" ng-click="apply()">apply</a></div>' +
        '</div>',
        link: function(scope, elt, attrs){

            scope.apply = function(){
                var variables = _.reduce(scope.theme, function(res, th){
                    if (th.value) {
                        res[th.variable] = th.value;
                    }
                    return res;
                }, {});

                $log.info('Setting theme variables', variables);
                less.modifyVars(variables);
            };


        }

    }
});
