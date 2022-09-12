// import accauntInfoJson from "./account_info" assert { type: "json" };

window.onload = function () {
  //render select tag

  let select = document.getElementById("adressesSelect");
  function renderSelect() {
    if (
      Array.isArray(accauntInfoJson.addresses) &&
      accauntInfoJson.addresses.length > 0
    ) {
      for (const iterator of accauntInfoJson.addresses) {
        select.innerHTML += `<option value=${iterator.adressId}> ${iterator.friendlyId}</option>`;
      }
    } else {
      getSelect.innerHTML = "<option>Адресов нет</option>";
    }
  }
  renderSelect();

  // first render data
  (function init() {
    let valueOfOption = select.options[select.selectedIndex].value;
    for (const iter of accauntInfoJson.addresses) {
      if (iter.adressId === valueOfOption) {
        renderData(destructData(iter));
      }
    }
  })();

  // listen select changing event & call render by destruct foo

  select.addEventListener("change", init, false);

  function init() {
    let valueOfOption = this.options[this.selectedIndex].value;
    for (const iter of accauntInfoJson.addresses) {
      if (iter.adressId === valueOfOption) {
        renderData(destructData(iter));
      }
    }
  }

  function destructData(value) {
    let electricityArr = [["mon", "day", "night"]];
    var waterArr = [["mon", "cold", "hot"]];
    for (let index = 5; index <= 11; index++) {
      electricityArr.push([
        value.electricity.day.month[index],
        value.electricity.day.count[index],
        value.electricity.night.count[index],
      ]);
      waterArr.push([
        value.water.cold.month[index],
        value.water.cold.count[index],
        value.water.hot.count[index],
      ]);
    }
    return [electricityArr, waterArr];
  }

  function renderData([elArr, watArr]) {
    let dayCurrent = document.getElementsByClassName(
      "data-block__dashbord__inner_electricity__readings_day"
    )[0];
    let nightCurrent = document.getElementsByClassName(
      "data-block__dashbord__inner_electricity__readings_night"
    )[0];
    let coldCurrent = document.getElementsByClassName(
      "data-block__dashbord__inner_water__readings_cold"
    )[0];
    let hotCurrent = document.getElementsByClassName(
      "data-block__dashbord__inner_water__readings_hot"
    )[0];
    dayCurrent.innerHTML =
      '<b id="elDayCurrent">' +
      (elArr[7][1] >= 100 ? elArr[7][1] : "0" + elArr[7][1]) +
      "<span>кВт/ч</span></b><p>День</p><p>Предыдущее: <span>21750</span></p><p>Текущее: <span>21815</span></p>";
    nightCurrent.innerHTML =
      '<b id="elDayCurrent">' +
      (elArr[7][2] >= 100 ? elArr[7][2] : "0" + elArr[7][2]) +
      "<span>кВт/ч</span></b><p>Ночь</p><p>Предыдущее: <span>21750</span></p><p>Текущее: <span>21815</span></p>";
    coldCurrent.innerHTML =
      '<b id="elDayCurrent">' +
      (watArr[7][1] >= 100 ? watArr[7][1] : "0" + watArr[7][1]) +
      "<span>м<sup><small>3</small></sup></span></b><p>Холодная</p><p>Предыдущее: <span>21750</span></p><p>Текущее: <span>21815</span></p>";
    hotCurrent.innerHTML =
      '<b id="elDayCurrent">' +
      (watArr[7][2] >= 100 ? watArr[7][2] : "0" + watArr[7][2]) +
      "<span>м<sup><small>3</small></sup></span></b><p>Горячая</p><p>Предыдущее: <span>21750</span></p><p>Текущее: <span>21815</span></p>";

    let elChartsColor = ["#ffa32b", "#de702b"];
    let waterColor = ["#5da5f7", "#2f6aac"];
    renderChart(elArr, elChartsColor, "electricity__chart");
    renderChart(watArr, waterColor, "water__chart");
  }

  function renderChart(dataArray, colors, elementId) {
    google.charts.load("current", { packages: ["bar"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      let data = google.visualization.arrayToDataTable(dataArray);

      let options = {
        legend: { position: "none" },
        axes: {
          x: {
            0: { side: "bottom", label: "" },
          },
        },
        colors: colors,
      };

      let chart = new google.charts.Bar(document.getElementById(elementId));

      chart.draw(data, google.charts.Bar.convertOptions(options));
    }
  }
};
