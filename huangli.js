function createDiv(content = '', cls = '') {
    var div = document.createElement("div");
    div.setAttribute('class', cls);
    div.innerHTML = content;
    return div;
}

var app = document.getElementById('huangli');
app.appendChild(createDiv('<em><center>仅供娱乐，请勿当真</center></em>'));
app.appendChild(createDiv(today_data.date, 'date'));
app.appendChild(createDiv('<strong>朝向</strong>：面向' +
    '<span class="direction">' + today_data.direc + '方</span>' +
    '寻访，更容易出货哦！', "direc"));
var fortune = createDiv('<strong>今日运势</strong>：', 'luck');
var star = document.createElement('span');
star.setAttribute('class', 'luck' + String(today_data.luck));
star.innerHTML = '★'.repeat(today_data.luck);
fortune.appendChild(star);
app.appendChild(fortune);
var operator = createDiv('携带干员 ', 'operator');
var oper = document.createElement('span');
oper.setAttribute('class', 'op');
oper.innerText = today_data.op;
operator.appendChild(oper);
operator.appendChild(document.createTextNode(' 过图有奇效。'));
app.appendChild(operator);

var evs = createDiv('', 'evs');
evGood = createDiv('', 'ev good');
evGood.appendChild(createDiv('宜', 'ev-l'));
var evGList = createDiv('', 'ev-list');
if (today_data.ev_p == '') {
    // 无适宜事项
    var ev=createDiv('','ev-item');
    ev.appendChild(createDiv('诸事不宜', 'ev-name'));
    evGList.appendChild(ev);
} else {
    today_data.ev_p.forEach(element => {
        var ev=createDiv('','ev-item');
        var ev_name = createDiv(element[0],'ev-name');
        var ev_desc = createDiv(element[1],'ev-desc');
        ev.appendChild(ev_name);
        ev.appendChild(ev_desc);
        evGList.appendChild(ev);
    });
}


evGood.appendChild(evGList);
evs.appendChild(evGood);
evBad = createDiv('', 'ev bad');
evBad.appendChild(createDiv('忌', 'ev-l'));
var evBList = createDiv('', 'ev-list');
if (today_data.ev_n == '') {
    // 无禁忌事项
    var ev=createDiv('','ev-item');
    ev.appendChild(createDiv('万事大吉', 'ev-name'));
    evBList.appendChild(ev);
} else {
    today_data.ev_n.forEach(element => {
        var ev=createDiv('','ev-item');
        var ev_name = createDiv(element[0],'ev-name');
        var ev_desc = createDiv(element[1],'ev-desc');
        ev.appendChild(ev_name);
        ev.appendChild(ev_desc);
        evBList.appendChild(ev);
    });
}

evBad.appendChild(evBList);
evs.appendChild(evBad);
app.appendChild(evs);