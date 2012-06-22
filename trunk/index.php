<!--Copyright 2012 Milán Unicsovics, MTA SZTAKI-->

<!--   Licensed under the Apache License, Version 2.0 (the "License");-->
<!--   you may not use this file except in compliance with the License.-->
<!--   You may obtain a copy of the License at-->

<!--       http://www.apache.org/licenses/LICENSE-2.0-->

<!--   Unless required by applicable law or agreed to in writing, software-->
<!--   distributed under the License is distributed on an "AS IS" BASIS,-->
<!--   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.-->
<!--   See the License for the specific language governing permissions and-->
<!--   limitations under the License.-->

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>

<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta http-equiv="content-language" content="hu" />
<meta name='author' content='Milan Unicsovics, u.milan@gmail.com'/>
<meta name='description' content='dashboard test'/>

<?php
#javascript imports
$file = 'js_imports.xml';

$xml = simplexml_load_file($file);
foreach($xml->children() as $child)
{
    print($child);
    print("\n");
}

#css imports
$file = 'css_imports.xml';

$xml = simplexml_load_file($file);
foreach($xml->children() as $child)
{
    print($child);
    print("\n");
}

?>

</head>

<body>

<!--MENU FOR RIGHT CLICK-->
    <div class="contextMenu" id="myMenu1">
    <ul>
        <li id="open">Open</li>
        <li id="save">Save</li>
        <li id="close">Close</li>
    </ul>
    </div>

<!--WALL-->
	<div id="distance"></div>
    <div id="wall">
        <div class="restraint" >

<?php
#serverside loading

$file = 'dashboard_config.xml';
$xml = simplexml_load_file($file);
$json = json_encode($xml);
$array = json_decode($json,TRUE);

for ($i=0;$i<=count($array['box']);$i++){
    $content='';
    if (($array['box'][$i]['@attributes']['serverside'])=='true') {
        if ($array['box'][$i]['@attributes']['url']!='_') {
            $ch = curl_init($array['box'][$i]['@attributes']['url']);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
            $content = curl_exec($ch);
            curl_close($ch);
        }
        print("<div id=".$array['box'][$i]['@attributes']['bname']." class=\"box obstacle\" status=\"show\"><div class=\"content\"><div class=\"incontent\"><p class=\"incontentheader\"/>"."$content"."</div></div></div>");
    }
}
?>

        </div>
    </div>
    
<!--DASHTOOLBAR-->
    <div id="dashtoolbar" ></div>

</body>

</html>
