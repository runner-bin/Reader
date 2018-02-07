var postsData = require('../../data/posts-data.js')
var app = getApp();
Page({
    data: {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({posts_key: postsData.postList });
        console.log("load");
        // 
    },

    onPostTap: function (event) {
        var postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postId,
        })
    },

    onSwiperTap: function (event) {
        var postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postId,
        })
    },

    onFloatMusicTap:function(event){ 
        if (app.globalData.g_isPlayingMusic){
            var postId = app.globalData.g_currentMusicPostId;
            // console.log(app.globalData.g_currentMusicPostId);
            wx.navigateTo({
                url: 'post-detail/post-detail?id=' + postId,
            })
        }
    }

})