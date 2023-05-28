/**
 * 批量上传多个文件
 * @param {Object} name 地址前缀
 * @param {Object} number 可选文件个数
 * @param {Object} chooseCallback 选择后回调
 * @param {Object} successCallback 上传完后回调
 */
export const uploadFiles = (name, number, chooseCallback, successCallback) => {
	let day = new Date();
	let pathArr = [name, day.getFullYear(), day.getMonth() + 1, day.getDate()];
	uni.chooseImage({
		count: number,
		success: res => {
			let paths = [];
			console.log(res)
			uni.showLoading({
				title: "图片上传中",
				mask: true
			})
			if (chooseCallback) {
				chooseCallback(res.tempFilePaths);
			}
			let promises = [];
			//循环上传
			res.tempFilePaths.map((filePath) => {
				let fname = (Math.random() + '').substr(2) + '.jpg';
				let cpath = pathArr.join('/') + '/' + fname;
				let uploadPromise = cloudUploadFile(filePath, cpath);
				promises.push(uploadPromise)
			})
			Promise.all(promises).then(res => {
				console.log(res);
				uni.showToast({
					icon: "success",
					title: "上传成功"
				})
				uni.hideLoading();
				if (successCallback) {
					successCallback(res)
				}
			});
		}
	});
}
/**
 * 上传到云端储存
 * @param {File}   filePath 本地文件
 * @param {String}   cpath 云端文件名称，腾讯云为文件实际地址
 * @link https://uniapp.dcloud.io/uniCloud/storage?id=uploadfile
 */
export const cloudUploadFile = (filePath, cpath) => {
	//构造云端地址
	if (!cpath) {
		let day = new Date();
		let field = uni.getStorageSync("avatarField");
		if (!field) {
			field = "user";
		}
		let p = [field, 'images', day.getFullYear(), day.getMonth() + 1, day
			.getDate(), day.getTime() + '.jpg'
		];
		cpath = p.join('/');
	}
	return new Promise((resolve, reject) => {
		// uni.uploadFile({
		//   url: 'your upload url',
		//   filePath: filePath,
		//   name: 'file',
		//   formData: {
		//     //其他参数
		//   },
		//   success(res) {
		//     console.log("upload success", res);
		//     //处理成功回调
		//   },
		//   fail(err) {
		//     console.log("upload fail", err);
		//     //处理失败回调
		//   }
		// })
		let result = uniCloud.uploadFile({
			filePath: filePath,
			cloudPath: cpath,
			onUploadProgress: pro => {},
			success: res => {
				console.log("cloudUploadFile", res)
				if (res.fileID.indexOf("cloud://") != -1) {
					//用这个转换一下，有一个隐藏的好处，可以等待文件发布到cdn，避免立即访问不到
					uniCloud.getTempFileURL({
						fileList: [res.fileID]
					}).then(res2 => {
						resolve(res2.fileList[0].tempFileURL);
					})
				} else {
					//延时返回，可以等待文件发布到cdn，避免立即访问不到
					setTimeout(() => {
						resolve(res.fileID);
					}, 200);
				}
			},
			fail: (err) => {
				console.log("上传图片失败lel", err)
				reject(false);
			}
		});
	});
};
