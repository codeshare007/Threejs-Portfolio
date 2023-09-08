(function () {
  'use strict';

  angular.module('app.objects').factory('phoneService', phoneService);

  phoneService.$inject = ['drawService', '$q'];

  function phoneService(drawService, $q) {

    var service = {
      drawObject: drawObject
    };

    return service

    function drawObject(scene, camera, x, y, z, objRotation, color) {

      var phone = new THREE.Object3D();
      phone.objectWidth = 7.7;
      phone.objectHeight = 15.7;
      phone.objectThickness = 0.7;

      phone.screen = new Object;
      phone.screen.distance = 0.36;
      phone.screen.height = 12;
      phone.screen.width = 6.75;

      var phoneShape = new THREE.Shape();
      drawService.createRoundedRectangle(phoneShape, phone.objectWidth - phone.objectThickness, phone.objectHeight - phone.objectThickness, 0.8);
      var phoneExtrudeSettings = {
        steps: 2,
        amount: 0,
        bevelEnabled: true,
        bevelThickness: 0.35,
        bevelSize: 0.35,
        bevelSegments: 30
      }
      var phoneGeometry = new THREE.ExtrudeGeometry(phoneShape, phoneExtrudeSettings)
      var phoneMaterial = new THREE.MeshPhongMaterial({
        color: color
      });
      var phoneMesh = new THREE.Mesh(phoneGeometry, phoneMaterial);

      var phoneScreen = new THREE.Mesh(new THREE.PlaneBufferGeometry(6.75, 12.00), new THREE.MeshPhongMaterial({
        color: 0x151515,
        side: THREE.DoubleSide,
        shininess: 30
      }))
      var phoneButton = new THREE.Mesh(new THREE.CircleGeometry(0.55, 32), new THREE.MeshPhongMaterial({
        side: THREE.FrontSide,
        color: 0x1d1d1d,
        opacity: 0.35,
        transparent: true
      }))
      var phoneButton2 = new THREE.Mesh(new THREE.CircleGeometry(0.48, 32), new THREE.MeshPhongMaterial({
        color: color,
        side: THREE.FrontSide
      }))
      var phoneSpeaker = new THREE.Mesh(new THREE.CircleGeometry(0.1, 32), new THREE.MeshPhongMaterial({
        color: 0x373a3c,
        side: THREE.FrontSide
      }))
      var phoneCamera = new THREE.Mesh(new THREE.CircleGeometry(0.15, 32), new THREE.MeshPhongMaterial({
        color: 0x373a3c,
        side: THREE.FrontSide
      }))
      var phoneSpeakerShape = new THREE.Shape();
      drawService.createRoundedRectangle(phoneSpeakerShape, 1.2, 0.14, 0.07);
      var phoneSpeakerGeometry = new THREE.ShapeGeometry(phoneSpeakerShape);
      var phoneSpeakerMaterial = new THREE.MeshPhongMaterial({
        color: 0x1d1d1d,
        opacity: 0.7,
        transparent: true
      });
      var phoneSpeakerMesh = new THREE.Mesh(phoneSpeakerGeometry, phoneSpeakerMaterial);

      phoneScreen.position.z = 0.36;
      phoneButton.position.z = 0.36;
      phoneSpeaker.position.z = 0.36;
      phoneSpeakerMesh.position.z = 0.36;
      phoneCamera.position.z = 0.36;
      phoneButton2.position.z = 0.37;
      phoneButton.position.y = -6.75;
      phoneButton2.position.y = -6.75;
      phoneCamera.position.x = -1;
      phoneCamera.position.y = 6.75;
      phoneSpeaker.position.y = 7.15;
      phoneSpeakerMesh.position.y = 6.75;

      var hoverBox = new THREE.Mesh(new THREE.BoxBufferGeometry(7.7, 15.7, 5),
        new THREE.MeshBasicMaterial({
          color: 0x248f24,
          alphaTest: 0,
          visible: false
        }));
      hoverBox.position.z = -2.1;

      phone.rayReceiver = hoverBox;

      phone.add(hoverBox);
      phone.add(phoneMesh);
      phone.add(phoneScreen);
      phone.add(phoneButton);
      phone.add(phoneButton2);
      phone.add(phoneCamera);
      phone.add(phoneSpeaker);
      phone.add(phoneSpeakerMesh);

      phone.children.forEach(function (element) {
        element.receiveShadow = false;
        element.castShadow = true;
        element.ancestor = phone;
      });

      hoverBox.receiveShadow = false;
      hoverBox.castShadow = false;

      phone.defaultPosition = new THREE.Vector3(x, y + 0.35, z);
      phone.defaultRotation = new THREE.Euler(-Math.PI / 2, 0, objRotation * Math.PI / 180, 'XYZ');
      phone.hoverDestinationPosition = new THREE.Vector3(x, y + 5.35, z);
      phone.hoverDestinationRotation = new THREE.Euler(-Math.PI / 2.2, 0, objRotation * Math.PI / 180, 'XYZ');
      phone.position.set(x, y + 0.35, z);
      phone.rotation.set(-Math.PI / 2, 0, objRotation * Math.PI / 180, 'XYZ');

      phone.bringToFront = function () {
        var defer = $q.defer();

        drawService.defaultBringToFront(phone, scene, camera, 1).then(function (res) {
          defer.resolve({
            width: res.width,
            height: res.height,
            calculatedScale: res.calculatedScale / 667
          });
        });
        return defer.promise
      }

      phone.bringBack = function () {
        var defer = $q.defer();
        drawService.defaultBringBack(phone, scene, camera, 1).then(function () {
          defer.resolve();
        });
        return defer.promise
      }

      phone.handleObjectHover = function () {
        drawService.defaultHoverTween(phone, scene, camera, 1);
      }



      phone.class = 'dynamic';
      phone.name = 'phone';

      return phone
    }
  }
})();
