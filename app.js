/* Global Variables */
const apiKey = '&appid=ac159987f6f9b239080b08708aff459b&units=metric'
// Create a new date instance dynamically with JS
let d = new Date();
const newDate = d.toDateString() //+  d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', async () => {
  const zipCode = document.getElementById('zip').value;
  const myFeelings = document.getElementById('feelings').value
  //Alert if the user did'nt enter a zip code.
  if (!zipCode) {
    alert("Zip Code required!")
  }
  if (!myFeelings) {
    alert("Tell us how are you feeling?")
  }
  try {
    const mainURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}${apiKey}`
    const res = await fetch(mainURL)
    const data = await res.json()
    const temp = data.main.temp
    const cityName = data.name
    await fetch('/setWeatherTemp', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        date: newDate, name: cityName , temp: temp, feelings: myFeelings
      })
    });
    const dataRes = await fetch('/getWeather')
    const showData = await dataRes.json()
      //console.log(showData)
      .then(
        recentUI()
      )
    //appropriately handle the error
  } catch (error) {
    console.log(error)
  }
})
const recentUI = async () => {
  const request = await fetch('/getWeather');
  try {
    const recentData = await request.json();
    document.getElementById('date').innerHTML = recentData.date;
    document.getElementById('city').innerHTML = 'Your City is: ' + recentData.name;
    document.getElementById('temp').innerHTML = 'The current tempreture is ' + recentData.temp + '°C';
    document.getElementById('content').innerHTML = 'You feel: ' + recentData.feelings;
    console.log(recentData)
   
  } catch (error) {
    console.log("error", error);
  }
  
}
