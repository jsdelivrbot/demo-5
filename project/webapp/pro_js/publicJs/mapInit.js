// 获得map的配置信息
function getPropertyAndSetMap(flag, mapBox, operation, position) {
    $.ajax({
        url: geoServerConfigUrl,
        type: 'get',
        success: function(result) {
            var data = result.data;
            // 设置 BBOX CRS HEIGHT WIDTH
            var BBOX = data.BBOX.replace(/[\[\]\s]/g, "").split(",");
            Map.property.BBOX = [parseFloat(BBOX[0], 10), parseFloat(BBOX[1], 10), parseFloat(BBOX[2], 10), parseFloat(BBOX[3], 10)];
            Map.property.CRS = data.CRS;
            Map.property.HEIGHT = parseInt(data.HEIGHT, 10);
            Map.property.WIDTH = parseInt(data.WIDTH, 10);
            Map.property.LAYERS = data.LAYERS.toLowerCase();
            Map.property.VERSION = data.VERSION;
            Map.property.projection = data.projection;
            Map.property.url = data.url.toLowerCase();
            // 设置地图限制区域
            var extentArr = data.extent.replace(/[\[\]\s]/g, "").split(",");
            var extentArr1 = ol.proj.fromLonLat([parseFloat(extentArr[0], 10), parseFloat(extentArr[1], 10)]);
            var extentArr2 = ol.proj.fromLonLat([parseFloat(extentArr[2], 10), parseFloat(extentArr[3], 10)]);
            Map.property.extent = extentArr1.concat(extentArr2);
            // 设置中心点
            if (position) {
                Map.property.center = position;
            } else {
                var center = data.center.replace(/[\[\]\s]/g, "").split(",");
                center = [parseFloat(center[0], 10), parseFloat(center[1], 10)];
                Map.property.center = ol.proj.fromLonLat(center);
            }
            // 设置放大缩小比例
            Map.property.zoom = parseFloat(data.zoom, 10);
            Map.property.maxZoom = parseFloat(data.maxZoom, 10);
            Map.property.minZoom = parseFloat(data.minZoom, 10);

            Map.init(flag, mapBox, operation, position);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

var Map = {
    property: {
        showName: false,  //是否显示站名
        showNum: true,  //是否显示数值
    },
    //地图初始化
    init: function(flag, mapBox, operation, position) {
        var propData = this.property;

        var mapInit = false;
        if (mapInit == false) {
            // 实例化地图
            map = new ol.Map({
                logo: false,
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.TileWMS({
                            params: {
                                'LAYERS': propData.LAYERS,
                                'VERSION': propData.VERSION,
                                'BBOX': propData.BBOX,
                                'CRS': propData.CRS,
                                'WIDTH': propData.WIDTH,
                                'HEIGHT': propData.HEIGHT
                            },
                            projection: propData.projection,
                            url: propData.url
                        })
                    })
                ],
                target: mapBox,
                controls: ol.control.defaults({
                    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                        collapsible: false
                    })
                }),
                view: new ol.View({
                    extent: propData.extent,
                    center: propData.center,
                    zoom: propData.zoom,
                    maxZoom: propData.maxZoom,
                    minZoom: propData.minZoom
                })
            });
            map.getView().setZoom(5);
            mapInit = true;
        } else {
            console.log('实例化一次了');
        }
        var _this = this;

        if (flag) { //编辑状态
            // 绘制点及样式
            function draw() {
                //修改获取当前经纬度绘制点
                if (position && operation == 'edit') { //修改
                    var feature = new ol.Feature({
                        geometry: new ol.geom.Point(position), //几何点
                    });
                    var source = new ol.source.Vector({ //矢量路径
                        features: [feature] //特征
                    });
                } else if (operation == "create") { //新建
                    var source = new ol.source.Vector();
                    source.clear();
                }

                var vector = new ol.layer.Vector({ //新建矢量层
                    source: source,
                    style: new ol.style.Style({
                        fill: new ol.style.Fill({ //充满
                            color: 'rgba(255, 255, 255, 0.2)'
                        }),
                        stroke: new ol.style.Stroke({ //路径
                            color: '#ffcc33',
                            width: 2
                        }),
                        image: new ol.style.Circle({ //圈
                            radius: 7,
                            fill: new ol.style.Fill({
                                color: '#ffcc33'
                            })
                        })
                    })
                });
                var point = new ol.interaction.Draw({ //交互绘制园
                    source: vector.getSource(),
                    type: /** @type {ol.geom.GeometryType} */ ('Point'),
                    maxPoints: 1
                });
                // map.setCenter(map.getView().getCenter());
                map.addInteraction(point); //将点交互添加到地图中
                map.addLayer(vector); //地图添加矢量层

                point.on('drawstart', function() { //每次绘制之前清除之前的点
                    source.clear();
                });
            }
            draw();
            //获取当前点击经纬度
            map.on('click', function(evt) {

                _this.mapClick(evt);
            });
        }
    },
    mapClick: function(evt) { //获取经纬度
        var coordinate = evt.coordinate;
        // 处理坐标点的保留位数
        var x = coordinate[0].toFixed(8); //经度
        var y = coordinate[1].toFixed(8); //纬度
        $('input[name="x"]').val(x);
        $('input[name="y"]').val(y);
    },
    clickAddPoints: function() { //交互部分：点击图层加点
        // 绘制方法
        var Draw = {
            init: function() {
                map.addInteraction(this.Point);
            },
            Point: new ol.interaction.Draw({
                source: vector.getSource(),
                type: /** @type {ol.geom.GeometryType} */ ('Point'),
                maxPoints: 1
            })
        };
        Draw.init();
    },
    rainSetInfos: function(position, title, rainfail, i) { /*读取添加站名框*/

        $('body').append('<div class="popup" id="popup' + i + '"><span class="name" style="margin-right:10px;">' + title + "</span><span class='num'>" + rainfail + '</span></div>');
        var popup = new ol.Overlay({
            element: document.getElementById('popup' + i),
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });
        popup.setOffset([0, -32]);
        popup.setPosition(position);
        map.addOverlay(popup);
    },
    rainAddPoints: function(position, title, rainfall) { /*自动读取添加站点*/
        var iconColor;
        var src = '../imgs/common/Real-time-';
        var iconSrc;

        if (rainfall == "—") { //无降雨 gray
            iconSrc = src + '6.png';
        } else if (rainfall == 0) { //white
            iconSrc = src + '7.png';
        } else if (rainfall >= 0.1 && rainfall < 10) { //cyan
            iconSrc = src + '8.png';
        } else if (rainfall >= 10 && rainfall < 25) { //atrovirens
            iconSrc = src + '9.png';
        } else if (rainfall >= 25 && rainfall < 50) { //wathet
            iconSrc = src + '10.png';
        } else if (rainfall >= 50 && rainfall < 100) { //darkBlue
            iconSrc = src + '11.png';
        } else if (rainfall >= 100 && rainfall < 250) { //croci
            iconSrc = src + '12.png';
        } else if (rainfall >= 250) { //red
            iconSrc = src + '13.png';
        }

        //实例化Vector要素，通过矢量图层添加到地图容器中
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(position),
            name: title,
            population: 4000,
            rainfall: 500
        });
        //矢量标注的数据源
        var vectorSource = new ol.source.Vector({
            features: [iconFeature]
        });
        //矢量标注图层
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });
        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
                src: iconSrc,
                width: 50
            }))
        });
        iconFeature.setStyle(iconStyle);
        //将矢量标注图层添加到map中
        map.addLayer(vectorLayer);

    },
    waterSetInfos: function(position, title, waterLevel, i) { /*读取添加站名框*/
        $('body').append('<div class="popup" id="popup' + i + '"><span class="name" style="margin-right:10px;">' + title + "</span><span class='num'>" + waterLevel + '</span></div>');

        //初始化一个覆盖层
        var popup = new ol.Overlay({
            element: document.getElementById('popup' + i),
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });
        popup.setOffset([0, -32]);
        popup.setPosition(position);
        //将覆盖层添加到map中
        map.addOverlay(popup);
    },
    waterAddPoints: function(position, title, waterLineType) { /*自动读取添加站点*/
        var iconColor;
        var src = '../imgs/common/Real-time-';
        var iconSrc;

        if (waterLineType == "0") { //库水位
            iconSrc = src + '23.png';
        } else if (waterLineType == "1") { //河道水位
            iconSrc = src + '24.png';
        }

        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(position),
            name: title,
            population: 4000,
            rainfall: 500
        });
        var vectorSource = new ol.source.Vector({
            features: [iconFeature]
        });
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
                src: iconSrc,
                width: 50
            }))
        });
        iconFeature.setStyle(iconStyle);
        map.addLayer(vectorLayer);
    }
};
