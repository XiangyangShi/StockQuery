//stock volume chart
function stockvolume(inputa,inputb,inputc,inpute,inputh,inputg){
	//alert(inputg);
	abcd=inputh;
	abce=inputh+"Volume";
	Highcharts.chart('containerpriceex', {
		chart: {zoomType: 'x'},
		title: {text: inpute},

		subtitle: {
			useHTML: true,
			text: '<a href="https://www.alphavantage.co/" style="color:rgb(0,0,230);" target="_blank">Source: Alpha Vantage</a>'},

		xAxis: [{
			categories: inputc,
			allowDecimals: false,
			crosshair: true,
			tickInterval: 5,
			reversed: true
			}],

		yAxis: [{ // Primary yAxis
				title: { text: 'Stock Price', style: {color: Highcharts.getOptions().colors[1]} },
				labels: { format: '{value}', style: {color: Highcharts.getOptions().colors[1]} }
				//tickInterval: 1,
				//top: '200%'
			}, { // Secondary yAxis
				title: { text: 'Volume' },
				labels: { formatter: function () {return this.value / 1000000 + 'M';},
					max: inputg*2
					//format: '{value}M'
					// formatter: function () {return this.value / 1000 + 'k';}
				},
				opposite: true ,
				max: inputg*2
			}],

		//tooltip: {  shared: true },//pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'

		// legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle', floating: false
		// 	//,backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF' 
		// 	},

		plotOptions: {
				area: { marker: { enabled: false, 
								symbol: 'circle', 
								radius: 2, 
								states: { hover: { enabled: true } } 
								}
				}
			},

		series: [{ name: abcd, type: 'area',
				data: inputa, tooltip: { valueSuffix: ' ' }, color: '#d7391F'//, radius:2
			},
			{ name: abce, type: 'column', yAxis: 1,
				data: inputb, color: '#FBFBFB'//,tickInterval: 80000000
			}]
	});
}

function indicator1(func,symbolTxt,titleTxt,inputx,inputy){
	Highcharts.chart('container'+func+"ex", {
		title: { text: titleTxt },
		subtitle: { 
			useHTML: true,
			text: '<a href="https://www.alphavantage.co/" style="color:rgb(0,0,230);" target="_blank">Source: Alpha Vantage</a>' },
		xAxis: [{
			categories: inputx,
			allowDecimals: false,
			crosshair: true,
			tickInterval:5,
			reversed:true}],
		yAxis: {title: {text: func } },
		// legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle' },
		plotOptions: {
			//series: { label: { connectorAllowed: false }}//, pointStart: 2010 }
		},
		series: [{
				name: symbolTxt,
				data: inputy,
				color: '#D7391F',
				radius: 2
			}],
		responsive: {
			rules: [{
				condition: {maxWidth: 500},
				chartOptions: {
					legend: {layout: 'horizontal',align: 'center',verticalAlign: 'bottom'}
				}
			}]
		}
	});
}

function indicator2(func,symbolTxt,titleTxt,inputx,inputy1,inputy2,y1name,y2name){
	Highcharts.chart('container'+func+"ex", {
		title: { text: titleTxt },
		subtitle: { 
			useHTML: true,
			text: '<a href="https://www.alphavantage.co/" style="color:rgb(0,0,230);" target="_blank">Source: Alpha Vantage</a>' },
		xAxis: [{
			categories: inputx,
			allowDecimals: false,
			crosshair: true,
			tickInterval:5 ,
			reversed:true}],
		yAxis: {title: {text: func } },
		// legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle' },
		plotOptions: {
			//series: { label: { connectorAllowed: false }}//, pointStart: 2010 }
		},
		series: [{
				name: symbolTxt+' '+y1name,
				data: inputy1,
				marker: {
					enabled: true,
					radius: 4
				},
				color: '#D7391F',
				radius: 2
			},{
				name: symbolTxt+' '+y2name,
				data: inputy2,
				marker: {
					enabled: true,
					radius: 4
				},
				color: '#333333',
				radius: 2
			}],
		responsive: {
			rules: [{
				condition: {maxWidth: 500},
				chartOptions: {
					legend: {layout: 'horizontal',align: 'center',verticalAlign: 'bottom'}
				}
			}]
		}
	});
}

function indicator3(func,symbolTxt,titleTxt,inputx,inputy1,inputy2,inputy3,y1name,y2name,y3name){
	Highcharts.chart('container'+func+"ex", {
		title: { text: titleTxt },
		subtitle: { 
			useHTML: true,
			text: '<a href="https://www.alphavantage.co/" style="color:rgb(0,0,230);" target="_blank">Source: Alpha Vantage</a>' },
		xAxis: [{
			categories: inputx,
			//allowDecimals: false,
			//crosshair: true,
			tickInterval:5,
			reversed:true}],
		yAxis: {title: {text: func } },
		// legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle' },

		tooltip: {
		    shared: true,
		    crosshairs: true
		},
		series: [{
				name: symbolTxt+' '+y1name,
				data: inputy1,
				marker: {
					enabled: true,
					radius: 4
				},
				color: '#D7391F'
			},{
				name: symbolTxt+' '+y2name,
				data: inputy2,
				marker: {
					enabled: true,
					radius: 4
				},
				color: '#000000'
			},{
				name: symbolTxt+' '+y3name,
				data: inputy3,
				marker: {
					enabled: true,
					radius: 4
				},
				color: '#33FBFB'
			}],
		// responsive: {
		// 	rules: [{
		// 		condition: {maxWidth: 500},
		// 		chartOptions: {
		// 			legend: {layout: 'horizontal',align: 'center',verticalAlign: 'bottom'}
		// 		}
		// 	}]
		// }
	});
}

function historychart(data,symbol){

    // Create the chart
    Highcharts.stockChart('containerhistory', {

        chart: {
            height: 400
        },

        title: {
            text: symbol+' Stock Value'
        },
		subtitle: { 
			useHTML: true,
			text: '<a href="https://www.alphavantage.co/" style="color:rgb(0,0,230);" target="_blank">Source: Alpha Vantage</a>' 
		},
		
        rangeSelector: {
            selected: 1
        },

        series: [{
            name: 'AAPL Stock Price',
            data: data,
            type: 'area',
            threshold: null,
            tooltip: {
                valueDecimals: 2
            }
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    chart: {
                        height: 300
                    },
                    subtitle: {
                        text: null
                    },
                    navigator: {
                        enabled: false
                    }
                }
            }]
        }
    });

}
// desc={asc,desc}
function sorttable(n,desc){
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  //Set the sorting direction to ascending:
  if(desc==0){
  	dir="asc";
  }
  else{
  	dir = "desc";
  } 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      if(n==0){
      	a= rows[i].getElementsByTagName("TD")[n];
      	b= rows[i + 1].getElementsByTagName("TD")[n];
      	x=a.innerHTML.toLowerCase();
      	y=b.innerHTML.toLowerCase();
      }
      if(n==1){
      	a= rows[i].getElementsByTagName("TD")[n];
      	b= rows[i + 1].getElementsByTagName("TD")[n];
      	x1=a.innerHTML;
      	y1=b.innerHTML;
      	x=parseFloat(x1);
      	y=parseFloat(y1);
      }
      if(n==2){
      	a= rows[i].getElementsByTagName("TD")[n];
      	b= rows[i + 1].getElementsByTagName("TD")[n];
      	x1=a.innerHTML;
      	y1=b.innerHTML;
      	x=parseFloat(x1);
      	y=parseFloat(y1);
      }
      if(n==3){
      	a= rows[i].getElementsByTagName("TD")[n];
      	b= rows[i + 1].getElementsByTagName("TD")[n];
      	x=a.innerHTML;
      	y=b.innerHTML;
      	a=parseInt(x.replace(/,/,"").replace(/,/,"").replace(/,/,"").replace(/,/,"").replace(/,/,""));
      	b=parseInt(y.replace(/,/,"").replace(/,/,"").replace(/,/,"").replace(/,/,"").replace(/,/,""));
		x=parseFloat(a);
      	y=parseFloat(b);
      }
      if(n==4){
      	a= rows[i].getElementsByTagName("TD")[2];
      	b= rows[i + 1].getElementsByTagName("TD")[2];
      	x=a.innerHTML;
      	y=b.innerHTML;
      	a1=x.replace('('," ").replace(')'," ");
		a=a1.split()[1];
      	b1=y.replace('('," ").replace(')'," ");
		b=b1.split()[1];
		x=parseFloat(a);
      	y=parseFloat(b);
      }
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x > y) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x < y) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
    }
  }
}

jq = $.noConflict();




jq(document).ready(function(){
	jq("#pan21").show();
	jq("#pan211pro").show();
	jq("#pan211").hide();
	jq("#pan22pro").show();
	jq("#pan22").hide();
	jq("#pan23pro").show();
	jq("#pan23").hide();
	jq("#upimg").hide();
	jq("#downimg").hide();
	jq(".allcharts").hide();
	jq("#containerprice").show();
	jq("#star1").show();
	jq("#star0").hide();
	jq("#quote").hide();
	// intial local storage
	if (typeof(Storage) !== "undefined") {
		jq("#favourtable").empty();
		for(i in localStorage){
			if(localStorage.getItem(i) != null ){
				strs=localStorage.getItem(i)
				// alert(strs);
				element=strs.split("#");
				var symbol= element[0]
				var price=  element[1]
				var change= element[2]
				var volume= element[3]
				str="<tr id='favour"+symbol+"'>";
				str+="<td class='favoursymbol'>"+symbol+"</td>";
				str+="<td class='favourprice'>"+price+"</td>";
				str+="<td class='favourchange'>"+change+"</td>";
				str+="<td class='favourvolume'>"+volume; 
				str+='<button type="button" class="btn btn-default favourbin">';
				str+='<span class="glyphicon glyphicon-trash"></span>';
				str+="</button>";
				str+="</td>";
				str+="</tr>";
				jq("#favourtable").append(str);
				jq(".favourbin").click(function(){
					jq(this).parents("tr").remove();
				});
			}
		}
	}


	jq(".favourbin").click(function(){
		jq(this).parent("tr").remove();
	});

	//refresh
	jq('#refreshornot').change(function() {
		var checkornot=jq(this).prop('checked')

		if (checkornot){
			refresh = setInterval(function(){
				// alert(checkornot);
				if (typeof(Storage) !== "undefined") {
					// jq("#favourtable").empty();
					for(i in localStorage){
						if(localStorage.getItem(i) != null ){
							strs=localStorage.getItem(i)
							// alert(strs);
							element=strs.split("#");
							var symbol= element[0]
							var req_str_refresh= "http://homework8environment.us-east-2.elasticbeanstalk.com/symbol?symbol="+ symbol;
							jq.get(req_str_refresh,function(data,status){
								// alert(req_str_refresh);
								jasonObj=jQuery.parseJSON(data);
								var symbol= jasonObj.symbol
								var price=  parseFloat(jasonObj.price).toFixed(2)
								var change= jasonObj.change+"("+parseFloat(jasonObj.price).toFixed(2)+"%)"
								var volume= parseInt(jasonObj.volume).toLocaleString()
								localStorage.setItem(symbol, symbol+"#"+price+"#"+change+"#"+volume)
								jq("#favour"+symbol+" "+".favourprice").text(price);
								// alert(symbol,"fin");
							});
						}
					}
				}
			},5000);
		}
		else{
			window.clearTimeout(refresh);
		}
    })

jq("#clicksymbol").click(function(){
	jq("#dropdownMenu1text").text("symbol");
	var sortdir=jq("#dropdownMenu2text").text();
	var desc= 1;
	if(sortdir=="descending")
		desc=0;
	console.log("click "+desc,sortdir);
	sorttable(0,desc);

});
jq("#clickprice").click(function(){
	jq("#dropdownMenu1text").text("Price");
	var sortdir=jq("#dropdownMenu2text").text();
	var desc= 1;
	if(sortdir=="descending")
		desc=0;
	console.log("click "+desc,sortdir);
	sorttable(1,desc);
	// alert("click"+desc);
});
jq("#clickchange").click(function(){
	jq("#dropdownMenu1text").text("Change");
	var sortdir=jq("#dropdownMenu2text").text();
	var desc= 1;
	if(sortdir=="descending")
		desc=0;
	console.log("click "+desc,sortdir);
	sorttable(2,desc);
	// alert("click"+desc);
});
jq("#clickchangepercent").click(function(){
	jq("#dropdownMenu1text").text("Change Percent");
	var sortdir=jq("#dropdownMenu2text").text();
	var desc= 1;
	if(sortdir=="descending")
		desc=0;
	console.log("click "+desc,sortdir);
	sorttable(4,desc);
	// alert("click"+desc);
});
jq("#clickvolume").click(function(){
	jq("#dropdownMenu1text").text("Volume");
	var sortdir=jq("#dropdownMenu2text").text();
	var desc= 1;
	if(sortdir=="descending")
		desc=0;
	console.log("click "+desc,sortdir);
	sorttable(3,desc);
	// alert("click"+desc);
});
jq("#clickdefault").click(function(){
	jq("#dropdownMenu1text").text("Default");
	var sortdir=jq("#dropdownMenu2text").text();
	var desc= 1;
	if(sortdir=="descending")
		desc=0;
	console.log("click "+desc,sortdir);
	sorttable(0,desc);
	// alert("click"+desc);
});
jq("#clickasc").click(function(){
	jq("#dropdownMenu2text").text("ascending");
	var sortdir=jq("#dropdownMenu2text").text();
	var desc= 0;
	if(sortdir=="Volume")
		desc=3;
	if(sortdir=="Change Percent")
		desc=4;
	if(sortdir=="Change")
		desc=2;
	if(sortdir=="Price")
		desc=1
	console.log("click "+desc,"ascending");
	sorttable(desc,1);

});
jq("#clickdesc").click(function(){
	jq("#dropdownMenu2text").text("descending");
	var sortdir=jq("#dropdownMenu2text").text();
	var desc= 0;
	if(sortdir=="Volume")
		desc=3;
	if(sortdir=="Change Percent")
		desc=4;
	if(sortdir=="Change")
		desc=2;
	if(sortdir=="Price")
		desc=1
	console.log("click "+desc,"descending");
	sorttable(desc,0);
});


//clear function
jq("#getclear").click(function(){
	jq("#input-0").empty();
	jq("#pan21").show();
	jq("#pan211pro").show();
	jq("#pan211").hide();
	jq("#pan22pro").show();
	jq("#pan22").hide();
	jq("#pan23pro").show();
	jq("#pan23").hide();
	jq("#upimg").hide();
	jq("#downimg").hide();
	jq(".allcharts").hide();
	jq("#containerprice").show();
	jq("#star1").show();
	jq("#star0").hide();
	jq("#quote").hide();
})

jq("#refresh").click(function(){
	if (typeof(Storage) !== "undefined") {
		// jq("#favourtable").empty();
		for(i in localStorage){
			if(localStorage.getItem(i) != null ){
				strs=localStorage.getItem(i)
				// alert(strs);
				element=strs.split("#");
				var symbol= element[0]
				var req_str_refresh= "http://homework8environment.us-east-2.elasticbeanstalk.com/symbol?symbol="+ symbol;
				jq.get(req_str_refresh,function(data,status){
					// alert(req_str_refresh);
					jasonObj=jQuery.parseJSON(data);
					var symbol= jasonObj.symbol
					var price=  parseFloat(jasonObj.price).toFixed(2)
					var change= jasonObj.change+"("+parseFloat(jasonObj.price).toFixed(2)+"%)"
					var volume= parseInt(jasonObj.volume).toLocaleString()
					localStorage.setItem(symbol, symbol+"#"+price+"#"+change+"#"+volume)
					jq("#favour"+symbol+" "+".favourprice").text(price);
					// alert(symbol,"fin");
				});
			}
		}
	}
})

jq("#getquote").click(function(){
	// var symbol= jq("#quote").text();

	var symbol=jq("#input-0").val();
	// alert(symbol);
	//history request     singlechart
	var req_str_his= "http://homework8environment.us-east-2.elasticbeanstalk.com/history?symbol="+ symbol;
	jq.get(req_str_his,function(data,status){
		// alert(req_str_his);
		jasonObj=jQuery.parseJSON(data);
		jq("#pan22pro").hide();
		historychart(jasonObj,symbol);
	});

	//news request
	var req_str_new= "http://homework8environment.us-east-2.elasticbeanstalk.com/news?symbol="+ symbol;
	jq.get(req_str_new,function(data,status){
		// alert(req_str_new);
		// jq('#pan22').text(data)
		jasonObj=jQuery.parseJSON(data);
		jasonObj=jasonObj.news;
		jq("#pan23pro").hide();
		jq('#pan23ex').html("");
		for (i in jasonObj){
			title=jasonObj[i].title;
			href=jasonObj[i].href;
			date=jasonObj[i].date;
			author=jasonObj[i].author;
			str='<div class="well">';
			str+='<h4><a href="'+ href +'">'+title+'</a></h4>';
			str+='<h6>Author:'+author+'</h6>';
			str+='<h6>Date:'+date+'</h6>';
			str+='</div>';
			jq('#pan23ex').append(str);
		}
	});

	//stock request     stockvolumechart
	var req_str_stock= "http://homework8environment.us-east-2.elasticbeanstalk.com/stocks?symbol="+ symbol;
	jq.get(req_str_stock,function(data,status){
		// alert(req_str_stock);
		jasonObj=jQuery.parseJSON(data);
		
		sixmonthago= new Date();
		sixmonthago.setDate(sixmonthago.getDate()-180);
		closes=[];
		volumes=[];
		xaixs=[];

		maxvolume=0;
		var count=0;

		var open=1;
		var high=1;
		var low=1;
		var close=1;
		var volume=1;
		var lastclose=1;
		dates=jasonObj["Time Series (Daily)"]
		for(date in dates){
			if(count==0){
				open=dates[date]["1. open"];
				high=dates[date]["2. high"];
				low=dates[date]["3. low"];
				close=dates[date]["4. close"];
				volume=dates[date]["5. volume"];
			}
			if(count==1){
				lastclose=dates[date]["4. close"];
			}
			var ad=date;
			var fullDate = ad.split("-");  
			detecteddate= new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0); 
			if(detecteddate<sixmonthago){
				break;
			}
			xaixs.push(fullDate[1]+"/"+fullDate[2]);
			volumehere=parseInt(dates[date]["5. volume"]);
			if(volumehere>maxvolume)
				maxvolume=volumehere;
			volumes.push(volumehere);
			closes.push(parseFloat(dates[date]["4. close"]));
			count=count+1;
		}
		jq("#pan211pro").hide();
		jq("#pan211").show();
		jq("#volume").text(parseInt(volume).toLocaleString());
		jq("#dayrange").text(parseInt(low).toFixed(2)+"-"+parseInt(high).toFixed());
		jq("#close").text(parseInt(close).toFixed(2));
		jq("#open").text(parseInt(close).toFixed(2));
		jq("#timestamp").text(date);
		var changess=parseFloat(close)-parseFloat(lastclose);
		var changess2=changess/parseFloat(lastclose)*100;
		jq("#change").text(changess.toFixed(2)+"("+changess2.toFixed(2)+"%)");
		if(close>lastclose){
			jq("#upimg").show();
			jq("#downimg").hide();
		}
		else{
			jq("#upimg").hide();
			jq("#downimg").show();
		}
		jq("#lastprice").text(lastclose);
		jq("#stockticker").text(symbol);
			// alert(closes)
			// alert(volumes)
			// alert(xaixs)
			// alert(symbol)
			// alert(maxvolume)
		// closes=[1,2,3];
		// volumes=[3,2,1];
		// xaixs=["3","4","5"];
		// maxvolume=3;
		jq("#containerpricepro").hide();
		stockvolume(closes,volumes,xaixs,symbol+" Stock Price and Volume",symbol,maxvolume);
		//a refers tp close
		//b refers to volume
		//c refers to date("m/d")
		//e refers to AAPL Stock Price and Volume
		//h refers to stockname
		//g refers to maxvolume
	});

	//sma request     singlechart
	var req_str_sma= "http://homework8environment.us-east-2.elasticbeanstalk.com/indicator1?symbol="+ symbol+"&func=SMA";
	jq.get(req_str_sma,function(data,status){
		// alert(req_str_sma);
		jasonObj=jQuery.parseJSON(data);
		
		sixmonthago= new Date();
		sixmonthago.setDate(sixmonthago.getDate()-180);
		titleTxt=jasonObj["Meta Data"]["2: Indicator"];
		inputx=[];
		inputy=[];
		var count=0;

		dates=jasonObj["Technical Analysis: SMA"]
		for(date in dates){
			var ad=date;
			var fullDate = ad.split("-");
			detecteddate= new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0); 
			if(detecteddate<sixmonthago){
				break;
			}
			inputx.push(fullDate[1]+"/"+fullDate[2]);
			inputy.push(parseFloat(dates[date]["SMA"]));
			count=count+1;
		}
		jq("#containerSMApro").hide();
		indicator1("SMA",symbol,titleTxt,inputx,inputy);
		//func= SMA
		//titleTxt    simple moving average(SMA)
		//input x
		//input y
		//symbolTxt
	});

	//ema request    singlechart
	var req_str_ema= "http://homework8environment.us-east-2.elasticbeanstalk.com/indicator1?symbol="+ symbol+"&func=EMA";
	jq.get(req_str_ema,function(data,status){
		// alert(req_str_ema);
		jasonObj=jQuery.parseJSON(data);
		
		sixmonthago= new Date();
		sixmonthago.setDate(sixmonthago.getDate()-180);
		titleTxt=jasonObj["Meta Data"]["2: Indicator"];
		inputx=[];
		inputy=[];
		var count=0;

		dates=jasonObj["Technical Analysis: EMA"]
		for(date in dates){
			var ad=date;
			var fullDate = ad.split("-");
			detecteddate= new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0); 
			if(detecteddate<sixmonthago){
				break;
			}
			inputx.push(fullDate[1]+"/"+fullDate[2]);
			inputy.push(parseFloat(dates[date]["EMA"]));
			count=count+1;
		}
		jq("#containerEMApro").hide();
		indicator1("EMA",symbol,titleTxt,inputx,inputy);
		//func= SMA
		//titleTxt    simple moving average(SMA)
		//input x
		//input y
		//symbolTxt
	});

	//stoch request   doublechart
	var req_str_stoch= "http://homework8environment.us-east-2.elasticbeanstalk.com/indicator1?symbol="+ symbol+"&func=STOCH";
	jq.get(req_str_stoch,function(data,status){
		// alert(req_str_stoch);
		jasonObj=jQuery.parseJSON(data);
		
		sixmonthago= new Date();
		sixmonthago.setDate(sixmonthago.getDate()-180);
		titleTxt=jasonObj["Meta Data"]["2: Indicator"];
		inputx=[];
		inputy1=[];
		inputy2=[];
		var count=0;

		dates=jasonObj["Technical Analysis: STOCH"]
		for(date in dates){
			var ad=date;
			var fullDate = ad.split("-");
			detecteddate= new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0); 
			if(detecteddate<sixmonthago){
				break;
			}
			inputx.push(fullDate[1]+"/"+fullDate[2]);
			inputy1.push(parseFloat(dates[date]["SlowD"]));
			inputy2.push(parseFloat(dates[date]["SlowK"]));
			count=count+1;
		}
		jq("#containerSTOCHpro").hide();
		indicator2("STOCH",symbol,titleTxt,inputx,inputy1,inputy2,"SlowD","SlowK");
		//func= SMA
		//titleTxt    simple moving average(SMA)
		//input x
		//input y
		//symbolTxt
	});

	//rsi request   singlechart
	var req_str_rsi= "http://homework8environment.us-east-2.elasticbeanstalk.com/indicator1?symbol="+ symbol+"&func=RSI";
	jq.get(req_str_rsi,function(data,status){
		// alert(req_str_rsi);
		jasonObj=jQuery.parseJSON(data);
		
		sixmonthago= new Date();
		sixmonthago.setDate(sixmonthago.getDate()-180);
		titleTxt=jasonObj["Meta Data"]["2: Indicator"];
		inputx=[];
		inputy=[];
		var count=0;

		dates=jasonObj["Technical Analysis: RSI"]
		for(date in dates){
			var ad=date;
			var fullDate = ad.split("-");
			detecteddate= new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0); 
			if(detecteddate<sixmonthago){
				break;
			}
			inputx.push(fullDate[1]+"/"+fullDate[2]);
			inputy.push(parseFloat(dates[date]["RSI"]));
			count=count+1;
		}
		jq("#containerRSIpro").hide();
		indicator1("RSI",symbol,titleTxt,inputx,inputy);
		//func= SMA
		//titleTxt    simple moving average(SMA)
		//input x
		//input y
		//symbolTxt
	});

	//adx request   singlechart
	var req_str_adx= "http://homework8environment.us-east-2.elasticbeanstalk.com/indicator1?symbol="+ symbol+"&func=ADX";
	jq.get(req_str_adx,function(data,status){
		// alert(req_str_adx);
		jasonObj=jQuery.parseJSON(data);
		
		sixmonthago= new Date();
		sixmonthago.setDate(sixmonthago.getDate()-180);
		titleTxt=jasonObj["Meta Data"]["2: Indicator"];
		inputx=[];
		inputy=[];
		var count=0;

		dates=jasonObj["Technical Analysis: ADX"]
		for(date in dates){
			var ad=date;
			var fullDate = ad.split("-");
			detecteddate= new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0); 
			if(detecteddate<sixmonthago){
				break;
			}
			inputx.push(fullDate[1]+"/"+fullDate[2]);
			inputy.push(parseFloat(dates[date]["ADX"]));
			count=count+1;
		}
		jq("#containerADXpro").hide();
		indicator1("ADX",symbol,titleTxt,inputx,inputy);
		//func= SMA
		//titleTxt    simple moving average(SMA)
		//input x
		//input y
		//symbolTxt
	});

	//cci request   single chart
	var req_str_cci= "http://homework8environment.us-east-2.elasticbeanstalk.com/indicator1?symbol="+ symbol+"&func=CCI";
	jq.get(req_str_cci,function(data,status){
		// alert(req_str_cci);
		jasonObj=jQuery.parseJSON(data);
		
		sixmonthago= new Date();
		sixmonthago.setDate(sixmonthago.getDate()-180);
		titleTxt=jasonObj["Meta Data"]["2: Indicator"];
		inputx=[];
		inputy=[];
		var count=0;

		dates=jasonObj["Technical Analysis: CCI"]
		for(date in dates){
			var ad=date;
			var fullDate = ad.split("-");
			detecteddate= new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0); 
			if(detecteddate<sixmonthago){
				break;
			}
			inputx.push(fullDate[1]+"/"+fullDate[2]);
			inputy.push(parseFloat(dates[date]["CCI"]));
			count=count+1;
		}
		jq("#containerCCIpro").hide();
		indicator1("CCI",symbol,titleTxt,inputx,inputy);
		//func= SMA
		//titleTxt    simple moving average(SMA)
		//input x
		//input y
		//symbolTxt
	});

	//bbands request   triplechart
	var req_str_bbands= "http://homework8environment.us-east-2.elasticbeanstalk.com/indicator1?symbol="+ symbol+"&func=BBANDS";
	jq.get(req_str_bbands,function(data,status){
		// alert(req_str_stoch);
		jasonObj=jQuery.parseJSON(data);
		
		sixmonthago= new Date();
		sixmonthago.setDate(sixmonthago.getDate()-180);
		titleTxt=jasonObj["Meta Data"]["2: Indicator"];
		inputx=[];
		inputy1=[];
		inputy2=[];
		inputy3=[];
		var count=0;

		dates=jasonObj["Technical Analysis: BBANDS"]
		for(date in dates){
			var ad=date;
			var fullDate = ad.split("-");
			detecteddate= new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0); 
			if(detecteddate<sixmonthago){
				break;
			}
			inputx.push(fullDate[1]+"/"+fullDate[2]);
			inputy1.push(parseFloat(dates[date]["Real Lower Band"]));
			inputy2.push(parseFloat(dates[date]["Real Upper Band"]));
			inputy3.push(parseFloat(dates[date]["Real Middle Band"]))
			count=count+1;
		}
		jq("#containerBBANDSpro").hide();
		indicator3("BBANDS",symbol,titleTxt,inputx,inputy1,inputy2,inputy3,"Real Lower Band","Real Upper Band","Real Middle Band");
		//func= SMA
		//titleTxt    simple moving average(SMA)
		//input x
		//input y
		//symbolTxt
	});

	//MACD request   triplechart
	var req_str_macd= "http://homework8environment.us-east-2.elasticbeanstalk.com/indicator1?symbol="+ symbol+"&func=MACD";
	jq.get(req_str_macd,function(data,status){
		// alert(req_str_macd);
		jasonObj=jQuery.parseJSON(data);
		
		sixmonthago= new Date();
		sixmonthago.setDate(sixmonthago.getDate()-180);
		titleTxt=jasonObj["Meta Data"]["2: Indicator"];
		inputx=[];
		inputy1=[];
		inputy2=[];
		inputy3=[];
		var count=0;

		dates=jasonObj["Technical Analysis: MACD"]
		for(date in dates){
			var ad=date;
			var fullDate = ad.split("-");
			detecteddate= new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0); 
			if(detecteddate<sixmonthago){
				break;
			}	
			inputx.push(fullDate[1]+"/"+fullDate[2]);
			inputy1.push(parseFloat(dates[date]["MACD"]));
			inputy2.push(parseFloat(dates[date]["MACD_Signal"]));
			inputy3.push(parseFloat(dates[date]["MACD_Hist"]))

			count=count+1;
		}
		jq("#containerMACDpro").hide();
		indicator3("MACD",symbol,titleTxt,inputx,inputy1,inputy2,inputy3,"MACD","MACD_Signal","MACD_Hist");
		//func= SMA
		//titleTxt    simple moving average(SMA)
		//input x
		//input y
		//symbolTxt
	});

})
jq("#star1").click(function(){
	if (typeof(Storage) !== "undefined") {
		var symbol= jq("#stockticker").text();
		var price=jq("#lastprice").text();
		var change=jq("#change").text();
		var volume=jq("#volume").text();
		localStorage.setItem(symbol, symbol+"#"+price+"#"+change+"#"+volume);
		str="<tr id='favour"+symbol+"'>";
		str+="<td class='favoursymbol'>"+symbol+"</td>";
		str+="<td class='favourprice'>"+parseFloat(price).toFixed(2)+"</td>";
		str+="<td class='favourchange'>"+change+"</td>";
		str+="<td class='favourvolume'>"+volume; 
		str+='<button type="button" class="btn btn-default favourbin">';
		str+='<span class="glyphicon glyphicon-trash"></span>';
		str+="</button>";
		str+="</td>";
		str+="</tr>";
		jq("#favourtable").append(str);
				jq(".favourbin").click(function(){
					jq(this).parents("tr").remove();
				});
	}
	jq("#star0").show();
	jq("#star1").hide();
})
jq("#star0").click(function(){
	if (typeof(Storage) !== "undefined") {
		var symbol= jq("#stockticker").text();
		localStorage.removeItem(symbol);
		jq("#favour"+symbol).remove();
	}
	jq("#star1").show();
	jq("#star0").hide();
})

jq("#nav21").click(function(){
	jq("#pan21").show();
	jq("#nav21").addClass('active');
	// alert("a fin");
	jq("#pan22").hide();
	jq("#nav22").removeClass('active');
	// alert("b fin");
	jq("#pan23").hide();
	jq("#nav23").removeClass('active');
	// alert("c fin");
});
jq("#nav22").click(function(){
	jq("#pan21").hide();
	jq("#nav21").removeClass('active');
	jq("#pan22").show();
	jq("#nav22").addClass('active');
	jq("#pan23").hide();
	jq("#nav23").removeClass('active');
});
jq("#nav23").click(function(){
	jq("#pan21").hide();
	jq("#nav21").removeClass('active');
	jq("#pan22").hide();
	jq("#nav22").removeClass('active');
	jq("#pan23").show();
	jq("#nav23").addClass('active');
});
jq("#price").click(function(){
	jq(".allcharts").hide();
	jq("#containerprice").show();
	jq(".nav3").removeClass('active');
	jq("#price").addClass('active');
});
jq("#SMA").click(function(){
	jq(".allcharts").hide();
	jq("#containerSMA").show();
	jq(".nav3").removeClass('active');
	jq("#SMA").addClass('active');
});
jq("#EMA").click(function(){
	jq(".allcharts").hide();
	jq("#containerEMA").show();
	jq(".nav3").removeClass('active');
	jq("#EMA").addClass('active');
});
jq("#STOCH").click(function(){
	jq(".allcharts").hide();
	jq("#containerSTOCH").show();
	jq(".nav3").removeClass('active');
	jq("#STOCH").addClass('active');
});
jq("#RSI").click(function(){
	jq(".allcharts").hide();
	jq("#containerRSI").show();
	jq(".nav3").removeClass('active');
	jq("#RSI").addClass('active');
});
jq("#ADX").click(function(){
	jq(".allcharts").hide();
	jq("#containerADX").show();
	jq(".nav3").removeClass('active');
	jq("#ADX").addClass('active');
});
jq("#CCI").click(function(){
	jq(".allcharts").hide();
	jq("#containerCCI").show();
	jq(".nav3").removeClass('active');
	jq("#CCI").addClass('active');
});
jq("#BBANDS").click(function(){
	jq(".allcharts").hide();
	jq("#containerBBANDS").show();
	jq(".nav3").removeClass('active');
	jq("#BBANDS").addClass('active');
});
jq("#MACD").click(function(){
	jq(".allcharts").hide();
	jq("#containerMACD").show();
	jq(".nav3").removeClass('active');
	jq("#MACD").addClass('active');
});


});