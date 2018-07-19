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

		$data = fetch_data($category, $field, $page, $number);
		if ($data->isEmpty()) {
			return json_encode(['errcode' => '1101','error' => '没有相关数据'], JSON_UNESCAPED_UNICODE);
		}
		$data = handle_img_url($data);
		foreach ($data as $k => $v) {
			$data[$k]['link'] = url('portal/article/index', ['id' => $v['id']]);
		}
		return json_encode($data, JSON_UNESCAPED_UNICODE);
	}
}