$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image.url ? `<img src= ${ message.image.url } class = "message__to">` : "";
    var html =  `<div class="message">
                  <div class = "upper-info">
                    <div class = "upper-info__user">
                      ${message.user_name}
                    </div>
                    <div class = "upper-info__data">
                      ${message.date}
                    </div>
                  </div>
                  <div class = "message__text">
                  ${message.content}
                  </div>
                  <div class = "message__to">
                  ${img}
                  </div>
                </div>`
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.new-message__submit-btn').attr('disabled', false);
      $('.input').val("");
      $('.image-label-basic').val("");
    })
    .fail(function(){
      alert('メッセージを入力して下さい');
    })
  })
})
