# bakehub

Submitted by: **riya**

**bakehub** is an app that allows users to create posts about their baking projects, view them in a home feed, sort and search through them, and leave comments, upvotes, edits, and deletes on individual posts.

Time spent: **12** hours spent in total

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
- [ ] Users can set flags such as "Question" or "Opinion" while creating a post
- [ ] Users can filter posts by flags on the home feed
- [ ] Users can upload images directly from their local machine as an image file
- [ ] Web app displays a loading animation whenever data is being fetched

The following **additional** features are implemented:

* Custom color palette and typography (Fraunces + Inter + Caveat) for a cute, cozy baking-blog aesthetic

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ...

## Notes

Describe any challenges encountered while building the app.

- Getting Row Level Security (RLS) turned off correctly on both Supabase tables took some troubleshooting — by default Supabase blocks all reads/writes from the client unless RLS is disabled or policies are configured.
- Debugging a blank page/import error where a page component was referenced in routing before the file itself was created.
- Styling took several iterations to land on the right look and feel.

## License

    Copyright [2026] [RIya]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.