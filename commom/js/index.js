// 通过类型获取当前用户当前操作类型执行到第几步骤
export function getStepAndRouterTo(type, step) {
	let base_path = ''
	// #ifdef APP-PLUS
	base_path = '/' + getCurrentPages()[getCurrentPages().length - 1]['route']
	// #endif
	// #ifndef APP-PLUS
	base_path = (getCurrentPages()[getCurrentPages().length - 1]['$route']['path'])
	// #endif
	const url = './' + base_path.split('/')[2] + step
	uni.redirectTo({
		url
	});
}
