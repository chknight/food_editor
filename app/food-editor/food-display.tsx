
import { useEffect, useRef } from "react";
import { Engine, EngineOptions, Scene, SceneOptions } from "@babylonjs/core";

export interface FoodDisplayProps {
    antialias: boolean
    onRender: any, 
    onSceneReady: any,
    engineOptions?: EngineOptions, 
    adaptToDeviceRatio?: boolean,
    sceneOptions?: SceneOptions
}

export default function FoodDisplay({ antialias, onRender, onSceneReady, engineOptions, adaptToDeviceRatio, sceneOptions }: FoodDisplayProps) {
  const reactCanvas = useRef(null);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
    const scene = new Scene(engine, sceneOptions);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);

  return <canvas ref={reactCanvas} width="600px" height="600px"/>;
};