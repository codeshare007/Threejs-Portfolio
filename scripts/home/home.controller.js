angular
  .module('app')
  .controller('homeCtrl', homeCtrl);
homeCtrl.$inject = ['$q', '$http', '$scope', '$state', '$rootScope', '$sce',
  'lightService', 'backgroundService',
  'deskService',
  'phoneService', 'tabletService', 'postCardService', 'businessCardService', 'personalResumeService', 'portfolioService',
  'speakerService', 'tableLampService', 'cupService', 'desktopService', 'keyboardService', 'mouseService', '$timeout'
];

function homeCtrl($q, $http, $scope, $state, $rootScope, $sce,
  lightService, backgroundService, deskService, phoneService, tabletService, postCardService, businessCardService, personalResumeService, portfolioService, speakerService, tableLampService, cupService, desktopService, keyboardService, mouseService, $timeout) {
  var vm = this;
  var loadedConfig = false;
  $http.get('config.json').then(function (res) {
    vm.userConfig = angular.fromJson(res.data);
    loadedConfig = true;
    parseConfig();
    init();
    animate();
  });

  var urlFramesCount = 0;
  vm.configuratorEnabled = true;
  $scope.sheetHovered = false;



  $rootScope.$on('preview-requested', function (event, data) {
    vm.userConfig = data;
    parseConfig();
    generateScene();
  });

  function getConfigObject(key) {
    return vm.config[key]
  }
  vm.getConfigObject = function (key) {
    if (loadedConfig) return getConfigObject(key)
  }

  vm.trustSrc = function (src) {
    return $sce.trustAsResourceUrl(src);
  }
  var x = 15;

  vm.sendEmail = function () {
    jQuery.ajax({
      url: 'mailscript.php',
      data: 'targetEmail=' + vm.userConfig.postcard.email + '&userName=' + vm.contactForm.name + '&userEmail=' + vm.contactForm.email + '&subject=' + vm.contactForm.title + '&content=' + vm.contactForm.content,
      type: 'POST',
      success: function (data) {
        console.log('sent email');
        handleBringBack();
        vm.contactForm = {};
      },
      error: function () {
        handleBringBack();
        vm.contactForm = {};
      }
    });
  }

  vm.swiperArray = [];
  vm.refreshSwipers = function () {
    for (var i = 0; i < vm.swiperArray.length; i++) {
      vm.swiperArray[i].update();
    }
  }


  function parseConfig() {
    vm.config = {
      phone: {
        contentType: vm.userConfig.phone.contentType || '',
        swiperImages: vm.userConfig.phone.slides || '',
        invisionUrl: vm.userConfig.phone.invision || '',
        htmlUrl: vm.userConfig.phone.path || vm.userConfig.phone.url || '',
        objectReverseDelay: 250,
        initFunction: function () {
          if (getConfigObject('phone').contentType == 'slides') {
            getConfigObject('phone').template = 'templates/phone/phoneSlides.template.html';
          }
          if (getConfigObject('phone').contentType == 'invision') {
            getConfigObject('phone').template = 'templates/phone/phoneInvision.template.html';
          }
          if (getConfigObject('phone').contentType == 'html') {
            getConfigObject('phone').template = 'templates/phone/phoneHtml.template.html';
          }
          if (getConfigObject('phone').contentType == 'url') {
            getConfigObject('phone').template = 'templates/phone/phoneHtml.template.html';
            urlFramesCount++;
          }
        },
        onShowComplete: function (res) {
          getConfigObject('phone').screenHeight = res.height;
          getConfigObject('phone').screenWidth = res.width;
          getConfigObject('phone').screenVisible = true;
          if (getConfigObject('phone').contentType == 'invision') getConfigObject('phone').calculatedScale = res.calculatedScale;
          if (getConfigObject('phone').contentType == 'slides') {
            $timeout(function () {
              // getConfigObject('phone').swiperInstance.update();
              vm.refreshSwipers();
            });
          }
        },
        onHideStart: function () {
          getConfigObject('phone').screenVisible = false;
        }
      },
      tablet: {
        contentType: vm.userConfig.tablet.contentType || '',
        swiperImages: vm.userConfig.tablet.slides || '',
        invisionUrl: vm.userConfig.tablet.invision || '',
        htmlUrl: vm.userConfig.tablet.path || vm.userConfig.tablet.url || '',
        objectReverseDelay: 250,
        initFunction: function () {
          if (getConfigObject('tablet').contentType == 'slides') {
            getConfigObject('tablet').template = 'templates/tablet/tabletSlides.template.html';
          }
          if (getConfigObject('tablet').contentType == 'invision') {
            getConfigObject('tablet').template = 'templates/tablet/tabletInvision.template.html';
          }
          if (getConfigObject('tablet').contentType == 'html') {
            getConfigObject('tablet').template = 'templates/tablet/tabletHtml.template.html';
          }
          if (getConfigObject('tablet').contentType == 'url') {
            getConfigObject('tablet').template = 'templates/tablet/tabletHtml.template.html';
            urlFramesCount++;
          }
        },
        onShowComplete: function (res) {
          getConfigObject('tablet').screenHeight = res.height;
          getConfigObject('tablet').screenWidth = res.width;
          getConfigObject('tablet').screenVisible = true;
          if (getConfigObject('tablet').contentType == 'invision') getConfigObject('tablet').calculatedScale = res.calculatedScale;
          if (getConfigObject('tablet').contentType == 'slides') {
            $timeout(function () {
              // getConfigObject('tablet').swiperInstance.update();
              vm.refreshSwipers();
            });
          }
        },
        onHideStart: function () {
          getConfigObject('tablet').screenVisible = false;
        },
      },
      desktop: {
        projects: vm.userConfig.desktop.projects || '',
        objectReverseDelay: 250,
        initFunction: function () {
          if (getConfigObject('desktop').contentType == 'slides') {
            getConfigObject('desktop').template = 'templates/desktop/desktopSlides.template.html';
          }
          if (getConfigObject('desktop').contentType == 'html') {
            getConfigObject('desktop').template = 'templates/desktop/desktopHtml.template.html';
          }
          if (getConfigObject('desktop').contentType == 'url') {
            getConfigObject('desktop').template = 'templates/desktop/desktopHtml.template.html';
          }
          $timeout(function () {
            vm.refreshSwipers();
          });
        },
        onShowComplete: function (res) {
          getConfigObject('desktop').screenHeight = res.height;
          getConfigObject('desktop').screenWidth = res.width;
          getConfigObject('desktop').screenVisible = true;
          if (getConfigObject('desktop').contentType == 'slides') {
            $timeout(function () {
              getConfigObject('desktop').swiperInstance.update();
            });
          }
        },
        onHideStart: function () {
          getConfigObject('desktop').screenVisible = false;
        },
      },
      businessCard: {
        objectReverseDelay: 125,
        initFunction: function () {

        },
        onShowComplete: function (res) {
          getConfigObject('businessCard').screenHeight = res.height;
          getConfigObject('businessCard').screenWidth = res.width;
          getConfigObject('businessCard').screenVisible = true;
        },
        onHideStart: function () {
          getConfigObject('businessCard').screenVisible = false;
        },
      },
      personalResume: {
        objectReverseDelay: 125,
        initFunction: function () {

        },
        onShowComplete: function (res) {
          getConfigObject('personalResume').screenHeight = res.height;
          getConfigObject('personalResume').screenWidth = res.width;
          getConfigObject('personalResume').screenVisible = true;
        },
        onHideStart: function () {
          getConfigObject('personalResume').screenVisible = false;
        },
      },
      postCard: {
        objectReverseDelay: 250,
        initFunction: function () {

        },
        onShowComplete: function (res) {
          getConfigObject('postCard').screenHeight = res.height;
          getConfigObject('postCard').screenWidth = res.width;
          getConfigObject('postCard').screenVisible = true;
        },
        onHideStart: function () {
          getConfigObject('postCard').screenVisible = false;
        },
      },
      portfolio1: {
        objectReverseDelay: 250,
        leftImageUrl: vm.userConfig.project1.leftImage || '',
        rightImageUrl: vm.userConfig.project1.rightImage || '',
        onShowComplete: function (res) {
          getConfigObject('portfolio1').screenHeight = res.height;
          getConfigObject('portfolio1').screenWidth = res.width;
          getConfigObject('portfolio1').gap = res.gap;
          getConfigObject('portfolio1').screenVisible = true;
        },
        onHideStart: function () {
          getConfigObject('portfolio1').screenVisible = false;
        },
      },
      portfolio2: {
        objectReverseDelay: 250,
        leftImageUrl: vm.userConfig.project2.leftImage || '',
        rightImageUrl: vm.userConfig.project2.rightImage || '',
        onShowComplete: function (res) {
          getConfigObject('portfolio2').screenHeight = res.height;
          getConfigObject('portfolio2').screenWidth = res.width;
          getConfigObject('portfolio2').gap = res.gap;
          getConfigObject('portfolio2').screenVisible = true;
        },
        onHideStart: function () {
          getConfigObject('portfolio2').screenVisible = false;
        },
      },
      portfolio3: {
        objectReverseDelay: 250,
        leftImageUrl: vm.userConfig.project3.leftImage || '',
        rightImageUrl: vm.userConfig.project3.rightImage || '',
        onShowComplete: function (res) {
          getConfigObject('portfolio3').screenHeight = res.height;
          getConfigObject('portfolio3').screenWidth = res.width;
          getConfigObject('portfolio3').gap = res.gap;
          getConfigObject('portfolio3').screenVisible = true;
        },
        onHideStart: function () {
          getConfigObject('portfolio3').screenVisible = false;
        },
      },

    }
    runInitFunctions();
  }


  function runInitFunctions() {
    for (var property in vm.config) {
      if (vm.config.hasOwnProperty(property)) {
        if (vm.config[property].initFunction != undefined) vm.config[property].initFunction();
      }
    }
  }

  vm.phoneSwiperReady = function (swiper) {
    getConfigObject('phone').swiperInstance = swiper;
    vm.swiperArray.push(swiper);
  };
  vm.tabletSwiperReady = function (swiper) {
    getConfigObject('tablet').swiperInstance = swiper;
    vm.swiperArray.push(swiper);
  };
  vm.desktopSwiperReady = function (swiper) {
    getConfigObject('desktop').swiperInstance = swiper;
    vm.swiperArray.push(swiper);
  };

  var container, camera, scene, raycaster, renderer, activeObject;
  var desk, cup, leftSpeaker, rightSpeaker, keyboard, desktop, tableLamp, postCardStock, businessCardStock;
  var phone, tablet, personalResume, postCard, businessCard, portfolio;
  var sceneLight, ambientLight, activeObjectLight;
  var mouse = new THREE.Vector2();
  var INTERSECTED;
  var initializing = true;
  var raycastingObjects = [];
  $scope.swiper = {};
  $scope.next = function () {
    $scope.swiper.slideNext();
  };


  vm.objectZoomed = false;

  var config = {
    objectReverseDelay: 250,
  }

  var isAnimating = false;




  function bringToDesktop(camera) {
    var defer = $q.defer();
    scene.loading = true;
    var timeline = new TimelineMax({
      onComplete: function () {
        defer.resolve();
      }
    });

    timeline.to(camera.position, 1, {
      ease: Power1.easeInOut,
      x: desktop.defaultPosition.x,
      y: desktop.defaultPosition.y,
      z: desktop.defaultPosition.z + 25
    }, 0);

    timeline.to(camera.rotation, 1, {
      ease: Power1.easeInOut,
      x: desktop.rotation.x,
      y: desktop.rotation.y,
      z: desktop.rotation.z
    }, 0);
    return defer.promise
  }

  function bringFromDesktop(camera) {
    var defer = $q.defer();
    scene.loading = true;
    var timeline = new TimelineMax({
      onComplete: function () {
        scene.loading = false;
        defer.resolve();
      }
    });

    timeline.to(camera.position, 1, {
      ease: Power1.easeInOut,
      x: camera.defaultPosition.x,
      y: camera.defaultPosition.y,
      z: camera.defaultPosition.z + 2
    }, 0);

    timeline.to(camera.rotation, 1, {
      ease: Power1.easeInOut,
      x: camera.defaultRotation.x,
      y: camera.defaultRotation.y,
      z: camera.defaultRotation.z
    }, 0);
    return defer.promise
  }

  function generateScene() {
    scene = null;
    camera = null;
    INTERSECTED = null;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.model = vm.userConfig.general.cameraType.model;
    camera.distance = vm.userConfig.general.cameraType.distance;
    camera.elastic = vm.userConfig.general.elastic;

    if (camera.model == 'Top') {
      camera.defaultPosition = new THREE.Vector3(0, camera.distance, 0);
    } else if (camera.model == 'Top Front') {
      camera.defaultPosition = new THREE.Vector3(0, camera.distance / Math.sqrt(2), camera.distance / Math.sqrt(2));
    } else if (camera.model == 'Top Front Left') {
      camera.defaultPosition = new THREE.Vector3(-camera.distance / Math.sqrt(3), camera.distance / Math.sqrt(3), camera.distance / Math.sqrt(3));
    } else if (camera.model == 'Top Front Right') {
      camera.defaultPosition = new THREE.Vector3(camera.distance / Math.sqrt(3), camera.distance / Math.sqrt(3), camera.distance / Math.sqrt(3));
    }

    camera.position.set(camera.defaultPosition.x, camera.defaultPosition.y, camera.defaultPosition.z)
    camera.lookAt(scene.position);
    camera.defaultRotation = new THREE.Vector3(camera.rotation.x, camera.rotation.y, camera.rotation.z);

    ambientLight = lightService.createAmbientLight(vm.userConfig.general.ambientIntensity);
    activeObjectLight = lightService.createActiveObjectLight(vm.userConfig.general.lightIntensity);
    activeObjectLight.position.set(camera.position.x, camera.position.y, camera.position.z);
    scene.activeObjectLight = activeObjectLight;
    sceneLight = lightService.createSceneLight(vm.userConfig.general.lightIntensity);
    scene.sceneLight = sceneLight;

    sceneLight.model = vm.userConfig.general.lightType.model;
    sceneLight.dist = vm.userConfig.general.lightType.distance;

    if (sceneLight.model == 'Top') {
      sceneLight.position.set(0, sceneLight.dist, 0);
    } else if (sceneLight.model == 'Top Front') {
      sceneLight.position.set(0, sceneLight.dist / Math.sqrt(2), sceneLight.dist / Math.sqrt(2));
    } else if (sceneLight.model == 'Top Front Left') {
      sceneLight.position.set(-sceneLight.dist / Math.sqrt(3), sceneLight.dist / Math.sqrt(3), sceneLight.dist / Math.sqrt(3));
    } else if (sceneLight.model == 'Top Front Right') {
      sceneLight.position.set(sceneLight.dist / Math.sqrt(3), sceneLight.dist / Math.sqrt(3), sceneLight.dist / Math.sqrt(3));
    }

    camera.calculateVisibleHeight = function (distance) {
      visibleHeight = 2 * Math.tan((camera.fov * Math.PI / 180) / 2) * distance;
      return visibleHeight
    };

    camera.calculateDistance = function (objectWidth, objectHeight, maximum) {
      distanceH = (1 / maximum) * objectHeight / (2 * Math.tan((camera.fov * Math.PI / 180) / 2));
      distanceW = (1 / maximum) * objectWidth / (2 * Math.atan(Math.tan((camera.fov * Math.PI / 180) / 2) * window.innerWidth / window.innerHeight));
      if (distanceH > distanceW) {
        return distanceH
      } else {
        return distanceW
      }
    };

    renderer.setClearColor(vm.userConfig.general.bgColor);
    if (vm.userConfig.general.downscale && window.devicePixelRatio > 1) {
      renderer.setPixelRatio(1);
    } else {
      renderer.setPixelRatio(window.devicePixelRatio);
    }
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.enabled = vm.userConfig.general.shadows;
    if (renderer.shadowMap.enabled) {
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    dynamic = [];
    static = [];

    desk = deskService.drawObject(vm.userConfig.desk.width, vm.userConfig.desk.height, vm.userConfig.desk.length, vm.userConfig.desk.thickness, vm.userConfig.desk.color);
    static.push(desk);

    if (vm.userConfig.phone.enabled) {
      phone = phoneService.drawObject(scene, camera, vm.userConfig.phone.x, 0, vm.userConfig.phone.y, vm.userConfig.phone.rotation, vm.userConfig.phone.color);
      dynamic.push(phone);
    }

    if (vm.userConfig.tablet.enabled) {
      tablet = tabletService.drawObject(scene, camera, vm.userConfig.tablet.x, 0, vm.userConfig.tablet.y, vm.userConfig.tablet.rotation, vm.userConfig.tablet.color);
      dynamic.push(tablet);
    }

    if (vm.userConfig.desktop.enabled) {
      desktop = desktopService.drawObject(scene, camera, vm.userConfig.desktop.x, 0, vm.userConfig.desktop.y, vm.userConfig.desktop.color, 0);
      dynamic.push(desktop);
    } else {
      desktop = new THREE.Object3D;
      desktop.position.set(0, 50, 0);
      desktop.defaultPosition = new THREE.Vector3(0, 50, 0);
    }

    if (vm.userConfig.project1.enabled) {
      project1 = portfolioService.drawObject(scene, camera, vm.userConfig.project1.x, 0, vm.userConfig.project1.y, vm.userConfig.project1.color, vm.userConfig.project1.rotation, 'portfolio1', vm.userConfig.project1.logoPath, vm.userConfig.project1.leftImage, vm.userConfig.project1.rightImage);
      dynamic.push(project1);
    }

    if (vm.userConfig.project2.enabled) {
      project2 = portfolioService.drawObject(scene, camera, vm.userConfig.project2.x, 0, vm.userConfig.project2.y, vm.userConfig.project2.color, vm.userConfig.project2.rotation, 'portfolio2', vm.userConfig.project2.logoPath, vm.userConfig.project2.leftImage, vm.userConfig.project2.rightImage);
      dynamic.push(project2);
    }

    if (vm.userConfig.project3.enabled) {
      project3 = portfolioService.drawObject(scene, camera, vm.userConfig.project3.x, 0, vm.userConfig.project3.y, vm.userConfig.project3.color, vm.userConfig.project3.rotation, 'portfolio3', vm.userConfig.project3.logoPath, vm.userConfig.project3.leftImage, vm.userConfig.project3.rightImage);
      dynamic.push(project3);
    }

    if (vm.userConfig.postcard.enabled) {
      postCard = postCardService.drawObject(scene, camera, vm.userConfig.postcard.x, 0, vm.userConfig.postcard.y, vm.userConfig.postcard.rotation);
      dynamic.push(postCard);
      postCardStock = postCardService.drawObjectStock(vm.userConfig.postcard.x, 0, vm.userConfig.postcard.y, vm.userConfig.postcard.rotation);
      static.push(postCardStock);
    }

    if (vm.userConfig.businesscard.enabled) {
      businessCardStock = businessCardService.drawObjectStock(vm.userConfig.businesscard.x, 0, vm.userConfig.businesscard.y, vm.userConfig.businesscard.rotation);
      static.push(businessCardStock);
      businessCard = businessCardService.drawObject(scene, camera, vm.userConfig.businesscard.x, 0, vm.userConfig.businesscard.y, vm.userConfig.businesscard.rotation);
      dynamic.push(businessCard);
    }

    if (vm.userConfig.resume.enabled) {
      personalResume = personalResumeService.drawObject(scene, camera, vm.userConfig.resume.x, 0, vm.userConfig.resume.y, vm.userConfig.resume.rotation);
      dynamic.push(personalResume);
    }

    if (vm.userConfig.coffee.enabled) {
      cup = cupService.drawObject(vm.userConfig.coffee.x, 0, vm.userConfig.coffee.y, vm.userConfig.coffee.rotation);
      static.push(cup);
    }

    if (vm.userConfig.leftSpeaker.enabled) {
      leftSpeaker = speakerService.drawObject(vm.userConfig.leftSpeaker.x, 13.5, vm.userConfig.leftSpeaker.y, vm.userConfig.leftSpeaker.rotation, 'leftSpeaker');
      static.push(leftSpeaker);
    }

    if (vm.userConfig.rightSpeaker.enabled) {
      rightSpeaker = speakerService.drawObject(vm.userConfig.rightSpeaker.x, 13.5, vm.userConfig.rightSpeaker.y, vm.userConfig.rightSpeaker.rotation, 'rightSpeaker');
      static.push(rightSpeaker);
    }

    if (vm.userConfig.keyboard.enabled) {
      keyboard = keyboardService.drawObject(vm.userConfig.keyboard.x, 0, vm.userConfig.keyboard.y, vm.userConfig.keyboard.rotation);
      static.push(keyboard);
    }

    if (vm.userConfig.mouse.enabled) {
      mouseObj = mouseService.drawObject(vm.userConfig.mouse.x, 0, vm.userConfig.mouse.y, vm.userConfig.mouse.rotation);
      static.push(mouseObj);
    }

    if (vm.userConfig.tableLamp.enabled) {
      tableLamp = tableLampService.drawObject(vm.userConfig.tableLamp.x, 0, vm.userConfig.tableLamp.y, vm.userConfig.tableLamp.color);
      static.push(tableLamp);
    }

    scene.add(activeObjectLight);
    scene.add(ambientLight);
    scene.add(sceneLight);

    raycastingObjects = [];

    static.forEach(function (element) {
      scene.add(element);
      if (element.rayReceiver) {
        if (element.rayReceiver.length > 0) {
          element.rayReceiver.forEach(function (child) {
            raycastingObjects.push(child);
          })
        } else {
          raycastingObjects.push(element.rayReceiver);
        }
      }
    });

    dynamic.forEach(function (element) {
      scene.add(element);
      if (element.rayReceiver) {
        if (element.rayReceiver.length > 0) {
          element.rayReceiver.forEach(function (child) {
            raycastingObjects.push(child);
          })
        } else {
          raycastingObjects.push(element.rayReceiver);
        }
      }
    });
  }

  function webglAvailable() {
    try {
      var canvas = document.createElement('canvas');
      return !!
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  }

  function init() {
    // document.addEventListener('mousemove', onDocumentMouseMove, false);
    // document.addEventListener('mousedown', onDocumentClick, false);
    $(document).on('mousemove', '#homeWrapper', onDocumentMouseMove);
    $(document).on('mousedown', '#homeWrapper', onDocumentClick);
    raycaster = new THREE.Raycaster();
    window.addEventListener('resize', onWindowResize, false);
    container = document.createElement('div');
    container = angular.element(document.getElementById('homeWrapper'));

    renderer = webglAvailable() ? new THREE.WebGLRenderer({
      antialias: vm.userConfig.general.antialiasing
    }) : alert('You\'ve disabled Hardware Acceleration in your browser\'s settings. Please enable it to view this page.');

    generateScene();

    container.append(renderer.domElement);

    $rootScope.$on('$stateChangeSuccess', function (t, dest) {
      if (dest.url == '/') {
        handleBringBack();
      } else {
        for (var i = 0; i < dynamic.length; i++) {
          if (dynamic[i].name == dest.url) {
            handleBringToFront(dest.url, dynamic[i]);
          }
        }
      }
    });
  }

  var pageShown = false;

  function showPageOnLoad() {
    if (!pageShown) {
      pageShown = true;
      bringToDesktop(camera).then(function () {
        $timeout(function () {
          $rootScope.pageLoaded = true;
          $timeout(function () {
            bringFromDesktop(camera).then(function () {

            });
          }, 500);
        });
      });
    }
  }
  var framesLoaded = 0;
  var loadIntervalCount = 0;
  var everythingLoaded;
  window.onload = function () {
    $('iframe').on('load', function () {
      framesLoaded++;
    });
    everythingLoaded = setInterval(function () {
      if (loadIntervalCount <= 30) {
        loadIntervalCount++;
        if (framesLoaded >= urlFramesCount) {
          showPageOnLoad();
          clearInterval(everythingLoaded);
        }
      } else {

      }


    }, 100);
  };

  setTimeout(function () {
    showPageOnLoad();
    clearInterval(everythingLoaded);
  }, 7000);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onDocumentMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (!scene.currentObject && camera.elastic && !scene.loading) {
      var timeDelay = Math.abs((mouse.x + mouse.y) / 2);
      TweenMax.killTweensOf(camera.position);
      if (camera.model == 'Top') {
        TweenMax.to(camera.position, 0.5 + timeDelay, {
          x: camera.defaultPosition.x,
          z: camera.defaultPosition.z + 30 * Math.abs(mouse.y) + 30 * Math.abs(mouse.x),
          y: camera.defaultPosition.y
        });
      } else if (camera.model == 'Top Front') {
        TweenMax.to(camera.position, 0.5 + timeDelay, {
          x: camera.defaultPosition.x + 10 * mouse.x,
          z: camera.defaultPosition.z + 10 * mouse.x,
          y: camera.defaultPosition.y + 10 * mouse.y
        });
      } else if (camera.model == 'Top Front Left') {
        TweenMax.to(camera.position, 0.5 + timeDelay, {
          x: camera.defaultPosition.x + 10 * mouse.x,
          z: camera.defaultPosition.z + 10 * mouse.x,
          y: camera.defaultPosition.y + 10 * mouse.y
        });
      } else if (camera.model == 'Top Front Right') {
        TweenMax.to(camera.position, 0.5 + timeDelay, {
          x: camera.defaultPosition.x - 10 * mouse.x,
          z: camera.defaultPosition.z + 10 * mouse.x,
          y: camera.defaultPosition.y + 10 * mouse.y
        });
      }
    }
  }

  function handleBringBack() {
    if (!isAnimating && scene.currentObject) {
      isAnimating = true;
      $timeout(function () {
        if (getConfigObject(scene.currentObject.name).onHideStart != undefined) getConfigObject(scene.currentObject.name).onHideStart();
        $timeout(function () {
          scene.currentObject.bringBack().then(function () {
            $state.go('app');
            isAnimating = false;
          });
          $rootScope.showingItem = false;
          $scope.$apply();
        }, getConfigObject(scene.currentObject.name).objectReverseDelay || 0);
      });
    }
  }

  function handleBringToFront(itemName, obj) {
    if (!isAnimating && !scene.currentObject) {
      $rootScope.showingItem = true;
      $rootScope.$apply();
      isAnimating = true;
      obj.bringToFront().then(function (res) {
        $timeout(function () {
          isAnimating = false;
          $state.go('app.' + itemName);
          $scope.$apply();
          if (getConfigObject(itemName).onShowComplete != undefined) getConfigObject(itemName).onShowComplete(res);
        });
      });
    }
  }


  function onDocumentClick() {
    if (!isAnimating) {
      if (!scene.currentObject && INTERSECTED) {
        if (INTERSECTED.class == 'dynamic' && INTERSECTED.name.length > 0) {
          var itemName = INTERSECTED.name;
          handleBringToFront(itemName, INTERSECTED);
        } else if (INTERSECTED.name == 'tableLamp') {
          if (!INTERSECTED.turnedOn) {
            INTERSECTED.turnLampOn();
            INTERSECTED.turnedOn = true;
          } else {
            INTERSECTED.turnLampOff();
            INTERSECTED.turnedOn = false;
          }
        } else if (INTERSECTED.name == 'leftSpeaker') {
          if (!INTERSECTED.turnedOn) {
            INTERSECTED.turnSpeakerOn();
            INTERSECTED.turnedOn = true;
          } else {
            INTERSECTED.turnSpeakerOff();
            INTERSECTED.turnedOn = false;
          }
        }
      } else if (scene.currentObject) {
        if (!INTERSECTED || INTERSECTED != scene.currentObject) {
          handleBringBack();
        }
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }


  function render() {

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(raycastingObjects);
    if (intersects.length > 0) {
      if (INTERSECTED != intersects[0].object.ancestor) {
        if (INTERSECTED) {
          if (INTERSECTED.class == 'dynamic' && !isAnimating) {
            INTERSECTED.hovered = false;
            INTERSECTED.handleObjectHover();
          }
        }
        INTERSECTED = intersects[0].object.ancestor;
        if (INTERSECTED.class == 'dynamic' && !isAnimating) {
          INTERSECTED.hovered = true;
          INTERSECTED.handleObjectHover();
        }
      }
    } else {
      if (INTERSECTED) {
        if (INTERSECTED.class == 'dynamic' && !isAnimating) {
          INTERSECTED.hovered = false;
          INTERSECTED.handleObjectHover();
        }
      }
      INTERSECTED = null;
    }

    if (scene.currentObject != desktop && !scene.loading) {
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    renderer.render(scene, camera);
  }
}
