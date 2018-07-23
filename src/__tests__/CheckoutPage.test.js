import React from 'react'
import renderer from 'react-test-renderer'
import CheckoutPage from '../components/CheckoutPage'

test('CheckoutPage renders correctly', () => {
  const component = renderer.create(<CheckoutPage />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})