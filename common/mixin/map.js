import config from '@/config'
/**
 * 计算2点的距离，批量距离计算（矩阵）
 * @param {Object} fromLatlng
 * @param {Object} toLatlng
 * @link https://lbs.qq.com/service/webService/webServiceGuide/webServiceMatrix
 */
export const mapDistance = function(fromLatlng, toLatlng) {
	return new Promise((resolve, reject) => {
		//console.log(fromLatlng)
		uni.request({
			url: `https://apis.map.qq.com/ws/distance/v1/matrix`,
			data: {
				mode: "bicycling",
				from: fromLatlng,
				to: toLatlng,
				key: config.qqmapWxKey
			},
			success: (res) => {
				console.log(res)
				resolve(res.data.result.rows);
			},
			fail: (err) => {
				console.log(err)
				reject();
			}
		})
	})
}
/**
 * 逆地址解析（坐标位置描述）
 * @param {Object} fromLatlng
 * @param {Object} poi_options
 * @link https://lbs.qq.com/service/webService/webServiceGuide/webServiceGcoder
 */
export const getLocationAddress = function(fromLatlng, poi_options) {
	poi_options = poi_options || "address_format=short;policy=5";
	return new Promise((resolve, reject) => {
		//console.log(fromLatlng)
		uni.request({
			url: `https://apis.map.qq.com/ws/geocoder/v1/`,
			data: {
				location: fromLatlng,
				get_poi: 1,
				poi_options: poi_options,
				key: config.qqmapWxKey
			},
			success: (res) => {
				resolve(res.data.result);
			},
			fail: (err) => {
				console.log(err)
				reject();
			}
		})
	})
}
