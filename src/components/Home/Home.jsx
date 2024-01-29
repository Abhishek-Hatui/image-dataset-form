import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import effile1 from "../../assets/Ch2_5_a_Eiffel_tower_Tom.jpg";
import effile2 from "../../assets/Ch2_5_c_Eiffel_tower_Our_fixed_sigma.jpg";
import effile_le1 from "../../assets/Ch2_5_a_Eiffel_tower_Tom_cropped2.jpg";
import effile_le2 from "../../assets/Ch2_5_c_Eiffel_tower_Our_fixed_sigma_cropped2.jpg";
import effile_lc1 from "../../assets/Ch2_5_a_Eiffel_tower_Tom_cropped.jpg";
import effile_lc2 from "../../assets/Ch2_5_c_Eiffel_tower_Our_fixed_sigma_cropped.jpg";

const Home = () => {
  return (
    <div className="home-mc">
      <img src={effile1} alt="" className="home-mi" />
      <img src={effile2} alt="" className="home-mi" />

      <h2>Entropy</h2>
      <p className="home-p">
        While Rating Entrophy you have to check how clear is the details. In
        image 1 effile tower is not clear while in image 2 effile tower is more
        clear and visible. While the flowers are more clear in image 1 compared
        to 2
      </p>
      <h2>Contrast</h2>
      <p className="home-p">
        While rating contrast you have to check for the overall contrast of the
        image. Contrast is the range of brightness, from lightest to darkest, in
        an image. A high-contrast image will have very bright highlights and
        very dark shadows. Contrast of image 1 is more compared to image 2.
      </p>
      <h2>Saturation</h2>
      <p className="home-p">
        Saturation describes the intensity of the colour. And lightness refers
        to how light or dark the colour is. Saturation of image 1 is more as the
        colors are more saturated and visible.
      </p>

      <h2>Local Entropy</h2>

      <img src={effile_lc1} alt="" className="home-lci" />
      <img src={effile_lc2} alt="" className="home-lci" />

      <p className="home-p">
        While Rating Local Entropy you have to check for the details of specific
        area. In above images, top of effile tower of image 2 is more clear than
        image 1 while overall it maybe that entropy of image 1 is more than 2.
      </p>

      <h2>Local Contrast</h2>

      <img src={effile_le1} alt="" className="home-lei" />
      <img src={effile_le2} alt="" className="home-lei" />

      <p className="home-p">
        While Rating Local Contrast you have to check for the contrast of
        specific area. In above images, clouds of image 1 have less contrast
        than cloud of image 2 which makes it difficult to see the details.
      </p>
      <Link to="/form">
        <button className="next-btn">Next</button>
      </Link>
    </div>
  );
};

export default Home;
