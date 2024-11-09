/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logoUrl from "./assets/images/logo.png";
import imgUrl from "./assets/images/logo2024.png";
import { IAPIFeedback } from "./shared/app.interface";
import appConstants from "./shared/app.config";

interface IFeedback {
  content: string;
  user: string;
  city: string;
  avatar: string;
  status: boolean;
}

const FEEDBACKS: Array<IFeedback> = [
  {
    user: "Rev. Shikha Ji",
    content:
      "I love visiting Kids Exhibition. I learn a lot about the missions teachings from the models displayed in the kids exhibition.",
    city: "Chandigarh",
    status: true,
    avatar: null,
  },
  {
    user: "Rev. Mandeep Ji",
    content:
      "I enjoyed and learned a lot from Kids Exhibition. I like the whole exhibition a lot but my favourite is story tellling.",
    city: "Gurgaon",
    status: true,
    avatar: null,
  },
  {
    user: "Rev. Yogesh Ji",
    content:
      "I really enjoyed visiting the Kids Exhibition. Visiting kids exhibition is always a blissful experience. Models displayed are very thoughtful and connect us with the teachings of Satguru Mata Ji. May Satugru Mata Ji bless the the whole Children Exhibition team with all the blessings.",
    city: "Panchkula",
    status: true,
    avatar: null,
  },
];

function App() {
  console.log("in...");
  const [slides, setSlides] = React.useState<IFeedback[]>([]);

  // load slides
  React.useEffect(() => {
    const getTestimonials = async () => {
      try {
        const query = await fetch(appConstants.urls.feedbacks);
        const result = await query.json();
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

        const storage = localStorage.getItem("testimonials");
        const response =
          Array.isArray(testimonials) && testimonials.length
            ? testimonials
            : storage
              ? JSON.parse(storage)
              : FEEDBACKS;

        localStorage.setItem("testimonials", JSON.stringify(response));
        setSlides(response);
      } catch (err) {
        setSlides(FEEDBACKS);
      }
    };

    // get testimonials...
    getTestimonials();

    // init polling...
    const interval = setInterval(getTestimonials, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen h-full overflow-hidden">
      <div className="mx-auto max-w-[90%]">
        <header className="flex items-center justify-between p-6">
          <img className="h-28 w-auto" src={logoUrl} alt="Kids Exhibition" />
          <img
            src={imgUrl}
            className="h-44 w-auto"
            alt="77th Nirankari Samagam"
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
          speed={1500}
          autoplaySpeed={7000}
          slidesToScroll={1}
          slidesToShow={1}
          className="mx-auto max-w-[85%]"
        >
          {slides.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-center h-full min-h-[calc(100vh-280px)]">
                <figure className="-mt-10 flex flex-col space-y-5 bg-gradient-to-r from-[#3b71ca] to-[#dc4c64] bg-clip-text text-transparent">
                  <blockquote className="text-3xl 2xl:text-5xl font-semibold tracking-tight !leading-tight">
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
                      <div className="font-semibold text-white text-base 2xl:text-2xl">
                        {item.user}
                      </div>
                      {!!item.city && (
                        <div className="mt-1 text-gray-400 text-sm 2xl:text-xl">
                          {item.city}
                        </div>
                      )}
                    </div>
                  </figcaption>
                </figure>
              </div>
            </React.Fragment>
          ))}
        </Slider>

        <footer>
          <p className="text-white text-center text-base 2xl:text-3xl">
            77<sup>th</sup> Annual Nirankari Sant Samagam - Kids Exhibition,
            2024
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
