/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logoUrl from "./assets/images/logo.png";
import imgUrl from "./assets/images/samagam.png";

interface ISlide {
  content: string;
  user: string;
  city: string;
  avatar: string;
}

function App() {
  const [slides, setSlides] = React.useState<ISlide[]>([]);

  // load slides
  React.useEffect(() => {
    const apiUrl = localStorage.getItem("apiUrl") ?? "http://ec2-3-109-158-59.ap-south-1.compute.amazonaws.com:9061/api/feedback/list/100/0";
    const getTestimonials = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        const testimonials = (result?.data?.feedbackList ?? []).map((item: any) => ({
          city: item.txtCity,
          state: item.txtState,
          country: item.txtCountry,
          user: item.txtName,
          avatar: item.txtPhoto,
          content: item.txtFeedback
        }));
        setSlides(testimonials);
      } catch (err) {
        const error = err as any;
        alert(
          error?.message || "An error occured while fetching the testimonials."
        );
      }
    };

    getTestimonials();
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <header className="flex items-center justify-between p-6">
        <img className="h-24 w-auto" src={logoUrl} alt="Kids Exhibition" />
        <img
          src={imgUrl}
          className="h-24 w-auto"
          alt="76th Nirankari Samagam"
        />
      </header>

      <Slider
        dots={false}
        arrows={false}
        autoplay
        infinite
        adaptiveHeight
        waitForAnimate
        pauseOnHover={false}
        pauseOnFocus={false}
        pauseOnDotsHover={false}
        speed={500}
        autoplaySpeed={5000}
        slidesToScroll={1}
        slidesToShow={1}
        className="mx-auto max-w-6xl"
      >
        {slides.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center justify-center h-full min-h-[calc(100vh-200px)]">
              <figure className="-mt-10 flex flex-col space-y-5 bg-gradient-to-r from-[#3b71ca] to-[#dc4c64] bg-clip-text text-transparent">
                <blockquote className="text-2xl font-semibold leading-normal tracking-tight sm:text-3xl">
                  <p>“{item.content}”</p>
                </blockquote>
                <figcaption className="mt-10 flex items-center justify-end gap-x-6">
                  {!!item.avatar && (
                    <img
                      className="h-14 w-14 rounded-full bg-gray-800"
                      src={item.avatar}
                      alt="user image"
                    />
                  )}

                  <div className="text-base">
                    <div className="font-semibold text-white">{item.user}</div>
                    {!!item.city && (
                      <div className="mt-1 text-gray-400">{item.city}</div>
                    )}
                  </div>
                </figcaption>
              </figure>
            </div>
          </React.Fragment>
        ))}
      </Slider>

      <footer>
        <p className="text-white text-center">Kids Exhibition @ 76<sup>th</sup> Annual Niranakri Sant Samagam</p>
      </footer>
    </div>
  );
}

export default App;
