// Update each ssn
var seasonStart = "2016-03-13";
var d1SpreadsheetUrl = "https://spreadsheets.google.com/feeds/list/1EQY5f7rTH_KGCXEtJ5BL1vdiNijHYW3UAaIRfvBi0sA/1/public/values?alt=json"
  var d2SpreadsheetUrl = "https://spreadsheets.google.com/feeds/list/1iHeLMUUObFy4L-prAw1VMi2JKW-_pbemA6d2f0gojK0/1/public/values?alt=json"
 var daysSkipped = 1;
 var numTeamsD1 = 6;
 var numTeamsD2 = 8;
 // Don't change anything below this
 var seasonStartDate = new Date(seasonStart+"T00:00:00-0500");
 var today = new Date();
 var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
var daysSinceStart = Math.round(Math.abs((seasonStartDate.getTime() - today.getTime())/(oneDay)));
var gameday = parseInt((((daysSinceStart+1)/7)*2)+1-daysSkipped);
 if(today < seasonStartDate) {
    gameday = 1;
 }
/*$.get( d1SpreadsheetUrl, function( data ) {
       updateDivision(data, numTeamsD1, 'd1');
});
$.get( d2SpreadsheetUrl, function( data ) {
       updateDivision(data, numTeamsD2, 'd2');
});*/
 function updateDivision(responseJson, numTeams, division) {
   var ul = $('#'+division);
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
var d1SpreadsheetUrl = "https://spreadsheets.google.com/feeds/list/1EQY5f7rTH_KGCXEtJ5BL1vdiNijHYW3UAaIRfvBi0sA/2/public/values?alt=json"
var d2SpreadsheetUrl = "https://spreadsheets.google.com/feeds/list/1iHeLMUUObFy4L-prAw1VMi2JKW-_pbemA6d2f0gojK0/2/public/values?alt=json"
$.get(d1SpreadsheetUrl, function(data) {
  updateContent(data, 'division_1');
});
$.get(d2SpreadsheetUrl, function(data) {
  updateContent(data, 'division_2');
});

function updateContent(responseJson, division) {
  var tbody = $('#' + division);
  var numEntries = responseJson.feed.entry.length;
  for (var i = 0; i < numEntries; i++) {
    var row = responseJson.feed.entry[i];
    var team = row.gsx$team.$t;
    var gp = row.gsx$gp.$t;
    var wins = row.gsx$w.$t;
    var losses = row.gsx$l.$t;
    var winPercent = row.gsx$winpercent.$t;
    var gf = row.gsx$gf.$t;
    var ga = row.gsx$ga.$t;
    var gfa = row.gsx$gfa.$t;
    var gaa = row.gsx$gaa.$t;
    var streak = row.gsx$winstreak.$t;
    tbody.append('<tr><td>' + team + '</td><td>' + gp + '</td><td>' + wins + '</td><td>' + losses + '</td><td>' + winPercent + '</td><td>' + gf + '</td><td>' + ga + '</td><td>' + gfa + '</td><td>' + gaa + '</td><td>' + streak + '</td></tr>');
  }
}