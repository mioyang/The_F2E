$(document).ready(function () {
    //隱藏左側選單
    $('.hide-sidenav-btn').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('hide-navpanel');
    });

    // 編輯的 Modal 事件
    $('#editModal').on('show.bs.modal', function (event) {
        var btn = $(event.relatedTarget); //取得觸發 Modal 事件的按鈕  
        var title = btn.data('title');//取得按鈕的title值

        var modal = $(this);//目前開啟的modal
        modal.find('.modal-title').text(title);
        modal.find('#inputProduct').text(title);

    });

    $('#removeModal').on('show.bs.modal', function (event) {
        var btn = $(event.relatedTarget); //取得觸發 Modal 事件的按鈕  
        var title = btn.data('title');//取得按鈕的title值

        var modal = $(this);//目前開啟的modal
        modal.find('.modal-title').text('確認刪除' + title);
        modal.find('#inputProduct').text(title);
    });
});


//chart.js
window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

var randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
};

var config = {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ],
            backgroundColor: [
                window.chartColors.red,
                window.chartColors.orange,
                window.chartColors.yellow,
                window.chartColors.green,
                window.chartColors.blue,
            ],
            label: 'Dataset 1'
        }],
        labels: [
            "Google Chrome",
            "Safari",
            "Firefox",
            "Edge",
            "Opera"
        ]
    },
    options: {
        responsive: true
    }
};
// line
var MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
var colors = Chart.helpers.color;
var lineChartData = {
    labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
    datasets: [
        {
            label: '訂單數',
            fill: false,
            borderColor: window.chartColors.blue,
            borderWidth: 1,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ]
        },
        {
            label: '退貨數',
            fill: false,
            borderColor: window.chartColors.red,
            borderWidth: 1,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ]
        },
        {
            label: '新增會員',
            fill: false,
            borderColor: window.chartColors.green,
            borderWidth: 1,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
            ]
        }
    ]
};

window.onload = function () {
    // pie
    document.querySelectorAll('.chart-item').forEach(function (item) {
        config.data.datasets.forEach(function (dataset) {
            dataset.data = dataset.data.map(function () {
                return randomScalingFactor();
            });
        });
        var ctx = item.getContext("2d");
        window.myPie = new Chart(ctx, config);
    });

    // line
    var barCtx = document.getElementById("lineCanvas").getContext("2d");
    window.myBar = new Chart(barCtx, {
        type: 'line',
        data: lineChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            }
        }
    });

};


