<?php
/**
 * 品专官网 - 新闻中心控制器
 */

namespace app\portal\controller;

use cmf\controller\HomeBaseController;
use think\DB;


class NewsController extends HomeBaseController {
	public function index()
	{
		return $this->fetch('/news');
	}

	public function getnews()
	{
		$category = 2;
		$field = 'a.id,a.post_title,a.post_excerpt,a.more';
		$page = 1;
		$number = 7;
		$data = fetch_data($category, $field, $page, $number);

		return json_encode(handle_img_url($data), JSON_UNESCAPED_UNICODE);
	}
}