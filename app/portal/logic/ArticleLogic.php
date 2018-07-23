<?php

namespace app\portal\logic;

class ArticleLogic {
	public static function handle_success_data ($category, $page, $number, $data)
	{
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