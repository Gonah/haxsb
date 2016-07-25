var d1SpreadsheetUrl = "https://spreadsheets.google.com/feeds/list/1xPUCT2i1bd7Iv41tKR1wgVyJ9V-QOBg_t8Gp7NU2q70/2/public/values?alt=json"
var d2SpreadsheetUrl = "https://spreadsheets.google.com/feeds/list/1R1W8DuMiI1lwMeNnYYmpT08J7ZzXba-rY6YqnYnQZu0/2/public/values?alt=json"
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