let playerStartTime = {};
let playerTimeSpent = {};
let active = false


register('chat', (player) => {
    player = player.split(" ")[-1]
    active = true;
    playerStartTime[player] = Date.now();
}).setCriteria("⚔${player} warped to your instance")

register('chat', (player, location) => {
    let now = Date.now()
    for (let key in playerStartTime){
        let timeSpent = now - playerStartTime[key];
        playerTimeSpent[player] = timeSpent/1000 + "&es";
    }
    // if active and auto warp, warp here
}).setCriteria(" » ${player} is traveling to ${location} FOLLOW")

register('chat', () => {
    if(active){
        ChatLib.chat("&b▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n&eTracked Shaft Times:")
        let now = Date.now()
        for (let key in playerStartTime){
            if (!playerTimeSpent[key]){
                playerTimeSpent[key] = (now - playerStartTime[key])/1000 + "&es &cDNF";
            }
        }
        for (let key in playerTimeSpent){
            let timeSpent = playerTimeSpent[key]
            ChatLib.chat(" &3" + key + ": &f" + timeSpent)
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
