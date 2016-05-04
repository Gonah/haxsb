var announceSpreadsheet = "https://spreadsheets.google.com/feeds/list/1AiIxlnEh8Qt06HYz68uIhVWBvv3angYn-5xXhnvv6gQ/2/public/values?alt=json"
$.get(announceSpreadsheet, function(data) {
  updateAnnouncements(data);
});

function updateAnnouncements(responseJson) {
  var div = $('#' + "announcements");
  var numEntries = responseJson.feed.entry.length;
  for (var i = numEntries; (i > 0 && numEntries-i < 5); i--) {
    var row = responseJson.feed.entry[i-1];
    var date = row.gsx$date.$t;
    var title = row.gsx$title.$t;
    var announcement = row.gsx$announcement.$t;
    var link = row.gsx$link.$t;
    var linkHtml = "";
    if(link.length > 0) {
      linkHtml = '<br /><a class="announcelink" href="'+link+'">More info...</a>';
    }
    div.append('<p class="announcement"><b>'+date+'</b>: '+title+'  <br /> '+announcement+''+linkHtml+'</p>');
  }
}