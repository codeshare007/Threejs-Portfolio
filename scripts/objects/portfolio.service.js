(function () {
  'use strict';

  angular.module('app.objects').factory('portfolioService', portfolioService);

  portfolioService.$inject = ['drawService', '$q'];

  function portfolioService(drawService, $q) {

    var service = {
      drawObject: drawObject
    };

    return service

    function drawObject(scene, camera, x, y, z, colorHex, angle, name, logoPath, leftPath, rightPath) {

      var portfolio = new THREE.Object3D();

      portfolio.objectWidth = 42;
      portfolio.objectHeight = 29.7;
      portfolio.objectThickness = 0.5;

      var leftTexture = new THREE.TextureLoader().load(leftPath);
      leftTexture.magFilter = THREE.NearestFilter;
      leftTexture.minFilter = THREE.LinearMipMapLinearFilter;
      leftTexture.wrapS = THREE.RepeatWrapping;
      leftTexture.wrapT = THREE.RepeatWrapping;
      leftTexture.repeat.set(1, 1);
      leftTexture.offset.y = 0;

      var rightTexture = new THREE.TextureLoader().load(rightPath);
      rightTexture.magFilter = THREE.NearestFilter;
      rightTexture.minFilter = THREE.LinearMipMapLinearFilter;
      rightTexture.wrapS = THREE.RepeatWrapping;
      rightTexture.wrapT = THREE.RepeatWrapping;
      rightTexture.repeat.set(1, 1);
      rightTexture.offset.y = 0;

      var portfolioCover = new THREE.Object3D();

      var portfolioCoverMesh = new THREE.Mesh(
        new THREE.BoxBufferGeometry(21, 29.7, 0.1),
        new THREE.MeshPhongMaterial({
          color: colorHex,
          emissive: 0x090909
        }));

      portfolioCoverMesh.position.x = 10.5;

      var portfolioBackMesh = new THREE.Mesh(
        new THREE.BoxBufferGeometry(21, 29.7, 0.5),
        new THREE.MeshPhongMaterial({
          color: colorHex
        }));

      portfolioCoverMesh.castShadow = true;
      portfolioCoverMesh.receiveShadow = true;

      portfolioBackMesh.castShadow = true;
      portfolioBackMesh.receiveShadow = true;

      var paperGeometry = new THREE.PlaneBufferGeometry(20.25, 28.7);
      var leftPaperMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: leftTexture
      });
      var rightPaperMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: rightTexture
      });

      var portfolioPaper1 = new THREE.Mesh(paperGeometry, leftPaperMaterial);
      portfolioPaper1.position.z = -0.051;
      portfolioPaper1.position.x = 10.375;
      portfolioPaper1.rotation.x = Math.PI;
      portfolioPaper1.rotation.z = Math.PI;


      var stripeGeometry = new THREE.PlaneBufferGeometry(15, 0.5);
      var stripeMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.1
      });

      var portfolioStripe1 = new THREE.Mesh(stripeGeometry, stripeMaterial);
      portfolioStripe1.position.z = 0.051;
      portfolioStripe1.position.x = 10.5;
      portfolioStripe1.position.y = -10;

      var portfolioStripe2 = new THREE.Mesh(stripeGeometry, stripeMaterial);
      portfolioStripe2.position.z = 0.051;
      portfolioStripe2.position.x = 10.5;
      portfolioStripe2.position.y = -8;


      var portfolioStripe3 = new THREE.Mesh(stripeGeometry, stripeMaterial);
      portfolioStripe3.position.z = 0.051;
      portfolioStripe3.position.x = 10.5;
      portfolioStripe3.position.y = -6;

      var logoGeometry = new THREE.PlaneBufferGeometry(12, 12);

      var logoTexture = new THREE.TextureLoader().load(logoPath);

      logoTexture.magFilter = THREE.NearestFilter;
      logoTexture.minFilter = THREE.LinearMipMapLinearFilter;

      var logoMaterial = new THREE.MeshBasicMaterial({
        map: logoTexture,
        blending: THREE.MultiplyBlending,
        transparent: true,
        opacity: 0.15
      });

      var portfolioLogo = new THREE.Mesh(logoGeometry, logoMaterial);
      portfolioLogo.position.z = 0.051;
      portfolioLogo.position.x = 10.5;
      portfolioLogo.position.y = 4;

      portfolioCover.add(portfolioPaper1);
      portfolioCover.add(portfolioStripe1);
      portfolioCover.add(portfolioStripe2);
      portfolioCover.add(portfolioStripe3);
      portfolioCover.add(portfolioLogo);
      portfolioCover.add(portfolioCoverMesh);

      portfolioCover.children.forEach(function (element) {
        element.receiveShadow = true;
        element.castShadow = false;
        element.ancestor = portfolio;
      });

      var portfolioPaper2 = new THREE.Mesh(paperGeometry, rightPaperMaterial);

      portfolioPaper2.defaultPosition = new THREE.Vector3(0, 0, 0.26);
      portfolioPaper2.defaultRotation = new THREE.Euler(0, 0, 0, 'XYZ');
      portfolioPaper2.destinationPosition = new THREE.Vector3(10.375, 0, 0.26);
      portfolioPaper2.destinationRotation = new THREE.Euler(0, 0, 0, 'XYZ');
      portfolioPaper2.hoverDestinationPosition = new THREE.Vector3(0, 0, 0.26);
      portfolioPaper2.hoverDestinationRotation = new THREE.Euler(0, 0, 0, 'XYZ');
      portfolioPaper2.position.set(0, 0, 0.26);
      portfolioPaper2.rotation.set(0, 0, 0, 'XYZ');

      portfolioCover.defaultPosition = new THREE.Vector3(-10.5, 0, 0.2);
      portfolioCover.defaultRotation = new THREE.Euler(0, -Math.PI / 32, 0, 'XYZ');
      portfolioCover.destinationPosition = new THREE.Vector3(0, 0, 0.2);
      portfolioCover.destinationRotation = new THREE.Euler(0, -Math.PI, 0, 'XYZ');
      portfolioCover.hoverDestinationPosition = new THREE.Vector3(-10.5, 0, 0.2);
      portfolioCover.hoverDestinationRotation = new THREE.Euler(0, -Math.PI / 16, 0, 'XYZ');
      portfolioCover.position.set(-10.5, 0, 0.2);
      portfolioCover.rotation.set(0, -Math.PI / 32, 0, 'XYZ');

      portfolioBackMesh.defaultPosition = new THREE.Vector3(0, 0, 0);
      portfolioBackMesh.defaultRotation = new THREE.Euler(0, 0, 0, 'XYZ');
      portfolioBackMesh.destinationPosition = new THREE.Vector3(10.5, 0, 0);
      portfolioBackMesh.destinationRotation = new THREE.Euler(0, 0, 0, 'XYZ');
      portfolioBackMesh.hoverDestinationPosition = new THREE.Vector3(0, 0, 0);
      portfolioBackMesh.hoverDestinationRotation = new THREE.Euler(0, 0, 0, 'XYZ');
      portfolioBackMesh.position.set(0, 0, 0);
      portfolioBackMesh.rotation.set(0, 0, 0, 'XYZ');

      portfolio.defaultPosition = new THREE.Vector3(x, y + 0.25, z);
      portfolio.defaultRotation = new THREE.Euler(-Math.PI / 2, 0, angle * Math.PI / 180, 'XYZ');
      portfolio.hoverDestinationPosition = new THREE.Vector3(x, y + 5.25, z);
      portfolio.hoverDestinationRotation = new THREE.Euler(-Math.PI / 2.2, 0, 0, 'XYZ');
      portfolio.position.set(x, y + 0.25, z);
      portfolio.rotation.set(-Math.PI / 2, 0, angle * Math.PI / 180, 'XYZ');

      portfolio.parts = [portfolioCover, portfolioBackMesh, portfolioPaper2];

      portfolio.add(portfolioCover);
      portfolio.add(portfolioBackMesh);
      portfolio.add(portfolioPaper2);

      portfolio.children.forEach(function (element) {
        element.receiveShadow = true;
        element.castShadow = true;
        element.ancestor = portfolio;
      });

      portfolio.screen = new Object;
      portfolio.screen.distance = 0.26;
      portfolio.screen.height = 28.7;
      portfolio.screen.width = 41;
      portfolio.screen.gap = 0.5 / 41;

      portfolio.rayReceiver = [];
      portfolio.rayReceiver.push(portfolioBackMesh);
      portfolio.rayReceiver.push(portfolioCoverMesh);

      portfolio.bringToFront = function () {
        var defer = $q.defer();
        drawService.defaultBringToFront(portfolio, scene, camera, 1).then(function (res) {
          defer.resolve({
            width: res.width,
            height: res.height,
            calculatedScale: res.calculatedScale,
            gap: portfolio.screen.gap * res.width
          });
        });
        return defer.promise
      }

      portfolio.bringBack = function () {
        var defer = $q.defer();
        drawService.defaultBringBack(portfolio, scene, camera, 1).then(function () {
          defer.resolve();
        });
        return defer.promise
      }

      portfolio.handleObjectHover = function () {
        drawService.defaultHoverTween(portfolio, scene, camera, 1);
      }

      portfolio.class = 'dynamic';
      portfolio.name = name;

      return portfolio
    }
  }
})();
