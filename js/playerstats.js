var url = "https://spreadsheets.google.com/feeds/list/1obnchEiDbtStHANBQCRRp2P8JUFSIGJ-14cBcSiqhx8/1/public/values?alt=json";

$.get(url, function (data){
   updateProfiles(data);
});

 function updateProfiles(data) {
var playerLookup = [];
   $('[id*=post]').each(function() {
     var profileField = $(this).next('tr').find('dl.user_profile');
     var playerName = $(this).find('a.member').text();
     var player = findPlayer(playerName, playerLookup, data.feed.entry);
     if(!profileField.length && player) {
         $(this).next('tr').find('.c_user').append('<dl class="user_profile"></dl>');
      profileField = $(this).next('tr').find('dl.user_profile');
     }
     if(player) {
     profileField.append('<dt>Seasons:</dt><dd>' + player.gsx$seasons.$t + '</dd>');
     profileField.append('<dt>Record:</dt><dd>' + player.gsx$record.$t + '</dd></dd>');
     profileField.append('<dt>Goals:</dt><dd>' + player.gsx$goals.$t + '</dd>');
     profileField.append('</dd><dt>GPM:</dt><dd>' + (parseFloat(player.gsx$goals.$t)/parseFloat(player.gsx$minutes.$t)).toFixed(2)  + '</dd>');
     }
   });
 };

 function findPlayer(name, playerLookup, entries) {
   var numEntries = entries.length;
   var trimmedName = name.replace(/\W/g, '').toUpperCase();
   var existing = playerLookup[trimmedName];
   if(existing) {
        return existing;
   }
   for (var i = 0; i < numEntries; i++) {
     var player = entries[i];
   var trimmedStatPlayerName = player.gsx$player.$t.replace(/\W/g, '').toUpperCase();
     if (trimmedStatPlayerName === trimmedName) {
       playerLookup[trimmedName] = player;
       return player;
     }
   }
 };