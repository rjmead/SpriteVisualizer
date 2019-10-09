var fs = require('fs');
var files = fs.readdirSync(`${__dirname}/sprites/`);

// notes for client side:
// Create drop down that selects characters from pixelcharacterscollection directory and loads in all sprite options
// Add buttons that change the animation when clicked
// ------
// notes for this script:
// need to loop through all the directories in the sprites folder
// then loop through each of those directories and which will be the 'actions' for each sprite
// need to get the names of each action, path, and total frames

// sprites => Characters => Actions => Frames

// sprites/SKELETONARCHER-artassets/skeletonarcherATTACKleft/skeletonarcherATTACKleft (1).png
// ATTACKleft
// ATTACKright
// IDLEleft
// IDLEright
// IMPACTeffect
// PORTRAIT
// WALKleft
// WALKright

var FinalCharacters = {};

files.forEach((c) => {
    // init new character
    //console.log('--' + f)
    var character = new Object()
    character.name = c.split('-')[0].toLowerCase()
    character.actions = {}
    
    // get list of all characters in directory
    var characters = fs.readdirSync(`${__dirname}/sprites/${c}`)

    characters.forEach((a) => {
        // get all actions for character
        console.log(a)
        var action = {}
        var actionDir = `sprites/${c}/${a}/`
        
        var framesCount = fs.readdirSync(actionDir).length
        action.name = a.replace(character.name,'')
        action.totalFrames = framesCount
        action.framesPath = actionDir
        action.frames = []
        var frames = fs.readdirSync(actionDir)
        frames.forEach((f) => {
            action.frames.push(`sprites/${c}/${a}/${f}`)
        })


        character.actions[action.name] = action

        //console.log(action.name)
    })
    FinalCharacters[character.name] = character;
})

//console.log("FinalCharactersArray:")
console.log(FinalCharacters)

fs.writeFile(`${__dirname}/characters.json`, JSON.stringify(FinalCharacters), () => {
    console.log("Finished")
})
