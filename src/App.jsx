import { useEffect } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    let loadedModel;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/vikki/vikki.gltf', (gltfScene) => {
      loadedModel = gltfScene;

      gltfScene.scene.rotation.set(0, 0, 0); // Set rotation to 0, 0, 0 for straight orientation
      gltfScene.scene.position.y = -10; // Set position to 0 for the center of the scene
      gltfScene.scene.scale.set(10, 10, 10); // Set scale to 1 for original size
      test.scene.add(gltfScene.scene);
    });

    const animate = () => {
      if (loadedModel) {
        loadedModel.scene.rotation.y += 0.01; // Rotate only around the Y-axis
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;

