(function () {
  'use strict';

  angular.module('app').factory('drawService', drawService);

  drawService.$inject = ['$q', '$filter', '$timeout', '$http'];

  function drawService($q, $filter, $timeout, $http) {

    var service = {
      createRoundedRectangle: createRoundedRectangle,
      getDirection: getDirection,
      defaultBringToFront: defaultBringToFront,
      defaultBringBack: defaultBringBack,
      defaultHoverTween: defaultHoverTween
    };

    return service

    function createRoundedRectangle(shape, shapeWidth, shapeHeight, cornerSize) {
      var roundFactor = (0.4 * cornerSize);
      shape.moveTo(-(shapeWidth / 2 - cornerSize), (shapeHeight / 2));
      shape.lineTo((shapeWidth / 2 - cornerSize), (shapeHeight / 2));
      shape.bezierCurveTo((shapeWidth / 2 - roundFactor), (shapeHeight / 2), (shapeWidth / 2), (shapeHeight / 2 - roundFactor), (shapeWidth / 2), (shapeHeight / 2 - cornerSize));
      shape.lineTo((shapeWidth / 2), -(shapeHeight / 2 - cornerSize));
      shape.bezierCurveTo((shapeWidth / 2), -(shapeHeight / 2 - roundFactor), (shapeWidth / 2 - roundFactor), -(shapeHeight / 2), (shapeWidth / 2 - cornerSize), -(shapeHeight / 2));
      shape.lineTo(-(shapeWidth / 2 - cornerSize), -(shapeHeight / 2));
      shape.bezierCurveTo(-(shapeWidth / 2 - roundFactor), -(shapeHeight / 2), -(shapeWidth / 2), -(shapeHeight / 2 - roundFactor), -(shapeWidth / 2), -(shapeHeight / 2 - cornerSize));
      shape.lineTo(-(shapeWidth / 2), (shapeHeight / 2 - cornerSize));
      shape.bezierCurveTo(-(shapeWidth / 2), (shapeHeight / 2 - roundFactor), -(shapeWidth / 2 - roundFactor), (shapeHeight / 2), -(shapeWidth / 2 - cornerSize), (shapeHeight / 2));
    }

    function getDirection(value) {
      if (value != 0) {
        return value / Math.abs(value);
      } else {
        return 1;
      }
    }

    function defaultBringToFront(object, scene, camera, t) {
      var maximum;

      if (object.fillPercentage) {
        maximum = object.fillPercentage;
      } else {
        maximum = 0.95;
      }
      var distance = camera.calculateDistance(object.objectWidth, object.objectHeight, maximum);

      if (camera.model == 'Top') {
        object.distanceX = 0;
        object.distanceY = distance;
        object.distanceZ = 0;
      } else if (camera.model == 'Top Front') {
        object.distanceX = 0;
        object.distanceY = distance / Math.sqrt(2);
        object.distanceZ = distance / Math.sqrt(2);
      } else if (camera.model == 'Top Front Left') {
        object.distanceX = distance / Math.sqrt(3);
        object.distanceY = distance / Math.sqrt(3);
        object.distanceZ = distance / Math.sqrt(3);
      } else if (camera.model == 'Top Front Right') {
        object.distanceX = distance / Math.sqrt(3);
        object.distanceY = distance / Math.sqrt(3);
        object.distanceZ = distance / Math.sqrt(3);
      }

      var defer = $q.defer();
      TweenMax.killTweensOf(object.position);
      TweenMax.killTweensOf(object.rotation);
      scene.currentObject = object;

      var timeline = new TimelineMax({
        onComplete: function () {
          var pixelAspect = window.innerHeight / camera.calculateVisibleHeight(distance - object.screen.distance);
          defer.resolve({
            width: (pixelAspect * object.screen.width),
            height: (pixelAspect * object.screen.height),
            calculatedScale: (pixelAspect * object.screen.height)
          });
        }
      });
      if (object.parts) {
        object.parts.forEach(function (element) {
          TweenMax.killTweensOf(element.position);
          TweenMax.killTweensOf(element.rotation);

          timeline.to(element.rotation, t / 3 * 2, {
            ease: Power1.easeIn,
            x: element.destinationRotation.x,
            y: element.destinationRotation.y,
            z: element.destinationRotation.z
          }, 0);

          timeline.to(element.position, t / 3 * 2, {
            ease: Power1.easeIn,
            x: element.destinationPosition.x,
            y: element.destinationPosition.y,
            z: element.destinationPosition.z
          }, 0);
        });
      }
      timeline.to(camera.position, t, {
        ease: Power1.easeInOut,
        x: camera.defaultPosition.x,
        y: camera.defaultPosition.y,
        z: camera.defaultPosition.z
      }, 0);

      timeline.to(object.position, t, {
        ease: Power1.easeInOut,
        y: camera.defaultPosition.y - object.distanceY * getDirection(camera.defaultPosition.y),
      }, 0);

      var activeObjectLight = scene.activeObjectLight;
      activeObjectLight.target = object;
      timeline.to(activeObjectLight, t, {
        ease: Power2.easeOut,
        intensity: activeObjectLight.defaultIntensity
      }, 0);

      var sceneLight = scene.sceneLight;
      sceneLight.target = object;
      timeline.to(sceneLight, t, {
        ease: Power2.easeOut,
        intensity: 0
      }, 0);

      timeline.to(object.rotation, t, {
        ease: Power1.easeInOut,
        y: camera.defaultRotation.y,
        x: camera.defaultRotation.x,
        z: camera.defaultRotation.z
      }, 0);

      timeline.to(object.position, 0.8 * t, {
        ease: Power1.easeInOut,
        x: camera.defaultPosition.x - object.distanceX * getDirection(camera.defaultPosition.x),
        z: camera.defaultPosition.z - object.distanceZ * getDirection(camera.defaultPosition.z)
      }, 0.2 * t);

      return defer.promise
    }

    function defaultBringBack(object, scene, camera, t) {
      var defer = $q.defer();
      TweenMax.killTweensOf(object.position);
      TweenMax.killTweensOf(object.rotation);

      var timeline = new TimelineMax({
        onComplete: function () {
          scene.currentObject = false;
          defer.resolve();
        }
      });

      if (object.parts) {
        object.parts.forEach(function (element) {
          TweenMax.killTweensOf(element.position);
          TweenMax.killTweensOf(element.rotation);

          timeline.to(element.rotation, t, {
            ease: Power1.easeInOut,
            x: element.defaultRotation.x,
            y: element.defaultRotation.y,
            z: element.defaultRotation.z
          }, 0);

          timeline.to(element.position, t, {
            ease: Power1.easeInOut,
            x: element.defaultPosition.x,
            y: element.defaultPosition.y,
            z: element.defaultPosition.z
          }, 0);
        })
      }

      var t = 0.75;

      var activeObjectLight = scene.activeObjectLight;
      timeline.to(activeObjectLight, t, {
        ease: Power2.easeIn,
        intensity: 0
      }, 0);

      var sceneLight = scene.sceneLight;
      sceneLight.target = object;
      timeline.to(sceneLight, t, {
        ease: Power2.easeIn,
        intensity: sceneLight.defaultIntensity
      }, 0);

      timeline.to(object.rotation, t, {
        ease: Power1.easeInOut,
        x: object.defaultRotation.x,
        y: object.defaultRotation.y,
        z: object.defaultRotation.z
      }, 0);

      timeline.to(object.position, 0.8 * t, {
        ease: Power1.easeInOut,
        x: object.defaultPosition.x,
        z: object.defaultPosition.z
      }, 0);

      timeline.to(object.position, t, {
        ease: Power1.easeInOut,
        y: object.defaultPosition.y,
      }, 0);

      return defer.promise
    }

    function defaultHoverTween(object, scene, camera, t) {
      if (!scene.currentObject) {
        if (object.position.y == object.defaultPosition.y && object.hovered) {
          var hoverTimeline = new TimelineMax({
            onComplete: function () {
              if (object.hovered) {
                hoverTimeline.restart();
              }
            }
          });

          hoverTimeline.to(object.position, t, {
            ease: Power1.easeInOut,
            x: object.hoverDestinationPosition.x,
            y: object.hoverDestinationPosition.y,
            z: object.hoverDestinationPosition.z
          }, 0);

          hoverTimeline.to(object.rotation, t, {
            ease: Power1.easeInOut,
            x: object.hoverDestinationRotation.x,
            y: object.hoverDestinationRotation.y,
            z: object.hoverDestinationRotation.z
          }, 0);

          hoverTimeline.to(object.position, t, {
            ease: Power1.easeInOut,
            x: object.defaultPosition.x,
            y: object.defaultPosition.y,
            z: object.defaultPosition.z
          }, t);

          hoverTimeline.to(object.rotation, t, {
            ease: Power1.easeInOut,
            x: object.defaultRotation.x,
            y: object.defaultRotation.y,
            z: object.defaultRotation.z
          }, t);

          if (object.parts) {
            object.parts.forEach(function (element) {
              hoverTimeline.to(element.position, t, {
                ease: Power1.easeIn,
                x: element.hoverDestinationPosition.x,
                y: element.hoverDestinationPosition.y,
                z: element.hoverDestinationPosition.z
              }, 0);

              hoverTimeline.to(element.rotation, t, {
                ease: Power1.easeIn,
                x: element.hoverDestinationRotation.x,
                y: element.hoverDestinationRotation.y,
                z: element.hoverDestinationRotation.z
              }, 0);

              hoverTimeline.to(element.position, t, {
                ease: Power1.easeIn,
                x: element.defaultPosition.x,
                y: element.defaultPosition.y,
                z: element.defaultPosition.z
              }, t);

              hoverTimeline.to(element.rotation, t, {
                ease: Power1.easeIn,
                x: element.defaultRotation.x,
                y: element.defaultRotation.y,
                z: element.defaultRotation.z
              }, t);
            })
          }

        } else if (object.position.y != object.defaultPosition.y && object.hovered) {
          var hoverBackTimeline = new TimelineMax({
            onComplete: function () {
              hoverTimeline.restart();
            }
          });

          TweenMax.killTweensOf(object.position);
          TweenMax.killTweensOf(object.rotation);

          hoverBackTimeline.to(object.position, (object.position.y - object.defaultPosition.y) / (object.hoverDestinationPosition.y - object.defaultPosition.y) * t, {
            ease: Power1.easeInOut,
            x: object.defaultPosition.x,
            y: object.defaultPosition.y,
            z: object.defaultPosition.z,
          }, 0);

          hoverBackTimeline.to(object.rotation, (object.position.y - object.defaultPosition.y) / (object.hoverDestinationPosition.y - object.defaultPosition.y) * t, {
            ease: Power1.easeInOut,
            x: object.defaultRotation.x,
            y: object.defaultRotation.y,
            z: object.defaultRotation.z,
          }, 0);

          var hoverTimeline = new TimelineMax({
            onComplete: function () {
              if (object.hovered) {
                hoverTimeline.restart();
              }
            }
          });

          hoverTimeline.pause();

          if (object.parts) {
            object.parts.forEach(function (element) {
              TweenMax.killTweensOf(element.position);
              TweenMax.killTweensOf(element.rotation);

              hoverTimeline.to(element.position, t, {
                ease: Power1.easeIn,
                x: element.hoverDestinationPosition.x,
                y: element.hoverDestinationPosition.y,
                z: element.hoverDestinationPosition.z
              }, 0);

              hoverTimeline.to(element.rotation, t, {
                ease: Power1.easeIn,
                x: element.hoverDestinationRotation.x,
                y: element.hoverDestinationRotation.y,
                z: element.hoverDestinationRotation.z
              }, 0);

              hoverTimeline.to(element.position, t, {
                ease: Power1.easeIn,
                x: element.defaultPosition.x,
                y: element.defaultPosition.y,
                z: element.defaultPosition.z
              }, t);

              hoverTimeline.to(element.rotation, t, {
                ease: Power1.easeIn,
                x: element.defaultRotation.x,
                y: element.defaultRotation.y,
                z: element.defaultRotation.z
              }, t);
            })
          };

          hoverTimeline.to(object.position, t, {
            ease: Power1.easeInOut,
            x: object.hoverDestinationPosition.x,
            y: object.hoverDestinationPosition.y,
            z: object.hoverDestinationPosition.z
          }, 0);

          hoverTimeline.to(object.rotation, t, {
            ease: Power1.easeInOut,
            x: object.hoverDestinationRotation.x,
            y: object.hoverDestinationRotation.y,
            z: object.hoverDestinationRotation.z
          }, 0);

          hoverTimeline.to(object.position, t, {
            ease: Power1.easeInOut,
            x: object.defaultPosition.x,
            y: object.defaultPosition.y,
            z: object.defaultPosition.z
          }, t);

          hoverTimeline.to(object.rotation, t, {
            ease: Power1.easeInOut,
            x: object.defaultRotation.x,
            y: object.defaultRotation.y,
            z: object.defaultRotation.z
          }, t);

        } else if (!object.hovered) {
          TweenMax.killTweensOf(object.position);
          TweenMax.killTweensOf(object.rotation);
          TweenMax.to(object.position, (object.position.y - object.defaultPosition.y) / (object.hoverDestinationPosition.y - object.defaultPosition.y) * t, {
            ease: Power1.easeInOut,
            x: object.defaultPosition.x,
            y: object.defaultPosition.y,
            z: object.defaultPosition.z
          });

          TweenMax.to(object.rotation, (object.position.y - object.defaultPosition.y) / (object.hoverDestinationPosition.y - object.defaultPosition.y) * t, {
            ease: Power1.easeInOut,
            x: object.defaultRotation.x,
            y: object.defaultRotation.y,
            z: object.defaultRotation.z
          });

          if (object.parts) {
            object.parts.forEach(function (element) {
              TweenMax.killTweensOf(element.position);
              TweenMax.killTweensOf(element.rotation);
              TweenMax.to(element.position, (object.position.y - object.defaultPosition.y) / (object.hoverDestinationPosition.y - object.defaultPosition.y) * t, {
                ease: Power1.easeInOut,
                x: element.defaultPosition.x,
                y: element.defaultPosition.y,
                z: element.defaultPosition.z,
              });
              TweenMax.to(element.rotation, (object.position.y - object.defaultPosition.y) / (object.hoverDestinationPosition.y - object.defaultPosition.y) * t, {
                ease: Power1.easeInOut,
                x: element.defaultRotation.x,
                y: element.defaultRotation.y,
                z: element.defaultRotation.z,
              });
            });
          }
        }
      }
    }


  }
})();
