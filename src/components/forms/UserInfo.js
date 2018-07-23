import React from 'react'

const userInfo = () => {
  return (
    <form action="/api/checkout" method="post">
      <section>
        <legend>Delivery Address</legend>
          <div className="form_group">
          <div>
            <label for="company">Company (optional)</label> <br />
            <input required id="company" type="text" name="company" />
          </div>

          <div>
            <label for="street">Street</label> <br />
            <input required id="street" type="text" name="street" />
          </div>
        </div>

        <div className="form_group">
          <div>
            <label for="city">City</label> <br />
            <input required id="city" type="text" name="city" />
          </div>
  
          <div>
            <label for="postcode">Postcode</label> <br />
            <input required id="postcode" type="text" name="postcode" />
          </div>
        </div>
      </section>

      <section>
        <legend>Your Details</legend>
        <div className="form_group">
          <div>
            <label for="firstName">First name*</label> <br />
            <input required id="firstName" type="text" name="firstName" />
          </div>
          <div>
            <label for="email">Email address*</label> <br />
            <input required id="email" type="text" name="email" />
          </div>
        </div>

        <div className="form_group">
          <div>
            <label for="lastName">Last name*</label> <br />
            <input required id="lastName" type="text" name="lastName" />
          </div>
          <div>
            <label for="phone">Phone number*</label> <br />
            <input required id="phone" type="text" name="phone" />
          </div>
        </div>
        <button type="submit">Submit</button>
      </section>
    </form>
  )
}

export default userInfo