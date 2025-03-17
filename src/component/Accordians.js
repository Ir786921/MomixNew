import React, { useState } from "react";
import faq from "../asset/file.png"
import  {toast,ToastContainer} from "react-toastify"

const Section = ({ question, answer, isvisible, setIsvisible }) => {
  return (
    <div
      className=" tw-bg-gray-400 tw-w-4/5 tw-p-2 tw-rounded-md hover:tw-shadow-lg tw-shadow-md tw-cursor-pointer"
      onClick={() => {
        setIsvisible(true);
      }}
    >
      {" "}
      <h4 className="tw-inline-block tw-text-black tw-ml-5 tw-font-semibold tw-text-[16px] tw-items-center tw-mt-1">
        {question}
      </h4>{" "}
      <span className="tw-text-white tw-float-right tw-mr-5 tw-mt-1 tw-mb-1 tw-flex tw-rounded-full tw-items-center tw-bg-[#160000] tw-p-2">
        {isvisible ? (
          <i
            className="fa-solid fa-minus tw-text-md"
            onClick={() => {
              setIsvisible(false);
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-plus tw-text-white tw-text-md"></i>
        )}
      </span>
      <br />
      {isvisible && <p className="tw-text-gray-500 tw-ml-5">{answer}</p>}
    </div>
  );
};

const Faq = () => {
  const [sectionconfig, setSectionconfig] = useState({
    Q1: false,
    Q2: false,
    Q3: false,
    Q4: false,
    Q5: false,
    Q6: false,
  });
  const [message, setMessage] = useState("");
  function handleSend(){
    setMessage(" ");
    toast.success("Query Sent successfully",{
      position:"top-right",
      autoClose:3000,
      theme:"light",
      
    })
  }
  return (
    <div className="tw-p-6 tw-bg-gradient-to-br tw-from-black tw-via-[#330000] tw-to-[#1a0000]">
  <h1 className="tw-text-center tw-text-2xl md:tw-text-4xl tw-font-extrabold tw-text-red-500 tw-my-6 tw-tracking-wide">
    Frequently Asked Questions
  </h1>

  <br />
  <div className="tw-flex md:tw-flex-row tw-flex-col tw-p-3 tw-gap-10">
    <div className="md:tw-w-1/2 tw-w-full tw-flex tw-flex-col tw-gap-6 tw-items-center">
      <Section
        question={"What is Momix?"}
        answer={
          "Momix is a premium video streaming platform that offers a vast library of movies, TV shows, and original content in stunning 4K quality."
        }
        isvisible={sectionconfig.Q1}
        setIsvisible={() => {
          setSectionconfig({
            Q1: !sectionconfig.Q1,
            Q2: false,
            Q3: false,
            Q4: false,
            Q5: false,
            Q6: false,
          });
        }}
      />
      <Section
        question={"How does Momix recommend content?"}
        answer={
          "Our AI-powered recommendation system analyzes your viewing habits to suggest personalized content you'll love, while also helping you discover new favorites."
        }
        isvisible={sectionconfig.Q2}
        setIsvisible={() => {
          setSectionconfig({
            Q1: false,
            Q2: !sectionconfig.Q2,
            Q3: false,
            Q4: false,
            Q5: false,
            Q6: false,
          });
        }}
      />
      <Section
        question={"Can I download content for offline viewing?"}
        answer={
          "Yes! Premium subscribers can download unlimited content to watch offline on up to 5 devices simultaneously."
        }
        isvisible={sectionconfig.Q3}
        setIsvisible={() => {
          setSectionconfig({
            Q1: false,
            Q2: false,
            Q3: !sectionconfig.Q3,
            Q4: false,
            Q5: false,
            Q6: false,
          });
        }}
      />
      <Section
        question={"What devices are compatible with Momix?"}
        answer={
          "Momix is available on all major platforms including iOS, Android, smart TVs, gaming consoles, and web browsers for seamless streaming across all your devices."
        }
        isvisible={sectionconfig.Q4}
        setIsvisible={() => {
          setSectionconfig({
            Q1: false,
            Q2: false,
            Q3: false,
            Q4: !sectionconfig.Q4,
            Q5: false,
            Q6: false,
          });
        }}
      />
      <Section
        question={"How many profiles can I create?"}
        answer={
          "You can create up to 7 unique profiles per account, each with personalized recommendations and viewing history."
        }
        isvisible={sectionconfig.Q5}
        setIsvisible={() => {
          setSectionconfig({
            Q1: false,
            Q2: false,
            Q3: false,
            Q4: false,
            Q5: !sectionconfig.Q5,
            Q6: false,
          });
        }}
      />
      <Section
        question={"Are there parental controls available?"}
        answer={
          "Yes! Momix offers comprehensive parental controls including content filtering, screen time limits, and PIN-protected profiles to ensure a safe viewing experience for all ages."
        }
        isvisible={sectionconfig.Q6}
        setIsvisible={() => {
          setSectionconfig({
            Q1: false,
            Q2: false,
            Q3: false,
            Q4: false,
            Q5: false,
            Q6: !sectionconfig.Q6,
          });
        }}
      />
    </div>
    <div className="md:tw-w-1/2 tw-w-full tw-p-4">
      <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-bg-black tw-bg-opacity-50 tw-rounded-xl tw-p-6 tw-border tw-border-red-800">
        <img
          src={faq}
          alt="Momix Support"
          width={200}
          className="tw-mb-4"
        />
        <h3 className="tw-font-bold tw-text-red-500 tw-text-xl">Got Questions?</h3>
        <p className="tw-text-gray-300 tw-mb-4">
          We're here to help with all your streaming needs
        </p>
        <div className="tw-flex tw-flex-col tw-p-2 tw-w-full">
          <label
            htmlFor="Question"
            className="tw-ml-[49px] md:tw-ml-16 tw-mb-2 tw-text-red-400"
          >
            Ask Us Anything
          </label>

          <textarea
            type="text"
            className="tw-w-[80%] tw-m-auto tw-rounded-md tw-p-3 tw-border tw-border-red-900 tw-bg-gray-900 tw-text-white tw-focus:border-red-500 tw-focus:outline-none tw-focus:ring-1 tw-focus:ring-red-500 tw-transition-all"
            placeholder="Type your question here..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>
        <button
          onClick={handleSend}
          disabled = {message === ""}
          className="tw-mt-5 tw-rounded-xl tw-px-10 tw-py-2 tw-bg-red-600 tw-text-white tw-border-none tw-font-medium tw-transition-all tw-hover:bg-red-700 tw-transform tw-hover:scale-105 tw-shadow-lg tw-shadow-red-900/50"
        >
          Send
        </button>
        <ToastContainer />
      </div>
    </div>
  </div>
</div>
  );
};

export default Faq;
