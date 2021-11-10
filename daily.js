var now = new Date();

var imgsrc = 'https://cdn.jsdelivr.net/gh/arknightscommunity/widget@2.0.20211111/res/';

var json_src = 'https://arknightscommunity.drblack-system.com/Extend/daily-msg/'

jQuery(document).ready(function ($) {
    $.getJSON(json_src+'daily.json', function (daily_res) {
        $("#daily").append("<div id='d_r'></div>");
        $("#d_r").append("<div class='d-item d-r' id='d_res'>物资筹备：</div>");
        daily_res[0].forEach(item => {
            src = imgsrc+item.src
            $("#d_res").append('<img src='+src+' name='+item.name+' alt='+item.name+' class="d-res">')
        });
        $("#d_r").append("<div class='d-item d-r' id='d_chip'>芯片搜索：</div>");
        daily_res[1].forEach(item => {
            src = imgsrc+item.src
            $("#d_chip").append('<img src='+src+' name='+item.name+' alt='+item.name+' class="d-chip">')
        });
    });
    $.getJSON(json_src+'op_birthday.json',function (ops) {
        if (ops.length==0) {
        } else {
            $("#daily").append("<div class='d-item' id='d_o'></div>");
            $("#d_o").append('今天是干员<span class="op-bir">'+ops.join('、')+'</span>的生日。')
        }
    })
    $.getJSON('https://cdn.jsdelivr.net/gh/arknightscommunity/widget@2.0.20211111/activity.json',function (activity) {
        if (activity.length==0) { } else {
            $("#daily").append("<div id='d_a'></div>");
            var idx=0;
            activity.forEach(item => {
                idx += 1;
                act_id='d_act'+String(idx);
                t_start=item.start;
                t_end=item.end;
                $("#d_a").append('<div class="d-item" id='+act_id+'></div>');
                $("#"+act_id).append('<span class="act-name">'+item.name+'</span>&nbsp;');
                if(now.getTime()<new Date(t_start)){
                    // 活动未开始
                    var t = new Date(t_start).getTime()-now.getTime();
                    var t_d = Math.floor(t/(24*3600*1000));
                    var t_h = Math.floor(t%(24*3600*1000)/(3600*1000));
                    if (t_d>3) {
                        $("#"+act_id).append('将于'+String(t_d)+'天后开启');
                    } else {
                        $("#"+act_id).append('将于'+String(t_d)+'天'+String(t_h)+'小时后开启');
                    }
                }else if (now.getTime()<new Date(t_end)) {
                    // 活动在进行
                    var t = new Date(t_end).getTime()-now.getTime();
                    var t_d = Math.floor(t/(24*3600*1000));
                    var t_h = Math.floor(t%(24*3600*1000)/(3600*1000));
                    if (t_d>3) {
                        $("#"+act_id).append('将于'+String(t_d)+'天后结束');
                    } else {
                        $("#"+act_id).append('将于'+String(t_d)+'天'+String(t_h)+'小时后结束');
                    }
                } else {
                    $("#"+act_id).append('已结束');
                }
            });
        }
    })
});