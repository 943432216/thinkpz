<?php
/**
 * 品专官网 - 业务版块控制器
 */

namespace app\portal\controller;

use cmf\controller\HomeBaseController;
use think\DB;

class BusinessController extends HomeBaseController {
	public function index()
	{
		return $this->fetch('/business');
	}

	public function page()
	{
		$category = 5;
		$field = 'a.id,a.post_keywords,a.post_excerpt,a.more';
		$page = 1;
		$number = 7;
		$begin = $number*($page - 1);

		$data = DB::name('portal_post')->alias('a')
									   ->join('portal_category_post b', 'a.id=b.post_id')
								       ->where('b.category_id', $category)
									   ->field($field)		
									   ->limit($begin, $number)
									   ->select();
		if ($data->isEmpty()) {
			return json_encode(['error' => '没有相关数据'], JSON_UNESCAPED_UNICODE);
		}
		$data = $data->toArray();
		foreach ($data as $k => $v) {
			$data[$k]['more'] = cmf_get_image_url(json_decode($v['more'], true)['thumbnail']);
		}
		return json_encode($data, JSON_UNESCAPED_UNICODE);
	}
}