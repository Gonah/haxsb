var d1SpreadsheetUrl = "https://spreadsheets.google.com/feeds/list/1fUOTfxLYCrHuxnyUi7Djq3u8ZNBS-vpJTplYPTvb_-w/2/public/values?alt=json"
var d2SpreadsheetUrl = "https://spreadsheets.google.com/feeds/list/1rjAq9iwdOiIJlwkBC-IHPjNehGs79Rb0Xl42WgwzxyY/2/public/values?alt=json"
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
