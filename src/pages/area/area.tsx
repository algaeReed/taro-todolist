import React, { useState, useEffect } from "react";
import { View, Button, Text, Map } from "@tarojs/components";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtSearchBar, AtSlider, AtList, AtListItem } from "taro-ui";
import Taro from "@tarojs/taro";
import QQMapWX from "../../utils/sdk/qqmap-wx-jssdk";
import md5util from "../../utils/md5";



import "./area.scss";

export default function () {
    const [adressInfo, setArdessInfo] = useState({});
    const [markers, setMarkers] = useState([]);
    const [list, setList] = useState([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        let data = await http()
        console.log("loading")

        setList(data.pois)
        // eslint-disable-next-line @typescript-eslint/no-shadow

    }, [])//传空数组模拟componentDidMount 功能


    getLocal()
    function getLocal() {
        Taro.getLocation({
            type: 'wgs84',
            success: function (res) {
                setArdessInfo(res)
                console.log(res)
            }
        })
    }
    function showMap() {
        Taro.chooseLocation({
            latitude: adressInfo["latitude"] || undefined,
            longitude: adressInfo["longitude"] || undefined,
            success(res) {
                setArdessInfo(res);
            }
        });
    }

    function showMap2() {
        if (adressInfo["latitude"] && adressInfo["longitude"]) {
            Taro.openLocation({
                latitude: adressInfo["latitude"] || undefined,
                longitude: adressInfo["longitude"] || undefined,
                address: adressInfo["address"] || "",
                name: adressInfo["name"] || "",
                scale: 18 //缩放比例，范围5~18
            });
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    async function http() {

        console.log(1)
        let location = "34.7033487,108.8660847"
        let radius = ''
        let page = ''
        let keywords = '美食'
        let key = 'b641b4b11596906e9ee487c0c10bebbe'
        let url = `https://restapi.amap.com/v3/place/around?key=${key}&location=${location}&radius=${radius}&types=050000&page=${page}`


        const res = await Taro.request({ url: url, method: "GET" })
        return (res.data)
    }

    function showMap3() {
        new QQMapWX({
            key: "Y4IBZ-YEXKF-FLSJ5-JWAEM-SX7W2-RWBKS"
        }).search({
            keyword: "酒店",
            success: function (res) {
                console.log(res)
                let mks = res.data.map(element => {
                    return {
                        title: element.title,
                        id: element.id,
                        latitude: element.location.lat,
                        longitude: element.location.lng,
                        iconPath: "https://csdnimg.cn/medal/qixiebiaobing4@240.png", //图片路径
                        width: 20,
                        height: 20
                    };
                });
                setMarkers(mks);
            },
            fail: (err) => {
                console.log(err)
            }
        });
    }

    function onTap(e) {
        console.log("点击地图时触发", e);
    }
    function onMarkerTap(e) {
        console.log(
            "点击标记点时触发",
            e,
            "可以拿到坐标，然后问他到这里去，再掉，打开的接口，完美"
        );
    }
    function onLabelTap() {
        console.log("点击label时触发");
    }
    function onControlTap() {
        console.log("点击控件时触发");
    }
    function onCalloutTap() {
        console.log("点击标记点对应的气泡时触发");
    }
    function onUpdated() {
        console.log("在地图渲染更新完成时触发");
        console.log(adressInfo['latitude'])
        console.log(adressInfo['longitude'])

    }
    function onRegionChange() {
        console.log("视野发生变化时触发");
    }
    function onPoiTap() {
        console.log("点击地图poi点时触发");
    }

    function changeRadius(value) {
        console.log(value)
        // this.radius = value
        // this.local('radius')
    }

    return (
        <View>

            {/* 地图
            拿到地图信息了吗：
            <View>名称：{adressInfo["name"]}</View>
            <View>地址：{adressInfo["address"]}</View>
            <View>
                经纬度：{adressInfo["latitude"]}、{adressInfo["longitude"]}
            </View>
            <Button onClick={() => showMap()}>选择位置</Button>
            <Button onClick={() => showMap2()}>打开地图</Button>
            <Button onClick={() => showMap3()}>展开好多点</Button> */}

            {/* <Button onClick={() => showMap3()}>展开好多点</Button> */}
            <AtSearchBar
                actionName='选择位置'
                placeholder='选择位置'
                showActionButton
                onFocus={() => showMap()}
            />

            {/* <Button onClick={() => showMap()}>选择位置</Button> */}
            {/* <Button onClick={() => showMap2()}>打开地图</Button> */}
            <View className='map-view'>
                <Map className='map'
                    latitude={adressInfo["latitude"]}
                    longitude={adressInfo["longitude"]}
                    subkey='Y4IBZ-YEXKF-FLSJ5-JWAEM-SX7W2-RWBKS'
                    include-points={markers}
                    markers={markers}
                    scale={18}
                    show-location
                    onTap={onTap}
                    onMarkerTap={onMarkerTap}
                    onLabelTap={onLabelTap}
                    onControlTap={onControlTap}
                    onCalloutTap={onCalloutTap}
                    onUpdated={onUpdated}
                    onRegionChange={onRegionChange}
                    onPoiTap={onPoiTap}
                />
            </View>
            <View>
                <AtSlider
                    onChange={changeRadius} step={1} value={50} activeColor='#4285F4' backgroundColor='#BDBDBD' blockColor='#4285F4' blockSize={24}></AtSlider>
            </View>
            <View>
                {/* <view class="item" v-for="item in areaList ">
                    <u-cell-group>
                        <u-cell :title="item.name" :label="item.address">
                        <view class="" slot="right-icon">
                            <view class="">
                            </view>
                            <view class="">
                                <u-button icon="map" size="mini"
										@click="targetLocal(item.latitude,item.longitude,item.url)">
                            </u-button>
                            <u-button icon="phone" size="mini" @click="playphone(item.tel)"></u-button>
                </view> */}

                <AtList>

                    {list.map((e, i) => {
                        return (
                            <View key={i}>{e}</View>
                        )
                    })}
                    {
                        list
                    }
                    {


                    }
                    <AtListItem title='附近' note='附近位置' arrow='right' />
                    {/* <AtListItem
                        arrow='right'
                        note='描述信息'
                        title='标题文字标题文字标题文字标题文字标题文字'
                        extraText='详细信息详细信息详细信息详细信息'
                    /> */}
                </AtList>

            </View >

            {/* 基础展示 ↓  */}
            {/* <Map
            subkey="AXNBZ-HDOLW-4ZCRO-OHASD-SKPVV-DYBO4"
            latitude={31.222349}
            longitude={121.457743}
            include-points={markers}
            markers={markers}
            scale={18}
            show-location
          /> */}
            {/* <Button>取消</Button> <Button>确定</Button> */}
        </View >
    );
}

