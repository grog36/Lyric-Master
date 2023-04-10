# Lyric Master

### Author : Gregory Ecklund

### Version : April 2023

-------------

#### How to install and use:
  * Make sure to install nodejs from https://nodejs.org/en/download
  * Clone the repository (click <> Code, and you can download as zip)
  * Extract the zip file and navigate into the extracted folder
  * Create a 'links.txt' file in the extracted folder
  * In 'links.txt', copy and paste a link to the musixmatch.com lyrics for each song
    * example:
      ```txt
      https://www.musixmatch.com/lyrics/George-Michael-feat-Wham/Last-Christmas
      https://www.musixmatch.com/lyrics/LINKIN-PARK/Numb
      https://www.musixmatch.com/lyrics/Ana-Mena/Un-Millón-de-Lunas
      ```
    * *Make sure that each line is a single link and there are no weird white spaces*
  * open the terminal and navigate to your extracted folder (using the cd command)
  * run the command 'npm install' to install the necessary packages
    ```bash
    npm install
    ```
  * run the 'get-lyrics.js' file using your terminal
    ```bash
    node get-lyrics.js
    ```
    or sometimes
    ```bash
    nodejs get-lyrics.js
    ```
  * The output should display a list of the 10 most common words in all songs combined "TOTAL" and each individual song
  * Each artist will have it's own subdirectory created with .txt files corresponding to each of the artist's song's lyrics
    * For example, if I ran the above 'links.txt' file I would see this as the output:
      ```bash
      Top 10 lyrics in song: TOTAL
        "you" is used 38 times.
        "i" is used 30 times.
        "me" is used 28 times.
        "to" is used 25 times.
        "it" is used 22 times.
        "gave" is used 18 times.
        "a" is used 18 times.
        "the" is used 16 times.
        "te" is used 15 times.
        "in" is used 13 times.
      Top 10 lyrics in song: Last-Christmas
        "it" is used 22 times.
        "you" is used 20 times.
        "gave" is used 18 times.
        "to" is used 16 times.
        "i" is used 14 times.
        "a" is used 14 times.
        "my" is used 11 times.
        "me" is used 11 times.
        "but" is used 10 times.
        "someone" is used 9 times.
      Top 10 lyrics in song: Numb
        "you" is used 18 times.
        "i" is used 16 times.
        "so" is used 12 times.
        "in" is used 11 times.
        "the" is used 10 times.
        "to" is used 9 times.
        "me" is used 8 times.
        "be" is used 8 times.
        "become" is used 8 times.
        "more" is used 7 times.
      Top 10 lyrics in song: Un-Millón-de-Lunas
        "te" is used 15 times.
        "que" is used 13 times.
        "de" is used 10 times.
        "el" is used 9 times.
        "me" is used 9 times.
        "un" is used 8 times.
        "y" is used 8 times.
        "antes" is used 8 times.
        "aunque" is used 7 times.
        "es" is used 6 times.
      ```
  * A 'lyric-count.json' file will be created containing an object for each song with each object containing a key-value pair with the key being the word, and the value being the amount of times it is seen in the song. A default "TOTAL" object is created containing the sum of all of the songs requested. These key-value pairs are in descending order of appearance

-------------

#### Problems that can occur:
  - ```bash
    FETCH ERROR
    ```
    occurs when there was a problem connecting to the website (status != 200)

  - ```bash
    {link} ::: IS NOT A VALID LINK.
    ```
    occurs when a link in 'links.txt' is not a valid https://musixmatch.com/lyrics link
  
  - Some lyrics might contain strange characters (¿, ¡, etc.). This is caused due to dozens of languages and the inability to strip every single weird characters for all of the words. If you find a character that you wish to be removed, please let me know.  