#USER: 
- inputs term - input "#search-term"
- inputs number of records - "#num-records"
- inputs start year?
- inputs end year?

- #USER clicks search
*or*
- #USER clicks clear

- listen for click on search container
- watch for event from search
- watch for event from clear

- **grab data from USER input**
- validate data?
- parse year into YYYYMMDD format
  - start date YYYY0101
  - end date YYYY1231
- check for empty data?


store data

create search url
empty fields omitted from search url

submit search url
get JSON
? separate and store needed JSON fields
create doc elements and style from JSON fields

`var inputData = [ {searchTerm : "" },
                  {numArticles : ""},
                  {startYear : "0"},
                  {endYear : "0"}
];`
