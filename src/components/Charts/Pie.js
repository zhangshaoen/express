import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Pie extends Component {

	arrayObj = (array, key) => {		
		let resObj = {};		
    for(let i=0;i<array.length;i++){
      resObj[array[i][key]] = array[i];
    }
    return resObj;
  }
	getOption = options => {				
		let dataSource = options.dataSource;		
		let objData = this.arrayObj(dataSource, "name");
    let totals = 0;
    let legendData = [];
    for (let i = 0; i < dataSource.length; i++) {
      totals += dataSource[i].value;
      legendData.push(`${dataSource[i].name}`);
    }
		return {
			title: {
        text: options.title,
        subtext: totals,
				color: '#555',
        textStyle: {
          // fontSize: 20,
          align: 'center',
          // lineHeight: 20,
        },
        subtextStyle: {
          fontSize: 20,
          align: 'center',
        },
        x: '0',
        y: '0',
      },
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				bottom: "0",
				itemGap: 30,
				formatter: function(name) {					
					// let blank = 10 - name.length;
					if(objData[name]) {
						return `
						
		${name}

		${objData[name].value}`
					}
        },
			},
			series: [
				{
					name: '访问来源',
					type: 'pie',
					center: ['70%', '40%'],
					avoidLabelOverlap: false,
					hoverAnimation: false,
					color: options.color,
					label: {
						normal: {
							show: true,
							position: "inside",
							formatter: function (params) {								
								let percent = ((params.value / totals) * 100).toFixed(0);
								if(percent.value){
									return `${percent}%`
								}else {
									return 
								}
							}
						},
						emphasis: {
							show: false
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: dataSource
				}
			]
		}
	}

	render() {
		return (
			<ReactEcharts
				option={this.getOption(this.props.options)}
				style={{ height: '100%' }}
			/>
		)
	}
}