import { useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import { ApproverNav, ClientNav, CookNav, DriverNav, FinanceNav } from "./nav";
import { Nav } from "./nav";
import Main from "./main";
import ShiftsHeader from "./shiftsHeader";
import AdminHeader from "./AdminHeader";
import DriverHeader from "./DriverHeader";
import CookHeader from "./CookHeader";
import ClientHeader from "./ClientHeader";
import Header from "./header";

// ----------------------------------------------------------------------

export function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)}  />
      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main style={{background:"#F2F5F7", height:"80rem"}}>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export function ShiftLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <ShiftsHeader onOpenNav={() => setOpenNav(true)} style={{Background:"F2F5F7"}} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main >{children}</Main>
      </Box>
    </>
  );
}

ShiftLayout.propTypes = {
  children: PropTypes.node,
};

export function AdminLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <AdminHeader onOpenNav={() => setOpenNav(true)} style={{Background:"F2F5F7"}} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main >{children}</Main>
      </Box>
    </>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node,
};

export function FinanceLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <AdminHeader onOpenNav={() => setOpenNav(true)} style={{Background:"F2F5F7"}} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <FinanceNav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main >{children}</Main>
      </Box>
    </>
  );
}

FinanceLayout.propTypes = {
  children: PropTypes.node,
};

export function ApproverLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <AdminHeader onOpenNav={() => setOpenNav(true)} style={{Background:"F2F5F7"}} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <ApproverNav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main >{children}</Main>
      </Box>
    </>
  );
}

ApproverLayout.propTypes = {
  children: PropTypes.node,
};

export function DriverLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <DriverHeader onOpenNav={() => setOpenNav(true)} style={{Background:"F2F5F7"}} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <DriverNav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main >{children}</Main>
      </Box>
    </>
  );
}

DriverLayout.propTypes = {
  children: PropTypes.node,
};

export function CookLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <CookHeader onOpenNav={() => setOpenNav(true)} style={{Background:"F2F5F7"}} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <CookNav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main >{children}</Main>
      </Box>
    </>
  );
}

CookLayout.propTypes = {
  children: PropTypes.node,
};

export function ClientLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <ClientHeader onOpenNav={() => setOpenNav(true)} style={{Background:"F2F5F7"}} />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <ClientNav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main >{children}</Main>
      </Box>
    </>
  );
}

ClientLayout.propTypes = {
  children: PropTypes.node,
};
