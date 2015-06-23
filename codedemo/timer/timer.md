#计时器组件

计时器组件，可用于倒计时。

## Install

```bash
$ cortex install app-util --save
```
```js
var Timer = require('app-util/entries/time');
```

or
```html
<script src="http://m2.s2.dpfile.com/mod/app-util/0.1.0/js/time.js"></script>
```

### Class: Timer(options)

```js
var timer = new Timer({
    time: Date.now(),
    isCountDown: true,
    step: 1000,
    interval: 1000,
    onStart: function(e){
        //todo do something
    },
    onChange: function(e){
        //todo do something
    }
});
```

#### Options

- time 'Number' 起始时间戳，默认为当前时间，单位毫秒
- isCountDown 'Boolean' 是否为倒计时，默认为'true'，即倒计时
- step 'Number' 每次计时增减量，单位毫秒
- interval 'Number' 间隔，单位毫秒
- onStart 'function(timeobj)' 起始回调
- onChange 'function(timeobj)' 每次计算回调
-- timeobj 'Object'
--- time
--- year
--- month
--- date
--- hour
--- minute
--- second

#### setTime: '&lt;time&gt;'

重置时间戳

[示例](timer.html)


