var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var button = document.querySelector('.submit');
var dig;
button.addEventListener('click', function (name) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=50a7aa80fa492fa92e874d23ad061374')
    .then(response => response.json())
    .then(data => {
      var tempValue = data['main']['temp'] - 273.15;
      var nameValue = data['name'];
      dig = tempValue;
      main.innerHTML = nameValue;
      temp.innerHTML = "Temp - " + Math.round(tempValue) + " Celsius";
      input.value = "";

    })

    .catch(err => alert("City not Found"));
})

function myFunction() {
  if (document.getElementById("temp").value == Math.round(dig)) {
    alert("Your Warehouse temperature is Optimized");
  } else if (document.getElementById("temp").value < Math.round(dig)) {
    alert("Your Warehouse temperature can be more Optimized");
  } else if (document.getElementById("temp").value > Math.round(dig)) {
    alert("Your Warehouse stock can get spoiled");
  }
}