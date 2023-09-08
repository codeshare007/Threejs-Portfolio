(function () {
  'use strict';

  angular.module('app.objects').factory('postCardService', postCardService);

  postCardService.$inject = ['drawService', '$q'];

  function postCardService(drawService, $q) {

    var service = {
      drawObject: drawObject,
      drawObjectStock: drawObjectStock
    };

    return service

    function drawObjectStock(x, y, z, objRotation) {
      var postCardStock = new THREE.Object3D();
      var postCardTexture = new THREE.TextureLoader().load('images/postcard.jpg');
      postCardTexture.magFilter = THREE.NearestFilter;
      postCardTexture.minFilter = THREE.LinearMipMapLinearFilter;
      postCardTexture.wrapS = THREE.RepeatWrapping;
      postCardTexture.wrapT = THREE.RepeatWrapping;
      postCardTexture.repeat.set(1, 0.703125);
      postCardTexture.offset.y = (1 - 0.703125) / 2;


      for (var i = 0; i <= 5; i++) {
        var value = (Math.random() / 10 + 0.9) * 0xec | 0;
        var grayscale = (value << 16) | (value << 8) | value;
        var color = '#' + grayscale.toString(16);
        if (i == 5) {
          var object = new THREE.Mesh(new THREE.BoxBufferGeometry(16.2, 11.4, 0.2), new THREE.MeshPhongMaterial({
            color: 0xecf0f1,
            map: postCardTexture,
            side: THREE.FrontSide,
            shininess: 0,
            shading: THREE.SmoothShading
          }));
          object.position.y = 1;
          object.rotation.x = -Math.PI / 2;
          object.rotation.z = Math.PI / 32 + (objRotation * Math.PI / 180);
        } else {
          var object = new THREE.Mesh(new THREE.BoxBufferGeometry(16.2, 11.4, 0.2), new THREE.MeshPhongMaterial({
            color: color,
            side: THREE.FrontSide,
            map: postCardTexture,
            shininess: 0,
            shading: THREE.SmoothShading
          }));
          object.position.y = i * 0.2;
          object.rotation.x = -Math.PI / 2;
          object.rotation.z = Math.random() * Math.PI / 32 + (objRotation * Math.PI / 180);
        }
        object.receiveShadow = true;
        object.castShadow = true;
        postCardStock.add(object);
        object.ancestor = postCardStock;
      }

      postCardStock.position.set(x, y, z);
      postCardStock.name = 'postCardStock';

      return postCardStock
    }

    function drawObject(scene, camera, x, y, z, objRotation) {

      var postCardObject = new THREE.Object3D();

      postCardObject.objectHeight = 11.4;
      postCardObject.objectWidth = 16.2;
      postCardObject.objectThickness = 0.2;

      postCardObject.fillPercentage = 0.75;


      var postCardTexture = new THREE.TextureLoader().load('images/postcard.jpg');
      postCardTexture.magFilter = THREE.NearestFilter;
      postCardTexture.minFilter = THREE.LinearMipMapLinearFilter;
      postCardTexture.wrapS = THREE.RepeatWrapping;
      postCardTexture.wrapT = THREE.RepeatWrapping;
      postCardTexture.repeat.set(1, 0.703125);
      postCardTexture.offset.y = (1 - 0.703125) / 2;

      var postCard = new THREE.Mesh(new THREE.BoxBufferGeometry(16.2, 11.4, 0.2), new THREE.MeshPhongMaterial({
        color: 0xecf0f1,
        side: THREE.FrontSide,
        map: postCardTexture,
        shininess: 0,
        shading: THREE.SmoothShading
      }));

      var hoverBox = new THREE.Mesh(new THREE.BoxBufferGeometry(16.2, 11.4, 5),
        new THREE.MeshBasicMaterial({
          color: 0x248f24,
          alphaTest: 0,
          visible: false
        }));
      hoverBox.position.z = -2.1;

      postCardObject.add(hoverBox);
      postCardObject.add(postCard);


      postCardObject.children.forEach(function (element) {
        element.receiveShadow = false;
        element.castShadow = true;
        element.ancestor = postCardObject;
      });

      hoverBox.receiveShadow = false;
      hoverBox.castShadow = false;

      postCardObject.defaultPosition = new THREE.Vector3(x, y + 1.2, z);
      postCardObject.defaultRotation = new THREE.Euler(-Math.PI / 2, 0, (objRotation * Math.PI / 180), 'XYZ');
      postCardObject.hoverDestinationPosition = new THREE.Vector3(x, y + 6.2, z);
      postCardObject.hoverDestinationRotation = new THREE.Euler(-Math.PI / 2.4, 0, (objRotation * Math.PI / 180), 'XYZ');
      postCardObject.position.set(x, y + 1.2, z);
      postCardObject.rotation.set(-Math.PI / 2, 0, (objRotation * Math.PI / 180), 'XYZ');

      postCardObject.screen = new Object;
      postCardObject.distanceX = 12;
      postCardObject.distanceY = 12;
      postCardObject.distanceZ = 12;
      postCardObject.screen.distance = 0.1;
      postCardObject.screen.height = 11.4;
      postCardObject.screen.width = 16.2;

      postCardObject.bringToFront = function () {
        var defer = $q.defer();
        drawService.defaultBringToFront(postCardObject, scene, camera, 1).then(function (res) {
          defer.resolve({
            width: res.width,
            height: res.height,
            calculatedScale: res.calculatedScale
          });
        });
        return defer.promise
      }

      postCardObject.bringBack = function () {
        var defer = $q.defer();
        drawService.defaultBringBack(postCardObject, scene, camera, 1).then(function () {
          defer.resolve();
        });
        return defer.promise
      }

      postCardObject.handleObjectHover = function () {
        drawService.defaultHoverTween(postCardObject, scene, camera, 1);
      }

      postCardObject.class = 'dynamic';
      postCardObject.name = 'postCard';

      postCardObject.rayReceiver = hoverBox;

      return postCardObject
    }
  }
})();
