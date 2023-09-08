(function () {
  'use strict';

  angular.module('app.objects').factory('mouseService', mouseService);

  mouseService.$inject = ['drawService'];

  function mouseService(drawService) {

    var service = {
      drawObject: drawObject
    };

    return service

    function drawObject(x, y, z, objRotation) {
      var mouseMaterial = new THREE.MeshPhongMaterial({
        color: 0xcbced5
      });

      var mouse = new THREE.Object3D();

      var loader = new THREE.BufferGeometryLoader();
      loader.load('mouse.json', function (geometry) {
        geometry.computeVertexNormals();
        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
          color: 0xffffff
        }));
        mesh.scale.set(4.5, 4.5, 4.5);
        mesh.rotation.y = Math.PI / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.ancestor = mouse;
        mouse.add(mesh);
      });

      mouse.position.set(x, y - 1.5, z);

      mouse.rotation.set(0, objRotation * Math.PI / 180, 0);

      mouse.name = 'mouse';

      return mouse
    }
  }
})();
