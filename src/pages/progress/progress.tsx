/* eslint-disable react/sort-comp */
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react'
import { AtProgress } from 'taro-ui';
import './progress.scss'
import { isSameWeek } from '../../utils/isSameWeek'


export default class charts extends Component {
    // eslint-disable-next-line react/sort-comp
    state = {
        todos: []
    };
    componentWillMount() { }

    componentDidShow() {
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


    componentDidHide() { }



    render() {
        const { todos } = this.state;
        console.log(todos);
        let weekTodos = todos.filter((e) => {
            let weekTodosArr = []
            let todosTime = e.time.split(' ')[0]
            let todayTime = new Date().getFullYear() +
                "-" +
                (new Date().getMonth() +
                    1) +
                "-" +
                new Date().getDate()
            let result = isSameWeek(todosTime, todayTime)
            if (result && result == true) {
                console.log(e)
                return weekTodosArr.push(e)
            }
        })
        console.log(weekTodos)
        let todosLength = weekTodos.length;
        let todosFinishedArr = weekTodos.filter((e) => {
            return e.checkbox === true
        })
        let todosFinished = todosFinishedArr.length
        console.log(todosFinished)
        let todosUnFinished = weekTodos.length > 0 ? weekTodos.length - todosFinished : 0

        let pre = Math.ceil(todosFinished / todosLength * 100)






        return (

            <View className='progress'>

                <View className='title'>
                    <Text>
                        累计共：一共{todos.length}条。
                    </Text>
                </View>
                <View className='title'>
                    <Text>
                        本周内：一共{todosLength}条，
                    </Text>
                    <Text>
                        已完成{todosFinished}条，
                    </Text>
                    <Text>
                        待完成{todosUnFinished}条。
                    </Text>
                </View>

                {(todosLength > 0) ?
                    <AtProgress percent={pre} color='#13CE66' status='progress' strokeWidth={10} className='progress-bar' />
                    :
                    <AtProgress percent={0} color='#13CE66' status='error' strokeWidth={10} className='progress-bar' />

                }


            </View>
        )

    }
}

