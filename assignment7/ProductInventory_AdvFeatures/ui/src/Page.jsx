import React from 'react';
import {
  Navbar, Nav, NavItem, Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Contents from './Contents.jsx';
import ProductAddNavItem from './ProductAddNavItem.jsx';


function NavBar() {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>Product Inventory</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer exact to="/products">
          <NavItem>Product List</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <ProductAddNavItem />
      </Nav>
    </Navbar>
  );
}


export default function Page() {
  return (
    <div>
      <NavBar />
      <Grid fluid>
        <Contents />
      </Grid>
    </div>
  );
}
