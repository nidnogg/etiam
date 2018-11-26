/* ==========================================================================
   Etiam main js
   Font stack:  

   'bebasregular', sans-serif; 
   'bebasneuebold', sans-serif;
   'Noto Sans', sans-serif;

   Temp Fonts:
   'bebasregular', sans-serif; 

   
   Color stack:
   #05080f (black-ish) main background color
   #FD096B (pink) main accent
   #F8E9D6 (retro white)
   #E3E2E1 (accent white)

   ========================================================================== */



// Carousel code
$('.carousel').carousel()


$('.carousel').carousel('pause')

// Bar chart
new Chart(document.getElementById("bar-chart"), {
  type: 'bar',
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433]
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Predicted world population (millions) in 2050'
    }
  }
});


