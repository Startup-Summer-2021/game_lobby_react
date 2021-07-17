## Application flow
- create room
  - enter name
  - get into room which shows room number and other users
- join room
  - enter room
  - enter name
  - get into room which shows room number and other users


## Room data model
- room id
- host name
- list of other participants
- creation date

## Data flow
- create room --> creates new room document with hostname as name, current date and digit based doc id
- join room --> push name to doc id participants
- roompage: update list of users based on doc, show room id, show host in different color, show countdown timer

redirect routes if option hasn't been clicked