"use strict";

////////////////////////////////

const request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/api/v1/tasks");
request.send();

request.addEventListener("load", function () {
  const data = JSON.parse(this.responseText);
  console.log(data);
});

request.op