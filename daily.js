var now = new Date();

// var reposrc = 'https://cdn.jsdelivr.net/gh/arknightscommunity/widget@main/';
var reposrc  = './'


var json_src = 'https://arknightscommunity.drblack-system.com/Extend/daily-msg/'

jQuery(document).ready(function ($) {
    $.getJSON(json_src+'daily.json', function (daily_res) {
        $("#daily").append("<div id='d_r'></div>");
        $("#d_r").append("<div class='d-item d-r' id='d_res'>物资筹备：</div>");
        daily_res[0].forEach(item => {
            src = reposrc+'res/'+item.src
            $("#d_res").append('<img src='+src+' title='+item.name+' alt='+item.name+' class="d-res">')
        });
        $("#d_r").append("<div class='d-item d-r' id='d_chip'>芯片搜索：</div>");
        daily_res[1].forEach(item => {
            src = reposrc+'res/'+item.src
            $("#d_chip").append('<img src='+src+' title='+item.name+' alt='+item.name+' class="d-chip">')
        });
    });
    $.getJSON(json_src+'op_birthday.json',function (ops) {
        if (ops.length==0) {
        } else {
            $("#daily").append("<div class='d-item' id='d_o'></div>");
            $("#d_o").append('今天是干员<span class="op-bir">'+ops.join('、')+'</span>的生日。')
        }
    })
    $.getJSON(reposrc+'activity.json',function (data) {
        activity = data[0]
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
    $.getJSON(reposrc+'gacha.json',function (gacha) {
        $("#daily").append("<div class='d-item' id='d_g'></div>");
        var gacha_series = 1;
        gacha[0].forEach(item => {
            gacha_series+=1;
            var id_name = 'pool'+String(gacha_series);
            $("#d_g").append("<details id='"+id_name+"'></details>");
            $("#"+id_name).append("<summary id='t_"+id_name+"'><span class='pool-lim'>"+item.name+"</span> </summary>");
            if (now.getTime()<new Date(item.start)) {
                $("#t_"+id_name).append("即将开启");
            } else if (now.getTime()<new Date(item.end)) {
                var t = new Date(item.end).getTime()-now.getTime();
                var t_d = Math.floor(t/(24*3600*1000));
                var t_h = Math.floor(t%(24*3600*1000)/(3600*1000));
                if (t_d>=1) {
                    $("#t_"+id_name).append("剩余 "+String(t_d)+" 天");
                } else {
                    $("#t_"+id_name).append("剩余 "+String(t_h)+" 小时");
                }
            } else {
                $("#t_"+id_name).append("已结束");
            }
            $("#"+id_name).append("<div class='d-item'><span class='luck6'>★★★★★★</span>："+item.up[0]+"</div>");
            $("#"+id_name).append("<a href='"+item.link+"'>&emsp;<u>查看详情</u></a>");
        });
    })
});