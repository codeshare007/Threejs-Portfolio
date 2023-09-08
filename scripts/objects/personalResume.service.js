(function () {
  'use strict';

  angular.module('app.objects').factory('personalResumeService', personalResumeService);

  personalResumeService.$inject = ['drawService', '$q'];

  function personalResumeService(drawService, $q) {

    var service = {
      drawObject: drawObject
    };

    return service

    function drawObject(scene, camera, x, y, z, objRotation) {

      var personalResume = new THREE.Object3D();
      personalResume.objectWidth = 21;
      personalResume.objectHeight = 29.7;
      personalResume.objectThickness = 0.1;

      var personalResumeTextureFirst = new THREE.TextureLoader().load('images/CV.jpg');

      personalResumeTextureFirst.magFilter = THREE.NearestFilter;
      personalResumeTextureFirst.minFilter = THREE.LinearMipMapLinearFilter;
      personalResumeTextureFirst.wrapS = THREE.RepeatWrapping;
      personalResumeTextureFirst.wrapT = THREE.RepeatWrapping;
      personalResumeTextureFirst.repeat.set(0.70703125, 1 / 3);
      personalResumeTextureFirst.offset.y = 2 / 3;
      personalResumeTextureFirst.offset.x = (1 - 0.70703125) / 2;

      var personalResumeTextureSecond = new THREE.TextureLoader().load('images/CV.jpg');

      personalResumeTextureSecond.magFilter = THREE.NearestFilter;
      personalResumeTextureSecond.minFilter = THREE.LinearMipMapLinearFilter;
      personalResumeTextureSecond.wrapS = THREE.RepeatWrapping;
      personalResumeTextureSecond.wrapT = THREE.RepeatWrapping;
      personalResumeTextureSecond.repeat.set(0.70703125, 1 / 3);
      personalResumeTextureSecond.offset.y = 1 / 3;
      personalResumeTextureSecond.offset.x = (1 - 0.70703125) / 2;

      var personalResumeTextureThird = new THREE.TextureLoader().load('images/CV.jpg');

      personalResumeTextureThird.magFilter = THREE.NearestFilter;
      personalResumeTextureThird.minFilter = THREE.LinearMipMapLinearFilter;
      personalResumeTextureThird.wrapS = THREE.RepeatWrapping;
      personalResumeTextureThird.wrapT = THREE.RepeatWrapping;
      personalResumeTextureThird.repeat.set(0.70703125, 1 / 3);
      personalResumeTextureThird.offset.y = 0;
      personalResumeTextureThird.offset.x = (1 - 0.70703125) / 2;


      var personalResumeFirst = new THREE.Mesh(new THREE.BoxBufferGeometry(21, 9.9, 0.1), new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 0,
        map: personalResumeTextureFirst
      }));

      var personalResumeSecond = new THREE.Mesh(new THREE.BoxBufferGeometry(21, 9.9, 0.1), new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 0,
        map: personalResumeTextureSecond
      }));
      var personalResumeThird = new THREE.Mesh(new THREE.BoxBufferGeometry(21, 9.9, 0.1), new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 0,
        map: personalResumeTextureThird
      }));

      var hoverBox = new THREE.Mesh(new THREE.BoxBufferGeometry(21, 29.7, 5),
        new THREE.MeshBasicMaterial({
          color: 0x248f24,
          alphaTest: 0,
          visible: false
        }));
      hoverBox.position.z = -4.9;

      personalResume.add(hoverBox);
      personalResume.add(personalResumeFirst);
      personalResume.add(personalResumeSecond);
      personalResume.add(personalResumeThird);

      personalResume.rayReceiver = [];
      personalResume.rayReceiver.push(personalResumeFirst);
      personalResume.rayReceiver.push(personalResumeSecond);
      personalResume.rayReceiver.push(personalResumeThird);

      personalResume.parts = [personalResumeFirst, personalResumeSecond, personalResumeThird];

      personalResumeFirst.defaultPosition = new THREE.Vector3(0, 9.9 - (Math.cos(Math.PI / 180 * 75) * Math.cos(Math.PI / 180 * 75) * 9.9 * 2), 0);
      personalResumeFirst.defaultRotation = new THREE.Euler(Math.PI / 6, 0, 0, 'XYZ');
      personalResumeFirst.destinationPosition = new THREE.Vector3(0, 9.9, 0);
      personalResumeFirst.destinationRotation = new THREE.Euler(0, 0, 0, 'XYZ');
      personalResumeFirst.hoverDestinationPosition = new THREE.Vector3(0, 9.9 - (Math.cos(Math.PI / 180 * 82.5) * Math.cos(Math.PI / 180 * 82.5) * 9.9 * 2), 0);
      personalResumeFirst.hoverDestinationRotation = new THREE.Euler(Math.PI / 12, 0, 0, 'XYZ');
      personalResumeFirst.position.set(0, 9.9 - (Math.cos(Math.PI / 180 * 75) * Math.cos(Math.PI / 180 * 75) * 9.9 * 2), 0);
      personalResumeFirst.rotation.set(Math.PI / 6, 0, 0, 'XYZ');

      personalResumeSecond.defaultPosition = new THREE.Vector3(0, 0, 0);
      personalResumeSecond.defaultRotation = new THREE.Euler(-Math.PI / 6, 0, 0, 'XYZ');
      personalResumeSecond.destinationPosition = new THREE.Vector3(0, 0, 0);
      personalResumeSecond.destinationRotation = new THREE.Euler(0, 0, 0, 'XYZ');
      personalResumeSecond.hoverDestinationPosition = new THREE.Vector3(0, 0, 0);
      personalResumeSecond.hoverDestinationRotation = new THREE.Euler(-Math.PI / 12, 0, 0, 'XYZ');
      personalResumeSecond.position.set(0, 0, 0);
      personalResumeSecond.rotation.set(-Math.PI / 6, 0, 0, 'XYZ');

      personalResumeThird.defaultPosition = new THREE.Vector3(0, -9.9 + (Math.cos(Math.PI / 180 * 75) * Math.cos(Math.PI / 180 * 75) * 9.9 * 2), 0);
      personalResumeThird.defaultRotation = new THREE.Euler(Math.PI / 6, 0, 0, 'XYZ');
      personalResumeThird.destinationPosition = new THREE.Vector3(0, -9.9, 0);
      personalResumeThird.destinationRotation = new THREE.Euler(0, 0, 0, 'XYZ');
      personalResumeThird.hoverDestinationPosition = new THREE.Vector3(0, -9.9 + (Math.cos(Math.PI / 180 * 82.5) * Math.cos(Math.PI / 180 * 82.5) * 9.9 * 2), 0);
      personalResumeThird.hoverDestinationRotation = new THREE.Euler(Math.PI / 12, 0, 0, 'XYZ');
      personalResumeThird.position.set(0, -9.9 + (Math.cos(Math.PI / 180 * 75) * Math.cos(Math.PI / 180 * 75) * 9.9 * 2), 0);
      personalResumeThird.rotation.set(Math.PI / 6, 0, 0, 'XYZ');

      personalResume.defaultPosition = new THREE.Vector3(x, y + Math.sin(Math.PI / 6) * 9.9 / 2, z);
      personalResume.defaultRotation = new THREE.Euler(-Math.PI / 2, 0, objRotation * Math.PI / 180, 'XYZ');
      personalResume.hoverDestinationPosition = new THREE.Vector3(x, y + Math.sin(Math.PI / 6) * 9.9 / 2 + 5, z);
      personalResume.hoverDestinationRotation = new THREE.Euler(-Math.PI / 2.2, 0, objRotation * Math.PI / 180, 'XYZ');
      personalResume.position.set(x, y + Math.sin(Math.PI / 6) * 9.9 / 2, z);
      personalResume.rotation.set(-Math.PI / 2, 0, objRotation * Math.PI / 180, 'XYZ');

      personalResume.children.forEach(function (element) {
        element.receiveShadow = false;
        element.castShadow = true;
        element.ancestor = personalResume;
      });

      hoverBox.receiveShadow = false;
      hoverBox.castShadow = false;

      personalResume.screen = new Object;
      personalResume.distanceX = 22;
      personalResume.distanceY = 22;
      personalResume.distanceZ = 22;
      personalResume.screen.distance = 0.05;
      personalResume.screen.height = 29.7;
      personalResume.screen.width = 21;

      personalResume.bringToFront = function () {
        var defer = $q.defer();
        drawService.defaultBringToFront(personalResume, scene, camera, 1).then(function (res) {
          defer.resolve({
            width: res.width,
            height: res.height,
            calculatedScale: res.calculatedScale
          });
        });
        return defer.promise
      }

      personalResume.bringBack = function () {
        var defer = $q.defer();
        drawService.defaultBringBack(personalResume, scene, camera, 1).then(function () {
          defer.resolve();
        });
        return defer.promise
      }

      personalResume.handleObjectHover = function () {
        drawService.defaultHoverTween(personalResume, scene, camera, 1);
      }

      personalResume.class = 'dynamic';
      personalResume.name = 'personalResume';

      return personalResume
    }
  }
})();
