(function () {
  'use strict';

  angular.module('app.objects').factory('lightService', lightService);

  function lightService() {

    var service = {
      createAmbientLight: createAmbientLight,
      createSceneLight: createSceneLight,
      createActiveObjectLight: createActiveObjectLight
    };

    return service

    function createAmbientLight(intensity) {
      var ambientLight = new THREE.AmbientLight(0xffffff);
      ambientLight.intensity = intensity;
      ambientLight.defaultIntensity = intensity;
      return ambientLight
    }

    function createSceneLight(intensity) {
      var sceneLight = new THREE.SpotLight(0xffffff, 0.7, 500);
      sceneLight.castShadow = true;
      sceneLight.intensity = intensity;
      sceneLight.defaultIntensity = intensity;
      sceneLight.penumbra = 1;
      sceneLight.decay = 0.01;
      sceneLight.shadow.mapSize.x = 4096;
      sceneLight.shadow.mapSize.y = 4096;
      // sceneLight.shadow.mapSize.x = 1024;
      // sceneLight.shadow.mapSize.y = 1024;

      return sceneLight
    }

    function createActiveObjectLight(intensity) {
      var activeObjectLight = new THREE.SpotLight(0xffffff);
      activeObjectLight.intensity = 0;
      activeObjectLight.defaultIntensity = intensity;
      activeObjectLight.distance = 1000;
      activeObjectLight.angle = Math.PI / 2;
      activeObjectLight.decay = 0.01;
      activeObjectLight.penumbra = 1;

      return activeObjectLight
    }


  }
})();
