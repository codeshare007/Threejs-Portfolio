(function () {
  'use strict';

  angular.module('app.objects').factory('desktopService', desktopService);

  desktopService.$inject = ['drawService', '$q'];

  function desktopService(drawService, $q) {

    var service = {
      drawObject: drawObject
    };

    return service

    function drawObject(scene, camera, x, y, z, color, objRotation) {

      var desktop = new THREE.Object3D();
      desktop.objectWidth = 52.6;
      desktop.objectHeight = 31.8;

      desktop.screen = new Object;
      desktop.screen.distance = 0.5;
      desktop.screen.height = 31.8 - 5;
      desktop.screen.width = 52.6 - 5;

      var desktopScreenBorderShape = new THREE.Shape();
      var desktopScreenBorderWidth = 52.6;
      var desktopScreenBorderHeight = 31.8;
      desktopScreenBorderShape.moveTo(-(desktopScreenBorderWidth / 2), -(desktopScreenBorderHeight / 2));
      desktopScreenBorderShape.lineTo((desktopScreenBorderWidth / 2), -(desktopScreenBorderHeight / 2));
      desktopScreenBorderShape.lineTo(desktopScreenBorderWidth / 2, (desktopScreenBorderHeight / 2 - 2));
      desktopScreenBorderShape.bezierCurveTo(desktopScreenBorderWidth / 2, (desktopScreenBorderHeight / 2 - 0.6), (desktopScreenBorderWidth / 2 - 0.6), (desktopScreenBorderHeight / 2), (desktopScreenBorderWidth / 2 - 2), (desktopScreenBorderHeight / 2));
      desktopScreenBorderShape.lineTo(-(desktopScreenBorderWidth / 2 - 2), (desktopScreenBorderHeight / 2));
      desktopScreenBorderShape.bezierCurveTo(-(desktopScreenBorderWidth / 2 - 0.6), (desktopScreenBorderHeight / 2), -desktopScreenBorderWidth / 2, (desktopScreenBorderHeight / 2 - 0.6), -desktopScreenBorderWidth / 2, (desktopScreenBorderHeight / 2 - 2));
      var desktopScreenBorderExtrudeSettings = {
        steps: 2,
        amount: 1,
        bevelEnabled: false,
        bevelThickness: 0.5,
        bevelSize: 0.5,
        bevelSegments: 10
      }
      var desktopScreenBorderGeometry = new THREE.ExtrudeGeometry(desktopScreenBorderShape, desktopScreenBorderExtrudeSettings);
      var desktopScreenBorderMaterial = new THREE.MeshPhongMaterial({
        color: 0x151515
      });
      var desktopScreenBorderMesh = new THREE.Mesh(desktopScreenBorderGeometry, desktopScreenBorderMaterial);
      var desktopScreenBorderOutsideShape = new THREE.Shape();
      var desktopScreenBorderOutsideWidth = 52.8;
      var desktopScreenBorderOutsideHeight = 36;
      desktopScreenBorderOutsideShape.moveTo(-(desktopScreenBorderOutsideWidth / 2 - 2), -(desktopScreenBorderOutsideHeight / 2));
      desktopScreenBorderOutsideShape.lineTo((desktopScreenBorderOutsideWidth / 2 - 2), -(desktopScreenBorderOutsideHeight / 2));
      desktopScreenBorderOutsideShape.bezierCurveTo((desktopScreenBorderOutsideWidth / 2 - 0.6), -(desktopScreenBorderOutsideHeight / 2), desktopScreenBorderOutsideWidth / 2, -(desktopScreenBorderOutsideHeight / 2 - 0.6), desktopScreenBorderOutsideWidth / 2, -(desktopScreenBorderOutsideHeight / 2 - 2));
      desktopScreenBorderOutsideShape.lineTo(desktopScreenBorderOutsideWidth / 2, (desktopScreenBorderOutsideHeight / 2 - 2));
      desktopScreenBorderOutsideShape.bezierCurveTo(desktopScreenBorderOutsideWidth / 2, (desktopScreenBorderOutsideHeight / 2 - 0.6), (desktopScreenBorderOutsideWidth / 2 - 0.6), (desktopScreenBorderOutsideHeight / 2), (desktopScreenBorderOutsideWidth / 2 - 2), (desktopScreenBorderOutsideHeight / 2));
      desktopScreenBorderOutsideShape.lineTo(-(desktopScreenBorderOutsideWidth / 2 - 2), (desktopScreenBorderOutsideHeight / 2));
      desktopScreenBorderOutsideShape.bezierCurveTo(-(desktopScreenBorderOutsideWidth / 2 - 0.6), (desktopScreenBorderOutsideHeight / 2), -desktopScreenBorderOutsideWidth / 2, (desktopScreenBorderOutsideHeight / 2 - 0.6), -desktopScreenBorderOutsideWidth / 2, (desktopScreenBorderOutsideHeight / 2 - 2));
      desktopScreenBorderOutsideShape.lineTo(-desktopScreenBorderOutsideWidth / 2, -(desktopScreenBorderOutsideHeight / 2 - 2));
      desktopScreenBorderOutsideShape.bezierCurveTo(-desktopScreenBorderOutsideWidth / 2, -(desktopScreenBorderOutsideHeight / 2 - 0.6), -(desktopScreenBorderOutsideWidth / 2 - 0.6), -(desktopScreenBorderOutsideHeight / 2), -(desktopScreenBorderOutsideWidth / 2 - 2), -(desktopScreenBorderOutsideHeight / 2));
      var desktopScreenBorderOutsideExtrudeSettings = {
        steps: 2,
        amount: 1,
        bevelEnabled: false,
        bevelThickness: 0.5,
        bevelSize: 0.5,
        bevelSegments: 10
      }
      var desktopScreenBorderOutsideGeometry = new THREE.ExtrudeGeometry(desktopScreenBorderOutsideShape, desktopScreenBorderOutsideExtrudeSettings);
      var desktopScreenBorderOutsideMaterial = new THREE.MeshPhongMaterial({
        color: color
      });
      var desktopScreenBorderOutsideMesh = new THREE.Mesh(desktopScreenBorderOutsideGeometry, desktopScreenBorderOutsideMaterial);

      var desktopHolderShape = new THREE.Shape();
      desktopHolderShape.moveTo(-0.5, 12.5);
      desktopHolderShape.lineTo(-5.6, -9.5);
      desktopHolderShape.bezierCurveTo(-6, -11.2, -5, -12.5, -2.8, -12.5);
      desktopHolderShape.lineTo(5.6, -12.5);
      desktopHolderShape.lineTo(5.4, -12.1);
      desktopHolderShape.lineTo(-2.5, -11.8);
      desktopHolderShape.bezierCurveTo(-5.2, -11.7, -4.8, -10, -4.6, -9);
      desktopHolderShape.lineTo(0, 12.5);
      desktopHolderShape.lineTo(-0.5, 12.5);

      var desktopHolderExtrudeSettings = {
        steps: 2,
        amount: 15,
        bevelEnabled: false,
        bevelThickness: 0.5,
        bevelSize: 0.5,
        bevelSegments: 5
      }
      var desktopHolderGeometry = new THREE.ExtrudeGeometry(desktopHolderShape, desktopHolderExtrudeSettings)
      var desktopHolderMaterial = new THREE.MeshPhongMaterial({
        color: color
      });
      var desktopHolderMesh = new THREE.Mesh(desktopHolderGeometry, desktopHolderMaterial);
      desktopHolderMesh.rotation.y = -Math.PI / 2;

      var logoGeometry = new THREE.PlaneBufferGeometry(3, 3);

      var texture = new THREE.TextureLoader().load('images/logo.jpg');

      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.LinearMipMapLinearFilter;

      var logoMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        blending: THREE.MultiplyBlending,
        transparent: true,
      });

      var portfolioLogo = new THREE.Mesh(logoGeometry, logoMaterial);
      portfolioLogo.position.z = 1;
      portfolioLogo.position.y = -17.75;

      desktopScreenBorderOutsideMesh.position.z = -0.51;
      desktopScreenBorderMesh.position.z = -0.5;
      desktopScreenBorderOutsideMesh.position.y = -2;
      desktopHolderMesh.position.x = 7.5;
      desktopHolderMesh.position.y = -12.5;

      desktop.add(desktopScreenBorderMesh);
      desktop.add(desktopScreenBorderOutsideMesh);
      desktop.add(desktopHolderMesh);
      desktop.add(portfolioLogo);

      desktop.rayReceiver = [];
      desktop.rayReceiver.push(desktopScreenBorderOutsideMesh);
      desktop.rayReceiver.push(desktopHolderMesh);

      desktop.children.forEach(function (element) {
        element.castShadow = true;
        element.receiveShadow = true;
        element.ancestor = desktop;
      });

      desktopScreenBorderMesh.castShadow = false;

      desktop.defaultPosition = new THREE.Vector3(x, y + 25, z);
      desktop.defaultRotation = new THREE.Euler(0, objRotation * Math.PI / 180, 0, 'XYZ');
      desktop.hoverDestinationPosition = new THREE.Vector3(x, y + 27, z);
      desktop.hoverDestinationRotation = new THREE.Euler(0, objRotation * Math.PI / 180, 0, 'XYZ');
      desktop.position.set(x, y + 25, z);
      desktop.rotation.set(0, objRotation * Math.PI / 180, 0, 'XYZ');

      desktop.bringToFront = function () {

        var distance = camera.calculateDistance(desktop.objectWidth, desktop.objectHeight, 0.95);

        desktop.distanceY = 0;
        desktop.distanceX = 0;
        desktop.distanceZ = distance;

        TweenMax.killTweensOf(desktop.position);
        var defer = $q.defer();
        scene.currentObject = desktop;

        var timeline = new TimelineMax({
          onComplete: function () {
            var pixelAspect = window.innerHeight / camera.calculateVisibleHeight(distance - desktop.screen.distance);
            defer.resolve({
              width: (pixelAspect * desktop.screen.width),
              height: (pixelAspect * desktop.screen.height),
              calculatedScale: (pixelAspect * desktop.screen.height) / 568
            });
          }
        });

        timeline.to(desktop.position, 1, {
          ease: Power1.easeInOut,
          x: desktop.defaultPosition.x,
          y: desktop.defaultPosition.y,
          z: desktop.defaultPosition.z
        }, 0);

        timeline.to(camera.position, 1, {
          ease: Power1.easeInOut,
          x: desktop.defaultPosition.x + desktop.distanceX,
          y: desktop.defaultPosition.y + desktop.distanceY,
          z: desktop.defaultPosition.z + desktop.distanceZ
        }, 0);

        timeline.to(camera.rotation, 1, {
          ease: Power1.easeInOut,
          x: desktop.rotation.x,
          y: desktop.rotation.y,
          z: desktop.rotation.z
        }, 0);

        return defer.promise
      }

      desktop.bringBack = function () {
        var defer = $q.defer();

        var timeline = new TimelineMax({
          onComplete: function () {
            scene.currentObject = false;
            var pixelAspect = window.innerHeight / camera.calculateVisibleHeight(desktop.screen.distance);
            defer.resolve({
              width: (pixelAspect * desktop.screen.width),
              height: (pixelAspect * desktop.screen.height),
              calculatedScale: (pixelAspect * desktop.screen.height) / 568
            });
          }
        });

        timeline.to(camera.position, 1, {
          ease: Power1.easeInOut,
          x: camera.defaultPosition.x,
          y: camera.defaultPosition.y,
          z: camera.defaultPosition.z
        }, 0);

        timeline.to(camera.rotation, 1, {
          ease: Power1.easeInOut,
          x: camera.defaultRotation.x,
          y: camera.defaultRotation.y,
          z: camera.defaultRotation.z
        }, 0);

        return defer.promise
      }

      desktop.handleObjectHover = function () {
        drawService.defaultHoverTween(desktop, scene, camera, 1);
      }

      desktop.class = 'dynamic';
      desktop.name = 'desktop';
      return desktop
    }
  }
})();
