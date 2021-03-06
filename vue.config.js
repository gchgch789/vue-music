const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser')

const resolve = (dir) => {
    return path.join(__dirname, dir);
};

module.exports = {
    devServer: {
        before(app) {
            app.use(bodyParser.urlencoded({ extended: true }))
            const querystring = require('querystring')
                //轮播图
            app.get('/api/getTopBanner', (req, res) => {
                const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
                const jumpPrefix = 'https://y.qq.com/n/yqq/album/';
                axios.get(url, {
                    headers: {
                        referer: 'https://u.y.qq.com/',
                        host: 'u.y.qq.com'
                    },
                    params: req.query
                }).then(response => {
                    response = response.data;
                    if (response.code === 0) {
                        const slider = [];
                        const content = response.focus.data && response.focus.data.content;
                        if (content) {
                            for (let i = 0; i < content.length; i++) {
                                const item = content[i]
                                const sliderItem = {}
                                sliderItem.id = item.id
                                sliderItem.linkUrl = jumpPrefix + item.jump_info.url + '.html'
                                sliderItem.picUrl = item.pic_info.url
                                slider.push(sliderItem)
                            }
                        }
                        res.json({
                            code: 0,
                            data: { slider }
                        });
                    } else {
                        res.json(response);
                    }
                }).catch(e => {
                    console.log(e);
                });
            });
            //歌曲推荐
            app.get('/api/getDiscList', (req, res) => {
                const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                }).then((response) => {
                    res.json(response.data);
                }).catch((e) => {
                    console.log(e);
                });
            });
            //歌手列表
            // app.get('/api/getSingerList', (req, res) => {
            //   const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
            //   axios.get(url, {
            //     headers: {
            //       referer:'https://u.y.qq.com/',
            //       host: 'u.y.qq.com'
            //     },
            //     params: req.query
            //   }).then((response) => {
            //     res.json(response.data);
            //   }).catch((e) => {
            //     console.log(e);
            //   });
            // })
            //歌手列表详情
            app.get('/api/getSingerDetail', (req, res) => {
                const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
                axios.get(url, {
                    headers: {
                        referer: 'https://u.y.qq.com/',
                        host: 'u.y.qq.com'
                    },
                    params: req.query
                }).then(response => {
                    res.json(response.data);
                }).catch(e => {
                    console.log(e);
                });
            });
            //获取歌手URL播放
            app.post('/api/getPurlUrl', bodyParser.json(), function(req, res) {
                    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
                    axios.post(url, req.body, {
                        headers: {
                            referer: 'https://y.qq.com/',
                            origin: 'https://y.qq.com',
                            'Content-type': 'application/x-www-form-urlencoded'
                        }
                    }).then((response) => {
                        res.json(response.data)
                    }).catch((e) => {
                        console.log(e)
                    })
                })
                //获取歌词
            app.get('/api/lyric', (req, res) => {
                const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://u.y.qq.com/',
                        host: 'u.y.qq.com'
                    },
                    params: req.query
                }).then(response => {
                    var ret = response.data
                    if (typeof ret === 'string') {
                        var reg = /^\w+\(({[^()]+})\)$/
                        var mathes = ret.match(reg)
                        if (mathes) {
                            ret = JSON.parse(mathes[1])
                        }
                    }
                    res.json(response.data);
                }).catch(e => {
                    console.log(e);
                });
            });
            //推荐页面歌单详情
            app.get('/api/getCdInfo', function(req, res) {
                    var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
                    axios.get(url, {
                        headers: {
                            referer: 'https://c.y.qq.com/',
                            host: 'c.y.qq.com'
                        },
                        params: req.query
                    }).then((response) => {
                        var ret = response.data
                        if (typeof ret === 'string') {
                            var reg = /^\w+\(({.+})\)$/
                            var matches = ret.match(reg)
                            if (matches) {
                                ret = JSON.parse(matches[1])
                            }
                        }
                        res.json(ret)
                    }).catch((e) => {
                        console.log(e)
                    })
                })
                //热门搜索
            app.get('/api/getHotKey', (req, res) => {
                const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
                axios.get(url, {
                    headers: {
                        referer: 'https://u.y.qq.com/',
                        host: 'u.y.qq.com'
                    },
                    params: req.query
                }).then(response => {
                    res.json(response.data);
                }).catch(e => {
                    console.log(e);
                });
            });
            //搜索列表
            app.get('/api/getHotSearch', (req, res) => {
                const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
                axios.get(url, {
                    headers: {
                        referer: 'https://u.y.qq.com/',
                        host: 'u.y.qq.com'
                    },
                    params: req.query
                }).then(response => {
                    res.json(response.data);
                }).catch(e => {
                    console.log(e);
                });
            });
        },
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('components', resolve('src/components'))
            .set('common', resolve('src/common'))
            .set('api', resolve('src/api'))
            .set('base', resolve('src/base'))
            .set('views', resolve('src/views'))
            .set('store', resolve('src/store'))
    },
    publicPath: '/'
}