'use client'
import React from 'react'
import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles';


const roboto = Roboto({
    weight: ['300' , '500' , '700'],
    subsets: ['latin'],
    display: 'swap'
})

const theme = createTheme({
    typography : {
        fontFamily: roboto.style.fontFamily,
    },
    direction: 'rtl',
})

export default theme
