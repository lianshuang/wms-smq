// 通过类型获取当前用户当前操作类型执行到第几步骤
export function getStepAndRouterTo(type, step){
	
	const url =  './' + (getCurrentPages()[getCurrentPages().length - 1]['$route']['path']).split('/')[2] + step
	uni.redirectTo({
		url
	});
}