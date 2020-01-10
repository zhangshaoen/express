import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Pie extends Component {

	arrayObj = (array,key) => {
    var resObj = {};
    for(var i=0;i<array.length;i++){
      resObj[array[i][key]] = array[i];
    }
    return resObj;
  }
	getOption = options => {
		let dataSource = options.dataSource;
		let objData = {};
		let totals = 0;
		let legendData = [];
		if(dataSource.length) {
			objData = this.arrayObj(dataSource, "name");
			for (var i = 0; i < dataSource.length; i++) {
				totals += dataSource[i].value;
				legendData.push(`${dataSource[i].name}`);
			}
		}

		return {
			title: {
        text: options.title,
        color: '#555',
        textStyle: {
          align: 'center',
        },
        subtextStyle: {
          fontSize: 20,
          align: 'center',
        },
        x: 'center',
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
					if(JSON.stringify(objData) !== "{}" && objData[name].value) {
          // let blank = 10 - name.length;
						return `${objData[name].value}
					
${name}`					
					}else {
						return
					}

				},
				data: options.legendData,
				itemHeight: options.legendData ? 32.3 : 14
			},
			series: [
				{
					name: options.title,
					type: 'pie',
					center: ['50%', '50%'],
					radius: "70%",
					avoidLabelOverlap: false,
					hoverAnimation: false,
					color: options.color,
					label: {
						normal: {
							show: true,
							position: "inside",
							formatter: function (params) {
								if(totals) {
									let percent = ((params.value / totals) * 100).toFixed(0);
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