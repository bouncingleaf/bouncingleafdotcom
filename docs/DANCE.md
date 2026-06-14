src/data/dance.json is a list of songs with artist and album titles included.

## Add data to the dance.json file

I'd like the following in the dance.json file:

1. A Spotify link for each song
2. An Apple Music link for each song
3. A YouTube link for each song
4. A "genre" field that can hold multiple entries, such as "soca", "merengue", "reggaeton", "pop", "bachata", etc. Please populate this field based on what you can find online.
5. A "who" field that can hold multiple entries, for now just put an empty string "" as the only entry for each song, I will manually update that once it is set up

## Make a dance page

1. I'd like a dance music page with the entries displayed in a table.
2. Columns for the table should be Title, Artist, Genre, Who, and Links. It's okay to omit Album.
3. The user should be able to sort by Title or Artist.
4. The user should be able to filter by Genre or Who, with the fiter acting as an "OR" (so if the user selects both "bachata" and "merengue" for the genre, they see songs that have either bachata or merengue or both in the genre.)
5. Links should display with just the name of the service (Spotify, Apple Music, YouTube), and if there's no link for that service in the JSON file, the text is omitted. So if a song has only links for Spotify and YouTube, "Spotify" will display and be clickable to open the Spotify link, "YouTube" will display and be clickable to open the YouTube link, and "Apple Music" won't display at all.
6. Links should open in a separate tab or window.

## Notes

1. There is no data entry for the user on the page.
2. I'd like a mobile-friendly version also. Perhaps it can just list song title and artist, and then have a click to expand to see the details.
3. Don't worry about pagination for now, there are fewer than 200 entries, we can just display them as one big table.
4. Keep the look (colors, fonts, etc.) consistent with the rest of the site.
