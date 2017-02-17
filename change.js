function checkCashRegister(price, cash, cid) {
    //输入为实际付款，商品价格，和零钱的余额。然后返回值有三种，如果找不开返回"Insufficient Funds"；如果正好找开，余额空了，返回"Closed"；其余则返回找零的数组。
    // 我的思路可能偏繁琐一点，它给的余额是每种面值的总价值，比如20元它会显示60，那么实际上是20元的有3张。所以如果要找5块，20元的这个60其实没有办法找开。
    // 于是我建了一个对象，用来管理余额，存储每种货币的面额和数量。
    // 之后就是比对需要找零的钱是否大于等于面值，如果大于等于，就看该面值的数量是否足够，足够则找零，更新找零的数额。重复这个步骤，直到找开，或者找不开。
    var change=[];   //储存结果
    var cid_obj={    //存储值和数量
        "ONE HUNDRED":{val:100},
        "TWENTY":{val:20},
        "TEN":{val:10},
        "FIVE":{val:5},
        "ONE":{val:1},
        "QUARTER":{val:0.25},
        "DIME":{val:0.1},
        "NICKEL":{val:0.05},
        "PENNY":{val:0.01}
    };
    for(var a of cid){
        cid_obj[a[0]].num=Math.ceil(a[1]/cid_obj[a[0]].val);//更新不同货币的数量
    }
    if(price==cash){
       // console.log('Closed');
        return 'Closed';
    }else{
        var cha=cash-price;//需要找的零钱
        for(let k of Object.keys(cid_obj)){
            var count=0;
            while(cha>=cid_obj[k].val&&cid_obj[k].num!==0){//没有完成找零并且当前零钱可以找零；
                cha=(cha-cid_obj[k].val).toFixed(2);//四舍五入结果为2位小数；
                cid_obj[k].num--;
                count++;
                if(cid_obj[k].num==0||cha<cid_obj[k].val){//如果没有零钱了；
                    change.push([k,cid_obj[k].val*count]);
                    break;
                }
            }
        }
        if(cha==0){
            if(cid_obj['PENNY'].num==0){
               // console.log('Closed');
                return 'Closed';
            }
            return change;
        }else{
           // console.log('Insufficient Funds');
            return 'Insufficient Funds';
        }
    }


}


checkCashRegister(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);