// 라이브러리 로드
const express = require('express');

// 서버 생성
const app = express();

// 서버 구동
/*
    bind()   => IP, Port 연결 => 개통
    listen() => 대기상태
    accept() => 클라이언트 접속 시 처리
 */
app.listen(3355, () => {
   console.log('Server start...', 'http://localhost:3355');
});

// 포트 충돌을 방지함
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// 클라이언트와 통신
// 사용자의 URI
// DB 연결
const Client = require('mongodb').MongoClient; // mongoDB connection

app.get('/recipe', (request, response) => {
    // request: 사용자가 보내 준 정보(page, id, password)
    // 요청을 처리
    // 결과를 전송
    var page = request.query.page;
    var rowSize = 12;
    var skip = (page * rowSize) - rowSize;
    var url = "mongodb://211.238.142.181:27017"; // mongoDB 주소
    // SELECT * FROM recipe WHERE title LIKE '%값%' 하고 싶으면
    // find({"title": {"$regex" : ".*" + 값}})
    Client.connect(url, (err, client) => {
        var db = client.db('mydb');
        db.collection('recipe').find({}).skip(skip).limit(rowSize).toArray((err, docs) => {
            response.json(docs);
            console.log(docs);
            client.close();
        });
    });
});

app.get('/recipe_total', (request, response) => {
    var url = 'mongodb://211.238.142.181:27017';
    Client.connect(url, (err, client) => {
       var db = client.db('mydb');
       db.collection('recipe').find({}).count((err, count) => {
           response.json({total: Math.ceil(count / 12.0)});
           client.close();
           return count;
       })
    });
});

app.get('/recipe_detail', (request, response) => {
   var url = 'mongodb://211.238.142.181:27017';
   var no = request.query.no;
   Client.connect(url, (err, client) => {
      var db = client.db('mydb');
      db.collection('recipe_detail').find({no: Number(no)}).toArray((err, docs) => {
         response.json(docs[0]);
         client.close();
      });
   });
});

app.get('/chef', (request, response) => {
    var page = request.query.page;
    var rowSize = 50;
    var skip = (page * rowSize) - rowSize;
    var url = "mongodb://211.238.142.181:27017";
    Client.connect(url, (err, client) => {
        var db = client.db('mydb');
        db.collection('chef').find({}).skip(skip).limit(rowSize).toArray((err, docs) => {
            response.json(docs);
            console.log(docs);
            client.close();
        });
    });
});

app.get('/chef_total', (request, response) => {
    var url = 'mongodb://211.238.142.181:27017';
    Client.connect(url, (err, client) => {
        var db = client.db('mydb');
        db.collection('chef').find({}).count((err, count) => {
            response.json({total: Math.ceil(count / 50.0)});
            client.close();
            return count;
        })
    });
});

const xml2js = require('xml2js');
const request = require('request');

app.get('/recipe_news', (req, res) => {
    var query = encodeURIComponent('야구');
    var url = 'http://newssearch.naver.com/search.naver?where=rss&query=' + query;
    // xml을 json으로 변경
    var parser = new xml2js.Parser({
        explicitArray: false
    });
    request({url: url}, (err, request, xml) => {
        parser.parseString(xml, function(err, pJson) {
            console.log(pJson.rss.channel.item);
        });
    })
});