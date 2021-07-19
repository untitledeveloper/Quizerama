var local_players, scoreboard_list;

function get(x){
    return document.getElementById(x);
  }  

local_players = JSON.parse(localStorage.getItem("local_players"))

for (x in local_players) {
    scoreboard_list = get("scoreboard_list");
    console.log(x)
    console.log(local_players[x])

    scoreboard_list.innerHTML += "<p>"+x+":"+local_players[x]+"</p>";
}

