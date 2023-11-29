#! /usr/bin/env node

console.log(
  'This script populates some test user, posts, and comments to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

const userArgs = process.argv.slice(2);

const models = require("./models/index");

const users = [];
const posts = [];
const allComments = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUser();
  await createPosts();
  await createComments();
  await createCommentOfComments();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function userCreate(
  index,
  first_name,
  last_name,
  email,
  username,
  password
) {
  const user = new models.User({
    first_name: first_name,
    last_name: last_name,
    email: email,
    username: username,
    password: password,
  });
  await user.save();
  users[index] = user;
  console.log(`Added user: ${username}`);
}

async function postCreate(index, title, isPublished, article, user) {
  const post = new models.Post({
    title: title,
    isPublished: isPublished,
    article: article,
    user: user,
  });
  await post.save();
  posts[index] = post;
  console.log(`Added post: ${title}`);
}

async function commentCreate(index, name, text, post, comments) {
  const commentdetail = {
    text: text,
    post: post,
  };
  if (name != false) {
    commentdetail.name = name;
  } else {
    commentdetail.name = "anonymous";
  }
  if (comments != false) commentdetail.replies.push(comments);

  const comment = new models.Comment(commentdetail);
  await comment.save();
  allComments[index] = comment;
  console.log(`Added comment: ${text}`);
}

async function createUser() {
  console.log("Adding user");
  await userCreate(
    0,
    "Dan",
    "McGrath",
    "mcgrathd3254@yahoo.com",
    "Admin",
    "Dm9901226"
  );
}

async function createPosts() {
  console.log("Adding posts");
  await Promise.all([
    postCreate(0, "Test1", false, "Test1 article", users[0]),
    postCreate(1, "Test2", false, "Test2 article", users[0]),
    postCreate(2, "Test3", true, "Test3 article", users[0]),
  ]);
}

async function createComments() {
  console.log("Adding comments");
  await Promise.all([
    commentCreate(0, false, "comment1", posts[0]),
    commentCreate(1, "user1", "comment2", posts[1]),
    commentCreate(2, false, "comment3", posts[1]),
    commentCreate(3, false, "comment4", posts[2]),
  ]);
}
async function createCommentOfComments() {
  console.log("Adding comment of another comment");
  await commentCreate(4, "user2", "comment1", posts[1], allComments[1]);
}
