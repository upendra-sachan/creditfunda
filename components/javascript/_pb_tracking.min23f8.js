function _pb_tracking(){this.trackEvent=function(t,e,c,r){0==isCrmUser&&t.indexOf("clevertab")>=0&&(c?clevertap.event.push(e,c):clevertap.event.push(e))},this.trackUser=function(t,e,c){0==isCrmUser&&t.indexOf("clevertab")>=0&&clevertap.profile.push(e)}}var clevertap={event:[],profile:[],account:[],onUserLogin:[],notifications:[]};clevertap.account.push({id:clevertab_account_id}),function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=("https:"==document.location.protocol?"https://d2r1yp2w7bby2u.cloudfront.net":"http://static.clevertap.com")+"/js/a.js";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}();