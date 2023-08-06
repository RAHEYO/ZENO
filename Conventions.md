# Dev Dummy Constants

- currentUserId == 0 == dummySpaceId - we're assuming that the current user has an id of 1 (number) which will match the personal space id **default dummy route we're using**
- "spaces/[space_id]/0" - by default we assume the default channel of every space has the id of 0, to be changed later. (Except for PS which has default board channel w/ channel.id = user.id)

# Spaces

- Every user has a unique default Personal Space (PS), space.id = user.id
- PS has a unique default Board Channel for managing everything, stats, todos, media, etc., channel.id also = user.id

# Routing System

- "/spaces/[space_id]/[channel_id]"
- App by default redirects to DEFAULT*ROUTE = "/spaces/@*@me"; this shows the PS and displays default Board Channel
- /spaces/[space_id] never exist by itself, the UI always have to render a channel of any space. However, except for PS which renders "/spaces/{currentUserId}" equilvalent to "/spaces/{currentUserId}/{userId}/"

# Notes

The above conventions are designed so that the main content always renders a channel of any space, regardless of if the user is on a Group space or personal. However, I don't want to make the Personal Board look like a normal channel but a separated **unique dashbaord**, so it doesn't have a unique channel route like other channels, going to the Personal Space auto renders the Personal Board.
