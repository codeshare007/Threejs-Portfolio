(function () {
  'use strict';

  angular.module('app.objects').factory('businessCardService', businessCardService);

  businessCardService.$inject = ['drawService', '$q'];

  function businessCardService(drawService, $q) {

    var service = {
      drawObject: drawObject,
      drawObjectStock: drawObjectStock
    };

    return service

    function drawObjectStock(x, y, z) {
      var businessCardStock = new THREE.Object3D();
      var businessCardTexture = new THREE.TextureLoader().load('images/businesscard.jpg');
      businessCardTexture.magFilter = THREE.NearestFilter;
      businessCardTexture.minFilter = THREE.LinearMipMapLinearFilter;
      businessCardTexture.wrapS = THREE.RepeatWrapping;
      businessCardTexture.wrapT = THREE.RepeatWrapping;
      businessCardTexture.repeat.set(0.9, 1);
      businessCardTexture.offset.x = 0.05;

      for (var i = 0; i <= 25; i++) {
        var value = (Math.random() / 4 + 0.75) * 0xec | 0;
        var grayscale = (value << 16) | (value << 8) | value;
        var color = '#' + grayscale.toString(16);
        if (i == 25) {
          var object = new THREE.Mesh(new THREE.BoxBufferGeometry(9, 5, 0.1), new THREE.MeshPhongMaterial({
            color: 0xecf0f1,
            side: THREE.FrontSide,
            map: businessCardTexture,
            shininess: 0,
            shading: THREE.SmoothShading
          }));
          object.position.y = 2.5;
          object.rotation.x = -Math.PI / 2;
          object.rotation.z = -Math.PI / 2;
          object.receiveShadow = true;
          object.castShadow = true;
        } else {
          var object = new THREE.Mesh(new THREE.BoxBufferGeometry(9, 5, 0.1), new THREE.MeshPhongMaterial({
            color: color,
            side: THREE.FrontSide,
            map: businessCardTexture,
            shininess: 0,
            shading: THREE.SmoothShading
          }));
          object.position.y = i * 0.1;
          object.rotation.x = -Math.PI / 2;
          object.rotation.z = Math.random() * Math.PI / 180 - Math.PI / 2;
          object.receiveShadow = true;
          object.castShadow = true;
        }
        object.ancestor = businessCardStock;
        businessCardStock.add(object);
      }

      businessCardStock.rotation.y = Math.PI / 2;
      businessCardStock.position.set(x, y, z);
      businessCardStock.name = 'businessCardStock';

      return businessCardStock
    }

    function drawObject(scene, camera, x, y, z, objRotation) {

      var businessCardObject = new THREE.Object3D();

      businessCardObject.objectWidth = 9;
      businessCardObject.objectHeight = 5;
      businessCardObject.objectThickness = 0.1;

      businessCardObject.fillPercentage = 0.7;

      var businessCardTexture = new THREE.TextureLoader().load('images/businesscard.jpg');
      businessCardTexture.magFilter = THREE.NearestFilter;
      businessCardTexture.minFilter = THREE.LinearMipMapLinearFilter;

      businessCardTexture.wrapS = THREE.RepeatWrapping;
      businessCardTexture.wrapT = THREE.RepeatWrapping;
      businessCardTexture.repeat.set(0.9, 1);
      businessCardTexture.offset.x = 0.05;

      var businessCard = new THREE.Mesh(new THREE.BoxBufferGeometry(9, 5, 0.1), new THREE.MeshPhongMaterial({
        color: 0xecf0f1,
        map: businessCardTexture,
        shininess: 0,
        shading: THREE.SmoothShading
      }));

      var hoverBox = new THREE.Mesh(new THREE.BoxBufferGeometry(9, 5, 5),
        new THREE.MeshBasicMaterial({
          color: 0x248f24,
          alphaTest: 0,
          visible: false
        }));
      hoverBox.position.z = -2.1;

      businessCardObject.add(hoverBox);
      businessCardObject.add(businessCard);

      businessCardObject.children.forEach(function (element) {
        element.receiveShadow = true;
        element.castShadow = true;
        element.ancestor = businessCardObject;
      });

      hoverBox.receiveShadow = false;
      hoverBox.castShadow = false;


      businessCardObject.defaultRotation = new THREE.Euler(objRotation * -Math.PI / 180, 0, 0, 'XYZ');
      businessCardObject.defaultPosition = new THREE.Vector3(x, 2.5 * Math.cos(businessCardObject.defaultRotation.x) + y, z + 5 - (2.5 * Math.cos(businessCardObject.defaultRotation.x)));

      businessCardObject.hoverDestinationRotation = new THREE.Euler(-Math.PI / 2.5, 0, 0, 'XYZ');
      businessCardObject.hoverDestinationPosition = new THREE.Vector3(x, 2.5 * Math.cos(businessCardObject.defaultRotation.x) + 5 + y, z + 5 - (2.5 * Math.cos(businessCardObject.defaultRotation.x)));

      businessCardObject.rotation.set(businessCardObject.defaultRotation.x, 0, 0, 'XYZ');
      businessCardObject.position.set(x, 2.5 * Math.cos(businessCardObject.defaultRotation.x) + y, z + 5 - (2.5 * Math.cos(businessCardObject.defaultRotation.x)));

      businessCardObject.screen = new Object;
      businessCardObject.screen.distance = 0.05;
      businessCardObject.screen.height = 5;
      businessCardObject.screen.width = 9;

      businessCardObject.bringToFront = function () {
        var defer = $q.defer();
        drawService.defaultBringToFront(businessCardObject, scene, camera, 1).then(function (res) {
          defer.resolve({
            width: res.width,
            height: res.height,
            calculatedScale: res.calculatedScale
          });
        });
        return defer.promise
      }

      businessCardObject.bringBack = function () {
        var defer = $q.defer();
        drawService.defaultBringBack(businessCardObject, scene, camera, 1).then(function () {
          defer.resolve();
        });
        return defer.promise
      }

      businessCardObject.handleObjectHover = function () {
        drawService.defaultHoverTween(businessCardObject, scene, camera, 1);
      }

      businessCardObject.class = 'dynamic';
      businessCardObject.name = 'businessCard';

      businessCardObject.rayReceiver = hoverBox;

      return businessCardObject
    }
  }
})();
