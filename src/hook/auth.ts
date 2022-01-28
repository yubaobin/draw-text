import { authApi } from '@/api/wx'
import wx from 'weixin-js-sdk'

export function authWx () {
    authApi.authWx().then((res) => {
        const data = res.result
        wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem']
        })
        wx.ready(function () {
            wx.hideAllNonBaseMenuItem()
        })
    })
}

/**
 * 隐藏菜单
 */
export function hideAllNonBaseMenuItem () {
    wx.ready(function () {
        wx.hideAllNonBaseMenuItem()
    })
}

/**
 * 显示菜单
 */
export function showAllNonBaseMenuItem () {
    wx.ready(function () {
        wx.showAllNonBaseMenuItem()
    })
}