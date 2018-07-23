import React from "react";
import renderer from "react-test-renderer";
import Header from "../components/Header";
import { MemoryRouter as Router, withRouter } from "react-router-dom";

test("Header renders correctly", () => {
  const component = renderer.create(<Router><Header /></Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
