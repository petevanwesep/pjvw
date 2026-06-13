class Pjvw.Ga
  @sendPageView = (pageName, fields) ->
    return unless typeof gtag == 'function'
    section = pageName || 'me'
    gtag 'event', 'page_view',
      page_path: "/##{section}"
      page_title: "Pete van Wesep — #{section}"
