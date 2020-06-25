const listOfLinks = () => document.querySelector("#listOfLinks")
const onDeckCircle = () => document.querySelector("#onDeckCircle")
const releaseButton = () => document.querySelector("#sortByRelease")
const objectiveButton = () => document.querySelector("#sortByObjective")
const newLinkButton = () => document.querySelector("#newLinkButton")
const saveButton = () => document.querySelector("#saveButton")
const loadButton = () => document.querySelector("#loadButton")

let tempSave
//let savedNode

class ListNode {
    constructor(val, nxt=null) {
        this.val = val
        this.nxt = nxt
    }
}

class Hero {
    constructor(gameTitle, year, console, objectiveRanking, epithet, picture, name='Link') {
        this.gameTitle = gameTitle
        this.year = year
        this.console = console
        this.objectiveRanking = objectiveRanking
        this.epithet = epithet
        this.picture = picture
        this.name = name
    }

    famousQuote() {
        "HiYa!"
    }
}

let newLink = new ListNode(new Hero("Spirit Tracks", 2009, 'DS', 10, 'Hero of Trains, for some reason', 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/2/24/ST_Link_and_Alfonzo_Artwork.png/753px-ST_Link_and_Alfonzo_Artwork.png'))

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function setup() {
    heroes = [
        new Hero("Legend of Zelda", 1987, 'NES', 8, "Legendary Hero", 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/archive/8/86/20170404010136%21TLoZ_Link_Kneeling_Artwork.png'),
        new Hero("Adventure of Link", 1988, 'NES', 11, "Legendary Hero", 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/9/94/TAoL_Link_Artwork.png'),
        new Hero("A Link to the Past", 1992, 'SNES', 5, "Knight of Hyrule", "https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/5/57/ALttP_Link_Artwork_2.png/434px-ALttP_Link_Artwork_2.png"),
        new Hero("Link's Awakening", 1993, 'GameBoy', 6, "Knight of Hyrule", 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/0/0a/LANS_Link_Render.png/601px-LANS_Link_Render.png'),
        new Hero("Ocarina of Time", 1998, 'Nintendo 64', 4, 'Hero of Time', 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/2/29/OoT_Link_Artwork.png/482px-OoT_Link_Artwork.png'),
        new Hero("Majora's Mask", 2000, 'Nintendo 64', 2, 'Hero of Time', 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/b/bd/MM_Link_Goron_Mask_Artwork.png/392px-MM_Link_Goron_Mask_Artwork.png'),
        new Hero("The Wind Waker", 2003, 'GameCube', 1, 'Hero of Winds', 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/3/35/WW_Link_3.png/399px-WW_Link_3.png'),
        new Hero("Twilight Princess", 2006, 'Wii', 7, 'Hero of Twilight', 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/4/41/TP_Link_03.png/329px-TP_Link_03.png'),
        new Hero('Skyward Sword', 2011, 'Wii', 9, 'Hero of the Skies', 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/9/92/Link_SS_3.png/552px-Link_SS_3.png'),
        new Hero('Breath of the Wild', 2017, 'Switch', 3, "Hero of the Wild", 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/0/02/BotW_Link_Shooting_Artwork.png/476px-BotW_Link_Shooting_Artwork.png'),
    ]
    heroes = shuffleArray(heroes)
    nums = heroes.map(h => h.objectiveRanking)
    console.log(nums)

    listNodeHeroes = heroes.map(h => new ListNode(h))
    for (let i = 0; i < listNodeHeroes.length; i++) {
        listNodeHeroes[i].nxt = listNodeHeroes[i+1]
    }
    return listNodeHeroes[0]
}

function renderOneLink(hero, className='hero-card', parent=listOfLinks()) {
    let heroDiv = document.createElement("div")
    let headline = document.createElement("h4")
    let pic = document.createElement("img")
    let caption = document.createElement("p")
    let secondCaption = document.createElement("p")

    heroDiv.className = className

    headline.innerText = `#${hero.objectiveRanking}, ${hero.name}`

    pic.className = 'profile-picture'
    pic.src = hero.picture

    caption.innerText = `${hero.year} - ${hero.gameTitle}`
    secondCaption.innerText = `${hero.epithet}`

    heroDiv.append(headline, pic, caption, secondCaption)
    parent.appendChild(heroDiv)
}


function renderAllListedLinks(node) {
    listOfLinks().innerHTML = ''
    while (node) {
        renderOneLink(node.val)
        node = node.nxt
    }
}

function mergeTwoLists(left, right, attr) {
    // console.log('merge', attr)
    if (!left) {
        return right
    }
    if (!right) {
        return left
    }
    if (left.val[attr] <= right.val[attr]) {
        let term = mergeTwoLists(left.nxt, right, attr)
        left.nxt = term
        return left
    } else {
        let term = mergeTwoLists(left, right.nxt, attr)
        right.nxt = term
        return right
    }
}

function prevList(node, right) {
    let slow = node
    let fast = slow.nxt
    while (fast != right) {
        slow = slow.nxt
        fast = fast.nxt
    }
    slow.nxt = null
    return node
}

function sortList(node, attr='objectiveRanking') {
    // console.log(attr)
    if (!node || !node.nxt ) {
        return node     //returns a singleton or empty node
    } else {
        let right = splitTheList(node)
        let left = prevList(node, right)
        //let right = sortList(rightList)
        //let left = sortList(leftList)
        tempSave = mergeTwoLists(sortList(left, attr), sortList(right, attr), attr)
        renderAllListedLinks(tempSave)
        console.log(testArray(tempSave, attr))
        return tempSave
    }
}

function cleanup(head) {
    renderAllListedLinks(head)
    onDeckCircle().innerHTML = ''
    tempSave = head
}

function prefixNode(neue, head) {
    neue.nxt = head
    head = neue
    cleanup(head)
}

function infixNode(neue, head) {
    let slow = splitTheList(head)
    neue.nxt = slow.nxt
    slow.nxt = neue
    cleanup(head)
}

function suffixNode(neue, head) {
    let tail = head
    while (tail.nxt) {
        tail = tail.nxt
    }
    tail.nxt = neue
    cleanup(head)
}

function onDeckLoader(headNode) {
    pre = document.createElement("button")
    inf = document.createElement("button")
    suf = document.createElement("button")
    pre.innerText = 'Prefix'
    inf.innerText = 'Infix'
    suf.innerText = 'Suffix'
    pre.addEventListener('click', (e) => prefixNode(newLink, headNode))
    inf.addEventListener('click', (e) => infixNode(newLink, headNode))
    suf.addEventListener('click', (e) => suffixNode(newLink, headNode))

    newLinkButton().style.display = 'none'
    onDeckCircle().append(pre, inf, suf)
    renderOneLink(newLink.val, 'on-deck', onDeckCircle())
}

// function saveList(node) {
//
//     flashHead = new ListNode(node.val, node.nxt)
//     flash = flashHead
//     let qwert = 0
//     while (flash && flash.nxt) {
//         console.log(qwert)
//         flash = flash.nxt
//         flash.nxt = new ListNode(flash.nxt.val, flash.nxt.nxt)
//         qwert++
//     }
//     savedNode = flashHead
//     loadButton().style.display = 'inline'
// }

function splitTheList(node) {
    if (!node || !node.nxt ) {
        return node
    }
    let slow = node
    let fast = node
    while (fast && fast.nxt) {
        fast = fast.nxt.nxt
        slow = slow.nxt
    }
    return slow
}

function testArray(head, attr='objectiveRanking') { //for ease of testing on the console
    let test = []
    while (head) {
        test.push(head.val[attr])
        head = head.nxt
    }
    return test
}

document.addEventListener('DOMContentLoaded', () => {
    tempSave = setup()
    renderAllListedLinks(tempSave)

    objectiveButton().addEventListener('click', (e) => sortList (tempSave, 'objectiveRanking'))
    releaseButton().addEventListener('click', (e) => sortList( tempSave, 'year'))
    newLinkButton().addEventListener('click', (e) => onDeckLoader(tempSave))
})
