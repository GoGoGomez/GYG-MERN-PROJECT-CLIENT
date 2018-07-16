import React from 'react';
import { Link } from 'react-router-dom'
// import Background from '../images/home-background.jpg';

// var sectionStyle = {
//   width: "100%",
//   height: "400px",
//   backgroundImage: `url(${Background})`
// };

// class Section extends Component {
//   render() {
//     return (
//       <section style={ sectionStyle }>
//       </section>
//     );
//   }
// }
const HomePage = () => (
  <div className="Homepage-background">
    <div className="Homepage">
    <h1>Welcome to Guzman y Gomez Kawana Catering Page</h1><br />
    <Link to="/menu" className="MenuButton">Start your order</Link>
    
    </div>
  </div>
);

export default HomePage;
