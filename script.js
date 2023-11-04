"use strict";
const quoteContainer = document.querySelector(".quote-container");
const quoteElement = document.querySelector(".quote");
const authorElement = document.querySelector(".quote-author");
const newQuoteButton = document.querySelector(".quote-btn");
const twitterButton = document.querySelector(".twitter-btn");
const spinner = document.querySelector(".loader");

const randomInt = function (min, max) {
  return Math.trunc(Math.random() * (max - min + 1) + min);
};
const showSpinner = function () {
  spinner.hidden = false;
  quoteContainer.hidden = true;
};
const hideSpinner = function () {
  if (!spinner.hidden) {
    spinner.hidden = true;
    quoteContainer.hidden = false;
  }
};
const getQuote = async function () {
  showSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const quote = data[randomInt(0, data.length)];
    if (quote.text.length > 250) {
      getQuote();
      return;
    }

    if (quote.text.length > 120)
      document.querySelector(".quote-text").classList.add("long-quote-text");
    else
      document.querySelector(".quote-text").classList.remove("long-quote-text");

    quoteElement.textContent = quote.text;
    authorElement.textContent = quote.author;
    hideSpinner();
  } catch (error) {
    getQuote();
  }
};

const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text= ${quoteElement.textContent} - ${authorElement.textContent}`;

  window.open(twitterUrl, "_blank");
};

getQuote();

//event handler functions
newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetQuote);
