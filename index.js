//express_demo.js 文件
var express = require('express');
var gmail = require('./gmail');
var app = express();
app.use(express.static('static'));
var bodyParser = require('body-parser');
var fs = require("fs");
var nodemailer = require('nodemailer');


var content = '<h1><img alt="Saturn V carrying Apollo 11" class="right" src="http://c.cksource.com/a/1/img/sample.jpg" /> Apollo 11</h1>'+
'<p><strong>Apollo 11</strong> was the spaceflight that landed the first humans, Americans <a href="http://en.wikipedia.org/wiki/Neil_Armstrong">Neil Armstrong</a> and <a href="http://en.wikipedia.org/wiki/Buzz_Aldrin">Buzz Aldrin</a>, on the Moon on July 20, 1969, at 20:18 UTC. Armstrong became the first to step onto the lunar surface 6 hours later on July 21 at 02:56 UTC.</p>'+
'<p>Armstrong spent about <s>three and a half</s> two and a half hours outside the spacecraft, Aldrin slightly less; and together they collected 47.5 pounds (21.5&nbsp;kg) of lunar material for return to Earth. A third member of the mission, <a href="http://en.wikipedia.org/wiki/Michael_Collins_(astronaut)">Michael Collins</a>, piloted the <a href="http://en.wikipedia.org/wiki/Apollo_Command/Service_Module">command</a> spacecraft alone in lunar orbit until Armstrong and Aldrin returned to it for the trip back to Earth.</p>'+
'<h2>Broadcasting and <em>quotes</em> <a id="quotes" name="quotes"></a></h2>'+
'<p>Broadcast on live TV to a world-wide audience, Armstrong stepped onto the lunar surface and described the event as:</p>'+
'<blockquote>'+
'<p>One small step for [a] man, one giant leap for mankind.</p>'+
'</blockquote>'+
'<p>Apollo 11 effectively ended the <a href="http://en.wikipedia.org/wiki/Space_Race">Space Race</a> and fulfilled a national goal proposed in 1961 by the late U.S. President <a href="http://en.wikipedia.org/wiki/John_F._Kennedy">John F. Kennedy</a> in a speech before the United States Congress:</p>'+
'<blockquote>'+
'<p>[...] before this decade is out, of landing a man on the Moon and returning him safely to the Earth.</p>'+
'</blockquote>'+
'<h2>Technical details <a id="tech-details" name="tech-details"></a></h2>'+
'<table align="right" border="1" bordercolor="#ccc" cellpadding="5" cellspacing="0" style="border-collapse:collapse">'+
' <caption><strong>Mission crew</strong></caption>'+
' <thead>'+
'   <tr>'+
'     <th scope="col">Position</th>'+
'     <th scope="col">Astronaut</th>'+
'   </tr>'+
' </thead>'+
' <tbody>'+
'   <tr>'+
'     <td>Commander</td>'+
'     <td>Neil A. Armstrong</td>'+
'   </tr>'+
'   <tr>'+
'     <td>Command Module Pilot</td>'+
'     <td>Michael Collins</td>'+
'   </tr>'+
'   <tr>'+
'     <td>Lunar Module Pilot</td>'+
'     <td>Edwin &quot;Buzz&quot; E. Aldrin, Jr.</td>'+
'   </tr>'+
' </tbody>'+
'</table>'+
'<p>Launched by a <strong>Saturn V</strong> rocket from <a href="http://en.wikipedia.org/wiki/Kennedy_Space_Center">Kennedy Space Center</a> in Merritt Island, Florida on July 16, Apollo 11 was the fifth manned mission of <a href="http://en.wikipedia.org/wiki/NASA">NASA</a>&#39;s Apollo program. The Apollo spacecraft had three parts:</p>'+
'<ol>'+
' <li><strong>Command Module</strong> with a cabin for the three astronauts which was the only part which landed back on Earth</li>'+
' <li><strong>Service Module</strong> which supported the Command Module with propulsion, electrical power, oxygen and water</li>'+
' <li><strong>Lunar Module</strong> for landing on the Moon.</li>'+
'</ol>'+
'<p>After being sent to the Moon by the Saturn V&#39;s upper stage, the astronauts separated the spacecraft from it and travelled for three days until they entered into lunar orbit. Armstrong and Aldrin then moved into the Lunar Module and landed in the <a href="http://en.wikipedia.org/wiki/Mare_Tranquillitatis">Sea of Tranquility</a>. They stayed a total of about 21 and a half hours on the lunar surface. After lifting off in the upper part of the Lunar Module and rejoining Collins in the Command Module, they returned to Earth and landed in the <a href="http://en.wikipedia.org/wiki/Pacific_Ocean">Pacific Ocean</a> on July 24.</p>'+
'<hr />'+
'<p><small>Source: <a href="http://en.wikipedia.org/wiki/Apollo_11">Wikipedia.org</a></small></p>'


var mailOptions = {
    from: '445560292@qq.com', // 发件地址
    to: '445560292@qq.com', // 收件列表
    subject: 'Hello sir', // 标题
    //text和html两者只支持一种
    text: 'Hello world ?', // 标题
    html: content // html 内容
};

//  主页输出 "Hello World"
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   gmail.sendGmail(mailOptions);
   res.send('Hello POST');
})
//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})


app.get('/process_get', function (req, res) {

   // 输出 JSON 格式
   response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

//  /del_user 页面响应
app.get('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
})

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})

app.post('/file_upload', function (req, res) {

   console.log(req.files[0]);  // 上传的文件信息

   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})


var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);

})


