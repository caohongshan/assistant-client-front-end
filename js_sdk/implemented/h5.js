/**
 * 实现系统接口
 */
export function initImplemented() {
	//复制到粘贴板
	uni.setClipboardData = ({
		data,
		success,
		fail,
		complete
	}) => {
		if (!success) {
			success = () => {}
		}
		if (!fail) {
			fail = () => {}
		}
		// console.log("data", data)
		if (data) {
			//创建选中范围
			try {
				let oInput = document.createElement('input');
				oInput.value = data;
				oInput.style = "opacity:0;position: absolute;top: -999 rem;	left: -999 rem;"
				document.body.appendChild(oInput);
				// 选择对象
				oInput.select();
				// 执行浏览器复制命令
				let successful = document.execCommand("Copy")
				if (successful) {
					success()
					oInput.remove();
				} else {
					fail()
				}
			} catch (e) {
				//TODO handle the exception
				fail(e)
			}
		} else {
			fail()
		}
	}
}
