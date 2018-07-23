import React from "react";
import renderer from "react-test-renderer";
import Item from "../components/Item";

test("Item renders correctly", () => {
  const component = renderer.create(<Item />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
