# OneMoreSong

Submitted by: **Riya**

**OneMoreSong** is a concert board where fans can post upcoming concerts, browse them by genre, vote on how hyped they are for a show, and request/vote on which songs they want to hear live. Concerts can be added manually or pulled in live from Ticketmaster's real event data.

Time spent: **20** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] Web app includes a create form that allows the user to create posts
  - [x] Form requires users to add a post title
  - [x] Form allows users to add optional textual content and an image via external URL
- [x] Web app includes a home feed displaying previously created posts
  - [x] By default, each post on the posts feed shows only the post's creation time, title, and upvotes count
  - [x] Clicking on a post directs the user to a new page for the selected post
- [x] Users can sort posts by either creation time or upvotes count
- [x] Users can search for posts by title
- [x] The app includes a separate post page for each created post when clicked, showing additional information including text content, image, and comments
- [x] Users can leave comments underneath a post on the separate post page
- [x] Each post includes an upvote button on the post page, incrementing the upvote count by 1 on each click, with no limit on the number of times a user can upvote
- [x] A post that a user previously created can be edited or deleted from its post page
  - [x] A previously created post can be edited from its post page and changes are reflected
  - [x] A previously created post can be deleted from its post page

The following **optional** features are implemented:

- [ ] Web app implements pseudo-authentication
- [ ] Users can repost a previous post by referencing its post ID
- [ ] Users can customize the interface
- [x] Users can add more characteristics to their posts
  - Genre tagging with color-coded cards, plus venue, event date, ticket price, and a ticket purchase link per concert
- [ ] Users can filter posts by flags on the home feed
- [ ] Users can upload images directly from their local machine as an image file
- [ ] Web app displays a loading animation whenever data is being fetched

The following **additional** features are implemented:

* Live concert data sync via the Ticketmaster Discovery API — pulls real, current concerts into the app on demand
* Per-comment (per-song-request) voting, independent from the overall concert upvote count
* Custom color palette and typography (Baloo 2 + Poppins) with genre-based accent colors on each card
* Responsive card-grid layout instead of a single-column list

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ...

## Notes

Describe any challenges encountered while building the app.

- Getting Row Level Security (RLS) turned off correctly on both Supabase tables took some troubleshooting — by default Supabase blocks all reads/writes from the client unless RLS is disabled or policies are configured.
- Debugging a blank page caused by a missing export (`mapGenre`) — one function referenced in an import but not actually defined broke the whole app's module loading.
- Ticketmaster sync initially failed with 400 errors because new database columns (`venue`, `event_date`, `price`, `ticket_link`) hadn't been added to the `posts` table yet before the sync tried to insert into them.
- Iterated through a few different concepts (baking forum → pop music forum → concert song-request board) before landing on the final direction.
- Styling took several passes to land on a layout that felt lively rather than plain — moved from a single-column list to a responsive card grid with genre-based color coding.

## License

    Copyright 2026 Riya

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
