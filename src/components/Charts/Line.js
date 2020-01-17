import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';


export default class Link extends Component {

  initLegend = array => {
    let data = [];
    array.forEach(item => {
      data.push(item.name);
    })
    return data;
  }

  initXAxis = array => {
    let data = [];
    array.forEach(item => {
      item.abscissa.forEach(ads => {
        data.push(ads)
      })
    })
    data = Array.from(new Set(data));
    return data
  }

  initSeries = array => {
    let data = [];
    array.forEach(item => {
      data.push({
        name: item.name,
        type:'line',
        data: item.ordinate
      })
    })
    return data
  }

  onChartLegendselectchanged = (param, echarts) => {
    console.log(param)
  }

  getOption = props => {
    let {selected, dataSource } = props;    
    return {
      color: ["#4082e6", "#2FC25B", "#F59A23"],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      grid: {
        top: 20,
        left: "5%",
        right: 20,
      },
      legend: {
        data: this.initLegend(dataSource),
        bottom: "bottom",
        icon: "circle",
        itemGap: 30,
        // 图例选中状态表
        selected: selected
      },
      xAxis: [
        {
          type: 'category',
          data: this.initXAxis(dataSource),
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitNumber: 4,
          axisLabel: {
            formatter: '{value}%'
          }
        }
      ],
      series: this.initSeries(dataSource)
    }
  }

  render() {
    let onEvents = {
      'legendselectchanged': this.onChartLegendselectchanged
    }

    return (
      <ReactEcharts
        option={this.getOption(this.props)}
        onEvents={onEvents}
        style={{ height: '100%' }}
      />
    )
  }
}