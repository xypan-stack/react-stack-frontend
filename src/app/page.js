'use client'
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Box, Grid, Typography} from '@mui/material';

function HoverTrans(){
    return(
        <Box 
            sx={{
                position: 'relative',
                height: '200px',
                width: '200px',
                transformStyle: 'preserve-3d', 
                transition: '2s ',
                '&:hover': {
                    transform: 'rotateY(180deg)',
                }
                }}>
        {/* 正面 */}
        <Box 
            sx={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                background: 'url(images/global.png) center/cover',
                backfaceVisibility: 'hidden', 
            }} />
        
        {/* 背面 */}
        <Box 
            sx={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                background: 'url(images/icon.png) center/cover',
                transform: 'rotateY(180deg)', 
                backfaceVisibility: 'hidden',
            }} />
        </Box>
    )

}
export default function Home() {
    return(
        <HoverTrans/>
    )

}