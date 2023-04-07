// src/__tests__/App.test.js
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../pages/_app";
import type { AppProps } from 'next/app';
import { RouterContext } from "next/dist/shared/lib/router-context";
import { MemoryRouter } from "next-router-mock";

test("renders App component", () => {
  const mockRouter = new MemoryRouter();

  const appProps: AppProps = {
    Component: () => <div>Mock Page Component</div>,
    pageProps: {},
    router: mockRouter as any,
  };

  render(
    <RouterContext.Provider value={mockRouter as any}>
      <App {...appProps} />
    </RouterContext.Provider>
  );
  const appElement = screen.getByTestId("app");
  expect(appElement).toBeInTheDocument();
});
