$(function() {
  var buildHTML = function(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image.url ? `<img src= ${ message.image.url } class = "message__to">` : "";
    var html =  `<div class="message" data-message-id="${message.id}">
                  <div class = "upper-info">
                    <div class = "upper-info__user">
                      ${message.user_name}
                    </div>
                    <div class = "upper-info__data">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class = "message__text">
                  ${content}
                  </div>
                  ${img}
                </div>`
    return html;
  };
//省略
  
    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      // if($('message')[0]){
      var  last_message_id = $('.message:last').data('message-id');
      
      // }else{
      // }
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(new_messages) {
       
        //追加するHTMLの入れ物を作る
        // var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      new_messages.forEach(function(message) {
         //メッセージが入ったHTMLを取得
        var insertHTML = buildHTML(message);  
        //メッセージを追加
        $('.messages').append(insertHTML);
        // $('.message').val('');
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })
    })

      .fail(function() {
        alert('自動更新に失敗しました');
      })
    }
    //   if(url == "http://localhost:3000/groups/[0-9a-z]+/messages"){
    //   etInterval(reloadMessages, 10000);
    // }
    $(window).on('load',function(){ 
      if(document.URL.match("localhost:3000/groups")) {
         setInterval(reloadMessages, 10000);
      }
    });
});

