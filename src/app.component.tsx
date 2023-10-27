/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logoUrl from "./assets/images/logo.png";
import imgUrl from "./assets/images/samagam.png";
import { IAPIFeedback } from "./shared/app.interface";
import appConstants from "./shared/app.config";

interface IFeedback {
  content: string;
  user: string;
  city: string;
  avatar: string;
  status: boolean;
}

// const FEEDBACKS: Array<IFeedback> = [
//   {
//     user: "Rev. Shikha Ji",
//     content: "I love visiting Kids Exhibition. I learn a lot about the missions teachings from the models displayed in the kids exhibition.",
//     city: "Chandigarh",
//     status: true,
//     avatar: null
//   },
//   {
//     user: "Rev. Mandeep Ji",
//     content: "I enjoyed and learned a lot from Kids Exhibition. I like the whole exhibition a lot but my favourite is story tellling.",
//     city: "Gurgaon",
//     status: true,
//     avatar: null
//   },
//   {
//     user: "Rev. Yogesh Ji",
//     content: "I really enjoyed visiting the Kids Exhibition. Visiting kids exhibition is always a blissful experience. Models displayed are very thoughtful and connect us with the teachings of Satguru Mata Ji. May Satugru Mata Ji bless the the whole Children Exhibition team with all the blessings.",
//     city: "Panchkula",
//     status: true,
//     avatar: null
//   },
// ];

function App() {
  const [slides, setSlides] = React.useState<IFeedback[]>([]);

  // load slides
  React.useEffect(() => {
    const getTestimonials = async () => {
      try {
        const response = await fetch(appConstants.urls.feedbacks);
        const result = await response.json();
        const testimonials = (result?.data?.feedbackList ?? []).map(
          (item: IAPIFeedback) => ({
            city: item.txtCity,
            state: item.txtState,
            country: item.txtCountry,
            user: item.txtName,
            avatar: item.txtPhoto,
            content: item.txtFeedback,
          })
        );
        setSlides(testimonials);
      } catch (err) {
        const error = err as any;
        alert(
          error?.message || "An error occured while fetching the testimonials."
        );
      }
    };

    getTestimonials();
    // setSlides(FEEDBACKS)
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen h-full overflow-hidden">
      <div className="mx-auto max-w-[85%]">
        <header className="flex items-center justify-between p-6">
          <img className="h-28 w-auto" src={logoUrl} alt="Kids Exhibition" />
          <img
            src={imgUrl}
            className="h-28 w-auto"
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
          className="mx-auto max-w-[80%]"
        >
          {slides.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-center h-full min-h-[calc(100vh-200px)]">
                <figure className="-mt-10 flex flex-col space-y-5 bg-gradient-to-r from-[#3b71ca] to-[#dc4c64] bg-clip-text text-transparent">
                  <blockquote className="text-5xl font-semibold leading-normal tracking-tight">
                    <p>“{item.content}”</p>
                  </blockquote>
                  <figcaption className="mt-10 flex items-center justify-end gap-x-6">
                    {!!item.avatar && (
                      <img
                        className="h-14 w-14 rounded-full bg-gray-800"
                        src={`data:image/png;base64,${item.avatar}`}
                        alt="user image"
                      />
                    )}

                    <div>
                      <div className="font-semibold text-white text-2xl">
                        {item.user}
                      </div>
                      {!!item.city && (
                        <div className="mt-1 text-gray-400 text-xl">{item.city}</div>
                      )}
                    </div>
                  </figcaption>
                </figure>
              </div>
            </React.Fragment>
          ))}
        </Slider>

        <footer>
          <p className="text-white text-center text-3xl">
            76<sup>th</sup> Annual Nirankari Sant Samagam - Kids Exhibition, 2023
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
