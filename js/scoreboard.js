// Update each ssn
var seasonStart = "2016-05-22";
var d1SpreadsheetKey = "13jFWsVajerfpFcfK1L64NdQmfTU8JFpnAlmpa2527Q0"
var d2SpreadsheetKey = "1pdFQTFKaNm9Gj2CyKGoi8r4fzkhDOF93SnGD2MXfL00"
 var daysSkipped = 0;
 var numTeamsD1 = 6;
 var numTeamsD2 = 8;
 // Don't change anything below this
var d1SpreadsheetUrl = "https://spreadsheets.google.com/feeds/list/"+d1SpreadsheetKey+"/1/public/values?alt=json"
  var d2SpreadsheetUrl = "https://spreadsheets.google.com/feeds/list/"+d2SpreadsheetKey+"/1/public/values?alt=json"
  var d1SpreadsheetPubHtml = "https://docs.google.com/spreadsheets/d/"+d1SpreadsheetKey+"/pubhtml"
  var d2SpreadsheetPubHtml = "https://docs.google.com/spreadsheets/d/"+d2SpreadsheetKey+"/pubhtml"
  var seasonStartComps = seasonStart.split('-');
 var seasonStartDate = new Date(seasonStartComps[0], seasonStartComps[1]-1, seasonStartComps[2]);
 var today = new Date();
 var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
var daysSinceStart = Math.round(Math.abs((seasonStartDate.getTime() - today.getTime())/(oneDay)));
var gameday = parseInt((((daysSinceStart+1)/7)*2)+1-daysSkipped);
 if(today < seasonStartDate) {
    gameday = 1;
 }
$.get( d1SpreadsheetUrl, function( data ) {
       updateDivision(data, numTeamsD1, 'd1');
});
$.get( d2SpreadsheetUrl, function( data ) {
       updateDivision(data, numTeamsD2, 'd2');
});
 function updateDivision(responseJson, numTeams, division) {
   var ul = $('#'+division);
   var link = (division=='d1')?d1SpreadsheetPubHtml:d2SpreadsheetPubHtml;
   ul.attr('onclick', "window.open('"+link+"', '_blank');");
   var divisionName = division=='d1' ? 'Divsion I' : 'Division II';
   var gameDayName = ((gameday-1)%2==(0+daysSkipped)) ? "Sunday" : "Thursday";
   var week = Math.ceil(gameday/2);
   ul.append('<li style="margin-right: 1px; width: 75px;" class="day-box"><p>'+divisionName+'</p><p>Week ' + week + '</p><p>'+gameDayName+'</p></li>');
   for (var i = numTeams * (gameday - 1); i < numTeams * gameday; i++) {
     var gameNum = i - (numTeams * (gameday - 1));
     var gameTime = (gameNum >= numTeams/2) ? "9:30pm EST" : "9:00pm EST";
     var game = responseJson.feed.entry[i];
     var homeTeam = game.gsx$hometeam.$t;
     var awayTeam = game.gsx$awayteam.$t;
     var homeScore = game.gsx$homescore.$t ? game.gsx$homescore.$t : "H";
     var awayScore = game.gsx$awayscore.$t ? game.gsx$awayscore.$t : "A";
     if(parseInt(homeScore) > parseInt(awayScore)) {
         homeTeam = '<b>'+game.gsx$hometeam.$t+'</b>';
     }
     else if(parseInt(awayScore) > parseInt(homeScore)) {
         awayTeam = '<b>'+game.gsx$awayteam.$t+'</b>';
     }
     ul.append('<li style="margin-right: 1px; width: 90px;"><p>' + homeTeam + ' ('+game.gsx$homerecord.$t+') <span class="gamebox-score">' + homeScore + '</span></p><p>' + awayTeam + ' ('+game.gsx$awayrecord.$t+') <span class="gamebox-score">' + awayScore + '</span></p><p>'+gameTime+'</p></li>');
   }
 }