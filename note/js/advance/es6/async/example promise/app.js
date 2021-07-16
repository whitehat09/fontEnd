var users = [
  {
    id: 1,
    name: "Nguyễn Văn A",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
  },
  {
    id: 3,
    name: "Nguyễn Văn C",
  },
];
var comments = [
  {
    id: 1,
    user_id: 1,
    content: "Em ăn cơm chưa ?",
  },
  {
    id: 2,
    user_id: 2,
    content: "Em ăn rồi !",
  },
  {
    id: 3,
    user_id: 1,
    content: "ok em !",
  },
];
function getComments() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(comments);
    }, 1000); // load 1s (fake như mạng thật)
  });
}
function getUsersByIds(userIds) {
  return new Promise(function (resolve) {
    var result = users.filter(function (user) {
      return userIds.includes(user.id);
    });
    setTimeout(function () {
      resolve(result);
    }, 1000);
  }, 1000); // load 1s (fake như mạng thật)
}
getComments()
  .then(function (comments) {
    var userIds = comments.map(function (comment) {
      return comment.user_id;
    }); // lấy id ra
    return getUsersByIds(userIds).then(function (users) {
      return {
        users: users,
        comments: comments,
      };
    });
  })
  .then(function (data) {
    //console.log(data);
    var commentBlock = document.getElementById("comment-block");
    var html = "";
    data.comments.forEach(function (comment) {
      var user = data.users.find(function (user) {
        return user.id === comment.user_id;
      });
      html += `<li>${user.name}: ${comment.content}</li>`;
    });

    commentBlock.innerHTML = html;
  });
