import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import jsonp from '../../jsonp_1.0';


class List3 extends Component {
  constructor(){
    super();
    this.state = {
      data:[],
      num:0
    }
  }
  renderData = (num) => {
    let _this = this;
    jsonp({
      url:'http://www.wookmark.com/api/json/popular',
      data:{
        page:num
      },
      success:function(data){
        let num = 0;
        let arr = [];
        let list = null;
        
        data.forEach((e,i)=>{
          //验证img的图片是否是好的
          let img = new Image();
          img.src = e.preview;

          img.onload = function(){
            num ++;
            if(num >= data.length){
              console.log(num); //50条数据
              list = arr.map((e,i)=>{
                return <li key={i}><img src={e}/></li>
              });
              _this.setState({data:list});
            }
            arr.push(e.preview);
          }
          img.onerror = function(){
            num++;
            //50条数据都处理完成了
            if(num >= data.length){
              console.log(num); //50条数据
              list = arr.map((e,i)=>{
                return <li key={i}><img src={e}/></li>
              });
              _this.setState({data:list});
            }
          }
        });
      }
    })
  }
  componentDidMount(){
    /*
      当组件挂载之后执行，执行一次
    */
    let _this = this;
    
    this.renderData(2);
  }
  render() {
    let {data} = this.state;
    console.log(data);
    return (
      <div>
        <ul id="ul">
          {data}
        </ul>
      </div>
    );
  }
}

export default List3;
