<?php 

/**
 * [list_case description]
 * @param  string $year  [年份，返回当年发布的案例]
 * @param  string $limit [条数，限制数据量]
 * @return [array]       [合作案例数据]
 */
function list_case($year='', $limit='')
{
	if (empty($year)) {
		$data = \app\portal\model\PortalPostModel::all(function($query) use($limit) {
			$query->limit($limit)->order('published_time desc');
		});
	} else {
		$begin = mktime(0,0,0,1,1,$year);
		$end = mktime(0,0,0,1,1,++$year);
		$data = \app\portal\model\PortalPostModel::all(function($query) use($begin,$end,$limit) {
			$query->where('published_time', '>=', $begin)
				  ->where('published_time', '<', $end)
				  ->order('published_time desc')
			      ->limit($limit);
		});
	}
	return $data->toArray();
}