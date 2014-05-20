<?php
$array = $_POST['array'];
$fp = fopen("savedlinks.txt","w");
for ($array as $num){
	echo($num);
	$savestring = $num + ",";
}
fwrite($fp, $savestring);
fclose($fp);
?>