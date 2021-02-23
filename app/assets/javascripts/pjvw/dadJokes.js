// via https://cdn.cnn.com/cnn/interactive/2019/06/us/dad-joke-generator-trnd/js/dad-joke-generator-min.js
function initializeChartbeat(a,b,c){"use strict";window._sf_startpt=(new Date).getTime(),window._sf_async_config={},window._sf_async_config.uid=37612,window._sf_async_config.useCanonical=!0,window._sf_async_config.domain=a,window._sf_async_config.sections=b,window._sf_async_config.authors=c}function loadChartbeat(a,b){"use strict";var c=location.host;("localhost"==c||c.indexOf("dev.cnn.com")>=0)&&(c="ref.cnn.com"),initializeChartbeat(c,a,b),window._sf_endpt=(new Date).getTime();var d=document.createElement("script");d.setAttribute("src",("https:"===document.location.protocol?"https://a248.e.akamai.net/chartbeat.download.akamai.com/102508/":"http://static.chartbeat.com/")+"js/chartbeat.js"),document.body.appendChild(d)}!function(a){a(window.jQuery,window,document)}(function(a,b){function c(){var b=g.length,c=Math.floor(Math.random()*b),d=a('<div class="joke-text">'+g[c]+"</div>");a(".machine-output-area").append(d),a(".push-button").removeClass("is-active").click(f),a(".bubble").removeClass("is-active"),a(".show-me-another").addClass("is-active")}function d(){var b=g.length,c=Math.floor(Math.random()*b),d=a('<div class="joke-text">'+g[c]+"</div>");a(".joke-text").remove(),a(".machine-output-area").append(d)}function e(){var c=a(".machine-output-area").offset().top+a(".machine-output-area").height();return c-a(b).height()+60}function f(){var b=e();a(".push-button").off("click").addClass("is-active"),a(".bubble").addClass("is-active");var d=a(".ball-1"),f=a(".ball-2"),g=a(".ball-3");a(".joke-text").fadeOut({complete:function(){a(this).remove()}}),a("html, body").animate({scrollTop:b},1800,"linear"),d.animate({top:"14%"},126,"linear").animate({left:"92.5%"},263,"linear").animate({top:"81.5%"},800,"linear").animate({left:"51%"},387,"linear").animate({top:"25%",left:"62%"},1,"linear"),f.animate({top:"50%"},300,"linear").animate({left:"1.5%"},330,"linear").animate({top:"67.5%"},210,"linear").animate({left:"51%"},387,"linear").animate({top:"81.5%"},150,"linear").animate({top:"25%",left:"38.5%"},1,"linear"),g.animate({left:"22%"},130,"linear").animate({top:"7%"},154,"linear").animate({left:"78.5%"},440,"linear").animate({top:"14%"},75,"linear").animate({left:"62.5%"},135,"linear").animate({top:"67.5%"},640,"linear").animate({left:"51%"},110,"linear").animate({top:"83.5%"},150,"linear").animate({top:"21%",left:"38.5%"},1,"linear",c)}var g=["A burger walks into a bar. The bartender says 'Sorry, we don't serve food here'","What's brown and sticky? A stick.","To the guy who invented zero: Thanks for nothing!","Why is it always hot in the corner of a room? Because a corner is 90 degrees.","How do you find Will Smith in the snow? Look for fresh prints.","Why can't you play poker on the African Savanna? There's too many cheetahs.","I was up all night wondering where the sun went, but then it dawned on me.","I'm thinking of reasons to go to Switzerland. The flag is a big plus.","My dolphin puns are terrible on porpoise.","A backwards poet writes inverse.","Time flies like an arrow. Fruit flies like a banana.","Why can't a bicycle stand on its own? It's two-tired.","A plateau is the highest form of flattery.","Atheism is a non-prophet organization.","Once you've seen one shopping center, you've seen the mall.","What did the grape say when it was stepped on? Nothing, it just let out a little wine.","I'm reading a book about anti-gravity. I can't put it down.","I didn't like my beard at first. Then it grew on me.","I was wondering why the baseball was getting bigger. Then it hit me.","Whatâ€™s more amazing than a talking dog? A spelling bee.","Found out I was color blind the other day. That one came right out of the orange.","Orionâ€™s Belt is a huge waist of space.","Where do generals keep their armies? In their sleevies!","When my son told me to stop impersonating a flamingo, I had to put my foot down."];a(function(){a(".push-button").click(f),a(".show-me-another").click(d)})}),function(a,b,c){var d={apiconfig:[],analytics:"o",setanalytics:function(a){d.analytics=a},addurlparam:function(a,b,c){var d=/\?.+$/;return d.test(a)?a+"&"+b+"="+c:a+"?"+b+"="+c},sites:{email:{buildurl:function(a){return"mailto:?to=&subject=On%20CNN:%20"+encodeURIComponent(a.title)+"&body="+encodeURIComponent(a.title)+"%0D%0A%0D%0A"+encodeURIComponent(d.addurlparam(a.url,"sr","sharebar_email"))},popwidth:150,popheight:150,popscroll:"no"},facebook:{buildurl:function(a){return"http://www.facebook.com/share.php?u="+encodeURIComponent(d.addurlparam(a.url,"sr","sharebar_facebook"))+"&title="+encodeURIComponent(a.title)},popwidth:550,popheight:420,popscroll:"no",loadapi:function(a){!function(a,b){var c,d="facebook-jssdk",e=a.getElementsByTagName("script")[0];a.getElementById(d)||(c=a.createElement("script"),c.id=d,c.async=!0,c.src="//connect.facebook.net/en_US/all"+(b?"/debug":"")+".js",e.parentNode.insertBefore(c,e))}(document,!1),window.fbAsyncInit=function(){FB.init({appId:"80401312489",status:!0,cookie:!0,xfbml:!0,oauth:!0}),FB.Event.subscribe("edge.create",function(){window.cnnshare.share.track({type:"click",site:"facebook"})}),"function"==typeof a&&a.apply()}}},twitter:{buildurl:function(a){return"http://twitter.com/intent/tweet?url="+encodeURIComponent(d.addurlparam(a.url,"sr","sharebar_twitter"))+"&text="+encodeURIComponent(a.title)},popwidth:550,popheight:460,popscroll:"no",loadapi:function(a){window.twttr=function(a,b,c){var d,e,f=a.getElementsByTagName(b)[0];if(!a.getElementById(c))return e=a.createElement(b),e.id=c,e.src="//platform.twitter.com/widgets.js",f.parentNode.insertBefore(e,f),window.twttr||(d={_e:[],ready:function(a){d._e.push(a)}})}(document,"script","twitter-wjs"),window.twttr.ready(function(b){b.events.bind("click",function(){window.cnnshare.share.track({type:"click",site:"twitter"})}),"function"==typeof a&&a.apply()})}}},share:{},setapiconfig:function(a){d.apiconfig=a},init:function(){for(var a=d.apiconfig,b=0;b<a.length;b++){var c=a[b];"function"==typeof c.success?d.sites[c.site].loadapi(c.success):d.sites[c.site].loadapi()}"undefined"!=typeof d.share.data.bars&&d.share.init()}};d.share={data:{bars:{}},addconfig:function(a){d.share.data.bars[a.id]=a},setconfig:function(a){for(var b=0;b<a.length;b++)d.share.addconfig(a[b])},updateurl:function(){},updatesingleurl:function(a,b,c){var e=d.share.data.bars[a];e.url=b,e.title=c,d.share.data.bars[a]=e},click:function(a,b){window.console&&console.log("clicked "+b+" in: "+a);var c=d.share.data.bars[a],e=d.sites[b];d.share.popup(e.buildurl(c),b,e.popwidth,e.popheight,e.popscroll),d.share.track({type:"click",site:b})},popup:function(a,b,c,d,e){return window.open(a,"cnn_pop_"+b,"width="+c+",height="+d+",resizable=yes,scrollbars="+e)},track:function(a){window.console&&console.log(a);try{"o"===d.analytics?jsmd&&("click"===a.type?jsmd.trackMetrics("social-click",{clickObj:{socialType:a.site+"_click"}}):"success"===a.type&&jsmd.trackMetrics("social-click",{clickObj:{socialType:a.site+"_post"}})):"b"===d.analytics&&"function"==typeof bangoSocial&&bangoSocial({socialMedia:a.site})}catch(b){window.console&&console.log("error thrown while registering click tracking. Message - "+b.message)}},init:function(){var a=d.share.data.bars;for(var b in a){var c=a[b],e="#"+c.id+" .c_sharebar_cntr";jQuery(e).removeClass("c_sharebar_loading")}}},c.cnnshare=d,d.setapiconfig([{site:"facebook",success:function(){window.cnn_fbAsyncInit()}},{site:"twitter"}]),d.share.setconfig(cnn_shareconfig),a(".share-button").click(function(){d.share.click("cnn_sharebar1",$j(this).attr("data-service")),console.log(jQuery(this).attr("data-service"))})}(jQuery,CNN,window,document),document.title=document.title+" - CNN.com",cnnshare.setapiconfig([{site:"facebook",success:function(){}},{site:"twitter"}]),cnnshare.share.setconfig(cnn_shareconfig),$j(document).ready(function(){"use strict";loadChartbeat(CNN.omniture.section[0],"CNN Interactives"),cnnshare.init()});