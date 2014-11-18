//JS script for new AHA responsive header script
//Date: 09/2014

document.write('<link rel="stylesheet" id="bootstrap-css" href="http://static.heart.org/ahaanywhere_dev/v2/css/bootstrap.min.css" type="text/css" media="all">');
document.write('<link rel="stylesheet" href="http://static.heart.org/ahaanywhere_dev/v2/css/aha-header-external-responsive.css" type="text/css" media="all">');

var ahaTopBar;

ahaTopBar = '<div id="top-header"><div class="container"><div class="th-left col-sm-8 clearfix"> <nav class="std-menu top-header-menu ahamenu"><ul class="menu">' +
'<li class="heart_logo"><a href="http://heart.org" class="aha_logo"><img src="http://digitaldev.heart.org/heart/wp-content/uploads/2013/10/300px_heart_animate_NOT_Optimized_3.gif" width="59" height="40"></a></li>' +
'<li class="hidden-xs"><a href="https://donate.heart.org/site/apps/ka/sd/donorcustom.asp?msource=2013DOBUTTON&array=ask40&c=fmJUKcOZJkI8G&b=8077571" class="header-button donate-button">DONATE</a></li>' +
'<li class="hidden-xs"><a href="http://www.heart.org/HEARTORG/volunteer/volunteerForm.jsp" class="header-button volunteer-button">VOLUNTEER</a></li>' +
'<li><a href="http://www.heart.org/HEARTORG/Conditions/911-Warnings-Signs-of-a-Heart-Attack_UCM_305346_SubHomePage.jsp" class="header-button warning-button">Warning Signs</a></li>' +
'</ul></nav></div></div></div>';

document.write(ahaTopBar);