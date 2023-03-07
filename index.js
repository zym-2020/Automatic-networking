const ping = require("net-ping");
const execSync = require("child_process").execSync;
const schedule = require("node-schedule");
const fs = require("fs");
const pyPath = "./resource/main.py";
const logPath = "./resource/check.log";

const pingUtil = (address) => {
  const session = ping.createSession();
  session.pingHost(address, (err) => {
    if (err) {
      fs.appendFileSync(logPath, `${dateFormat(new Date())}:断网\n`);
      execSync(`python ${pyPath}`); //调用python重登网络
    } else {
      fs.appendFileSync(logPath, `${dateFormat(new Date())}:Alive\n`);
    }
    fs.appendFileSync(logPath, `${dateFormat(new Date())}:check end...\n`);
  });
};

const execute = () => {
  schedule.scheduleJob("0 15,45 * * * *", () => {
    fs.appendFileSync(logPath, `${dateFormat(new Date())}:check start...\n`);
    pingUtil("180.101.50.188");         //ping百度的地址
  });
};

const dateFormat = (date, format) => {
  let dateObj = date;
  let fmt = format || "yyyy-MM-dd hh:mm:ss";
  //author: meizz
  var o = {
    "M+": dateObj.getMonth() + 1, //月份
    "d+": dateObj.getDate(), //日
    "h+": dateObj.getHours(), //小时
    "m+": dateObj.getMinutes(), //分
    "s+": dateObj.getSeconds(), //秒
    "q+": Math.floor((dateObj.getMonth() + 3) / 3), //季度
    S: dateObj.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k].toString()
          : ("00" + o[k].toString()).substr(("" + o[k].toString()).length)
      );
  return fmt;
};

execute();
