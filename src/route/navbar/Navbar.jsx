import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Fragment} from "react";
import {Outlet} from "react-router-dom";

const menus = [
    {
        title:'Player Status',
        path: '/player-status'
    },
    {
        title:'Cards List',
        path: '/cards-list'
    },
];
export const Navbar = () => {

    return (
        <Fragment>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {menus.map(({title, path}) => (
                                <Button key={title} href={path} style={{ backgroundColor: "#0c1334e8" }}>
                                    {title}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet/>
        </Fragment>
    );
}