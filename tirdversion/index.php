<html>
<head>
	<meta name="HomeWork6" content="XiangyangShi">
	<!-- base target="_blank" -->
	<!-- still bug in news part -->
	<!-- Alpha Advantage KEY NEQW9X9MF77YLVBM -->
	<title>Stock Query</title>
	<!-- css part -->
	<style type="text/css">
		hr {
			color: grey;
			margin-left: 5px; 
			margin-right: 5px;
		}
		a:link {
			text-decoration: none;
		}
		a:visited {
			text-decoration: none;
		}
		body {
			font-family: Times,TimesNR,Georgia,serif;
		}
		form {
			background-color: rgb(240,240,240);
			width: 40%;
			margin-left: 30%;
			font-size: 18px;
			border-width: 20px;
		}
		form h1{
			font-style: italic;
			text-align: center;
			margin-bottom: 0;
			padding-bottom: 0;
		}
		form a {
			margin-left: 10px;
		}
		input[type="text"] {
			font-size: 15px;
		}
		input[type="submit"] {
			margin-left: 43%;
		}
		.button {
			margin-top: 3px;
			font-size: 20px;
			padding-right: 20px;
			padding-left: 20px;
		}
		#comments {
			font-style: italic;
			margin-left: 10px;
		}
		#showup {
			text-align: center;
		}
		#part1 {
			width: 80%;
			margin-left: auto;
			margin-right: auto;
		}
		#part2 {
			width: 80%;
			margin-left: 10%;
			margin-left: 10%;
			border-width: 1px;
			border-style: solid;
			border-color: rgb(200,200,200);
			display: none;
		}
		#part3 {
			width: 80%;
			margin-left: 10%;
			margin-left: 10%;
		}
		#part1 table {
			border-collapse: collapse;
			width: 99%;
			background-color: rgb(245,245,245);
			margin-left: 0;
			margin-right: 0;
			text-align: center;
		}
		#part1 table,th,td {
			border: 1px solid rgb(200,200,200);
		}
		#part1 table th {
			text-align: left;
		}
		#part1 td img {
			width: 16px;
			height: 16px;
		}
		#part1 .indicators {
			margin-left: 10px;
			margin-right: 10px;
			color: rgb(0,0,230);
		}
		#part2 a{
			color: rgb(0,0,230);
		}
		#container {
			min-width: 310px;
			max-width: 1600px;
			height: 560px;
			width: 1200px;
			margin: 10 10;
			border-width: 2px;
		}
		.highcharts-subtitle {
			color: rgb(0,0,230);
		}
		#part3button {
			display: none;
		}
		#part3 > div {
			width: 160px;
			color: rgb(200,200,200);
			margin-left: auto;
			margin-right: auto;
		}
		#part3 img {
			margin-top: 10px;
			margin-bottom: 10px;
			width: 30px;
			height: 20px;
		}
		#part3 table {
			visibility: hidden;
			font-size: 14px;
			border-collapse: collapse;
			background-color: rgb(245,245,245);
			margin-left: auto;
			margin-right: auto;
		}
		#part3 table,th,td {
			border: 1px solid rgb(200,200,200);
		}
		#part3 tr {
			height: 24px;
		}
		#part3 td a {
			padding-left: 10px;
		}
		#part3 td a:link {
			text-decoration: none;
		}
		#part3 td span {
			margin-left: 30px;
		}
	</style>
	<!-- js part -->
	<!-- high chart CDN -->
	<script src="https://code.highcharts.com/highcharts.src.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<!-- stock&volume part -->
	<script>
		function loadbox1(){
			container1box=document.getElementById("container1");
			container1box.style.display="block";
			containerbox=document.getElementById("container");
			containerbox.style.display="none";
		}
		function stockvolume(inputa,inputb,inputc,inpute,inputh,inputg){
			//alert(inputg);
			container1box=document.getElementById("container1");
			container1box.style.display="block";
			containerbox=document.getElementById("container");
			containerbox.style.display="none";
			abcd=inputh;
			abce=inputh+"Volume";
			Highcharts.chart('container1', {
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

				legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle', floating: false
					//,backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF' 
					},

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
	</script>
	<!-- Singleline chart -->
	<script type="text/javascript">
		function loadjson1(func){
			url="https://www.alphavantage.co/query?function="+func+"&symbol=MSFT&interval=daily&time_period=10&series_type=close&apikey=NEQW9X9MF77YLVBM";
			if(window.XMLHttpRequest){
				xmlhttp=new XMLHttpRequest();
			}
			else{
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			// xmlhttp.onreadystatechange=function(){
			// 	if (xmlhttp.readyState==4 && xmlhttp.status==200){
			// 		jasonObj=JSON.parse(xmlhttp.responseText);
			// 		//return jasonObj;
			// 		//Obj=loadjson();
			// 		Dates=jasonObj["Technical Analysis: SMA"];
			// 		alert("Dates");
			// 	}
			// }
			// xmlhttp.open("GET","url",true);
			// xmlhttp.send();
			xmlhttp.open("GET",url,false);
			xmlhttp.send();
			jasonObj=JSON.parse(xmlhttp.responseText);
			//alert(xmlhttp.responseText);
			FuncString="Technical Analysis: "+func;
			Dates=jasonObj[FuncString];
			symbolTxt=jasonObj["Meta Data"]["1: Symbol"];
			titleTxt=jasonObj["Meta Data"]["2: Indicator"];
			datanull=[];
			datanullSMA=[];
			

			sixmonthago= new Date();
			sixmonthago.setDate(sixmonthago.getDate()-180);
			for(date in Dates){
				var ad=date;
				var fullDate = ad.split("-");  
				detecteddate= new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0); 
				if(detecteddate<sixmonthago){
					break;
				} 
				datanull.push(fullDate[1]+"/"+fullDate[2]);
				datanullSMA.push(parseFloat(Dates[date][func]));
			}
			//alert([,,,,]);
			//alert(datanull);
			//alert(datanullSMA);
			//a=[1,2,1,3,4,5,3,6,7,8];
			// document.getElementById("aaaa").innerHTML+=datanull;
			// document.getElementById("aaaa").innerHTML+='<br />';
			// document.getElementById("aaaa").innerHTML+=datanullSMA;
			// document.getElementById("aaaa").innerHTML+='<br />';
			//document.getElementById("aaaa").innerHTML+=a;
			//document.getElementById("aaaa").innerHTML+='<br />';

			datanull.reverse();
			datanullSMA.reverse();
			indicator1(func,symbolTxt,titleTxt,datanull,datanullSMA);
			container1box=document.getElementById("container1");
			container1box.style.display="none";
			container1box=document.getElementById("container");
			container1box.style.display="block";
		}
		function indicator1(func,symbolTxt,titleTxt,inputx,inputy){
			Highcharts.chart('container', {
				title: { text: titleTxt },
				subtitle: { text: '<a href="https://www.alphavantage.co/" style="color:rgb(0,0,230);">Source: Alpha Vantage</a>' },
				xAxis: [{
					categories: inputx,
					allowDecimals: false,
					crosshair: true,
					tickInterval:5 }],
				yAxis: {title: {text: func } },
				legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle' },
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
	</script>

	<!-- Doubleline chart -->
	<script type="text/javascript">
		function loadjson(func,symbolstring){
			url="https://www.alphavantage.co/query?function="+func+"&symbol="+symbolstring+"&interval=daily&time_period=10&series_type=close&apikey=NEQW9X9MF77YLVBM";
			if(window.XMLHttpRequest){
				xmlhttp=new XMLHttpRequest();
			}
			else{
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function(){
				if (xmlhttp.readyState==4 && xmlhttp.status==200){
					
						jasonObj=JSON.parse(xmlhttp.responseText);
						//alert(xmlhttp.responseText);
						FuncString="Technical Analysis: "+func;
						Dates=jasonObj[FuncString];
						symbolTxt=jasonObj["Meta Data"]["1: Symbol"];
						titleTxt=jasonObj["Meta Data"]["2: Indicator"];
						datanull=[];
						datanullFst=[];
						datanullSec=[];
						datanullTrd=[];
						sixmonthago= new Date();
						sixmonthago.setDate(sixmonthago.getDate()-180);
						var_num=1;
						func1=func;
						if (func=='STOCH'){
							func1="SlowD";
							func2="SlowK";
							var_num=2;
						}
						else if (func=='BBANDS'){
							func1="Real Upper Band";
							func2="Real Lower Band";
							func3="Real Middle Band";
							var_num=3;
						}
						else if (func=='MACD'){
							func1="MACD_Hist";
							func2="MACD_Signal";
							func3="MACD";
							var_num=3;
						}
						for(date in Dates){
							var ad=date;
							var fullDate = ad.split("-");  
							detecteddate= new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0); 
							if(detecteddate<sixmonthago){
								break;
							} 
							datanull.push(fullDate[1]+"/"+fullDate[2]);
							datanullFst.push(parseFloat(Dates[date][func1]));
							if(var_num>=2){
								datanullSec.push(parseFloat(Dates[date][func2]));
							}
							if(var_num>=3){
								datanullTrd.push(parseFloat(Dates[date][func3]));
							}
						}
						//alert([,,,,]);
						//alert(datanull);
						//alert(datanullSMA);
						//a=[1,2,1,3,4,5,3,6,7,8];
						// document.getElementById("aaaa").innerHTML+=datanull;
						// document.getElementById("aaaa").innerHTML+='<br />';
						// document.getElementById("aaaa").innerHTML+=datanullSMA;
						// document.getElementById("aaaa").innerHTML+='<br />';
						//document.getElementById("aaaa").innerHTML+=a;
						//document.getElementById("aaaa").innerHTML+='<br />';

						//datanull.reverse();
						//datanullFst.reverse();
						if(var_num==1)
						indicator1(func,symbolTxt,titleTxt,datanull,datanullFst);
						if(var_num==2){
						//	datanullSec.reverse();
							indicator2(func,symbolTxt,titleTxt,datanull,datanullFst,datanullSec,func1,func2);
						}
						if(var_num>=3){
						//	datanullSec.reverse();
						//	datanullTrd.reverse();
							indicator3(func,symbolTxt,titleTxt,datanull,datanullFst,datanullSec,datanullTrd,func1,func2,func3);
						}
						container1box=document.getElementById("container1");
						container1box.style.display="none";
						container1box=document.getElementById("container");
						container1box.style.display="block";

				}
			}
			// xmlhttp.open("GET","url",true);
			// xmlhttp.send();
			xmlhttp.open("GET",url,true);
			xmlhttp.send();
			
		}
		function indicator1(func,symbolTxt,titleTxt,inputx,inputy){
			Highcharts.chart('container', {
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
				legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle' },
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
			Highcharts.chart('container', {
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
				legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle' },
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
			Highcharts.chart('container', {
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
				legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle' },

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
	</script>

	<!-- js in page -->
	<script>
		var ChuanBei=3281234236;
		nullstring=/^\s*$/;
		tableshow=false;
		container1show=false;
		//clear the inputbox
		function cls(){
			// part1=document.getElementById("part1");
			// part1.innerHTML="";
			// part2=document.getElementById("part2");
			// part2.innerHTML="";
			// part2.style.display="none";
			// part3=document.getElementById("part3");
			// part3.innerHTML="";
			textbox=document.getElementById("stockname");
			textbox.value="";
			// part3button=document.getElementById("part3button");
			// part3button.style.display="none";
			SHOW1=document.getElementById("showup");
			SHOW1.innerHTML="";
			//Showup.style.border="none";
		}
		//check whether the form is empty before submit
		function checknull(form){
			if(nullstring.test(form.stockname.value)){
				alert("Please don't submit null form");
				this.stockname.focus();
				return false;
			}
			else{
				return true;
			}
		}
		//to make the button change up or down
		function changenewsbutton(thisdiv){
			newstable=document.getElementById("news");
			if(tableshow){
				var text="click to show stock news <br />";
				text+='<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Down.png">';
				thisdiv.innerHTML=text;
				tableshow=false;
				newstable.style.visibility="hidden";
				//alert(thisdiv.innerHTML);
			}
			else{
				var text="click to hide stock news <br />";
				text+='<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Up.png">';
				thisdiv.innerHTML=text;
				tableshow=true;
				newstable.style.visibility="visible";
			}
		}
	</script>
</head>

<body>
<!-- phpGET part == to simplifiy the query -->
<?php
	$stockname="";
	$apikey="NEQW9X9MF77YLVBM";
	date_default_timezone_set('America/New_York');
	if ($_SERVER["REQUEST_METHOD"]=="GET"){
		if (empty($_GET["stockname"])){
			$stocknameerr=True;
		}
		else{
			$stockname=testinput($_GET["stockname"]);	
		}
	}
	function testinput($data){
		$data=trim($data);
		$data=stripslashes($data);
		$data=htmlspecialchars($data);
		return $data;
	}
?>

<!-- Input form part -->
<form action="<?php echo $_SERVER["PHP_SELF"];?>" onsubmit="return checknull(this)" method="GET">
	<h1>Stock Search</h1>
	<hr />
	<span id=inputboxtext>Enter Stock Ticker Symbol:*</span>
	<input id="stockname" type="text" name="stockname" size="25" maxlength="25" value="<?php echo $stockname; ?>" autofocus>
	<br />
	<!-- input id="search" type="submit" name="submit" value="Search" -->
	<input class="button" type="submit" name="submit" value="Search">
	<input class="button" type="button" onclick="cls()" value="Clear">
	<br />
	<div id=comments>* - Mandatory fields.</div>
	<br /><br />
</form>
<!-- Output 3 main parts-->
<div id="showup">
<!-- info table -->
<div id="part1">
	<?php 
		if (!empty($_GET["stockname"])){
			$urlofjson="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".$_GET["stockname"]."&outputsize=full&apikey=".$apikey;
			//var_dump($urlofjson);
			$contents=file_get_contents($urlofjson);
			$contents=utf8_encode($contents);
			if(strpos($contents,"Error")!=false){
				$_GET["stockname"]="";
				echo "<table>";
				echo "<tr><th>Error</th>";
				echo "<td>Error: NO record has been found, please enter a valid symbol</td></tr>";
				echo "</table>";
			}
			else{
			$results=json_decode($contents,true);
			$data=$results['Time Series (Daily)'];
			//$SYMBOL=$results['"Meta Data']['2. Symbol'];
			$first=each($data);
			$second=each($data);
			// var_dump($first);
			// echo "<br />";
			// var_dump($second);
			$a="[";$b="[";$c='["';
			reset($data);
			$maxvolume=0;
			$sixmonthago=strtotime("-6 Months");
			foreach ($data as $key => $value) {
				$d=strtotime($key);
				if ($d<$sixmonthago){
					break;
				}
				$a.=$value["4. close"].',';
				$b.=$value["5. volume"].',';
				$c.=date("m/d",$d).'","';
				$thisvolume=(int)($value["5. volume"]);
				if($thisvolume>$maxvolume){
					$maxvolume=$thisvolume;
				}
			}
			$a=chop($a,',');
			$b=chop($b,',');
			$c=chop($c,',"');
			$a.="]";
			$b.="]";
			$c.='"]';
			// var_dump($a);
			// echo "<br />";
			// var_dump($b);
			// echo "<br />";
			// var_dump($c);
			// echo "<br />";
		//}
		//if (!empty($_GET["stockname"])){
			echo "<table>";
			echo "<tr><th>Stock Ticker Symbol</th>";
			$Symbol=$_GET["stockname"];
			echo "<td>".$Symbol."</td></tr>";

			echo "<th>Close</th>";
			$Close=$first["value"]["4. close"];
			echo "<td>".$Close."</td></tr>";

			echo "<tr><th>Open</th>";
			$Open=$first["value"]["1. open"];
			echo "<td>".$Open."</td></tr>";

			echo "<tr><th>Previous Close</th>";
			$PreClose=$second["value"]["4. close"];
			echo "<td>".$PreClose."</td></tr>";

			echo "<tr><th>Change</th>";
			$Change=$Close-$PreClose;
			if($Change>0){
				$pic="<img src='http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png'>";
			}
			elseif($Change<0){
				$pic="<img src='http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png'>";
			}
			echo "<td>".round($Change,2).$pic."</td></tr>";

			echo "<tr><th>Change Percent</th>";
			$ChangePre=$Change/$PreClose*100;
			//$ChangePre=$ChangePre.toFixed(2);
			echo "<td>".round($ChangePre,2)."%".$pic."</td></tr>";

			echo "<tr><th>Day's Range</th>";
			//$Range=$first["value"]["2. high"]-$first["value"]["3. low"];
			echo "<td>".$first["value"]["3. low"].'-'.$first["value"]["2. high"]."</td></tr>";

			echo "<tr><th>Volume</th>";
			$Volume=$first["value"]["5. volume"];
			echo "<td>".number_format($Volume)."</td></tr>";

			echo "<tr><th>TimeStamp</th>";
			$TimeStamp=$first["key"];
			echo "<td>".$TimeStamp."</td></tr>";
			$timestampfirst=strtotime($TimeStamp);
			$TimeStamp=date("m/d/Y",$timestampfirst);
			$titleStock='"Stock Price('.$TimeStamp.')"';

			echo "<tr><th>Indicators</th><td>";
			$symbolstring='"'.$Symbol.'"';
			$PriceTxt= "<a class='indicators' href='javascript:void(0)' onclick='loadbox1()'>Price</a>";
			$SMATxt= "<a class='indicators' href='javascript:void(0)' onclick='loadjson(\"SMA\", ".$symbolstring." )'>SMA</a>";
			$EMATxt= "<a class='indicators' href='javascript:void(0)' onclick='loadjson(\"EMA\", ".$symbolstring." )'>EMA</a>";
			$STOCHTxt= "<a class='indicators' href='javascript:void(0)' onclick='loadjson(\"STOCH\", ".$symbolstring." )'>STOCH</a>";
			$RSITxt= "<a class='indicators' href='javascript:void(0)' onclick='loadjson(\"RSI\", ".$symbolstring." )'>RSI</a>";
			$ADXTxt= "<a class='indicators' href='javascript:void(0)' onclick='loadjson(\"ADX\", ".$symbolstring." )'>ADX</a>";
			$CCITxt= "<a class='indicators' href='javascript:void(0)' onclick='loadjson(\"CCI\", ".$symbolstring." )'>CCI</a>";
			$BBRANDSTxt= "<a class='indicators' href='javascript:void(0)' onclick='loadjson(\"BBANDS\", ".$symbolstring." )'>BBANDS</a>";
			$MACDTxt= "<a class='indicators' href='javascript:void(0)' onclick='loadjson(\"MACD\", ".$symbolstring." )'>MACD</a>";
			echo $PriceTxt.$SMATxt.$EMATxt.$STOCHTxt.$RSITxt.$ADXTxt.$CCITxt.$BBRANDSTxt.$MACDTxt;
			echo "</td></tr>";
			echo "</table>";
		}
		}
	?>
</div>
<br />

<!-- charts -->
<div id="part2">
	<div id="container1"></div>
	<div id="container"></div>
	<?php
		if (!empty($_GET["stockname"])){

			echo "<script>";
			echo "inputc=".$c.";";
			echo "inputa=".$a.";";
			echo "inputb=".$b.";";
			echo "inpute=".$titleStock.";";
			echo 'inputh="'.$_GET["stockname"].' ";';
			echo 'inputg='.$maxvolume.';';
			// echo "inputa=inputa.reverse();";
			// echo "inputb=inputb.reverse();";
			// echo "inputc=inputc.reverse();";
			echo "stockvolume(inputa,inputb,inputc,inpute,inputh,inputg);";
			echo "</script>";
		}
	?>
</div>
<br />

<!-- stock news -->
<div id="part3">
	<!-- Controller Button -->
	<div id="part3button" onclick="changenewsbutton(this)">
		click to show stock news <br />
		<img src="http://cs-server.usc.edu:45678/hw/hw6/images/Gray_Arrow_Down.png"> 
	</div>
		<?php
		if (!empty($_GET["stockname"])){
			echo "<script>";
			echo 'part3button=document.getElementById("part3button");';
			echo 'part3button.style.display="block";';
			echo 'part3button=document.getElementById("part2");';
			echo 'part3button.style.display="block";';
			echo "</script>";
		}
		?>
	<!-- NewsPHP Part -->
	<table id="news">
	<?php
		if (!empty($_GET["stockname"])){
			$urlofnews="https://seekingalpha.com/api/sa/combined/".$_GET["stockname"].".xml";
			$xml=simplexml_load_file($urlofnews) or die("Error: Cannot create object");
			//print_r($xml);
			// if($xml === false){
			// 	echo "Failed loading XML: ";
			// 	foreach(libxml_get_errors() as $error) {
			// 		echo "<br>",$error->message;
			// 	}
			// }
			//else{}
			//echo "<th>".$xml->getName()."</th>";//$items->book[0]
			$newstext="";
			$countNews=0;
			foreach($xml->channel->children() as $items){
				if($items->getName()=="item"){
					if(strpos($items->link,"article")!=false){
						$newstext.="<tr><td>";
						$newstext.='<a href="'.$items->link.'" target="_blank">'.$items->title."</a>";
						$newstext.="<span>Publicated Time: ".chop($items->pubDate,"-400")."</span>";
						$countNews+=1;
						$newstext.="</td></tr>";
					}
				}
				if($countNews>=5){
					break;
				}
			}
			echo $newstext;
		}
	?>
	</table>
</div>
<br />

</div>
</body>
</html>
