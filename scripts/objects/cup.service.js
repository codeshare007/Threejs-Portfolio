(function () {
  'use strict';

  angular.module('app.objects').factory('cupService', cupService);

  cupService.$inject = ['drawService'];

  function cupService(drawService) {

    var service = {
      drawObject: drawObject
    };

    return service

    function drawObject(x, y, z, objRotation) {
      var cupMeshPoints = [];
      cupMeshPoints.push(new THREE.Vector2(-3.5, 0));
      cupMeshPoints.push(new THREE.Vector2(-4, 0));
      cupMeshPoints.push(new THREE.Vector2(-4, 9));
      cupMeshPoints.push(new THREE.Vector2(-3.5, 9));

      var cupMeshGeometry = new THREE.LatheGeometry(cupMeshPoints, 100);
      var cupMeshMaterial = new THREE.MeshPhongMaterial({
        color: 0xecf0f1,
        side: THREE.DoubleSide
      });
      var cupMesh = new THREE.Mesh(cupMeshGeometry, cupMeshMaterial);

      var coffeeMeshGeometry = new THREE.CylinderGeometry(3.6, 3.6, 6, 100);
      var coffeeMeshMaterial = new THREE.MeshPhongMaterial({
        color: 0x9E8F7E
      });
      var coffeeMesh = new THREE.Mesh(coffeeMeshGeometry, coffeeMeshMaterial);
      coffeeMesh.position.y = 4.5;

      function cupHandleCurve(scale) {
        this.scale = (scale === undefined) ? 1 : scale;
      }

      cupHandleCurve.prototype = Object.create(THREE.Curve.prototype);
      cupHandleCurve.prototype.constructor = cupHandleCurve;
      cupHandleCurve.prototype.getPoint = function (t) {
        var tx = Math.sin(1 * Math.PI * t - (Math.PI / 16)) - 0.1;
        var ty = 1.5 * t - 1;
        var tz = 0;
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
      };

      var cupHandlePath = new cupHandleCurve(3);

      var cupHandleGeometry = new THREE.TubeGeometry(cupHandlePath, 100, 0.5, 100, false);
      var cupHandleMaterial = new THREE.MeshPhongMaterial({
        color: 0xecf0f1
      });
      var cupHandleMesh = new THREE.Mesh(cupHandleGeometry, cupHandleMaterial);
      cupHandleMesh.rotation.z += Math.PI / 13;
      cupHandleMesh.position.x = 3.6;
      cupHandleMesh.position.y = 5.3;

      var cup = new THREE.Object3D();
      cup.add(cupMesh);
      cup.add(coffeeMesh);
      cup.add(cupHandleMesh);

      cup.rotation.set(0, objRotation * Math.PI / 180, 0, 'XYZ');
      cup.position.set(x, y, z);

      cup.children.forEach(function (element) {
        element.receiveShadow = true;
        element.castShadow = true;
        element.ancestor = cup;
      });

      cup.name = 'cup';

      return cup
    }


  }
})();
