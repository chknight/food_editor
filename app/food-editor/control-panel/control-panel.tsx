import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FormControl, InputLabel, Slider, Stack, Typography } from '@mui/material';

export default function ControlPanel({ height, setHeight, width, setWidth, length, setLength }) {

    const handleHeightChange = (event: Event, newValue: number | number[]) => {
        setHeight(newValue as number);
    };

    const handleWidthChange = (event: Event, newValue: number | number[]) => {
        setWidth(newValue as number);
    };

    const handleLengthChange = (event: Event, newValue: number | number[]) => {
        setLength(newValue as number);
    };

    return <Grid container spacing={4}>
        <Grid xs={6}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <Typography variant="body1">Height</Typography>
                <Slider min={0.5} max={10} step={0.2} value={height} onChange={handleHeightChange} name="height" />
            </Stack>
        </Grid>
        <Grid xs={6}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <Typography variant="body1">Width</Typography>
                <Slider min={0.5} max={10} step={0.2} value={width} onChange={handleWidthChange} name="height" />
            </Stack>
        </Grid>
        <Grid xs={6}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <Typography variant="body1">Length</Typography>
                <Slider min={0.5} max={10} step={0.2} value={length} onChange={handleLengthChange} name="height" />
            </Stack>
        </Grid>
    </Grid>
}