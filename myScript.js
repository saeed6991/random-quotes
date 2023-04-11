let quote = "";
let author = "";
let category = "";
let colors = [
  "rgb(16, 197, 230)",
  "rgb(16, 73, 230)",
  "rgb(133, 77, 5)",
  "rgb(87, 63, 32)",
  "rgb(32, 83, 87)",
  "rgb(116, 86, 126)",
  "rgb(119, 33, 148)",
];

function apiHandle() {
  return $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/quotes?category=" + category,
    headers: { "X-Api-Key": "my key (get your own at https://api-ninjas.com/api/quotes)" },
    contentType: "application/json",
    success: function (result) {
      category = result[0].category;
      quote = result[0].quote;
      author = result[0].author;
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR);
    },
  });
}

function renderQuote() {
  document.getElementById("category").innerHTML = category;
  document.getElementById("text").innerHTML = quote;
  document.getElementById("author").innerHTML = author;
}

function newQuote() {
  var color = Math.floor(Math.random() * colors.length);
  apiHandle().then(() => {
    renderQuote();
  });
  $(".container").animate(
    {
      backgroundColor: colors[color],
    },
    1000
  );
  $("html body").animate(
    {
      backgroundColor: colors[color],
    },
    500
  );
  $("html body").css("background-color", colors[color]);
  $("*").css("color", colors[colors.length - color]);
}

$(document).ready(function () {
  newQuote();

  $("#new-quote").click(() => {
    newQuote();
  });
});
