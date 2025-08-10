// const _ = require("lodash");

// const dummy = (blogs) => {
//   return 1;
// };

// const totalLikes = (blogs) => {
//   return blogs.reduce((sum, blog) => sum + blog.likes, 0);
// };

// const favoriteBlog = (blogs) => {
//   if (blogs.length === 0) {
//     return null;
//   }
//   return blogs.reduce(
//     (max, blog) => (blog.likes > max.likes ? blog : max),
//     blogs[0]
//   );
// };

// //no use lodash
// // const mostBlogs = (blogs) => {
// //   if (blogs.length === 0) {
// //     return null;
// //   }
// //   const authorCount = blogs.reduce((count, blog) => {
// //     count[blog.author] = (count[blog.author] || 0) + 1;
// //     return count;
// //   }, {});
// //   let maxAuthor = null;
// //   let maxBlogs = 0;

// //   for (const author in authorCount) {
// //     if (authorCount[author] > maxBlogs) {
// //       maxAuthor = author;
// //       maxBlogs = authorCount[author];
// //     }
// //   }

// //   return {
// //     author: maxAuthor,
// //     blogs: maxBlogs,
// //   };
// // };

// const mostBlogs = (blogs) => {
//   if (blogs.length === 0) return null;

//   const grouped = _.countBy(blogs, "author");

//   const topAuthor = Object.entries(grouped).reduce(
//     (max, [author, count]) => {
//       return count > max.blogs ? { author, blogs: count } : max;
//     },
//     { author: null, blogs: 0 }
//   );

//   return topAuthor;
// };

// const mostLike = (blogs) => {
//   if (blogs.length === 0) return null;

//   const grouped = _.groupBy(blogs, "author");

//   const authorsWithLikes = _.map(grouped, (blogs, author) => {
//     return {
//       author,
//       likes: _.sumBy(blogs, "likes"),
//     };
//   });
//   return _.maxBy(authorsWithLikes, "likes");
// };

// module.exports = {
//   dummy,
//   totalLikes,
//   favoriteBlog,
//   mostBlogs,
//   mostLike,
// };
