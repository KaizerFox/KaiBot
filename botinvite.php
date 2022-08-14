<?php
include 'header.php';
?>

<!doctype html>
<html prefix="og: https://ogp.me/ns#">
<head>
<link href="./index.css" rel="stylesheet" type="text/css" media="all">

<meta property="og:title" content="Kaizer's Invite Page" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://kaizer.ga/botinvite.php" />

<meta charset="UTF-8">
<link rel="apple-touch-icon"/>
<meta name="format-detection"/>
<meta name="HandheldFriendly"/>
<meta name="viewport"/>
<meta http-equiv="Expires"/>
<meta http-equiv="X-UA-Compatible"/>
<title>Kaizer's Site</title>
</head>

<body class="body">
<center>

<h2>these are the invites for the bot:</h2>
<br>

<script>
    function openInNewTab(url) {
      var win = window.open(url, '_blank');
      win.focus();
    }
    function admin1() {
        openInNewTab("https://discord.com/oauth2/authorize?client_id=1007806243676622889&scope=bot&permissions=8");
    }
    function admin2() {
        openInNewTab("https://discord.com/oauth2/authorize?client_id=1007806243676622889&scope=bot&permissions=1644971949559");
    }
    function goBack() {
        window.location.href="https://kaizer.ga/index.php";
    }
</script>

<button onclick="admin1()" style="height:99px;width:500px"> Click For Admin Invite </button>
<br><br>
<button onclick="admin2()" style="height:99px;width:500px"> Click For Non-Admin Invite </button>
<br><br>
<button onclick="goBack()" style="height:99px;width:500px"> Click To Go Home </button>

</center>
</body>
</html>