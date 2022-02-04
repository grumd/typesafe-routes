import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { intParser, Link, route, useRouteParams } from "..";

// example taken from https://reactrouter.com/

const homeRoute = route("/", {}, {});

const invoiceRoute = route(":invoice", { invoice: intParser }, {});

const invoicesRoute = route("invoices", {}, { invoice: invoiceRoute });

const salesRoute = route("sales", {}, { invoices: invoiceRoute });


const Root = () =>
  <BrowserRouter>
    <Routes>
      <Route path={homeRoute.template} element={<App />}>
        <Route path={salesRoute.template} element={<Sales />}>
          <Route path={invoicesRoute.template} element={<Invoices />}>
            <Route path={invoiceRoute.template} element={<Invoice />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>;

const App = () =>
  <>
    <h2>React Router v6 Demo</h2>
    <Link to={homeRoute({})}>home</Link>
    <h2>Home</h2>
    <Link to={salesRoute({})}>sales</Link>
    <Outlet />
  </>;

const Sales = () =>
  <>
    <h3>Sales</h3>
    <Link to={invoicesRoute({})}>invoices</Link>
    <Outlet />
  </>;

const Invoices = () =>
  <>
    <h4>Invoices</h4>
    <ul>
      <li>
        <Link to={invoiceRoute({ invoice: 1234 })}>invoice #1234</Link>
      </li>
      <li>
        <Link to={invoiceRoute({ invoice: 5678 })}>invoice #5678</Link>
      </li>
      <li>
        <Link to={invoiceRoute({ invoice: 9012 })}>invoice #9012</Link>
      </li>
    </ul>
    <Outlet />
  </>;

const Invoice = () => {
  const { invoice } = useRouteParams(invoiceRoute);
  return (
    <h5>Invoice #{invoice}</h5>
  );
}

render(<Root />, document.getElementById("app"));
