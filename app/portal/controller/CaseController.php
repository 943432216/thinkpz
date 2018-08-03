<?php

/**
 * 品专官网 - 经典案例控制器
 */

namespace app\portal\controller;

use cmf\controller\HomeBaseController;
use app\portal\logic\ArticleLogic;

class CaseController extends HomeBaseController
{
	public function index()
	{
		return $this->fetch('/case');
	}

	public function listCase()
	{
		$category = 4;
		$year = input('?post.year') ? input('post.year') : '';
		$page = input('?post.page') ? input('post.page') : 1;
		$number = input('?post.number') ? input('post.number') : 6;
		$field = 'a.id,post_title,more,published_time,post_excerpt,post_hits,post_share';

		$data = fetch_case_by_year($year, $page, $number, $field);

		if ($data->isEmpty()) {
			return json_encode(['errcode' => '1101','error' => '没有相关数据'], JSON_UNESCAPED_UNICODE);
		}

		return ArticleLogic::handle_success_data($category, $page, $number, $data);
	}
}