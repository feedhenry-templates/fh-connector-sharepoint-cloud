FORMAT: 1A

# FeedHenry Sharepoint Connector
[![Dependency Status](https://img.shields.io/david/feedhenry-templates/fh-connector-sharepoint-cloud.svg?style=flat-square)](https://david-dm.org/feedhenry-templates/fh-connector-sharepoint-cloud)

Sharepoint Connector. For more information on the underlying module in use, and info on Sharepoint itself see [here](https://github.com/cianclarke/sharepointer).

#Environment Variables
When setting up this connector, you were presented with a number of environment variables to fill in. These are documented in greater detail here.
Required Environment Variables:  
__SHAREPOINT\_HOSTNAME:__ Sharepoint URL  
__SHAREPOINT\_AUTH\_TYPE:__ Type of authentication in use, valid values: `basic`, `ntlm`, `online`  

Optional Environment Variables:  
__SHAREPOINT\_USERNAME:__ Service account username to use for authenticating all requests  
__SHAREPOINT\_PASSWORD:__  Service account password to use authenticating all requests  
__SHAREPOINT\_STRICT\_SSL:__  Allow connection to SharePoint instances with self-signed certificates  
__SHAREPOINT\_SESSION\_TIMEOUT__: How long to keep a session open for (in seconds) before timing out - defaults to 60*60 = 1hr  

# Group Sharepoint Connector API

# Login [/login]

API for logging into SharePoint - for use where no service account environment variables have been specified (`SP_USERNAME` and `SP_PASSWORD`).

## Login [POST] 

Logs in with Sharepoint, and retrieves the contents of a list view

+ Request (application/json)
    + Body

            {
              "username" : "some@sharepointLogin.com",
              "password" : "yourSharepointPassword"
            }

+ Response 200 (application/json)
    + Body

            {
              "session" : "yourSessionToken"
            }


# Lists [/lists]

Operations on sharepoint "list" objects.  
In all of the following examples, header `x-sp-session` can be omitted if using service account to log in. 


## List all SharePoint List objects [GET] 
Lists all "list" objects in SharePoint.

+ Request (application/json)

    + Headers

            x-sp-session: yourSessionTokenFromLogin

+ Response 200 (application/json)

    + Body

            [  {  Name : "Some Sharepoint List"  }  ]

## Create a new SharePoint List [POST] 
Creates a new SharePoint list from a supplied request body. 

+ Request (application/json)
    + Headers

            x-sp-session: yourSessionTokenFromLogin

    + Body

            {
              "Title" : "My new list",
              "Description" : "My new list description"
            }

+ Response 200 (application/json)

    + Body

            {
              "Title" : "My new list",
              "Description" : "My new list description"
            }

# List [/lists/{id}]
Operations on an individual list, as identified by guid `{id}`.

+ Parameters
    + id - Id of the list being operated on

## Read a single SharePoint List object [GET] 
Also returns all Items under that list, and it's fields.
+ Request (application/json)

    + Headers

            x-sp-session: yourSessionTokenFromLogin

+ Response 200 (application/json)

    + Body

            {
              "Title" : "My new list",
              "Description" : "My new list description",
              "Items" : [ {}, {} ],
              "Fields" : [ {}, {} ]
            }

## Update a single SharePoint List object [PUT] 
Also returns all Items under that list, and it's fields.
+ Request (application/json)

    + Headers

            x-sp-session: yourSessionTokenFromLogin

    + Body

            {
              "Title" : "My updated list",
              "Description" : "My updated list description"
            }

+ Response 200 (application/json)

    + Body

            {
              "Title" : "My updated list",
              "Description" : "My updated list description"
            }

## Delete a SharePoint List object [DELETE] 
Removes a SharePoint List object.
+ Request (application/json)

    + Headers

            x-sp-session: yourSessionTokenFromLogin

+ Response 200 (application/json)

    + Body
            
# List Items [/lists/{id}/items]
Operations on List Items. 

+ Parameters

    + id - Id of the list being operated on

## List items contained within a SharePoint List [GET] 
+ Request (application/json)

    + Headers

            x-sp-session: yourSessionTokenFromLogin

+ Response 200 (application/json)

    + Body

            [
              {
                "Title" : "My list item",
                "Description" : "My list item description"
              }
            ]

## Create Sharepoint List Item [POST] 
+ Request (application/json)

    + Headers

            x-sp-session: yourSessionTokenFromLogin

    + Body

            {
              "Name" : "My new list item",
              "Desc" : "list item to be created"
            }

+ Response 200 (application/json)

    + Body

            {
              "Name" : "My new list item",
              "Desc" : "list item to be created"
            }

# List Item [/lists/{id}/items{itemId}]
Operations on an individual list item, as identified by guid `{itemId}`.

+ Parameters

    + id - Id of the list being operated on
    + itemId - Id of the item under list with identifier id being operated on

## Get List Item [GET] 
+ Request (application/json)

    + Headers

            x-sp-session: yourSessionTokenFromLogin

+ Response 200 (application/json)

    + Body

            {
              "Title" : "My list item",
              "Description" : "My list item description"
            }

## Update List Item [PUT] 
+ Request (application/json)

    + Headers

            x-sp-session: yourSessionTokenFromLogin

    + Body

              {
                "Title" : "My updated list item",
                "Description" : "My updated list item description"
              }

+ Response 200 (application/json)

    + Body

            {
              "Title" : "My updated list item",
              "Description" : "My updated list item description"
            }

## Delete List Item [DELETE] 
+ Request (application/json)

    + Headers

            x-sp-session: yourSessionTokenFromLogin

+ Response 200 (application/json)

    + Body
