class Graphs {
    data = [];

    collectData(number) {
        var newArr = [];
        var times = 1;
        number = number.sort(function(a, b) { return a - b });
        number.forEach(element => {
            element = Math.round(element * 10) / 10;
            if (this.exists(newArr, element)) {
                const index = newArr.findIndex((el) => el.x === element);
                newArr[index] = {
                    x: element,
                    y: newArr[index].y + 1
                };
            } else {
                var newObj = { x: element, y: times }
                newArr.push(newObj);
            }
        });
        this.drawGraph(newArr);
    }

    exists(arr, number) {
        for (var i = 0; i < arr.length; i++) {
            var z = arr[i].x;
            if (z === number) {
                return true;
            }
        }
        return false;
    }

    drawGraph(arr) {
        CanvasJS.addColorSet("blue", ["blue"]);
        var chart = new CanvasJS.Chart("histo", {
            postion: "relative",
            backgroundColor: "beige",
            animationEnabled: true,
            colorSet: "blue",
            title: {
                text: "Skaičių Dažmumo Histograma"
            },
            axisX: {
                title: "Seka",
                interval: 0.5,
                minimum: -1,
                maximum: 1
            },
            axisY: {
                title: "Pasikartojo"
            },
            data: [{
                type: "column",
                dataPoints: arr
            }]
        });
        chart.render();
    }
}