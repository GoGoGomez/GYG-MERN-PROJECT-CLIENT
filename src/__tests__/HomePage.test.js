import React from "react";
import renderer from "react-test-renderer";
import HomePage from "../components/HomePage";
import { MemoryRouter as Router, withRouter } from "react-router-dom";

test("HomePage renders correctly", () => {
  const component = renderer.create(<Router><HomePage /></Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});