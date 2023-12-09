import React from 'react';
import Template from '../components/Template';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      data: labels.map(() => getRandomNumber(0, 1000)),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    // {
    //   label: 'Dataset 2',
    //   // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //   data: labels.map(() => getRandomNumber(0, 1000)),
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
  ],
};

function Home() {
  return (
    <div>
      <Template>
        <h3>Welcome to Home</h3>
        <Bar options={options} data={data} />
      </Template>
    </div>
  );
}

export default Home;
