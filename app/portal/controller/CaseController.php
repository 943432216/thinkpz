<?php

/**
 * 品专官网 - 经典案例控制器
 */

namespace app\portal\controller;

use cmf\controller\HomeBaseController;

class CaseController extends HomeBaseController
{
	public function list_case()
	{
		var_dump(input('post.'));exit;
		if (!input('?post.year')) {
			$this->error('缺少年份参数...');
		}
		$year = input('post.year');
		$limit = 4;	
		$case_arr = list_case('2016', $limit, 'post_title,post_excerpt,post_hits,more');
		foreach ($case_arr as $k => $v) {
			$case_arr[$k]['more'] =  cmf_get_image_url($case_arr[$k]['more']['thumbnail']);
		}	
		return json_encode($case_data, JSON_UNESCAPED_UNICODE);
	}
}