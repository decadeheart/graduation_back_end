let sql = require('../sql/sql');
let moment = require('moment');
let bcrypt = require('bcryptjs');
let func = require('../sql/func');

function formatData(rows) {
    
    return rows.map(row => {
        let date = moment(row.releaseTime).format('YYYY-MM-DD');
        var nameStr = row.nameList
        var picStr = row.picLsit
        var imgDatas = []
        if(row.nameList){
            var imgArray= nameStr.split(',')
            var picArray=picStr.split(',')
        for(var i=0;i<imgArray.length;i++){
            
            imgDatas.push({name:imgArray[i],url:picArray[i]})
            }
        }
        if(row.genderStr){
            var sexStr = row.genderStr
            var sexArray = sexStr.split(',')
            var sexData = []
            sexData.push({name:sexArray[0],value:sexArray[1]})
            sexData.push({name:sexArray[2],value:sexArray[3]})
        }
        if(row.areaData){
            var areaStr = row.areaData
            var areaArray = areaStr.split(',')
            var areaArray = areaArray.filter(function (s) {
                return s && s.trim(); 
            });
        }
        if(row.eduStr){
            var eduStr = row.eduStr
            var eduArray = eduStr.split(',')
            var eduContent = []
            eduContent.push({name:eduArray[0],value:eduArray[1]})
            eduContent.push({name:eduArray[2],value:eduArray[3]})
        }
        if(row.words){
            var wordsStr = row.words
            var wordArray = wordsStr.split(',')
            var wordContent = []
            for(var i=0;i<wordArray.length;i++){
            
                wordContent.push({name:wordArray[i],value:Math.floor(Math.random() * (100 - 1)) + 1})

            }
            console.log(wordContent)
        }
        return Object.assign({}, row, {releaseTime: date},{imgDatas:imgDatas},{genderData:sexData},{areaData:areaArray},{eduData:eduContent},{words:wordContent});
    });
}


module.exports = {
    getTop(req, res) {
        func.connPool(sql.chooseTen, 'movie', rows => {
            rows = formatData(rows);
            res.json({code: 200, msg: 'ok', movies: rows});
        });

    },
    getTopScore(req, res) {
        func.connPool(sql.chooseScore, 'douban', rows => {
            //rows = formatData(rows);
            res.json({code: 200, msg: 'ok', movies: rows});
        });

    },
    fetchAll (req, res) {
        func.connPool(sql.queryAll, 'maoyan', rows => {
            rows = formatData(rows);
            res.json({code: 200, msg: 'ok', movies: rows});
        });

    },


    //获得详情
    getById (req, res){
        let id = req.query.id;
        console.log(id)
        func.connPool(sql.queryById, ['maoyan', id], rows => {
            rows = formatData(rows);
            //console.log(rows)
            res.json({code: 200, msg: 'done',data:rows[0]});
        });        
    },
    // 添加用户
    addOne (req, res) {
        let name = req.body.name;
        let pass = req.body.pass;
        let role = req.body.role;
        let query = 'INSERT INTO user(user_name, password, role) VALUES(?, ?, ?)';

        // 密码加盐
        bcrypt.hash(pass, 10, (err, hash) => {
            if (err) console.log(err);

            pass = hash;

            let arr = [name, pass, role];

            func.connPool(query, arr, rows => {
                res.json({code: 200, msg: 'done'});
            });

        });

    },


    // 删除用户
    deleteOne (req, res) {

        let id = req.body.id;

        func.connPool(sql.del, ['user', id], rows => {
            res.json({code: 200, msg: 'done'});
        });

    },

};