坐标转换`ol.proj.fromLonLat([-90, 40])` eg:`center: ol.proj.fromLonLat([-90, 40])`;

得到经纬度:`ol.coordinate.toStringHDMS(ol.proj.transform(
            xxx , 'EPSG:3857', 'EPSG:4326'))`

四舍五入经纬度: `ol.coordinate.toStringXY( xxx , 3)`
