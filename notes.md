# API response data

In the response, you get the following:
1. Data object: This has objects with the response data.  However, it's only got the number of items related to the pageSize and what page it is.



2. Meta object:
This tells you about your about your returned data
"page": "1",
"pageSize": "25",
"returned": "25",
"total": "32"

3. Response object
This gives you the statuscode, body, headers and request information.
Note: that the body has the same stuff as the data object
