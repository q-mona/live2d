function renderTip(template, context) {
    let tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '')
        }
        let letiables = token.replace(/\s/g, '').split('.')
        let currentObject = context
        let i, length, letiable
        for (i = 0, length = letiables.length; i < length; ++i) {
            letiable = letiables[i]
            currentObject = currentObject[letiable]
            if (currentObject === undefined || currentObject === null) return ''
        }
        return currentObject
    })
}

String.prototype.renderTip = function (context) {
    return renderTip(this, context)
}

let element = new Image()
Object.defineProperty(element, 'id', {
    get: function () {
        /* TODO */
        showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000)
    }
})
console.log('%cHello', element)

$(document).on('copy', function () {
    showMessage('你都复制了些什么呀，转载要记得加上出处哦~~', 5000)
})


//鼠标移入和点击事件
function initTips() {
    $.ajax({
        cache: true,
        url: "./live2d/message.json",
        dataType: "json",
        success: function (result) {
            $.each(result.mouseover, function (index, tips) {
                $(tips.selector).mouseover(function () {
                    let text = tips.text
                    if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1]
                    text = text.renderTip({ text: $(this).text() })
                    showMessage(text, 3000)
                })
            })
            $.each(result.click, function (index, tips) {
                $(tips.selector).click(function () {
                    let text = tips.text
                    if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1]
                    text = text.renderTip({ text: $(this).text() })
                    showMessage(text, 3000)
                })
            })
        }
    })
}
initTips();

//初次加载时的互动
(function () {
    let day = (new Date()).getDate()
    let month = (new Date()).getMonth() + 1//0为1月 以此类推 什么鬼设定
    let date = month + '-' + day

    if (date == '1-1')
        text = '元旦阔乐！！！'
    else if (date == '2-14')
        text = '情人节快乐丫~ （情人节还来这里 你是有多无聊呢 嘻嘻）'
    else if (date == '5-1')
        text = '劳动节的意义在于放假！！！'
    else if (date == '10-1')
        text = '国庆节快乐 哼哼~'
    else if (date == '11-11')
        text = '光棍节欸 今天来这 你是老光棍了把（偷笑）'
    else if (date == '12-5')
        text = '呼呼 今天是本站作者的生日哦~'
    else if (date == '12-25')
        text = '圣诞快乐 一年又要过去了呢'
    else
        text = '<span style="color:#0099cc">「 嗨！！！ 」</span>'

    showMessage(text, 12000)
})()

window.setInterval(showHitokoto, 30000)

function showHitokoto() {
    $.getJSON('https://v1.hitokoto.cn/', function (result) {
        showMessage(result.hitokoto, 5000)
    })
}

function showMessage(text, timeout) {
    if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1) - 1]
    //console.log('showMessage', text)
    $('.message').stop()
    $('.message').html(text).fadeTo(200, 1)
    if (timeout === null) timeout = 5000
    hideMessage(timeout)
}

function hideMessage(timeout) {
    $('.message').stop().css('opacity', 1)
    if (timeout === null) timeout = 5000
    $('.message').delay(timeout).fadeTo(200, 0)
}

function initLive2d() {
    $('.hide-button').fadeOut(0).on('click', () => {
        if ($('.hide-button').html() == '显示') {
            $('#test').css('display', '')
            $('.hide-button').html('隐藏')
        }
        else {
            $('#test').css('display', 'none')
            $('.hide-button').html('显示')
        }
    })
    $('#landlord').hover(() => {
        $('.hide-button').fadeIn(600)
    }, () => {
        if ($('.hide-button').html() != '显示')
            $('.hide-button').fadeOut(600)
    })
}
initLive2d()
