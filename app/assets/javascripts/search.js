$(function() {
  var search_list = $(".chat-group-user");
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }
  function appendNoUser(user) {
    var html = `<ul>
                  <li>
                    <div class="chat-group-user clearfix">
                      <p>${user}</p>
                    </div>
                    </li>
                </ul>`
    search_list.append(html);
  }

    $('#user-search-field').on("keyup", function() {
    var input = $.trim($(this).val());
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users) {
      $(".chat-group-user").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
        appendUser(user);
        });
      }
      else{
        appendNoUser('ユーザーなし');
      }
    })
    .fail(function(){
      alert('ユーザ検索に失敗しました。');
    });
  })
});
