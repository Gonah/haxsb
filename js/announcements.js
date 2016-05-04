var announceSpreadsheet = "https://spreadsheets.google.com/feeds/list/1AiIxlnEh8Qt06HYz68uIhVWBvv3angYn-5xXhnvv6gQ/2/public/values?alt=json"
$.get(announceSpreadsheet, function(data) {
  updateAnnouncements(data);
});

function updateAnnouncements(responseJson) {
  var div = $('#' + "announcements");
  console.log(div);
  var numEntries = responseJson.feed.entry.length;
  console.log(numEntries);
  for (var i = numEntries; (i > 0 && numEntries-i < 5); i--) {
    var row = responseJson.feed.entry[i-1];
    var date = row.gsx$date.$t;
    var title = row.gsx$title.$t;
    var announcement = row.gsx$announcement.$t;
    div.append("<p><b>"+date+"</b>: "+title+"	<br /> "+announcement+"</p>");
  }
}