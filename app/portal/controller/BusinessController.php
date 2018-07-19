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
		$page = input('?post.page') ? input('post.page') : 1;
		$number = 9;

		$data = fetch_data($category, $field, $page, $number);
		if ($data->isEmpty()) {
			return json_encode(['errcode' => '1101','error' => '没有相关数据'], JSON_UNESCAPED_UNICODE);
		}
		$data = handle_img_url($data);
		foreach ($data as $k => $v) {
			$data[$k]['links'] = url('portal/article/index', ['id' => $v['id']]);
		}
		$json['status'] = '200';
		$json['total'] = category_arts_sum($category, 1, true);
		$json['page'] = $page;
		$json['number'] = $number;
		$json['data'] = $data;
		return json_encode($json, JSON_UNESCAPED_UNICODE);
	}
}