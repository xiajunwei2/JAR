<template>
  <div>
    <div :id="optionData.chartsId" style="background:#fff;height:30vh;"></div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "lineCharts",
  data() {
    return {};
  },
  props: ["optionData"],
  components: {},
  watch: {
    optionData: {
      handler() {
        let vm = this;
        vm.initCharts();
      },
      deep: true,
    },
  },
  mounted() {
    let vm = this;
    vm.initCharts();
  },
  methods: {
    initCharts() {
      var color = [
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
      ];
      let randomcolor=color[Math.floor(Math.random() * (29 - 1 + 1) + 1)]
      const hexToRgba = (hex, opacity) => {
        let rgbaColor = "";
        let reg = /^#[\da-f]{6}$/i;
        if (reg.test(hex)) {
          rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
            "0x" + hex.slice(3, 5)
          )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
        }
        return rgbaColor;
      };
      let vm = this;
      let myChart1 = this.$echarts.init(
        document.getElementById(vm.optionData.chartsId)
      );

      let options = {
        color: color,
        title: {
          left: "center",
          text: vm.optionData.title,
          top: "20",
        },
        legend: {},
        animation: true,
        animationDuration: 5000,
        tooltip: {
          backgroundColor: "#00aaff",
          formatter: function (params) {
            let Htm = params[0].name + "：" + params[0].value;
            return Htm;
          },
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              color: "#ffffff",
              shadowColor: "rgba(225,225,225,1)",
              shadowBlur: 5,
            },
          },
        },
        xAxis: {
          type: "category",
          data: this.optionData.chartsDataX,
          axisLabel: {
            // interval: 0,
            rotate: 30,
            textStyle: {
              fontFamily: "Microsoft YaHei",
            },
          },
        },

        yAxis: {
          name: this.optionData.yAxis,
        },
        series: [
          {
            type: "line",
            smooth: true,
            // showSymbol: false,/
            symbolSize: 8,
            zlevel: 3,
            lineStyle: {
              normal: {
                color: randomcolor,
                shadowBlur: 3,
                shadowColor: hexToRgba(randomcolor, 0.5),
                shadowOffsetY: 8,
              },
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: hexToRgba(randomcolor, 0.3),
                    },
                    {
                      offset: 1,
                      color: hexToRgba(randomcolor, 0.1),
                    },
                  ],
                  false
                ),
                shadowColor: hexToRgba(randomcolor, 0.1),
                shadowBlur: 10,
              },
            },
            data: this.optionData.chartsData,
          },
        ],
      };
      if (this.optionData.chartsData.length) {
        myChart1.setOption(options);
      }
      window.addEventListener("resize", () => {
        myChart1.resize();
      });
    },
  },
};
</script>

<style>
</style>
