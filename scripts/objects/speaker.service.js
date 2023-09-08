(function () {
  'use strict';

  angular.module('app.objects').factory('speakerService', speakerService);

  speakerService.$inject = ['drawService'];

  function speakerService(drawService) {

    var service = {
      drawObject: drawObject
    };

    return service

    function drawObject(x, y, z, objRotation, name) {

      var speakerShape = new THREE.Shape();
      drawService.createRoundedRectangle(speakerShape, 8, 20, 1.5);
      var speakerMembraneShape = new THREE.Shape();
      drawService.createRoundedRectangle(speakerMembraneShape, 6, 12, 0.5);
      var speakerExtrudeSettings = {
        steps: 2,
        amount: 2,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 1,
        bevelSegments: 10
      }
      var speakerMembraneExtrudeSettings = {
        steps: 1,
        amount: 0,
        bevelEnabled: true,
        bevelThickness: 0.35,
        bevelSize: 1,
        bevelSegments: 10
      }
      var speakerGeometry = new THREE.ExtrudeGeometry(speakerShape, speakerExtrudeSettings)
      var speakerMaterial = new THREE.MeshPhongMaterial({
        color: 0xecf0f1
      });
      var speakerMembraneGeometry = new THREE.ExtrudeGeometry(speakerMembraneShape, speakerMembraneExtrudeSettings)

      var speakerMembraneMaterial = new THREE.MeshPhongMaterial({
        color: 0x373a3c
      });

      var speakerHolderShape = new THREE.Shape();
      speakerHolderShape.moveTo(0.1, 3.5);
      speakerHolderShape.lineTo(-2.8, -1.75);
      speakerHolderShape.bezierCurveTo(-3.1, -2.85, -2.5, -3.5, -1.4, -3.5);
      speakerHolderShape.lineTo(2.8, -3.5);
      speakerHolderShape.lineTo(2.7, -3.3);
      speakerHolderShape.lineTo(-1.4, -3.15);
      speakerHolderShape.bezierCurveTo(-2.1, -3.05, -2.5, -2.45, -2.3, -1.75);
      speakerHolderShape.lineTo(0.6, 3.5);
      var speakerHolderExtrudeSettings = {
        steps: 2,
        amount: 5,
        bevelEnabled: false,
        bevelThickness: 0.5,
        bevelSize: 0.5,
        bevelSegments: 5
      }
      var speakerHolderGeometry = new THREE.ExtrudeGeometry(speakerHolderShape, speakerHolderExtrudeSettings)
      var speakerHolderMaterial = new THREE.MeshPhongMaterial({
        color: 0xecf0f1
      });

      var speakerMesh = new THREE.Mesh(speakerGeometry, speakerMaterial);
      var speakerMembraneMesh = new THREE.Mesh(speakerMembraneGeometry, speakerMembraneMaterial);
      var speakerHolderMesh = new THREE.Mesh(speakerHolderGeometry, speakerHolderMaterial);
      speakerMembraneMesh.position.z = 1;
      speakerMembraneMesh.position.y = 3;
      speakerMesh.position.z = -1;
      speakerMesh.rotation.x = -Math.PI / 16;
      speakerMembraneMesh.rotation.x = -Math.PI / 16;
      speakerHolderMesh.position.x = 2.5;
      speakerHolderMesh.position.y = -10;
      speakerHolderMesh.rotation.y = -Math.PI / 2;
      var speaker = new THREE.Object3D();
      speaker.add(speakerMesh);
      speaker.add(speakerMembraneMesh);
      speaker.add(speakerHolderMesh);

      var speakerTextureGeometry = new THREE.PlaneBufferGeometry(8, 14);
      var speakerTexture = new THREE.TextureLoader().load('images/speakermesh.jpg');
      speakerTexture.magFilter = THREE.NearestFilter;
      speakerTexture.minFilter = THREE.LinearMipMapLinearFilter;
      var speakerTextureMaterial = new THREE.MeshBasicMaterial({
        map: speakerTexture,
        blending: THREE.MultiplyBlending,
        transparent: true,
      });

      var portfolioSpeakerTextureMesh = new THREE.Mesh(speakerTextureGeometry, speakerTextureMaterial);
      portfolioSpeakerTextureMesh.position.z = 1.5;
      portfolioSpeakerTextureMesh.position.y = 3;
      portfolioSpeakerTextureMesh.rotation.x = -Math.PI / 16;
      speaker.add(portfolioSpeakerTextureMesh);

      speaker.name = name;

      if (speaker.name == 'leftSpeaker') {



        var diode = new THREE.Mesh(new THREE.SphereBufferGeometry(0.6, 32, 32), new THREE.MeshPhongMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.75,
          emissive: 0x500000
        }));
        diode.scale.set(0.5, 0.5, 0.5);
        speaker.add(diode);
        speaker.diode = diode;

        speaker.rayReceiver = [];
        speaker.rayReceiver.push(speakerHolderMesh);
        speaker.rayReceiver.push(speakerMesh);

        diode.position.z = 2.8;
        diode.position.y = -6;
        diode.rotation.x = -Math.PI / 16;

        speaker.turnSpeakerOn = function () {
          TweenMax.to(diode.material.emissive, 0.05, {
            ease: Power2.easeOut,
            r: 0,
            g: 0.3,
            b: 0
          });
        }

        speaker.turnSpeakerOff = function () {
          TweenMax.to(diode.material.emissive, 0.05, {
            ease: Power2.easeOut,
            r: 0.3,
            g: 0,
            b: 0
          });
        }
      }

      speaker.children.forEach(function (element) {
        element.receiveShadow = true;
        element.castShadow = true;
        element.ancestor = speaker;
      });

      speakerMembraneMesh.castShadow = false;

      speaker.position.set(x, y, z);
      speaker.rotation.set(0, objRotation * Math.PI / 180, 0);

      return speaker
    }
  }
})();
