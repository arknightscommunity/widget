from os import sep
import random
import datetime


def getDay():
    week_day_dict = {
        0: '星期一',
        1: '星期二',
        2: '星期三',
        3: '星期四',
        4: '星期五',
        5: '星期六',
        6: '星期日',
    }
    day = datetime.datetime.now().weekday()
    return week_day_dict[day]


with open('events.dat', 'r', encoding='utf-8') as f:
    events = []
    event = []
    for text in f.readlines():
        text = text.strip('\n')
        event.append(text)
        if len(event) == 3:
            events.append(event)
            event = []

with open('op_list.dat', 'r', encoding='utf-8') as f:
    ops = []
    for item in f.readlines():
        ops.append(item.strip('\n'))

n_ev = random.randint(2,5)
n_good = min(3,random.randint(0,n_ev))
n_bad = min(3,n_ev-n_good)
# evs = random.sample(range(len(events)),n_bad+n_good)
evs = random.sample(events,n_bad+n_good)
if n_good==0:
    ev_good = ''
else:
    ev_good = [[ev[0],ev[1]] for ev in evs[:n_good]]

if n_bad==0:
    ev_bad = ''
else:
    ev_bad = [[ev[0],ev[2]] for ev in evs[-n_bad:]]

today = {
    'date': datetime.datetime.now().strftime('今天是 %Y 年 %m 月 %d 日&emsp;')+getDay(),
    'direc': random.choice(['东', '南', '西', '北']),
    'luck': random.randrange(1, 6, 1),
    'op': random.choice(ops),
    'ev_p':ev_good,
    'ev_n':ev_bad
}

print(today)

with open('today.js', 'w', encoding='utf-8')as f:
    f.write('const today_data='+str(today))
