import React, { useEffect, useState, useRef } from "react";
import { init, send, sendForm } from "@emailjs/browser";
import emailjs from "@emailjs/browser";
import "./heroStyle.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
import { HiOutlineMailOpen } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import ruba from "./img/ruba.jpg";
import bessaan from "./img/bessaan.jpg";
import momani from "./img/momane.jpg";

const images = [
  "https://pic.i7lm.com/wp-content/uploads/2019/06/%D8%A7%D9%84%D8%AE%D8%B6%D8%B1%D9%88%D8%A7%D8%AA-%D8%A7%D9%84%D8%B7%D8%A7%D8%B2%D8%AC%D8%A9.jpg",
  "https://static.webteb.net/images/content/tbl_articles_article_21078_460f8c96881-5f31-4b15-9545-734665e83676.jpg",
  "https://iamahuman2015.com/wp-content/uploads/2018/09/healthy-food-shopping.jpg",
];

export default function HeroPage() {
  const navigate = useNavigate();
  const form = useRef();
  const delay = 7000;
  const [index, setIndex] = useState(0);
  const [subject, setSubject] = useState("");
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    //to make it automatic
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);
  //=================================================

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_n5xq28c",
        "template_jhbrfkq",
        form.current,
        "user_qrOrUTiYc5bmnaG9rsqfh"
      )
      .then(
        (result) => {
          setSubject("");
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  //=================================================

  return (
    <>
      <div className="slideshow" key={"slideshow"}>
        <div
          className="slideshowSlider"
          key={"slideshowSlider"}
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {images.map((backgroundImage, index) => (
            <>
              <div className="slide" key={index} style={{ backgroundImage }}>
                <img src={backgroundImage} alt="img-hero" />
              </div>
            </>
          ))}
        </div>

        <div className="slideshowDots" key={"slideshowDots"}>
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="parOfNav" key={"parOfNav"}>
        <div className="nav-infoo" key={"nav-infoo"}>
          <div className="infoo" key={"infoo"}>
            <p className="jebnalakHero">
              {" "}
              <span className="jebna-hero">Jebna</span>
              <span className="lak-hero">lak</span>{" "}
            </p>
            <br />
            <span className="pLine1">Market to sell the products</span>
            <span className="pLine2">needed buy any home</span>
            <br />
            <span
              className="shopNow"
              onClick={() => {
                navigate("/login");
              }}
            >
              SHOP NOW
            </span>
            {/* <div>
              <span
                className="btnHeroLog"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Get Started
              </span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="about-us" key={"about-us"}>
        <div className="contaner-about" key={"contaner-about"}>
          <div className="about" key={"about1"}>
            <div className="hero-about-img">
              <img src={momani} alt="momani" style={{ width: "61%" }} />
              <h3> Abdullah Momani </h3>
              <br />
              <p className="major">Electrical Engineering</p>
              <br />
              <div className="divEmail">
                <HiOutlineMailOpen className="emailIcon" />
                <p className="about-info">abdallahz.almomani@gmail.com</p>
              </div>
            </div>
            <div className="contact">
              <br />
              <a href="https://github.com/AbdullahMomani" target="_blank">
                <button className="btnContact">Contact Us</button>
              </a>
            </div>
          </div>
          <div className="about" key={"about2"}>
            <div className="hero-about-img">
              <img src={ruba} alt="ruba" style={{ width: "61%" }} />
            </div>
            <div className="">
              <h3> Ruba Alnadi </h3>
              <br />
              <p className="major">Business Information Technology</p>
              <br />
              <div className="divEmail">
                <HiOutlineMailOpen className="emailIcon" />
                <p className="about-info">rubaalnadi5@gmail.com</p>
              </div>
            </div>
            <div className="contact">
              <br />
              <a href="https://github.com/Rubaalnadi" target="_blank">
                <button className="btnContact">Contact Us</button>
              </a>
            </div>
          </div>
          <div className="about" key={"about3"}>
            <img src={bessaan} style={{ width: "60%" }} />
            <h3> Beesan Ghaith </h3>
            <br />
            <p className="major">Computer Information System</p>
            <br />
            <div className="divEmail">
              <HiOutlineMailOpen className="emailIcon" />
              <p className="about-info">beesan.ghaith@gmail.com</p>
            </div>
            <div className="contact">
              <br />
              <a href="https://github.com/BeesanGhaith" target="_blank">
                <button className="btnContact">Contact Us</button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="hero-product"key={"hero-product"}>
        <div className="product-contnt" key={"product-contnt"}></div>
      </div> */}
      <div className="footer" key={"footer"}>
        <div className="foot-content" key={"foot-content"}>
          <div className="foot-info" key={"foot-info"}>
            <h1> Jebnalak</h1>
            <br />
            <h4>
              it is a small market selling some products that people need such
              as eggs , meat , chicken ,vegtables and fruits
            </h4>
            <br />
          </div>
          <div className="hero-email" key={"hero-email"}>
            {/* <input className="inputEmail" type="text" placeholder="Type Your Email .." onClick={(e)=>{setSubject(e.target.value)}} />
            <AiOutlineSend className="hero-send" onClick={sendEmail}/> */}
            <form ref={form} onSubmit={sendEmail}>
              <label className="message">Message:</label>
              <br />
              <textarea
                name="message"
                className="textMessage"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
              <input type="submit" value="Send" />
            </form>
          </div>
        </div>
        <div className="foot-end" key={"foot-end"}>
          <p>Copyright &copy; 2022 spacingtech rights reserved</p>
          <div className="foot-icon" key={"foot-icon"}>
            <BsFacebook key={"face-icon"} />
            <AiOutlineInstagram key={"insta-icon"} />
            <AiOutlineMail key={"email-icon"} />
          </div>
        </div>
      </div>
    </>
  );
}
