
<html>
        <head>
                <meta http-equiv="Content-Type" content="text/html;
charset=ISO-8859-1">
 <title>PHP Test</title>
</head>
<body>
<p>
</p> </body>
</html>
<h1>PHP Test</h1>
<p>
<b>An Example of PHP in Action</b><br />
<?php date_default_timezone_set('America/Los_Angeles');?>
        <?php echo "The Current Date and Time is: <br>";
        echo date("g:i A l, F j Y.");?>
</p>
<h2>PHP Information</h2>
<?php phpinfo(); ?>