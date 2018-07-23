import React from "react";
import renderer from "react-test-renderer";
import Loading from "../components/Loading";

test("Loading component renders correctly", () => {
  const component = renderer.create(<Loading />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
