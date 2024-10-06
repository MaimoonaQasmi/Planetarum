define(
  [
    'Environment/Constants'
  ],
  function(Constants) {
    'use strict';
  
    class Orbit {
      constructor(object) {
        this._object = object;
        this._color = this.getDefaultColor();
        this._orbit = this.createOrbit();
        this.setOrbitInclination();
      }
  
      getDefaultColor() {
        var colors = [
          new THREE.Color('#FF69B4'), // bright pink
          new THREE.Color('#34C759'), // bright green
          new THREE.Color('#7A288A'), // bright purple
          new THREE.Color('#03A9F4'), // bright blue
          new THREE.Color('#F7DC6F'), // bright yellow
          new THREE.Color('#FFC107'), // bright orange
          new THREE.Color('#8BC34A'), // bright lime
          new THREE.Color('#03A9F4'), // bright cyan
          new THREE.Color('#9C27B0'), // bright magenta
          new THREE.Color('#2196F3'), // bright sky blue
          new THREE.Color('#4CAF50'), // bright teal
          new THREE.Color('#FF9800'), // bright coral
          new THREE.Color('#9E9E9E'), // bright gray
          new THREE.Color('#795548'), // bright brown
          new THREE.Color('#3F51B5'), // bright indigo
          new THREE.Color('#FF4081'), // bright salmon
          new THREE.Color('#C51162'), // bright fuchsia
          new THREE.Color('#8E24AA'), // bright plum
          new THREE.Color('#4DB6AC'), // bright seafoam
          new THREE.Color('#F48FB1'), // bright blush
        ];
        var index = Orbit.colorIndex++;
        return colors[index % colors.length];
      }
  
      get orbit() {
        return this._orbit;
      }
  
      get color() {
        return this._color;
      }
  
      set color(color) {
        this._color = color;
      }
  
      createOrbit() {
        var resolution = this._object.threeDistanceFromParent + 15 * 50; // segments in the line
        var length = 360 / resolution;
        var orbitLine = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial({
          color: this._color,
          linewidth: 1,
          fog: true
        });
      
        // Build the orbit line
        for (var i = 0; i <= resolution; i++) {
          var segment = (i * length) * Math.PI / 180;
          var orbitAmplitude = this._object.threeParent.threeRadius + this._object.threeDistanceFromParent;
          orbitLine.vertices.push(
            new THREE.Vector3(
              Math.cos(segment) * orbitAmplitude,
              Math.sin(segment) * orbitAmplitude,
              0
            )
          );
        }
      
        var line = new THREE.Line(orbitLine, material);
      
        line.position.set(0, 0, 0);
      
        return line;
      }
  
      setOrbitInclination() {
        this._object.orbitCentroid.rotation.x = this._object.orbitalInclination * Constants.degreesToRadiansRatio;
      }
    }
  
    Orbit.colorIndex = 0;
  
    return Orbit;
  });