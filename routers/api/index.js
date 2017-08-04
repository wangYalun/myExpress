
var express = require('express');

var router = express.Router();

var selecter = require('../../controllers/api/selecter');

var line = require('../../controllers/api/line/commute');

var notice = require('../../controllers/api/line/notice');

var reportLine = require('../../controllers/api/report/line');

var apiLogin = require('../../controllers/api_login');

var admin_login_log = require('../../controllers/api/admin_login_log');


var jwt = require('jsonwebtoken');

var auth = require('./auth');

var fs = require('fs');



router.post('/login', function (req, res) {
    apiLogin.login(req, res);
});

//router.get('/selecter/today', auth.loginToken, selecter.today);


router
    .get('/admin_login_log', admin_login_log.getAllorOne)
    .get('/admin_login_log/search', admin_login_log.search)
    .get('/admin_login_log/:id', admin_login_log.getAllorOne)
    .post('/admin_login_log', admin_login_log.new)
    .put('/admin_login_log/:id', admin_login_log.update)
    .delete('/admin_login_log/:id', admin_login_log.delete);

//班车线路
var lineRouterPath = '/line/commute';

router.get(lineRouterPath, line.getCommute)
    .get(lineRouterPath + '/:id', line.getCommuteById)
    .post(lineRouterPath, line.addCommute)
    .put(lineRouterPath + "/:id", line.updateCommute)
// .delete(lineRouterPath, line.delete);

router.get('/notice', notice.getNotice)
    .put('/notice/:id', notice.updateNotice)
    .post('/notice', notice.addNotice);


//报表统计
var reportRouterPath = "/report/line";
router.get(reportRouterPath, reportLine.getLine)
    .get(reportRouterPath + "/csv", reportLine.getLineCSV);

router.get('/report/monthly', reportLine.getMonthly);

router.get("/travel/package", function (req, res) {
    res.json({
        "status": "200",
        "seq": "",
        "msg": "查询成功",
        "time": "2017-07-25 09:23:18",
        "data": {
            "packageList": [
                {
                    "adultLimit": 2,
                    "basePrice": 188,
                    "basePricePeak": 299,
                    "chileSeatPrice": 20,
                    "departLineList": [
                        {
                            "lineId": "891e08c509d569f1a4a5e93d046810ff",
                            "lineName": "T1较场尾-宝安汽车站",
                            "linePrice": 25,
                            "stationList": [
                                {
                                    "serialNum": 1,
                                    "stationId": "dff5a8eafe92d5da6d494dfd740b8ac4",
                                    "stationName": "较场尾（东山寺）"
                                },
                                {
                                    "serialNum": 2,
                                    "stationId": "875621b6b156b711d88b1ad6a90cd8e3",
                                    "stationName": "较场尾（大鹏所城）"
                                },
                                {
                                    "serialNum": 3,
                                    "stationId": "ad2b2480c55aceabcc05631a88bf333f",
                                    "stationName": "较场尾（鹏城桥）"
                                }
                            ]
                        },
                        {
                            "lineId": "d239ce696961abdc58383792d818e4c8",
                            "lineName": "T2体育馆-杨梅坑",
                            "linePrice": 25,
                            "stationList": [
                                {
                                    "serialNum": 1,
                                    "stationId": "7b04f6e9c0fd860fd161915cfa3ec9e7",
                                    "stationName": "体育馆②"
                                },
                                {
                                    "serialNum": 2,
                                    "stationId": "7d23db6d398e9adea63feaf3e6763009",
                                    "stationName": "儿童公园①"
                                },
                                {
                                    "serialNum": 3,
                                    "stationId": "54c1a1eb58d778bcb74e1d944700e5f5",
                                    "stationName": "罗湖体育馆①"
                                }
                            ]
                        }
                    ],
                    "id": "00001",
                    "itemList": [
                        {
                            "basePrice": 188,
                            "itemId": "0001",
                            "itemName": "酒店房间",
                            "itemType": "room",
                            "peakBasePrice": 388,
                            "peakPrice": 368,
                            "price": 168,
                            "roomList": [
                                {
                                    "name": "海景大床房",
                                    "originalPeakPrice": 400,
                                    "originalPrice": 200,
                                    "peakPrice": 350,
                                    "price": 168
                                },
                                {
                                    "name": "海景标双房",
                                    "originalPeakPrice": 500,
                                    "originalPrice": 350,
                                    "peakPrice": 400,
                                    "price": 200
                                },
                                {
                                    "name": "驿站海景家庭房",
                                    "originalPeakPrice": 350,
                                    "originalPrice": 200,
                                    "peakPrice": 268,
                                    "price": 128
                                }
                            ]
                        },
                        {
                            "basePrice": 48,
                            "itemId": "0002",
                            "itemName": "骑马",
                            "itemType": "play",
                            "peakBasePrice": 88,
                            "peakPrice": 68,
                            "price": 45,
                            "roomList": []
                        },
                        {
                            "basePrice": 40,
                            "itemId": "0003",
                            "itemName": "水上滑梯",
                            "itemType": "play",
                            "peakBasePrice": 68,
                            "peakPrice": 58,
                            "price": 30,
                            "roomList": []
                        },
                        {
                            "basePrice": 68,
                            "itemId": "0004",
                            "itemName": "直升机",
                            "itemType": "play",
                            "peakBasePrice": 128,
                            "peakPrice": 98,
                            "price": 68,
                            "roomList": []
                        },
                        {
                            "basePrice": 58,
                            "itemId": "0005",
                            "itemName": "烧烤炉",
                            "itemType": "play",
                            "peakBasePrice": 98,
                            "peakPrice": 78,
                            "price": 48,
                            "roomList": []
                        }
                    ],
                    "maxChildLimit": 2,
                    "name": "玫瑰情侣套餐",
                    "originalPrice": 268,
                    "originalPricePeak": 399,
                    "overView": "1间玫瑰酒店海景大床房 + 双人门票 + 双人水上摩托",
                    "returnLineList": [
                        {
                            "lineId": "da74ab00238d22bcb38e2f4299989163",
                            "lineName": "T2杨梅坑-体育馆",
                            "linePrice": 25,
                            "stationList": [
                                {
                                    "serialNum": 1,
                                    "stationId": "4f5d05314b081ee94797e90cab263972",
                                    "stationName": "杨梅坑"
                                },
                                {
                                    "serialNum": 2,
                                    "stationId": "e54999a31261b352148953dbd4c96420",
                                    "stationName": "浪骑（杨梅坑）"
                                },
                                {
                                    "serialNum": 3,
                                    "stationId": "e3278b59489362919c8f530d1f0cf7a9",
                                    "stationName": "桔钓沙（杨梅坑）"
                                },
                                {
                                    "serialNum": 4,
                                    "stationId": "073307d745acd93824e26cfd2cdd032a",
                                    "stationName": "大鹏半岛国家地质公园"
                                }
                            ]
                        },
                        {
                            "lineId": "01fdedd63896d376b6f958f30f9b943f",
                            "lineName": "T1宝安汽车站-较场尾",
                            "linePrice": 25,
                            "stationList": [
                                {
                                    "serialNum": 1,
                                    "stationId": "2e69020141d5c0583d9c5ea03f265bcb",
                                    "stationName": "宝安汽车站"
                                },
                                {
                                    "serialNum": 2,
                                    "stationId": "201702091430507",
                                    "stationName": " 深大北门②"
                                },
                                {
                                    "serialNum": 3,
                                    "stationId": "XBUS_00002786",
                                    "stationName": "联合广场"
                                },
                                {
                                    "serialNum": 4,
                                    "stationId": "54c1a1eb58d778bcb74e1d944700e5f5",
                                    "stationName": "罗湖体育馆①"
                                }
                            ]
                        }
                    ],
                    "type": "fixed"
                },
                {
                    "adultLimit": 2,
                    "basePrice": 168,
                    "basePricePeak": 269,
                    "chileSeatPrice": 20,
                    "departLineList": [
                        {
                            "lineId": "891e08c509d569f1a4a5e93d046810ff",
                            "lineName": "T1较场尾-宝安汽车站",
                            "linePrice": 25,
                            "stationList": [
                                {
                                    "serialNum": 1,
                                    "stationId": "dff5a8eafe92d5da6d494dfd740b8ac4",
                                    "stationName": "较场尾（东山寺）"
                                },
                                {
                                    "serialNum": 2,
                                    "stationId": "875621b6b156b711d88b1ad6a90cd8e3",
                                    "stationName": "较场尾（大鹏所城）"
                                },
                                {
                                    "serialNum": 3,
                                    "stationId": "ad2b2480c55aceabcc05631a88bf333f",
                                    "stationName": "较场尾（鹏城桥）"
                                }
                            ]
                        }
                    ],
                    "id": "00002",
                    "itemList": [
                        {
                            "basePrice": 188,
                            "itemId": "0001",
                            "itemName": "酒店房间",
                            "itemType": "room",
                            "peakBasePrice": 388,
                            "peakPrice": 368,
                            "price": 168,
                            "roomList": [
                                {
                                    "name": "海景大床房",
                                    "originalPeakPrice": 400,
                                    "originalPrice": 200,
                                    "peakPrice": 350,
                                    "price": 168
                                },
                                {
                                    "name": "海景标双房",
                                    "originalPeakPrice": 500,
                                    "originalPrice": 350,
                                    "peakPrice": 400,
                                    "price": 200
                                },
                                {
                                    "name": "驿站海景家庭房",
                                    "originalPeakPrice": 350,
                                    "originalPrice": 200,
                                    "peakPrice": 268,
                                    "price": 128
                                }
                            ]
                        },
                        {
                            "basePrice": 48,
                            "itemId": "0002",
                            "itemName": "骑马",
                            "itemType": "play",
                            "peakBasePrice": 88,
                            "peakPrice": 68,
                            "price": 45,
                            "roomList": []
                        },
                        {
                            "basePrice": 40,
                            "itemId": "0003",
                            "itemName": "水上滑梯",
                            "itemType": "play",
                            "peakBasePrice": 68,
                            "peakPrice": 58,
                            "price": 30,
                            "roomList": []
                        },
                        {
                            "basePrice": 68,
                            "itemId": "0004",
                            "itemName": "直升机",
                            "itemType": "play",
                            "peakBasePrice": 128,
                            "peakPrice": 98,
                            "price": 68,
                            "roomList": []
                        },
                        {
                            "basePrice": 58,
                            "itemId": "0005",
                            "itemName": "烧烤炉",
                            "itemType": "play",
                            "peakBasePrice": 98,
                            "peakPrice": 78,
                            "price": 48,
                            "roomList": []
                        }
                    ],
                    "maxChildLimit": 2,
                    "name": "温馨家庭套餐",
                    "originalPrice": 268,
                    "originalPricePeak": 399,
                    "overView": "1间玫瑰酒店海景大床房 + 双人门票 + 双人水上摩托 + 骑马",
                    "returnLineList": [
                        {
                            "lineId": "01fdedd63896d376b6f958f30f9b943f",
                            "lineName": "T1宝安汽车站-较场尾",
                            "linePrice": 25,
                            "stationList": [
                                {
                                    "serialNum": 1,
                                    "stationId": "2e69020141d5c0583d9c5ea03f265bcb",
                                    "stationName": "宝安汽车站"
                                },
                                {
                                    "serialNum": 2,
                                    "stationId": "201702091430507",
                                    "stationName": " 深大北门②"
                                },
                                {
                                    "serialNum": 3,
                                    "stationId": "XBUS_00002786",
                                    "stationName": "联合广场"
                                },
                                {
                                    "serialNum": 4,
                                    "stationId": "54c1a1eb58d778bcb74e1d944700e5f5",
                                    "stationName": "罗湖体育馆①"
                                }
                            ]
                        }
                    ],
                    "type": "fixed"
                },
                {
                    "adultLimit": 2,
                    "basePrice": 88,
                    "basePricePeak": 169,
                    "chileSeatPrice": 20,
                    "departLineList": [
                        {
                            "lineId": "891e08c509d569f1a4a5e93d046810ff",
                            "lineName": "T1较场尾-宝安汽车站",
                            "linePrice": 25,
                            "stationList": [
                                {
                                    "serialNum": 1,
                                    "stationId": "dff5a8eafe92d5da6d494dfd740b8ac4",
                                    "stationName": "较场尾（东山寺）"
                                },
                                {
                                    "serialNum": 2,
                                    "stationId": "875621b6b156b711d88b1ad6a90cd8e3",
                                    "stationName": "较场尾（大鹏所城）"
                                },
                                {
                                    "serialNum": 3,
                                    "stationId": "ad2b2480c55aceabcc05631a88bf333f",
                                    "stationName": "较场尾（鹏城桥）"
                                }
                            ]
                        }
                    ],
                    "id": "00003",
                    "itemList": [
                        {
                            "basePrice": 188,
                            "itemId": "0001",
                            "itemName": "酒店房间",
                            "itemType": "room",
                            "peakBasePrice": 388,
                            "peakPrice": 368,
                            "price": 168,
                            "roomList": [
                                {
                                    "name": "海景大床房",
                                    "originalPeakPrice": 400,
                                    "originalPrice": 200,
                                    "peakPrice": 350,
                                    "price": 168
                                },
                                {
                                    "name": "海景标双房",
                                    "originalPeakPrice": 500,
                                    "originalPrice": 350,
                                    "peakPrice": 400,
                                    "price": 200
                                },
                                {
                                    "name": "驿站海景家庭房",
                                    "originalPeakPrice": 350,
                                    "originalPrice": 200,
                                    "peakPrice": 268,
                                    "price": 128
                                }
                            ]
                        },
                        {
                            "basePrice": 48,
                            "itemId": "0002",
                            "itemName": "骑马",
                            "itemType": "play",
                            "peakBasePrice": 88,
                            "peakPrice": 68,
                            "price": 45,
                            "roomList": []
                        },
                        {
                            "basePrice": 40,
                            "itemId": "0003",
                            "itemName": "水上滑梯",
                            "itemType": "play",
                            "peakBasePrice": 68,
                            "peakPrice": 58,
                            "price": 30,
                            "roomList": []
                        },
                        {
                            "basePrice": 68,
                            "itemId": "0004",
                            "itemName": "直升机",
                            "itemType": "play",
                            "peakBasePrice": 128,
                            "peakPrice": 98,
                            "price": 68,
                            "roomList": []
                        },
                        {
                            "basePrice": 58,
                            "itemId": "0005",
                            "itemName": "烧烤炉",
                            "itemType": "play",
                            "peakBasePrice": 98,
                            "peakPrice": 78,
                            "price": 48,
                            "roomList": []
                        }
                    ],
                    "maxChildLimit": 1,
                    "name": "特色帐篷套餐",
                    "originalPrice": 128,
                    "originalPricePeak": 228,
                    "overView": "1顶帐篷 + 双人水上摩托",
                    "returnLineList": [
                        {
                            "lineId": "01fdedd63896d376b6f958f30f9b943f",
                            "lineName": "T1宝安汽车站-较场尾",
                            "linePrice": 25,
                            "stationList": [
                                {
                                    "serialNum": 1,
                                    "stationId": "2e69020141d5c0583d9c5ea03f265bcb",
                                    "stationName": "宝安汽车站"
                                },
                                {
                                    "serialNum": 2,
                                    "stationId": "201702091430507",
                                    "stationName": " 深大北门②"
                                },
                                {
                                    "serialNum": 3,
                                    "stationId": "XBUS_00002786",
                                    "stationName": "联合广场"
                                },
                                {
                                    "serialNum": 4,
                                    "stationId": "54c1a1eb58d778bcb74e1d944700e5f5",
                                    "stationName": "罗湖体育馆①"
                                }
                            ]
                        }
                    ],
                    "type": "fixed"
                },
                {
                    "adultLimit": 2,
                    "basePrice": 68,
                    "basePricePeak": 168,
                    "chileSeatPrice": 20,
                    "departLineList": [
                        {
                            "lineId": "891e08c509d569f1a4a5e93d046810ff",
                            "lineName": "T1较场尾-宝安汽车站",
                            "linePrice": 25,
                            "stationList": [
                                {
                                    "serialNum": 1,
                                    "stationId": "dff5a8eafe92d5da6d494dfd740b8ac4",
                                    "stationName": "较场尾（东山寺）"
                                },
                                {
                                    "serialNum": 2,
                                    "stationId": "875621b6b156b711d88b1ad6a90cd8e3",
                                    "stationName": "较场尾（大鹏所城）"
                                },
                                {
                                    "serialNum": 3,
                                    "stationId": "ad2b2480c55aceabcc05631a88bf333f",
                                    "stationName": "较场尾（鹏城桥）"
                                }
                            ]
                        }
                    ],
                    "id": "00004",
                    "itemList": [
                        {
                            "basePrice": 188,
                            "itemId": "0001",
                            "itemName": "酒店房间",
                            "itemType": "room",
                            "peakBasePrice": 388,
                            "peakPrice": 368,
                            "price": 168,
                            "roomList": [
                                {
                                    "name": "海景大床房",
                                    "originalPeakPrice": 400,
                                    "originalPrice": 200,
                                    "peakPrice": 350,
                                    "price": 168
                                },
                                {
                                    "name": "海景标双房",
                                    "originalPeakPrice": 500,
                                    "originalPrice": 350,
                                    "peakPrice": 400,
                                    "price": 200
                                },
                                {
                                    "name": "驿站海景家庭房",
                                    "originalPeakPrice": 350,
                                    "originalPrice": 200,
                                    "peakPrice": 268,
                                    "price": 128
                                }
                            ]
                        },
                        {
                            "basePrice": 48,
                            "itemId": "0002",
                            "itemName": "骑马",
                            "itemType": "play",
                            "peakBasePrice": 88,
                            "peakPrice": 68,
                            "price": 45,
                            "roomList": []
                        },
                        {
                            "basePrice": 40,
                            "itemId": "0003",
                            "itemName": "水上滑梯",
                            "itemType": "play",
                            "peakBasePrice": 68,
                            "peakPrice": 58,
                            "price": 30,
                            "roomList": []
                        },
                        {
                            "basePrice": 68,
                            "itemId": "0004",
                            "itemName": "直升机",
                            "itemType": "play",
                            "peakBasePrice": 128,
                            "peakPrice": 98,
                            "price": 68,
                            "roomList": []
                        },
                        {
                            "basePrice": 58,
                            "itemId": "0005",
                            "itemName": "烧烤炉",
                            "itemType": "play",
                            "peakBasePrice": 98,
                            "peakPrice": 78,
                            "price": 48,
                            "roomList": []
                        }
                    ],
                    "maxChildLimit": 1,
                    "name": "自由自选套餐",
                    "originalPrice": 98,
                    "originalPricePeak": 188,
                    "overView": "1间玫瑰酒店海景大床房 + 双人门票 + 双人水上摩托",
                    "returnLineList": [
                        {
                            "lineId": "01fdedd63896d376b6f958f30f9b943f",
                            "lineName": "T1宝安汽车站-较场尾",
                            "linePrice": 25,
                            "stationList": [
                                {
                                    "serialNum": 1,
                                    "stationId": "2e69020141d5c0583d9c5ea03f265bcb",
                                    "stationName": "宝安汽车站"
                                },
                                {
                                    "serialNum": 2,
                                    "stationId": "201702091430507",
                                    "stationName": " 深大北门②"
                                },
                                {
                                    "serialNum": 3,
                                    "stationId": "XBUS_00002786",
                                    "stationName": "联合广场"
                                },
                                {
                                    "serialNum": 4,
                                    "stationId": "54c1a1eb58d778bcb74e1d944700e5f5",
                                    "stationName": "罗湖体育馆①"
                                }
                            ]
                        }
                    ],
                    "type": "optional"
                }
            ]
        }
    });
});

router.get('/web_log', function (req, res) {
    fs.appendFile('./log/remote_debug.log', new Date() + " " + JSON.stringify(req.query) + "\n");
    res.sendStatus(200);
});



module.exports = router;
