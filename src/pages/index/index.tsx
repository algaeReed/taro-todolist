import Taro from '@tarojs/taro'
import { AtSearchBar, AtTag, AtSwipeAction, AtButton } from 'taro-ui'

import { Component } from 'react'
import { View, Checkbox, Label } from '@tarojs/components'
import './index.scss'
import { guid } from '../../utils/guid'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() {
    console.log("componentDidMount");
    Taro.getStorage({
      key: 'todos',
      success: (res) => {
        console.log(res.data)
        let storageArr = res.data
        if (storageArr && storageArr.length > 0) {
          const newTodos = JSON.parse(res.data).map((item) => {
            return item;
          });
          this.setState({ todos: newTodos });
        }
      }
    });

  }

  componentWillUnmount() {

  }

  componentDidShow() { }

  componentDidHide() { }

  // eslint-disable-next-line react/sort-comp
  state = {
    tmplIds: ['KiAYNRxjVbtQbKNQa_2-evFDDaq8mV1yYqnCdmTmwlI'],
    todos: [
    //   { "value": "63ba7491-44fb-4e1a-84ab-aa668585dcdf", "label": "点击完成", "done": false, "checkbox": false, "time": "2022-5-1 6:14:12" },
    // { "value": "381a8347-fd25-475d-a7c9-cdd3600f3c2d", "label": "待办延时", "done": false, "checkbox": true, "time": "2022-5-1 6:14:8" },
    // { "value": "381a8347-fd25-475d-a7c9-cdd3600f4c2d", "label": "侧滑删除", "done": false, "checkbox": true, "time": "2022-5-1 6:14:8" },
    // { "value": "381a8347-fd25-475d-a7c9-c3d3600f4c2d", "label": "侧滑删除1", "done": false, "checkbox": true, "time": "2022-4-1 6:14:8" },
    // { "value": "381a8347-fd25-475d-a7c9-crd3600f4c2d", "label": "侧滑删除3", "done": false, "checkbox": true, "time": "2022-4-22 6:14:8" },
    // { "value": "381a8347-fd25-475d-a7c9-cdy3600f4c2d", "label": "侧滑删除4", "done": false, "checkbox": true, "time": "2022-4-29 6:14:8" },

    ],
    value: "",
    options: [
      {
        text: '删除',
        style: {
          backgroundColor: '#ff7043'
        }
      }
    ]
  };
  onChange(value) {
    console.log(value);
    this.setState({
      value: value
    })
  }
  onActionClick() {
    console.log('开始搜索')
    let inputValue = this.state.value
    if (inputValue.trim() === "") return console.log("输入不能为空");
    console.log(inputValue)
    console.log(guid())
    let dataTodo = {
      value: guid(),
      label: inputValue,
      done: false,
      checkbox: false,
      time:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() +
          1) +
        "-" +
        new Date().getDate() +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(),
    };

    console.log(dataTodo);
    this.insertTodo(dataTodo);
    this.setState({
      value: ''
    })


  }

  /**
 *
 * @param {*object} todo
 */
  insertTodo = (dataTodo) => {
    console.log(dataTodo);

    const { todos } = this.state;
    const newTodos = [dataTodo, ...todos];
    console.log(newTodos);
    this.setState({ todos: newTodos });
    Taro.setStorage({
      key: 'todos',
      data: JSON.stringify(newTodos)
    });
    // localStorage.setItem("todos", JSON.stringify(newTodos));
  };


  /**
   * 选中取消勾选状态
   */
  handleCheck = (id, checkbox) => {
    this.updateTodo(id, checkbox);
  };
  /**
   * 更新todos
   * @param {*} id
   * @param {*} done
   */
  updateTodo = (id, checkbox) => {
    checkbox = !checkbox
    console.log(id)
    console.log(checkbox);
    const { todos } = this.state;
    const newTodos = todos.map((t) => {
      if (t && t.value === id) {
        return { ...t, checkbox };
      } else {
        return t;
      }
    });
    console.log(newTodos);
    this.setState({
      todos: newTodos,
    });
    Taro.setStorage({
      key: 'todos',
      data: JSON.stringify(newTodos)
    });

  };
  /**
   * 删除
   */
  handleClickSwiper(this, value) {
    this.deleteTodo(value);
  }


  /**
   * 删除一条todo
   * @param {*} value
   */
  deleteTodo = (value) => {
    console.log(value);
    const { todos } = this.state;
    const newTodos = todos.filter((t) => {
      return t.value !== value;
    });
    this.setState({ todos: newTodos });
    Taro.setStorage({
      key: 'todos',
      data: JSON.stringify(newTodos)
    });
  };

  pushMessage = () => {
    console.log("push")

    Taro.requestSubscribeMessage({
      tmplIds: this.state.tmplIds,
      success: function (res) {
        console.log(res)
      }
    })



  }
  render() {

    const { todos } = this.state;
    const { options } = this.state;

    // Taro.setStorage({
    //   key: 'todos',
    //   data: JSON.stringify(todos)
    // });

    console.log(todos);

    return (
      <View className='index'>
        <View className=''>
          <AtSearchBar
            actionName='添加'
            placeholder='添加'
            showActionButton
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />
        </View>

        <View className='list'>
          {todos.map((item) => {
            return (
              <View key={item.value} className='item'>
                <AtSwipeAction autoClose options={options}
                  onClick={this.handleClickSwiper.bind(this, item.value)}
                  className='swipe-action'
                >
                  <Label className='label'>
                    <Checkbox value='' checked={item.checkbox}
                      onClick={() => { this.handleCheck(item.value, item.checkbox) }} className='checkbox'
                    > {item.label}
                      <AtTag size='small'>{item.time}</AtTag>
                    </Checkbox>
                  </Label>
                  <AtTag size='small' active={item.checkbox} >{item.checkbox ? '已完成' : '未完成'}</AtTag>
                </AtSwipeAction>
                {/* <AtButton onClick={this.pushMessage.bind(this)} >推送</AtButton> */}

              </View>
            )
          })}
        </View>
      </View >
    )
  }
}
