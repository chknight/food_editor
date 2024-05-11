'use client'

import Image from "next/image";
import styles from "./page.module.css";
import FoodDisplay from "./food-display";
import { AxesViewer, DebugBlock, FreeCamera, HemisphericLight, Mesh, MeshBuilder, Vector3 } from "@babylonjs/core";
import { Box, Container, Typography } from "@mui/material";
import ControlPanel from "./control-panel/control-panel";
import { useEffect, useState } from "react";

export default function FoodEditor() {
    let food: Mesh;

    const [height, setHeight] = useState(1);
    const [width, setWidth] = useState(1);
    const [length, setLength] = useState(1);


    useEffect(() => {
        food.scaling = new Vector3(width, height, length);
    }, [height, width, length]);

    const onSceneReady = (scene) => {
        // This creates and positions a free camera (non-mesh)
        const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());

        const canvas = scene.getEngine().getRenderingCanvas();

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'box' shape.
        food = MeshBuilder.CreateSphere("apple", { diameter: 2 }, scene);

        // Move the box upward 1/2 its height
        food.position.y = 1;
    };

    /**
     * Will run on every frame render.  We are spinning the box on y-axis.
     */
    const onRender = (scene) => {
        if (food !== undefined) {
            const deltaTimeInMillis = scene.getEngine().getDeltaTime();

            const rpm = 10;
            food.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        }
    };

    return (
        <Box width="100%">
            <Typography variant="h2" component="h2">
                Food Editor
            </Typography>
            <Box>
                <FoodDisplay antialias onSceneReady={onSceneReady} onRender={onRender} />
            </Box>
            <Box marginTop="2em">
                <ControlPanel height={height} setHeight={setHeight} width={width} setWidth={setWidth} length={length} setLength={setLength}/>
            </Box>
        </Box>
    );
}
