import React, {useState} from "react";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { SidebarData} from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

const Nav = styled.div`
  background: #290c4a;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  `;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

`;

const SidebarNav = styled.nav`
  background: #290c4a;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 32px;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;
const SidebarWrap = styled.div`
width: 100%;
`;
const Sidebar = () => {

  const [sidebar,setSidebar] =useState(true)
  const showSideBar = () => setSidebar(!sidebar)
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSideBar} />
          </NavIcon>
          <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
              <NavIcon to="#">
                <FaIcons.FaBars onClick={showSideBar} />
              </NavIcon>
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
          </SidebarNav>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
