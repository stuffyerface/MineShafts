let playerStartTime = {};
let playerTimeSpent = {};
let active = false


register('chat', (player) => {
    player = player.split(" ").slice(-1)
    active = true;
    //console.log("'" + player + "' warped in.")
    playerStartTime[player] = Date.now();
}).setCriteria("⚔${player} warped to your instance")

register('chat', (player, location) => {
    if(!active || !playerStartTime[player]) {return};
    //console.log("'" + player + "' warped out.")
    let now = Date.now()
    let timeSpent = now - playerStartTime[player];
    playerTimeSpent[player] = timeSpent/1000 + "&es";
    // if active and auto warp, warp here
}).setCriteria(" » ${player} is traveling to ${location} FOLLOW")

register('chat', () => {
    if(active){
        ChatLib.chat("&b▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n&eTracked Shaft Times:")
        let now = Date.now()
        for (let key in playerTimeSpent){
            let timeSpent = playerTimeSpent[key]
            let color = "f"
            if(timeSpent > 40000){
                color = "c"
            }
            ChatLib.chat(" &3" + key + ": &" + color + timeSpent)
        }
        for (let key in playerStartTime){
            if (!playerTimeSpent[key]){
                let color = "f"
                    if(timeSpent > 40000){
                color = "c"
                }
                let timeSpent = (now - playerStartTime[key])/1000 + "&es &cDNF";
                ChatLib.chat(" &3" + key + ": &" + color + timeSpent)
            }
        }
        ChatLib.chat("&b▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
        reset()
    }
}).setCriteria("The mineshaft entrance has caved in... it doesn't look like anyone else will be able to get in here.")

register('worldLoad', () =>{
    reset()
})

function reset() {
    active = false;
    playerStartTime = {};
    playerTimeSpent = {};
}
