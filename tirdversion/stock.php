<html>
<head>
	<meta name="HomeWork6" content="XiangyangShi">
	<title>Stock Query</title>
	<!-- css part -->
	<style type="text/css">
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
		form span {
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
	</style>
	<!-- js part -->
	<script>
		var ChuanBei=3281234236;
		nullstring=/^\s*$/;
		function cls(){
			part1=document.getElementById("part1");
			part1.innerHTML="";
			part2=document.getElementById("part2");
			part2.innerHTML="";
			part3=document.getElementById("part3");
			part3.innerHTML="";
			textbox=document.getElementById("stockname");
			textbox.value="";
		}
		function checknull(form){
			if(nullstring.test(form.stockname.value)){
				alert("Please enter a symbol");
				this.stockname.focus();
				return false;
			}
			else{
				return true;
			}
		}
	</script>
</head>

<body>

<!-- phpGET part -->
<div id="phpGET">
	<?php
	$stockname="";
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
</div>

<!-- form part -->
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

<!-- showup part-->
<div id="showup">
	<div id="part1">
		aaa
		<?php 
			echo $stockname;
		?>
	</div>
	<div id="part2">
		bbb
	</div>
	<div id="part3">
		ccc
	</div>
</div>

</body>
</html>
