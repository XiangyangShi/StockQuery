var express = require('express');
var util = require('util'); 
var request = require('request');
var parseString = require('xml2js').parseString;

var app = express();

app.use(express.static('public'));
//testpage

app.get('/hello', function (req, res) {
  if (req.query.second){
    var second=req.query.second
  }
  else{
    var second="tttt"
  }
  var response = { "first": req.query.first, "second":second}
  console.log("request for helloworld");
  console.log(response);
  console.log(util.inspect(req.query));
  res.end(JSON.stringify(response));
})
// test html
app.get('/test', function (req, res) {
  console.log("load local test");
  res.sendFile(__dirname + "/test.html");
})
app.get('/test.css', function (req, res) {
  console.log("load local test");
  res.sendFile(__dirname + "/test.css");
})
app.get('/test.js', function (req, res) {
  console.log("load local test");
  res.sendFile(__dirname + "/test.js");
})
// mainpage
app.get('/', function (req, res) {
  console.log("open a.html");
  res.sendFile(__dirname + "/a.html");
})
// css file
app.get('/a.css', function (req, res) {
  console.log("load local css");
  res.sendFile(__dirname + "/a.css");
})
// js file
app.get('/a.js', function (req, res) {
  console.log("load local jquery");
  res.sendFile(__dirname + "/a.js");
})
// request for news with symbol
app.get('/news', function (req, res) {
  if (req.query.symbol)
    var symbol=req.query.symbol;
  else
    var symbol="AAPL";
  request('https://seekingalpha.com/api/sa/combined/'+ symbol +'.xml',function(err,response,body){
    console.log('error:',err);
    console.log("statusCode:",response && response.statusCode);
    console.log("request for news of ",symbol)
    parseString(body, {explicitArray : false}, function (err, result) {
      //console.log(util.inspect(result.rss.channel.item));
      items=result.rss.channel.item;
      var count=0;
      res_string='{\n"news" : [\n';
      for(item in items){
        if(count!=0)
          res_string=res_string+","
        var title=items[item].title;
        var href=items[item].link;
        var date=items[item].pubDate;
        var author=items[item]['sa:author_name']
          // console.log(items[item])
          // console.log(items[item].title)
          // console.log("--------------")
        if (href.indexOf("article")!=0){
          res_string=res_string+'{\n"title": "'+title+'",\n"href": "'+href+'",\n"date": "'+date+'",\n"author": "'+author+'"\n}';
          count=count+1;
        }
        if(count>=5)break;
      }
      res_string=res_string+"\n]\n}";
      // console.log(res_string);
      // console.log(res_string)
      res.end(res_string);
    });
  });
})
// request for stocks
app.get('/stocks', function (req, res) {
  if (req.query.symbol)
    var symbol=req.query.symbol;
  else
    var symbol="AAPL";
  urlofjson="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+symbol+"&outputsize=full&apikey=NEQW9X9MF77YLVBM";
  request(urlofjson,function(err,response,body){
    console.log('error:',err);
    console.log("statusCode:",response && response.statusCode);
    console.log("request for stockvolume for ",symbol);
    // console.log(body)
    // res_string="";
    // jasonObj=JSON.parse(body);

    // symbolTxt=jasonObj["Meta Data"]["1: Symbol"];
    // titleTxt=jasonObj["Meta Data"]["2: Indicator"];
    // Dates=jasonObj["Time Series (Daily)"];

    // sixmonthago= new Date();
    // sixmonthago.setDate(sixmonthago.getDate()-180);
    
    // datanull=[];
    // datanullSMA=[];
    
    // for(date in Dates){
    //     var ad=date;
    //     var fullDate = ad.split("-");  
    //     detecteddate= new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0); 
    //     if(detecteddate<sixmonthago){
    //       break;
    //     } 
    //     datanull.push(fullDate[1]+"/"+fullDate[2]);
    //     datanullSMA.push(parseFloat(Dates[date][func]));
    //   }
    res.end(body);

  });
})
// request for symbol
app.get('/symbol', function (req, res) {
  if (req.query.symbol)
    var symbol=req.query.symbol;
  else
    var symbol="AAPL";
  urlof="https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+symbol+"&interval=1min&apikey=NEQW9X9MF77YLVBM";
  urlofjson="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+symbol+"&outputsize=full&apikey=NEQW9X9MF77YLVBM";
  request(urlof,function(err,response,body){
    console.log('error:',err);
    console.log("statusCode:",response && response.statusCode);
    console.log("request for symbol for ",symbol);
    res_string="";
    jasonObj=JSON.parse(body);
    Dates=jasonObj["Time Series (1min)"];
    var count = 0;
    var close=1;
    var volume=1;
    var lastclose=1;
    for(date in Dates){
    	if(count==0){
    		close=Dates[date]["4. close"];
    		volume=Dates[date]["5. volume"];
    	}
    	if(count==1){
    		lastclose=Dates[date]["4. close"];
    	}
        count++;
      }
    var change = close - lastclose;
    var changerate = change/close *100.0;
    res_string='{ "symbol" : "'+symbol+'", "price" : "'+close;
    res_string+='", "change" : "'+change+'", "changerate" : "'+changerate;
    res_string+='", "volume" : "'+volume+'"}';
    res.end(res_string);

  });
})
// request for indicators with different function
app.get('/indicator1', function (req, res) {
  if (req.query.symbol){
    var symbol=req.query.symbol;
    var func=req.query.func;
  }
  else{
    var symbol="AAPL";
    var func="SMA";
  }
  urlofjson="https://www.alphavantage.co/query?function="+func+"&symbol="+symbol+"&interval=daily&time_period=10&series_type=close&apikey=NEQW9X9MF77YLVBM";
  request(urlofjson,function(err,response,body){
  console.log('error:',err);
  console.log("statusCode:",response && response.statusCode);
  res.end(body);
  
  });
})
// request for autocomplete
app.get('/auto', function (req, res) {
  if (req.query.symbol){
    var symbol=req.query.symbol;
    urlofjson="http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input="+symbol;
    request(urlofjson,function(err,response,body){
      console.log('error:',err);
      console.log("statusCode:",response && response.statusCode);
      if(response&&response.statusCode==501){
        console.log('501 receieved');
      }
      res.end(body);
      console.log(symbol);
    });
  }
  else{
    res.end("[]");
  }
})
// request for history
app.get('/history', function (req, res) {
  if (req.query.symbol)
    var symbol=req.query.symbol;
  else
    var symbol="AAPL";
  urlofjson="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+symbol+"&outputsize=full&apikey=NEQW9X9MF77YLVBM";
  request(urlofjson,function(err,response,body){
    console.log('error:',err);
    console.log("statusCode:",response && response.statusCode);
    console.log("request for history for ",symbol);
    result=[];
    jasonObj=JSON.parse(body);
    Dates=jasonObj["Time Series (Daily)"];
    var count = 0;
    var close = 1;
    var volume = 1;
    for(date in Dates){
      if(count>=1000){
        break;
      }
      var close=Dates[date]["4. close"];
      // var volume=Dates[date]["5. volume"];
      var ad=date;
      var fullDate = ad.split("-");
      var detecteddate= new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0);
      result.push([detecteddate.getTime(),parseFloat(close)]);
      count++;
    }
    result.reverse();
    res_string=JSON.stringify(result);
    res.end(res_string);
    console.log(res_string);
  });
})
// request for history1
app.get('/history1', function (req, res) {
  if (req.query.symbol)
    var symbol=req.query.symbol;
  else
    var symbol="AAPL";
  urlofjson="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+symbol+"&outputsize=full&apikey=NEQW9X9MF77YLVBM";
  request(urlofjson,function(err,response,body){
    console.log('error:',err);
    console.log("statusCode:",response && response.statusCode);
    console.log("request for history for ",symbol);
    result=[];
    jasonObj=JSON.parse(body);
    Dates=jasonObj["Time Series (Daily)"];
    var count = 0;
    var close = 1;
    var volume = 1;
    for(date in Dates){
      if(count>=1000){
        break;
      }
      var close=Dates[date]["4. close"];
      var volume=Dates[date]["5. volume"];
      var ad=date;
      var fullDate = ad.split("-");
      var monthstr = "Jan"
      switch(fullDate[1]){
        case "01":
          monthstr= "Jan";break;
        case "02":
          monthstr= "Feb";break;
        case "03":
          monthstr= "Mar";break;
        case "04":
          monthstr= "Apr";break;
        case "05":
          monthstr= "May";break;
        case "06":
          monthstr= "Jun";break;
        case "07":
          monthstr= "Jul";break;
        case "08":
          monthstr= "Aug";break;
        case "09":
          monthstr= "Sep";break;
        case "10":
          monthstr= "Oct";break;
        case "11":
          monthstr= "Nov";break;
        case "12":
          monthstr= "Dec";break;
        default:
          monthstr= "Mon";break;
      }
      var outstr="/* "+monthstr+" "+fullDate[0]+" */";
      result.push([volume,close,outstr]);
      count++;
    }
    result.reverse();
    res_string="?(/* strangedata */\n[\n";
    // res_string="[";
    for(i in result){
      if(i==0){
        res_string+="["+String(result[i][0])+","+String(result[i][1])+"]";
      }
      else{
        if(result[i][2]!=result[i-1][2]){
          res_string+=",\n"+result[i][2]+"\n";
          res_string+="["+String(result[i][0])+","+String(result[i][1])+"]";
        }
        else{
          res_string+=",\n"+"["+String(result[i][0])+","+String(result[i][1])+"]";
        }
      }
    }
    res_string+="\n]);";
    // res_string+="]";
    res.end(res_string);
    console.log(res_string);
  });
})


var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("server set up on URL of 'http://%s:%s'", host, port);
})
