function check() {
  var val = document.form1.choice.value;
  if (val == "1") {
    document.getElementById("_image").src = "/images/map1.jpg";
  } else if (val == "2") {
    document.getElementById("_image").src = "/images/map2.jpg";
  } else if (val == "3") {
    document.getElementById("_image").src = "/images/map3.jpg";
  } else if (val == "4") {
    document.getElementById("_image").src = "/images/map.jpg";
  }
}

const API_URL = 'http://localhost:5000/api';

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

$.get('http://localhost:3001/devices')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(`Error: ${error}`);
  });
