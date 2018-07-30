<?php
/**
 * 品专官网 - 业务版块控制器
 */

namespace app\portal\controller;

use cmf\controller\HomeBaseController;
use app\portal\logic\ArticleLogic;
use think\DB;

class BusinessController extends HomeBaseController {
	public function index()
	{
		return $this->fetch('/business');
	}

	public function page()
	{
		$category = 5;
		$field = 'a.id,a.post_keywords,a.post_excerpt,a.more,published_time';
		$page = input('?post.page') ? input('post.page') : 1;
		$number = 9;

		$data = fetch_data($category, $field, $page, $number);
		if ($data->isEmpty()) {
			return json_encode(['errcode' => '1101','error' => '没有相关数据'], JSON_UNESCAPED_UNICODE);
		}

		return ArticleLogic::handle_success_data($category, $page, $number, $data);
	}
}