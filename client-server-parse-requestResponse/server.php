<?php
/*
header('content-Type:text/javascript');
echo 'alert("test parse response")';
header('content-Type:text/xml');
echo '<xml><name>kursk</name><age>35</age></xml>';
*/
header('content-Type:application/json');
echo '{"x":1,"y":2,"z":3}';
?>

