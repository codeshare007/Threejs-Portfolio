(function () {
  'use strict';

  angular.module('app.objects').factory('backgroundService', backgroundService);

  function backgroundService() {

    var service = {
      drawObject: drawObject
    };

    return service

    function drawObject(scene, camera) {
      var background = new THREE.Object3D();
      var backPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(300, 200), new THREE.MeshPhongMaterial({
        color: 0x6f4e37
      }));
      var sidePlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(300, 200), new THREE.MeshPhongMaterial({
        color: 0x6f4e37
      }));
      var bottomPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(300, 300), new THREE.MeshPhongMaterial({
        color: 0x6f4e37
      }));
      background.add(backPlane);


      backPlane.position.z = -45;
      backPlane.position.y = -60 + backPlane.geometry.parameters.height / 2;
      backPlane.position.x = 70 - backPlane.geometry.parameters.width / 2;

      background.add(sidePlane);
      sidePlane.rotation.y = -Math.PI / 2;
      sidePlane.position.z = -45 + sidePlane.geometry.parameters.width / 2;
      sidePlane.position.y = -60 + sidePlane.geometry.parameters.height / 2;
      sidePlane.position.x = 70;


      background.add(bottomPlane);
      bottomPlane.rotation.x = -Math.PI / 2;
      bottomPlane.position.z = -45 + bottomPlane.geometry.parameters.height / 2;
      bottomPlane.position.y = -60;
      bottomPlane.position.x = 70 - bottomPlane.geometry.parameters.width / 2;


      background.children.forEach(function (element) {
        element.castShadow = false;
        element.receiveShadow = false;
      });


      return background
    }
  }
})();
