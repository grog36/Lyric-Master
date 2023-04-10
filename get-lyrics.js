import fetch from "node-fetch";
import fs, { symlinkSync } from "fs";
import { ALL } from "dns";

const LINKS = getLinks(); //Gets the links from links.txt
const ALL_LYRICS = {"TOTAL": {}}; //Initializes an empty array for lyrics


/**
 * Returns the HTML code from a musixmatch.com/lyrics website for a requested song
 * @param {String} url The musixmatch.com/lyrics URL for a requested song
 * @returns Returns the HTML code for the musixmatch.com/lyrics for a requested song
 */
async function getHTML(url) {
    let data = await fetch(url);
    if (await data.status != 200) {
        console.log("FETCH ERROR");
    }
    else {
        return await data.text();
    }
}

/**
 * Gets the lyrics from HTML code that comes from a musixmatch.com/lyrics website
 * @param {String} htmlCode HTML code from a musixmath.com/lyrics website
 * @returns Returns the lyrics from the given html code
 */
function getLyrics(htmlCode) {
    let rexp = /<span class="lyr[\s\S]*?<\/span>/g;
    let spanContainer = htmlCode.match(rexp);
    let lyrics = "";
    for (let element of spanContainer) {
        lyrics += element.substring(34, (element.length - 7));
    }
    return lyrics
}

/**
 * Saves the lyrics for a given song to a txt file in a folder relative to the artist
 *  and a name relative to the song title
 * @param {String} lyrics The lyrics for a given song
 * @param {String} song The title for a given song
 * @param {String} artist The name of the artist(s) for a given song
 */
function saveLyrics(lyrics, song, artist) {
    if (!fs.existsSync(artist)) {
        fs.mkdirSync(artist);
    }
    fs.writeFile(`./${artist}/${song}.txt`, lyrics, "utf-8", (err) => {
        if (err) {
            console.log(err);
        }
    });
}

/**
 * Gets musixmatch.com/lyrics links from a file called "links.txt"
 * @returns {Array} An array of Strings that represent musixmatch.com/lyrics links
 */
function getLinks() {
    let text = fs.readFileSync("links.txt", "utf-8");
    return text.split("\n");
}

/**
 * Updates the ALL_LYRICS variable with the lyrics for a given song
 * @param {String} lyrics A string of the lyrics for a given song
 * @param {String} song The name of the song you are counting lyrics for
 */
function countLyrics(lyrics, song) {
    //Removes random characters in words
    let words = lyrics.replaceAll("\n", " ");
    let wordArray = words.split(" ");

    //Actually starts the counting process
    ALL_LYRICS[song] = {};
    let currentSong = ALL_LYRICS[song];
    for (let word of wordArray) {
        word = word.toLowerCase();
        if (word != '' && word != ' ') {
            if (currentSong[word] === undefined) {
                currentSong[word] = 1;
            }
            else {
                currentSong[word] = (currentSong[word] + 1);
            }
            if (ALL_LYRICS["TOTAL"][word] === undefined) {
                ALL_LYRICS["TOTAL"][word] = 1;
            }
            else {
                ALL_LYRICS["TOTAL"][word] = (ALL_LYRICS["TOTAL"][word] + 1);
            }
        }
    }
}

/**
 * Writes the "ALL_LYRICS" JSON Object to a file called "lyric-count.json"
 */
function writeToFile() {
    let jsonData = JSON.stringify(ALL_LYRICS, null, 1);
    fs.writeFile("lyric-count.json", jsonData, "utf-8", (err) => {
        if (err) {
            console.log(err);
        }
    });
}

/**
 * Displays the most used lyrics in all songs to the console
 */
function displayMostUsed() {
    let lyricList = [];
    for (let lyric in ALL_LYRICS["TOTAL"]) {
        lyricList.push([lyric, ALL_LYRICS["TOTAL"][lyric]]);
    }
    let sortedList = sortLyrics(lyricList);
    console.log(sortedList);
}

/**
 * Sorts the lyrics based off of how many times each are used
 * @param {2D Array} listOfLyrics A 2D list wherein each element contains a word and a count
 * @returns A 2D Array in order of most used words to least used words
 */
function sortLyrics(listOfLyrics) {
    let sortedList = [];
    for (let i = 0; i < listOfLyrics.length - 1; i++) {
        let currentMax = listOfLyrics[0][1];
        let currentMaxIndex = 0;
        for (let j = 0; j < listOfLyrics.length - 1; j++) {
            if (listOfLyrics[j][1] > currentMax) {
                currentMaxIndex = j;
                currentMax = listOfLyrics[j][1];
            }
        }
        sortedList.push(listOfLyrics[currentMaxIndex]);
        listOfLyrics.splice(currentMaxIndex, 1);
    }
    return sortedList;
}

/**
 * Main Code
 * Iterates through the links and gets the lyrics for each song and
 * adds those lyrics to the "ALL_LYRICS" variable
 */
async function main() {
    for (let link of LINKS) {
        try {
            let rawHTML = await getHTML(link);
            let lyrics = getLyrics(rawHTML);
            let splits = link.split("/");
            let artist = splits[splits.length - 2];
            let song = splits[splits.length - 1];
            saveLyrics(lyrics, song, artist);
            countLyrics(lyrics, song);
        }
        catch (err) {
            console.log(`${link} ::: IS NOT A VALID LINK.`);
        }
    }
    writeToFile();
    displayMostUsed();
}

//Global Code
main();