import Chart from 'chart.js/auto';

const diagram = document.getElementById('diagram');

if(diagram) {
  const ctx = diagram.getContext("2d");

  let gradient = ctx.createLinearGradient(0, 0, 150, 0);
  gradient.addColorStop(0, "#bc9cff");
  gradient.addColorStop(1, "#8ba4f9");

  let gradient2 = ctx.createLinearGradient(0, 0, 100, 100);
  gradient2.addColorStop(0, "#ffe39c");
  gradient2.addColorStop(1, "#ffba9c");

  let gradient3 = ctx.createLinearGradient(0, 0, 200, 200);
  gradient3.addColorStop(0, "#6fcf97");
  gradient3.addColorStop(1, "#6fcf97");

  const data = {
    datasets: [{
      data: [25, 25, 50],
      backgroundColor: [
        gradient,
        gradient3,
        gradient2
      ],
      spacing: 1,
      cutout: '90%',
    }]
  };

  new Chart(diagram,
    {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        events: []
      }
    }
  );
}


