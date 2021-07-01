import { ChartType } from './dashboard.model';

const linewithDataChart: ChartType = {
    chart: {
        height: 380,
        type: 'line',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        }
    },
    colors: ['#FFFFFF'],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 3,
        curve: 'smooth'
    },
    legend: {
        position: 'right',
        floating: false,
    },
    series: [],
    grid: {
        row: {
            colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.2
        },
        borderColor: '#e9ecef'
    },
    markers: {
        style: 'inverted',
        size: 6
    },
    xaxis: {
        categories: [],

        axisBorder: {
            color: '#d6ddea',
        },
        axisTicks: {
            color: '#d6ddea',
        }
    },
    tooltip: {
        theme: 'dark',
        x: { show: false }
    },
    responsive: [{
        breakpoint: 600,
        options: {
            chart: {
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: false
            },
        }
    }]
};

export { linewithDataChart };