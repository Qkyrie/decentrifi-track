import React from "react";
import Header from "components/headers/light.jsx";
import Pricing from "components/pricing/TwoPlansWithDurationSwitcher.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import Footer from "components/footers/FiveColumnWithInputForm.jsx";
import FAQ from "components/faqs/SingleCol.jsx";

export default () => {
  return (
    <>
      <Header />
      <Pricing />
      <Testimonial
        heading="Our Paying Customers"
      />
      <FAQ />
      <Footer/>
    </>
  );
};
