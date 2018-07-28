<?php
/**
 * 品专官网 - 新闻中心控制器
 */

namespace app\portal\controller;

use cmf\controller\HomeBaseController;
use app\portal\logic\ArticleLogic;
use think\Db;


class NewsController extends HomeBaseController {
	public function index()
	{
		return $this->fetch('/news');
	}

	public function getnews()
	{
		$category = input('?post.category') ? input('post.category') : 2;
		$field = 'a.id,a.post_title,a.post_excerpt,a.more,a.published_time';
		$page = input('?post.page') ? input('post.page') : 1;
		$number = 6;
		$data = fetch_data($category, $field, $page, $number);

		if ($data->isEmpty()) {
			return json_encode(['errcode' => '1101','error' => '没有相关数据'], JSON_UNESCAPED_UNICODE);
		}

		return ArticleLogic::handle_success_data($category, $page, $number, $data);
	}
}