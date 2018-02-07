var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var postId = options.id;
        this.data.currentPostId = postId;
        var postData = postsData.postList[postId];
        this.setData(postData);

        var postsCollected = wx.getStorageSync('posts_Collected')
        if (postsCollected) {
            var postCollected = postsCollected[postId]
            this.setData({
                collected: postCollected
            })
        } else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_Collected', postsCollected)
        }

        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == postId ) {
            this.setData({
                isPlayingMusic:true
            })     
        }
        this.setMusicMonitor();
    },

    setMusicMonitor: function () {
        var that = this;
        wx.onBackgroundAudioPlay(function () {
            that.setData({
                isPlayingMusic: true
            })
            app.globalData.g_isPlayingMusic=true;
            app.globalData.g_currentMusicPostId = that.data.currentPostId;

        })

        wx.onBackgroundAudioPause(function () {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        });
    },
    onCollectionTap: function (event) {
        var postsCollected = wx.getStorageSync('posts_Collected');
        var postCollected = postsCollected[this.data.currentPostId];
        postCollected = !postCollected;
        postsCollected[this.data.currentPostId] = postCollected;
        wx.setStorageSync('posts_Collected', postsCollected);
        this.setData({
            collected: postCollected
        }),
            wx.showToast({
                title: postCollected ? "收藏成功" : "取消成功",
                duration: 400
            })

    },

    onMusicTap: function (event) {
        var currentPostId = this.data.currentPostId;
        var postData = postsData.postList[currentPostId];
        var isPlayingMusic = this.data.isPlayingMusic;
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            }),
            app.globalData.g_colorValue="#fff";
        } else {
            wx.playBackgroundAudio({
                dataUrl: postData.music.url,
                title: postData.music.title,
                coverImgUrl: postData.music.coverImg,
            }),
                this.setData({
                    isPlayingMusic: true
                }),
                app.globalData.g_colorValue =this.colorValue ;
        }

    }
})