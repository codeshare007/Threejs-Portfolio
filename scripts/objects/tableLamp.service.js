(function () {
  'use strict';

  angular.module('app.objects').factory('tableLampService', tableLampService);

  tableLampService.$inject = ['drawService'];

  function tableLampService(drawService) {

    var service = {
      drawObject: drawObject,
      turnLampOn: turnLampOn,
      turnLampOff: turnLampOff
    };

    return service

    function drawObject(x, y, z, colorHex) {
      var tableLampBottomGeometry = new THREE.CylinderGeometry(5, 5.5, 1, 100);
      var tableLampBottomMaterial = new THREE.MeshPhongMaterial({
        color: colorHex
      });
      var tableLampBottom = new THREE.Mesh(tableLampBottomGeometry, tableLampBottomMaterial);

      var tableLampBar1Geometry = new THREE.CylinderGeometry(0.75, 0.75, 12, 100);
      var tableLampBar1Material = new THREE.MeshPhongMaterial({
        color: 0x7f8c8d
      });
      var tableLampBar1 = new THREE.Mesh(tableLampBar1Geometry, tableLampBar1Material);
      tableLampBar1.rotation.x = -Math.PI / 4;
      tableLampBar1.position.z = -Math.cos(Math.PI / 4) * 12 / 2;
      tableLampBar1.position.y = Math.cos(Math.PI / 4) * 12 / 2;


      var tableLampBar2Geometry = new THREE.CylinderGeometry(0.75, 0.75, 12, 100);
      var tableLampBar2Material = new THREE.MeshPhongMaterial({
        color: 0x7f8c8d
      });
      var tableLampBar2 = new THREE.Mesh(tableLampBar2Geometry, tableLampBar2Material);
      tableLampBar2.rotation.x = Math.PI / 4;
      tableLampBar2.position.y = Math.cos(Math.PI / 4) * 18;
      tableLampBar2.position.z = -Math.cos(Math.PI / 4) * 12 / 2;


      var tableLampBar3Geometry = new THREE.CylinderGeometry(1.25, 1.25, 3, 100);
      var tableLampBar3Material = new THREE.MeshPhongMaterial({
        color: 0x7f8c8d
      });
      var tableLampBar3 = new THREE.Mesh(tableLampBar3Geometry, tableLampBar3Material);
      tableLampBar3.rotation.x = Math.PI / 2;
      tableLampBar3.rotation.z = Math.PI / 2;
      tableLampBar3.position.y = Math.cos(Math.PI / 4) * 12;
      tableLampBar3.position.z = -Math.cos(Math.PI / 4) * 12;


      var tableLampCoverPoints = [];
      tableLampCoverPoints.push(new THREE.Vector2(0, 0));
      tableLampCoverPoints.push(new THREE.Vector2(-1, 1.1));
      tableLampCoverPoints.push(new THREE.Vector2(-1.4, 1.6));
      tableLampCoverPoints.push(new THREE.Vector2(-1.9, 2.3));
      tableLampCoverPoints.push(new THREE.Vector2(-2.7, 3.6));
      tableLampCoverPoints.push(new THREE.Vector2(-3.6, 5.5));
      tableLampCoverPoints.push(new THREE.Vector2(-4, 6.8));
      tableLampCoverPoints.push(new THREE.Vector2(-4.2, 7.8));
      tableLampCoverPoints.push(new THREE.Vector2(-4.3, 9.2));
      tableLampCoverPoints.push(new THREE.Vector2(-3.8, 9.2));
      tableLampCoverPoints.push(new THREE.Vector2(-3.7, 7.8));
      tableLampCoverPoints.push(new THREE.Vector2(-3.5, 6.8));
      tableLampCoverPoints.push(new THREE.Vector2(-3.1, 5.5));
      tableLampCoverPoints.push(new THREE.Vector2(-2.2, 3.6));
      tableLampCoverPoints.push(new THREE.Vector2(-1.4, 2.3));
      tableLampCoverPoints.push(new THREE.Vector2(-0.9, 1.6));
      tableLampCoverPoints.push(new THREE.Vector2(-0.5, 1.1));
      tableLampCoverPoints.push(new THREE.Vector2(0, 0));


      var tableLampCoverGeometry = new THREE.LatheGeometry(tableLampCoverPoints, 100);
      var tableLampCoverMaterial = new THREE.MeshPhongMaterial({
        color: colorHex
      });
      var tableLampCover = new THREE.Mesh(tableLampCoverGeometry, tableLampCoverMaterial);
      tableLampCover.position.y = 20;
      tableLampCover.position.z = -3;
      tableLampCover.rotation.x = Math.PI - Math.PI / 4;

      var tableLampBulbGeometry = new THREE.SphereGeometry(2.4, 100, 100);
      var tableLampBulbMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        transparent: true,
        opacity: 0.95
      });
      var tableLampBulb = new THREE.Mesh(tableLampBulbGeometry, tableLampBulbMaterial);
      tableLampBulb.position.y = 14;
      tableLampBulb.position.z = 3;

      var spriteMaterial = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load('images/glow.jpg'),
        blending: THREE.AdditiveBlending
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(1, 1, 1);
      tableLampBulb.add(sprite);

      var tableLamp = new THREE.Object3D();
      tableLamp.add(tableLampBulb);
      tableLamp.add(tableLampCover);
      tableLamp.add(tableLampBar1);
      tableLamp.add(tableLampBar2);
      tableLamp.add(tableLampBar3);
      tableLamp.add(tableLampBottom);

      tableLamp.children.forEach(function (element) {
        element.receiveShadow = true;
        element.castShadow = true;
        element.ancestor = tableLamp
      });

      tableLampBulb.receiveShadow = false;
      tableLampBulb.castShadow = false;

      var lampLight = new THREE.SpotLight(0xffffff, 0, 300);
      lampLight.angle = 1;
      lampLight.penumbra = 0.3;
      lampLight.castShadow = true;
      lampLight.decay = 1;

      lampLight.position.set(0, 14, 3);
      lampLight.target.position.set(0, 0, 0);
      lampLight.target.updateMatrixWorld();

      tableLamp.add(lampLight);

      tableLamp.rayReceiver = [];
      tableLamp.rayReceiver.push(tableLampCover);
      tableLamp.rayReceiver.push(tableLampBottom);
      tableLamp.rayReceiver.push(tableLampBar1);
      tableLamp.rayReceiver.push(tableLampBar2);
      tableLamp.rayReceiver.push(tableLampBar3);


      tableLamp.turnLampOn = function () {
        turnLampOn(lampLight, tableLampBulb);
      };

      tableLamp.turnLampOff = function () {
        turnLampOff(lampLight, tableLampBulb);
      };

      tableLamp.name = 'tableLamp';

      tableLamp.position.set(x, y, z);
      tableLamp.scale.set(1.2, 1.2, 1.2);
      tableLamp.lookAt(new THREE.Vector3(0, 0, 0))
      return tableLamp
    }

    function turnLampOn(light, bulb) {
      TweenMax.to(light, 0.15, {
        ease: Power2.easeOut,
        intensity: 1,
        distance: 100
      });
      TweenMax.to(bulb.material.emissive, 0.05, {
        ease: Power2.easeOut,
        r: 1,
        g: 1,
        b: 1
      });
      TweenMax.to(bulb.children[0].scale, 0.05, {
        ease: Power2.easeOut,
        x: 8,
        y: 8,
        z: 1
      });
      TweenMax.to(bulb.material, 0.05, {
        ease: Power2.easeOut,
        opacity: 1
      });
    }

    function turnLampOff(light, bulb) {
      TweenMax.to(light, 0.15, {
        ease: Power2.easeOut,
        intensity: 0,
        distance: 0
      });
      TweenMax.to(bulb.material.emissive, 0.05, {
        ease: Power2.easeOut,
        r: 0,
        g: 0,
        b: 0
      });
      TweenMax.to(bulb.children[0].scale, 0.05, {
        ease: Power2.easeOut,
        x: 1,
        y: 1,
        z: 1
      });
      TweenMax.to(bulb.material, 0.05, {
        ease: Power2.easeOut,
        opacity: 0.95
      });
    }

  }
})();
